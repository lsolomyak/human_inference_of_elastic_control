# CCA Analysis for Control Studies
# This script performs canonical correlation analysis on control study data

# Load required functions
source("scripts/analyses/03_questionaire/scripts/R/cca_functions.R")

# Load pre-processed data (update path to be relative for GitHub)
load("data/cca_data/all_cca_variables.RData")

# Option to reload and reprocess data
re_load <- 0  # Set to 1 to reprocess data, 0 to use saved results
if(re_load == 1) {
  # Load and prepare data
  c(scoress, togethers) := prepare_new_for_cca(use_saved = 0, 
                                               use_combined_fit = 1, 
                                               dont_apply_scale = 0)
  
  c(scoress_old_s, togethers_old) := prepare_old_for_cca(use_combined_fit = 1, 
                                                         apply_scale = 1)
  
  scoress <- scoress %>% dplyr::select(-participant_id)
  scoress_old_s <- scoress_old_s %>% dplyr::select(-participant_id)
} else {
  print('Using already processed results')
}

# Run permutation test on combined data
# Adjust number of permutations as needed for final analysis
perm_combined <- permTest(together_combined, scores_combined, 
                          R = 10000, 
                          fun = maxCorProj,
                          permutations = NULL, 
                          nCores = 1,
                          cl = NULL,
                          seed = NULL,
                          standardize = FALSE,
                          method = 'spearman')

# Adjust direction of variables for consistency in results
togethers_old <- -1 * togethers_old
scoress_old_s <- -1 * scoress_old_s

# Run separate analyses and plot
c(all_m, all_s) := run_and_plot_separate(scoress, 
                                         togethers,
                                         scoress_old_s,
                                         togethers_old,
                                         'separate score 3')

# Combine datasets for joint CCA
together_combined <- rbind(togethers_old, togethers)
scores_combined <- rbind(scoress_old_s, scoress)

# Run maximum correlation grid analysis
maxCorGrid(together_combined %>% dplyr::select(-pers, -kaps),
           scores_combined, 
           nCores = 1,
           cl = NULL,
           seed = NULL,
           standardize = FALSE,
           method = 'spearman')

# Run combined CCA analyses with different variable selections
c(model_p, scores) := run_combined(scores_combined,
                                   together_combined,
                                   'combined')

# Function to prepare data for figure generation
prepare_elements_for_cca_figure <- function(all_m, all_s, model_p, scores, 
                                            scores_combined, togethers_combined,
                                            scoress, togethers,
                                            scoress_old_s, togethers_old) {
  
  # Filter for projection results
  all_ss <- all_s %>%
    dplyr::filter(grepl("Proj", Source))
  
  all_ms <- all_m %>%
    dplyr::filter(grepl("Proj", Source))
  
  # Filter scores
  scores <- scores %>%
    dplyr::filter(grepl("Proj", Source))
  
  # Define label mapping for questionnaires and parameters
  label_mapping <- c(
    "beta" = "beta",
    "scale_epsilon_elastic" = "gamma[elasticity]",
    "scale_epsilon_control" = "gamma[control]",
    "kaps" = 'kappa',
    AES_score_z = "Apathy (AES)",
    sds_z = "Self-rating Depression (SDS)",
    oci_z = "Obsessive Compulsive (OCD)",
    soa_z = "Sense of Agency (SOA)",
    stai_z = "Trait Anxiety (STAI)",
    staxi_z = "Trait Anger (STAXI)",
    audit ='Alcohol Use (AUDIT)',
    TEMPS_anxious_z = "TEMPS (anxious)",
    TEMPS_cyc_z = "TEMPS (cyclothymic)",
    TEMPS_depressive_z = "TEMPS (dysthymic)",
    TEMPS_hyper_z = "TEMPS (hyperthymic)",
    TEMPS_irrit_z = "TEMPS (irritable)",
    NPOQ_score_z = "Negative Problem Orientation (NPOQ)",
    eat_z = "Eating Attitude Test (EAT)",
    BIS_z = "Impulsivity (BIS)",
    LSAS_z = "Social anxiety (LSAS)")
  
  # Create output list
  cca_bars <- list(
    combined_model = model_p,
    combined_scores = scores,
    models_separate = all_ms,
    scores_separate = all_ss,
    label_mapping = label_mapping,
    scores_combined = scores_combined,
    togethers_combined = togethers_combined,
    scoress = scoress,
    togethers = togethers,
    scoress_old_s = scoress_old_s,
    togethers_old = togethers_old
  )
  
  # Save the results (use relative path for GitHub)
  save(cca_bars, 
       file = file.path('data/cca_data',
                        paste0('result_1s_cca_materials_', Sys.Date(), '.rds')))
  
  return(cca_bars)
}

# Prepare data for plotting
cca_bars <- prepare_elements_for_cca_figure(
  all_m = all_m,
  all_s = all_s,
  model_p = model_p,
  scores = scores,
  scores_combined = scores_combined,
  togethers_combined = together_combined,
  scoress = scoress,
  togethers = togethers,
  scoress_old_s = scoress_old_s,
  togethers_old = togethers_old
)

# Option to use pre-loaded data
if(exists("pre_loaded") && pre_loaded == 1) {
  print('Loading saved results. Verify this is the correct file.')
  load('data/cca_data/result_1s_cca_plot.rds')
}

