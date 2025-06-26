"""
Canonical Correlation Analysis (CCA) for Psychological Questionnaires Prep

This module implements functions for preprocessing questionnaire data, 

The main functionalities include:
- Data preprocessing and cleaning
- Calculation of questionnaire scores

Author: Levi Solomyak
Date: March 2025
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import re
import os
from pathlib import Path
import sys

from scipy.stats import zscore, spearmanr
from sklearn.preprocessing import StandardScaler
from sklearn.cross_decomposition import CCA

# Suppress warnings
import warnings
warnings.filterwarnings('ignore')

# Define questionnaire categories for TEMPS
TEMPS_CATEGORIES = {
    'cyclothymic': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'depressive': [13, 14, 15, 16, 17, 18, 19, 20],
    'irritable': [21, 22, 23, 24, 25, 26, 27, 28],
    'hyperthymi': [29, 31, 32, 33, 34, 35, 36, 40],
    'anxious': [37, 38, 39]
}

def pre_cca(df_clean):
    """
    Preprocess questionnaire data for Canonical Correlation Analysis.
    
    This function performs several preprocessing steps:
    1. Selects relevant columns from questionnaires
    2. Converts string values to numeric
    3. Excludes subjects who failed attention checks
    4. Applies reverse coding to specific questionnaire items
    
    Parameters:
    -----------
    df_clean : pandas.DataFrame
        DataFrame containing raw questionnaire data
        
    Returns:
    --------
    pandas.DataFrame
        Preprocessed questionnaire data
    """
    df_filtered = df_clean.copy()
    
    # 1) Select relevant questionnaire columns
    questionnaire_names = ["NPOQ", "SoA", "TEMPS", "STAI", "SDS", "OCI", "STAXI", "LSAS", "BIS", "EAT", "AES", "AUDIT"]
    selected_cols = ['participant', 'id', 'StartDate'] + [col for col in df_clean.columns if any(col.startswith(name) for name in questionnaire_names)]
    df_filtered = df_filtered[selected_cols]
    
    # Format date column
    df_filtered['StartDate'] = df_filtered['StartDate'].apply(lambda x: x.split()[0])
    df_filtered.rename(columns={'StartDate':'date'}, inplace=True)
    
    # 2) Convert string values to numeric
    for col in selected_cols:
        if col not in ['id', 'participant', 'StartDate']:
            df_filtered[col] = pd.to_numeric(df_filtered[col], errors='coerce')
    
    # 3) Exclude subjects who failed attention checks 
    df_filtered['Exclude'] = df_filtered['SoA_12'].apply(lambda x: 1 if x != 1 else 0)
    df_filtered['Exclude2'] = df_filtered['TEMPS A_30']
    df_filtered['Exclude2'] = df_filtered['Exclude2'].apply(lambda x: 1 if x == 'True' or x == True else 0 if x == 'False' or x == False else x)
    
    # Sort and identify excluded subjects
    df_filtered = df_filtered.sort_values(by='id')
    df_exclude = df_filtered[(df_filtered['Exclude'] == 1) | (df_filtered['Exclude2'] == 1)]
    print('Excluded subjects:')
    print(df_exclude.id)
    
    # Remove excluded subjects from dataset
    df_filtered = df_filtered[(df_filtered['Exclude'] == 0) & (df_filtered['Exclude2'] == 0)]
    df_filtered = df_filtered.drop(columns=['Exclude', 'Exclude2'])
    
    # 4) Apply reverse coding to specific items
    
    # Reverse SoA items
    reverse_cols = ["SoA_1", "SoA_4", "SoA_8", "SoA_9", "SoA_13", "SoA_14"]
    for col in reverse_cols:
        if col in df_filtered.columns:
            df_filtered[col] = 8 - df_filtered[col]
    
    # Reverse other questionnaire items
    other_reverse_cols = ["STAI_21", "STAI_23", "STAI_30", "STAI_33", "STAI_46",
                         'BIS_1', 'BIS_9', 'BIS_13', 'BIS_15', 'BIS_20', 'AUDIT_1']
    for col in other_reverse_cols:
        if col in df_filtered.columns:
            df_filtered[col] = 5 - df_filtered[col]
    
    # Reverse TEMPS items
    reve_false = ['TEMPS A_29', 'TEMPS A_31', 'TEMPS A_32', 'TEMPS A_33', 'TEMPS A_34', 'TEMPS A_35', 'TEMPS A_36', 'TEMPS A_40']
    for col in reve_false:
        if col in df_filtered.columns:
            df_filtered[col] = 1 - df_filtered[col]
    
    # Drop attention check items from dataset
    df_filtered.drop(['SoA_12', 'TEMPS A_30'], axis=1, inplace=True)
    
    return df_filtered


def rename_columns(column_name):
    """
    Rename TEMPS questionnaire columns to include category information.
    
    Parameters:
    -----------
    column_name : str
        Original column name
        
    Returns:
    --------
    str
        Renamed column with category information if applicable
    """
    for category, codes in TEMPS_CATEGORIES.items():
        for code in codes:
            if re.match(f'TEMPS A_{code}$', column_name):
                return f'TEMPS_{category}_{code}'
    return column_name


def perform_cca(X, Y, n_components=1):
    """
    Perform Canonical Correlation Analysis without permutation testing.
    
    This function:
    1. Fits a CCA model to the data
    2. Calculates canonical correlations and loadings
    3. Returns results for interpretation
    
    Parameters:
    -----------
    X : pandas.DataFrame
        First set of variables (e.g., questionnaire data)
    Y : pandas.DataFrame
        Second set of variables (e.g., behavioral measures)
    n_components : int, optional (default=1)
        Number of canonical components to extract
        
    Returns:
    --------
    corrs : list
        Canonical correlations
    X_loadings : numpy.ndarray
        Loadings for X variables
    Y_loadings : numpy.ndarray
        Loadings for Y variables
    X_scores : numpy.ndarray
        Canonical scores for X variables
    Y_scores : numpy.ndarray
        Canonical scores for Y variables
    """
    # Initialize CCA model
    cca = CCA(n_components=n_components)
    print('Y variables in CCA:', Y.columns)
    print('X variables in CCA:', X.columns)
    
    # Fit CCA to data
    cca.fit(X, Y)
    X_scores, Y_scores = cca.transform(X, Y)
    
    # Get loadings
    X_loadings = cca.x_loadings_
    Y_loadings = cca.y_loadings_
    
    # Calculate canonical correlations
    corrs = []
    for i in range(n_components):
        corr = np.corrcoef(X_scores[:, i], Y_scores[:, i])[0, 1]
        corrs.append(corr)
        print(f"Canonical correlation {i+1}: {corr:.4f}")
    
    return corrs, X_loadings, Y_loadings, X_scores, Y_scores


def prepare_holy_cca(cca_df, result_total, replication=True):
    """
    Prepare data for Canonical Correlation Analysis by merging datasets
    and scaling variables.
    
    Parameters:
    -----------
    cca_df : pandas.DataFrame
        DataFrame containing questionnaire data
    result_total : pandas.DataFrame
        DataFrame containing behavioral measures
    replication : bool, optional (default=True)
        Whether this is a replication study (affects merge key)
        
    Returns:
    --------
    X_quest : pandas.DataFrame
        Scaled questionnaire data for CCA
    Y_total : pandas.DataFrame
        Behavioral measures for CCA
    """
    # Merge datasets based on study type
    if replication:
        merged_total = pd.merge(cca_df, result_total, on='id', how='inner')
    else:
        merged_total = pd.merge(cca_df, result_total, on='participant', how='inner')
    
    # Define columns to exclude from analysis
    columns_to_exclude = ['id', 'date', 'participant']
    
    # Get column sets from each dataframe excluding metadata
    cca_selected_columns = set(cca_df.columns) & set(columns_to_exclude)
    result_total_selected_columns = set(result_total.columns) & set(columns_to_exclude)
    
    # Exclude metadata columns from analysis
    cca_final_columns = set(cca_df.columns) - cca_selected_columns
    result_total_final_columns = set(result_total.columns) - result_total_selected_columns
    
    # Select appropriate columns for CCA
    X_quest = merged_total[list(cca_final_columns)]
    Y_total = merged_total[list(result_total_final_columns)]
    
    # Scale questionnaire data (z-score normalization)
    X_quest_scaled = (X_quest - X_quest.mean()) / (X_quest.std())
    
    # Convert scaled data back to DataFrame
    X_quest = pd.DataFrame(X_quest_scaled, columns=X_quest.columns)
    
    print('X_quest sample:', X_quest.head())
    print('Y_total sample:', Y_total.head())
    
    return X_quest, Y_total


def get_scores(df_clean):
    """
    Calculate total scores for each questionnaire.
    
    Parameters:
    -----------
    df_clean : pandas.DataFrame
        Preprocessed questionnaire data
        
    Returns:
    --------
    score_df : pandas.DataFrame
        DataFrame containing total scores for each questionnaire
    """
    # Preprocess data
    cca = pre_cca(df_clean)
    df_clean_sorted = cca.sort_values(by='id')
    
    # Rename TEMPS columns to include category information
    cca.rename(columns=rename_columns, inplace=True)
    
    # Initialize DataFrame for scores
    score_df = pd.DataFrame()
    
    # Define questionnaires to calculate scores for
    questionnaire_names = [
        "NPOQ", "SoA", "TEMPS_cyclothymic", "STAI", "SDS", "OCI", 
        "STAXI", "LSAS", "AUDIT", "BIS", "EAT", "AES",
        "TEMPS_depressive", "TEMPS_irritable", "TEMPS_anxious", "TEMPS_hyperthymi"
    ]
    
    # Calculate total scores for each questionnaire
    for name in questionnaire_names:
        matching_columns = [col for col in cca.columns if col.startswith(name)]
        cca[matching_columns] = cca[matching_columns].apply(pd.to_numeric, errors='coerce')
        score_df[name + '_score'] = cca[matching_columns].sum(axis=1)
    
    # Add metadata columns
    score_df['date'] = cca['date']
    score_df['participant'] = cca['participant']
    score_df['id'] = cca['id']
    
    return score_df





def plot_correlations(final_df, model_1s, significant=True):
    """
    Plot correlations between model fits and behavioral measures.
    
    Parameters:
    -----------
    final_df : pandas.DataFrame
        DataFrame containing behavioral measures
    model_1s : pandas.DataFrame
        DataFrame containing model fits
    significant : bool, optional (default=True)
        Whether to plot only significant correlations
    """
    # Convert participant IDs to integers
    model_1s['participant'] = model_1s['participant'].astype(int)
    final_df['participant'] = final_df['participant'].astype(int)
    
    # Select columns for correlation analysis
    sum_cols = [col for col in final_df.columns if col not in ['participant', 'date']]
    model_cols = [col for col in model_1s.columns if col not in ['id', 'participant', 'date']]
    
    # Initialize list to store correlation values
    corr_values = []
    
    # Merge datasets
    merged_df = pd.merge(model_1s, final_df, on=['participant'])
    
    # Calculate correlations between all pairs of variables
    for model_col in model_cols:
        for sum_col in sum_cols:
            try:
                # Drop NaNs for specific columns only and then calculate correlation
                cleaned_df = merged_df[[model_col, sum_col]].dropna()
                
                if cleaned_df.shape[0] > 0:
                    corr, pval = spearmanr(cleaned_df[model_col], cleaned_df[sum_col])
                    
                    # Add correlation to list if significant or if not filtering by significance
                    if significant and pval < 0.05:
                        corr_values.append([model_col, sum_col, round(corr, 2)])
                    elif not significant:
                        corr_values.append([model_col, sum_col, round(corr, 2)])
                        
            except Exception as e:
                print(f"Error for columns: {model_col} and {sum_col}")
                print(e)
    
    # Create a dataframe from the correlation values
    corr_df = pd.DataFrame(corr_values, columns=['Model_Column', 'Final_Column', 'Correlation'])
    
    # Pivot the dataframe for plotting
    pivot_corr = corr_df.pivot(index='Model_Column', columns='Final_Column', values='Correlation')
    
    # Plot heatmap if correlations exist
    if not pivot_corr.empty:
        mask = np.triu(np.ones_like(pivot_corr, dtype=bool))
        
        plt.figure(figsize=(24, 16))
        
        # Create heatmap
        sns.heatmap(
            pivot_corr, 
            annot=True, 
            cmap='coolwarm', 
            linewidths=0.5, 
            annot_kws={"size": 10}
        )
        
        plt.title('Correlations between Model fits and behavior')
        plt.show()
    else:
        print("No significant correlations found.")





def calculate_raw_sd_across_measures_no_groupby(df, score_df):
    """
    Calculate standard deviation across measures and exclude participants 
    with low variability in responses (potential inattentive responders).
    
    Parameters:
    -----------
    df : pandas.DataFrame
        Raw questionnaire data
    score_df : pandas.DataFrame
        Questionnaire scores
        
    Returns:
    --------
    score_df : pandas.DataFrame
        Score dataframe with low-variability respondents removed
    """
    # Define questionnaire prefixes
    measure_prefixes = ["NPOQ", "SoA", "TEMPS", "STAI", "SDS", "OCI", "STAXI", "LSAS", "BIS", "EAT", "AES"]
    raw_sd_data = {}
    
    # Calculate standard deviation across items for each questionnaire
    for prefix in measure_prefixes:
        relevant_cols = [col for col in df.columns if col.startswith(prefix)]
        # Convert to numeric for calculation
        df[relevant_cols] = df[relevant_cols].apply(pd.to_numeric, errors='coerce')
        raw_sd_data[prefix] = df[relevant_cols].std(axis=1)
    
    # Create DataFrame for standard deviations
    raw_sd_df = pd.DataFrame(raw_sd_data)
    raw_sd_df['id'] = df['id']
    raw_sd_df['StartDate'] = df['StartDate']
    raw_sd_df.reset_index(drop=True, inplace=True)
    
    # Calculate average standard deviation across all measures
    raw_sd_df['average_raw_sd'] = raw_sd_df[measure_prefixes].mean(axis=1)
    
    # Calculate threshold for exclusion (2 SD below mean)
    mean_sd = raw_sd_df['average_raw_sd'].mean()
    std_dev = raw_sd_df['average_raw_sd'].std()
    threshold = mean_sd - 2.0 * std_dev
    
    # Merge standard deviation data with scores
    score_df = pd.merge(score_df, raw_sd_df[['id', 'average_raw_sd']], how='inner', on='id')
    
    # Exclude participants with low response variability
    score_df = score_df[score_df['average_raw_sd'] >= threshold]
    
    return score_df


def plot_cca_loadings(X_loadings, Y_loadings, X_cols, Y_cols, corrs, save_path=None):
    """
    Plot canonical correlation loadings.
    
    Parameters:
    -----------
    X_loadings : numpy.ndarray
        Loadings for X variables
    Y_loadings : numpy.ndarray
        Loadings for Y variables
    X_cols : list
        Names of X variables
    Y_cols : list
        Names of Y variables
    corrs : list
        Canonical correlations
    save_path : str, optional
        Path to save the plot, if None, the plot is displayed
        
    Returns:
    --------
    None
    """
    # Determine number of components to plot
    n_components = min(X_loadings.shape[1], Y_loadings.shape[1])
    
    # Plot loadings for each component
    for i in range(n_components):
        fig, axes = plt.subplots(1, 2, figsize=(15, 6))
        
        # Plot X loadings
        axes[0].bar(X_cols, X_loadings[:, i])
        axes[0].set_title(f'X Loadings - Canonical Component {i+1}')
        axes[0].set_xticks(np.arange(len(X_cols)))
        axes[0].set_xticklabels(X_cols, rotation=90, ha='right')
        
        # Plot Y loadings
        axes[1].bar(Y_cols, Y_loadings[:, i])
        axes[1].set_title(f'Y Loadings - Canonical Component {i+1}')
        axes[1].set_xticks(np.arange(len(Y_cols)))
        axes[1].set_xticklabels(Y_cols, rotation=90, ha='right')
        
        plt.suptitle(f'Canonical Correlation: {corrs[i]:.4f}', fontsize=16)
        plt.tight_layout()
        
        # Save or display the plot
        if save_path is not None:
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            plt.savefig(f"{save_path}_component_{i+1}.png")
        else:
            plt.show()
            
    return


# Example usage:
if __name__ == "__main__":
    project_root = Path(__file__).resolve().parents[3]

    # CSV file path
    csv_path = project_root / 'data' / 'questionnaires' / 'raw' / 'part_01.csv'

    # Helper functions path
    helper_path = project_root / 'analysis' / '03psychopathology' / 'process_raw'
    sys.path.append(str(helper_path))

    # Load data
    df_raw = pd.read_csv(csv_path)
    
    # Process data
    scores = get_scores(df_raw)
    
    # Example of filtering out inattentive responders
    scores_filtered = calculate_raw_sd_across_measures_no_groupby(df_raw, scores)
    
    
    # Calculate and visualize correlations between variables
    # plot_correlations(questionnaire_scores, behavioral_measures, significant=True)
    
    print("Script completed successfully.")