# Function to generate CCA figure
generate_cca_figure <- function(cca_bars) {
  # Extract data
  model_p <- cca_bars$combined_scores
  model_p$Value = -model_p$Value
  
  scores <- cca_bars$combined_model
  scores$Value = -scores$Value
  
  all_ms <- cca_bars$models_separate
  all_ms$Value <- ifelse(all_ms$Source == "Loadings Model Proj Old", 
                         all_ms$Value, all_ms$Value)
  
  all_ss <- cca_bars$scores_separate
  all_ss$Value <- ifelse(all_ss$Source == "Loading Scores Proj N Old",
                         all_ss$Value, all_ss$Value)
  
  # Print unique sources for debugging
  print("Unique sources in each dataframe:")
  print(unique(model_p$Source))
  print(unique(scores$Source))
  print(unique(all_ms$Source))
  print(unique(all_ss$Source))
  
  label_mapping <- cca_bars$label_mapping
  
  # Define labels for model parameters
  feature_labels <- c(
    "scale1" = expression(lambda[elasticity~bias]),
    "epsilon1" = expression(epsilon[elasticity~concentration]),
    "scale_epsilon_control" = expression(gamma[control]),
    "beta" = expression(beta),
    "alpha1" = expression(alpha[1]),
    "alpha2" = expression(alpha[2]),
    "alpha3" = expression(alpha[3])
  )
  
  # Create source labels for datasets
  source_labels <- c(
    "Loadings Model Proj" = "Replication",
    "Loadings Model Proj Old" = "Initial",
    "Loading Scores Proj N" = 'Replication',
    "Loading Scores Proj N Old" = 'Initial'
  )
  
  # Define order for questionnaire scores
  desired_order <- c("stai_z", "LSAS_z", "sds_z", 
                     "AES_score_z", "soa_z", "NPOQ_score_z", "oci_z", "BIS_z",
                     "eat_z", "audit", "staxi_z", "TEMPS_anxious_z", 
                     "TEMPS_depressive_z", "TEMPS_hyper_z", "TEMPS_cyc_z", 
                     "TEMPS_irrit_z")
  reversed_order <- rev(desired_order)
  
  # Update Feature factor for proper ordering
  scores$Feature <- factor(scores$Feature, levels = reversed_order)
  
  # Define color palette
  moonrise_colors <- c(
    "olive" = "#008080", 
    "yellow" = "#F4D03F", 
    "beige" = "#D2B48C", 
    "burnt_orange" = "#CC5500",
    "dark_brown" = "#5B4B49"
  )
  
  # Set threshold for small values to improve visualization
  model_p$Value <- ifelse(abs(model_p$Value) < .02, -.03, model_p$Value)
  bar_width <- 0.35
  
  # Create models plot
  models_plot <- ggplot(model_p, aes(x = Feature, y = Value, fill = Source)) +
    geom_bar(stat = "identity", width = 0.53, 
             position = position_dodge(width = 0.8), 
             aes(fill = Source)) +
    geom_hline(yintercept = 0, color = 'black') +
    geom_point(data = all_ms, 
               position = position_dodge(width = 0.2), 
               aes(color = Source), size = 4) +
    scale_fill_manual(values = c("#D3D3D3", "#D3D3D3"), 
                      labels = source_labels,
                      guide = guide_legend(reverse = TRUE)) +
    scale_color_manual(values = c("#000080", "#4682B4"), 
                       labels = source_labels,
                       guide = guide_legend(reverse = TRUE)) +
    scale_x_discrete(labels = feature_labels, 
                     limits = rev(names(feature_labels))) +
    labs(x = "", y = "\n", fill = "Dataset", color = "Dataset") +
    coord_flip(ylim = c(-1, 1)) +
    spec_theme_df +
    theme(
      axis.text.y = element_text(size = 24),
      legend.text = element_text(size = 23),
      legend.title = element_blank()
    ) +
    theme(
      plot.margin = margin(120, 5.5, 120, 5.5, "pt"),
      legend.position = c(.9, 1.25)
    )
  
  # Set threshold for small values in scores data
  scores$Value <- ifelse(abs(scores$Value) < .02, -.01, scores$Value)
  
  # Create scores plot
  scores_plot <- ggplot(scores, aes(x = Feature, y = Value, fill = Source)) +
    geom_bar(stat = "identity", 
             position = position_dodge(width = 0.8), 
             aes(fill = Source)) +
    geom_hline(yintercept = 0, color = 'black') +
    geom_point(data = all_ss, 
               position = position_dodge(width = 0.8), 
               aes(color = Source), size = 4) +
    scale_fill_manual(values = c("#D3D3D3", "#D3D3D3"), 
                      labels = source_labels,
                      guide = guide_legend(reverse = TRUE)) +
    scale_color_manual(values = c("#000080", "#4682B4"), 
                       labels = source_labels,
                       guide = guide_legend(reverse = TRUE)) +
    scale_x_discrete(labels = label_mapping) +
    labs(x = "", y = "\n", fill = "Dataset", color = "Dataset") +
    coord_flip() +
    spec_theme_df +
    theme(
      legend.position = "none",
      axis.text.y = element_text(size = 16)
    )
  
  # Combine plots
  combined_cca_plot <- ggarrange(scores_plot, models_plot, 
                                 nrow = 1, ncol = 2, 
                                 widths = c(1.25, 1))
  
  # Save plots to file (use relative path for GitHub)
  output_dir <- 'figures/cca/'
  # Create directory if it doesn't exist
  dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)
  
  png(paste0(output_dir, 'models_cca_plot.png'), 
      width = 14, height = 9, units = "in", res = 500)
  print(combined_cca_plot)
  dev.off()
  
  # Save results including plots
  fig_cca_1 <- list(
    combined_cca_plot = combined_cca_plot,
    scores_plot = scores_plot,
    models_plot = models_plot,
    cca_bars = cca_bars
  )
  
  save(fig_cca_1, 
       file = 'data/cca_data/result_1_cca_plot_including_plot_itself.rds')
  
  print('Plots generated and saved successfully')
  return(fig_cca_1)
}

# Generate the figure
fig <- generate_cca_figure(cca_bars)