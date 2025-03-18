# ============================================================================
# CCA Analysis Functions for Control Studies
# ============================================================================

library(dplyr)
library(tidyr)
library(ggplot2)
library(ggpubr)
library(ccaPP)

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

#' Prepare data for CCA analysis
#' 
#' @param modelst Model parameters data frame
#' @param scores Questionnaire scores data frame
#' @param replication Boolean indicating replication data (1) or original data (0)
#' @param separate Boolean indicating whether to use separate parameters (1) or combined (0)
#' @return List containing scaled scores, model parameters, and participant IDs
prepare_cca <- function(modelst, scores, replication = 1, separate = 0) {
  print('Removing duplicates')
  modelst <- modelst %>% distinct()
  scores <- scores %>% distinct()
  
  # Create derived parameters and join datasets
  if (replication == 1) {
    print('Processing replication dataset')
    # Extract scale and epsilon parameters, calculate derived parameters
    scaless <- modelst %>%
      dplyr::select(matches('^(id|scale|epsilon|beta)')) %>%
      dplyr::mutate(
        scale_epsilon_elastic = ((scale1 - 0.5) * log(1 + epsilon1)),
        scale_epsilon_control = ((scale3 - 0.5) * log(1 + epsilon2))
      )
    
    # Ensure unique participant IDs
    scores <- scores %>% distinct(id, .keep_all = TRUE)
    scaless <- scaless %>% distinct(id, .keep_all = TRUE)
    
    # Join datasets and handle missing values
    merge_data <- left_join(scores, scaless, by = 'id')
    merge_data <- merge_data %>% drop_na()
    part <- merge_data %>% dplyr::select(id)
  } else {
    print('Processing original dataset')
    # Process original dataset with different ID key
    scaless <- modelst %>%
      dplyr::select(matches('^(participant|scale|epsilon|beta)')) %>%
      dplyr::mutate(
        scale_epsilon_elastic = ((scale1 - 0.5) * log(1 + epsilon1)),
        scale_epsilon_control = ((scale3 - 0.5) * log(1 + epsilon2))
      )
    
    # Ensure unique participant IDs
    scores <- scores %>% distinct(participant, .keep_all = TRUE)
    scaless <- scaless %>% distinct(participant, .keep_all = TRUE)
    
    # Join datasets and handle missing values
    merge_data <- left_join(scores, scaless, by = 'participant')
    merge_data <- merge_data %>% drop_na()
    part <- merge_data %>% dplyr::select(participant)
  }
  
  # Extract relevant columns
  scores <- merge_data %>% dplyr::select(colnames(scores))
  scales_onlys <- merge_data %>% dplyr::select(colnames(scaless))
  
  # Select model parameters based on mode
  if (separate == 0) {
    # Use derived parameters
    togethers <- scales_onlys %>% dplyr::select(matches('^(scale_epsilon|beta)'))
  } else {
    # Use original parameters
    togethers <- scales_onlys %>% dplyr::select(beta, scale1, scale3, epsilon1, epsilon2)
  }
  
  # Remove non-score columns
  scoress <- scores %>% 
    dplyr::select(-any_of(c("date", "perf.y")))
  
  # Scale parameters
  togethers$beta <- (togethers$beta - mean(togethers$beta)) / sd(togethers$beta)
  togethers$scale_epsilon_elastic <- (togethers$scale_epsilon_elastic - mean(togethers$scale_epsilon_elastic)) / sd(togethers$scale_epsilon_elastic)
  togethers$scale_epsilon_control <- scale(togethers$scale_epsilon_control)
  
  return(list(scoress, togethers, part))
}

#' Prepare data from replication study for CCA
#' 
#' @param use_saved Boolean indicating whether to use saved data
#' @param use_combined_fit Boolean indicating whether to use combined fit model
#' @param dont_apply_scale Boolean indicating whether to skip scaling
#' @return List containing scores, model parameters, and participant IDs
prepare_new_for_cca <- function(use_saved = 0, use_combined_fit = 1, dont_apply_scale = 0) {
  # Load the data (paths should be modified to use relative paths)
  data_path <- "data/data_replication/no_add_256.rds"
  model_path <- ifelse(use_combined_fit == 1, 
                       "data/models/ss1/ss1.csv", 
                       "data/models/s1/s1.csv")
  score_path <- "data/scores/scores_v12.csv"
  
  # Load data
  load(data_path)
  model1 <- read.csv(model_path)
  scores <- read.csv(score_path)
  
  # Clean and prepare data
  model1$id <- model1$subject
  scores <- scores[, -1]  # Remove first column
  
  # Apply scaling if needed
  if (dont_apply_scale == 0) {
    scores <- apply_scaled(scores, 1)
  }
  
  # Prepare for CCA
  results <- prepare_cca(model1, scores, 1, 0)
  return(results)
}

#' Prepare data from original study for CCA
#' 
#' @param use_combined_fit Boolean indicating whether to use combined fit model
#' @param apply_scale Boolean indicating whether to apply scaling
#' @return List containing scores, model parameters, and participant IDs
prepare_old_for_cca <- function(use_combined_fit = 1, apply_scale = 1) {
  # Load the data (paths should be modified to use relative paths)
  score_path <- "data/interim/score_df.csv"
  model_path <- "data/model_27_fits.csv"
  
  # Load data
  score_df_old <- read.csv(score_path)
  model_old <- read.csv(model_path)
  
  # Apply scaling if needed
  if (apply_scale == 1) {
    score_old_raw <- apply_scaled(score_df_old, 0, 1)
  } else {
    score_old_raw <- score_df_old
  }
  
  # Prepare for CCA
  results <- prepare_cca(model_old, score_old_raw, 0, 0)
  return(results)
}

# ============================================================================
# PERMUTATION TEST FUNCTIONS
# ============================================================================

#' Run elasticity permutation test
#' 
#' @param scores Questionnaire scores data frame
#' @param togethers Model parameters data frame
#' @param n_permutations Number of permutations to run
#' @return Vector of permutation results
run_elasticity_perm <- function(scores, togethers, n_permutations) {
  perm_diffs <- numeric(n_permutations)  # Initialize vector
  set.seed(342)  
  
  for(i in 1:n_permutations) {
    # Shuffle only the scale_epsilon_elastic column
    permuted_scale_epsilon_elastic <- sample(togethers$scale_epsilon_elastic)
    
    # Replace the original column with the permuted one
    permuted_togethers <- togethers
    permuted_togethers$scale_epsilon_elastic <- permuted_scale_epsilon_elastic
    
    # Perform CCA with the permuted dataset
    ccas_perm <- permTest(
      permuted_togethers %>% dplyr::select(-pers, -kaps),
      scores, 
      R = 1,
      fun = maxCorGrid,
      permutations = NULL, 
      nCores = 1,
      cl = NULL,
      seed = NULL,
      standardize = FALSE,
      method = 'spearman'
    )$cor
    
    # Store the correlation from the permutation
    perm_diffs[i] <- ccas_perm
    print(max(perm_diffs))
  }
  
  return(perm_diffs)
}

#' Run SoA permutation test
#' 
#' @param scores_old Questionnaire scores data frame
#' @param togethers_old Model parameters data frame
#' @param n_permutations Number of permutations to run
#' @return List of permutation results and statistics
run_soa_z_perm <- function(scores_old, togethers_old, n_permutations = 1000) {
  # Step 1: Calculate observed canonical correlation with all variables
  cca_full <- ccaPP::maxCorGrid(togethers_old, scores_old, method = "spearman", standardize = FALSE)
  cor_full <- cca_full$cor
  
  # Step 2: Calculate observed canonical correlation without soa_z
  scores_without_soa <- scores_old[, !colnames(scores_old) %in% "soa_z", drop = FALSE]
  cca_reduced <- ccaPP::maxCorGrid(togethers_old, scores_without_soa, method = "spearman", standardize = FALSE)
  cor_reduced <- cca_reduced$cor
  
  # Calculate observed difference
  observed_diff <- cor_full - cor_reduced
  
  # Step 3: Perform permutation test
  perm_diffs <- numeric(n_permutations)
  set.seed(342)
  
  for (i in 1:n_permutations) {
    # Create a permuted dataset with shuffled soa_z
    permuted_scores <- scores_old
    permuted_scores$soa_z <- sample(scores_old$soa_z)
    
    # Calculate canonical correlation with permuted soa_z
    cca_perm_full <- ccaPP::maxCorGrid(togethers_old, permuted_scores, method = "spearman", standardize = FALSE)
    cor_perm_full <- cca_perm_full$cor
    
    # Calculate canonical correlation without soa_z (should be the same as cor_reduced)
    cca_perm_reduced <- ccaPP::maxCorGrid(togethers_old, scores_without_soa, method = "spearman", standardize = FALSE)
    cor_perm_reduced <- cca_perm_reduced$cor
    
    # Calculate the difference in the permuted dataset
    perm_diffs[i] <- cor_perm_full - cor_perm_reduced
    
    # Print progress
    if (i %% 50 == 0 || i == 1) {
      cat(sprintf("Permutation %d of %d completed\n", i, n_permutations))
    }
  }
  
  # Step 4: Calculate p-value (two-tailed test)
  if (observed_diff >= 0) {
    p_value <- sum(perm_diffs >= observed_diff) / n_permutations
  } else {
    p_value <- sum(perm_diffs <= observed_diff) / n_permutations
  }
  
  # Create result object
  result <- list(
    observed_diff = observed_diff,
    cor_full = cor_full,
    cor_reduced = cor_reduced,
    perm_diffs = perm_diffs,
    p_value = p_value,
    ci_95 = quantile(perm_diffs, c(0.025, 0.975)),
    mean_diff = mean(perm_diffs),
    sd_diff = sd(perm_diffs)
  )
  
  # Print summary
  cat("\n==== Permutation Test Results ====\n")
  cat(sprintf("Observed correlation with soa_z: %.4f\n", cor_full))
  cat(sprintf("Observed correlation without soa_z: %.4f\n", cor_reduced))
  cat(sprintf("Observed difference: %.4f\n", observed_diff))
  cat(sprintf("Mean permuted difference: %.4f\n", mean(perm_diffs)))
  cat(sprintf("95%% CI of permuted differences: [%.4f, %.4f]\n", 
              result$ci_95[1], result$ci_95[2]))
  cat(sprintf("p-value: %.4f\n", p_value))
  
  # Create a histogram for visualization if graphics is available
  if (requireNamespace("graphics", quietly = TRUE)) {
    graphics::hist(perm_diffs, breaks = 30, 
                   main = "Histogram of Permuted Differences",
                   xlab = "Correlation Difference (with - without soa_z)")
    graphics::abline(v = observed_diff, col = "red", lwd = 2)
    graphics::legend("topright", legend = "Observed difference", 
                     col = "red", lwd = 2)
  }
  
  return(result)
}

# ============================================================================
# VISUALIZATION FUNCTIONS
# ============================================================================

#' Plot permutation test results
#' 
#' @param data_to_plot Data frame with permutation results
#' @param perms List of permutation information
#' @return ggplot object with permutation visualization
plot_perm <- function(data_to_plot, perms) {
  # Calculate bounds
  bounds_set_1 <- quantile(perms$perms1, probs = c(0.025, 0.975))
  bounds_set_2 <- quantile(perms$perms2, probs = c(0.025, 0.975))
  
  # Define theme
  spec_theme_df <- theme(
    panel.grid.major = element_blank(),
    panel.grid.minor = element_blank(),
    panel.background = element_blank(),
    axis.line = element_line(colour = "black"),
    axis.text = element_text(size = 24),
    axis.title = element_text(size = 29),
    legend.text = element_text(size = 34),
  )
  
  # Create plot
  basic_perm_test <- ggplot(data_to_plot, aes(x = value, fill = set)) +
    geom_density(alpha = 0.55, color = NA) +
    labs(x = " ", y = "") +
    geom_segment(aes(x = bounds_set_1[1], xend = bounds_set_1[2], y = .15, yend = .15), 
                 color = "#FFA500", size = 4) +
    geom_segment(aes(x = bounds_set_2[1], xend = bounds_set_2[2], y = .5, yend = .5), 
                 color = "#008000", size = 5) +
    scale_x_continuous(limits = c(0.17, 0.52)) +
    scale_y_continuous(expand = c(0, 0)) +
    spec_theme_df + 
    theme(
      axis.line.y = element_blank(),
      axis.line.x = element_blank(),
      axis.ticks.y = element_blank(),
      axis.text.y = element_blank(),
      axis.title.x = element_text(size = 32),
      legend.text = element_text(size = 38)
    ) +
    scale_fill_manual(name = '', values = c("#FFA500", "#008000")) +
    guides(fill = guide_legend(override.aes = list(shape = c(NA, NA)))) +
    geom_point(aes(x = perms$cor_new, y = .95), fill = '#008000', color = '#008000', size = 10) +
    geom_point(aes(x = perms$cor_old, y = .30), fill = '#FFA500', color = '#FFA500', size = 10) 
  
  return(basic_perm_test)
}

#' Extract composite scores from CCA results
#' 
#' @param scores_combined Questionnaire scores data frame
#' @param ccas_combined CCA results
#' @param id Participant IDs
#' @param rep Boolean indicating replication data (1) or original data (0)
#' @return Data frame with composite scores
extract_composite <- function(scores_combined, ccas_combined, id, rep) {
  # Remove ID columns from scores
  scores_combined <- scores_combined %>%  
    dplyr::select(-any_of(c("participant", "id", "dataset", "group")))
  
  # Calculate composite scores by multiplying data matrix by canonical weights
  scoret_combined <- (as.matrix(scores_combined) %*% (-1 * ccas_combined$A))
  
  # Add ID column to results
  if (rep == 1) {
    m_combined <- data.frame(score = scoret_combined, id = id)
  } else {
    m_combined <- data.frame(score = scoret_combined, participant = id)
  }
  
  return(m_combined)
}

#' Get composite score relationship with behavior
#' 
#' @param data_repst Behavioral data
#' @param composite_behavior Composite scores
#' @param old Boolean indicating original data (1) or replication data (0)
#' @return List with confidence intervals and model results
get_composite <- function(data_repst, composite_behavior, old = 0) {
  # Prepare behavioral data
  data_repst <- return_combined_ev(data_repst)
  
  data_repst1 <- data_repst %>% 
    dplyr::filter(trials > 4, block > 6) 
  
  data_repst12 <- summarise_data(data_repst1, 1, c(15, 30), 1 - old)
  data_repst12 <- data_repst12 %>% dplyr::filter(N.x == 15)
  
  # Arrange data differently based on dataset
  if (old == 0) {
    data_repst12 <- pivot_wider(data_repst12, 
                                id_cols = id, 
                                names_from = opt_actions, 
                                values_from = c(opt_in_mean, extra_actions_mean),
                                names_glue = "{.value}_{opt_actions}")
    data_repst12 <- data_repst12 %>% drop_na()
    composite_behaviors2 <- left_join(composite_behavior, data_repst12, by = 'id')
  } else {
    data_repst12 <- pivot_wider(data_repst12, 
                                id_cols = participant, 
                                names_from = opt_actions, 
                                values_from = c(opt_in_mean, extra_actions_mean),
                                names_glue = "{.value}_{opt_actions}")
    composite_behaviors2 <- left_join(composite_behavior, data_repst12, by = 'participant')
  }
  
  # Calculate elasticity metrics and scale variables
  data_repst12 <- data_repst12 %>% 
    dplyr::mutate(
      ex1_ex3 = extra_actions_mean_3 - extra_actions_mean_1,
      opt1_opt_3 = opt_in_mean_3 - opt_in_mean_1
    )
  
  composite_behaviors2 <- composite_behaviors2 %>% 
    dplyr::mutate(across(where(is.numeric), scale))
  
  # Run models and get confidence intervals
  x <- confint(lm(ex1_ex3 ~ score, data = composite_behaviors2))
  o <- confint(lm(opt1_opt_3 ~ score, data = composite_behaviors2))
  
  return(list(x, o, composite_behaviors2))
}

#' Generate CCA figure
#' 
#' @param cca_bars List with CCA results
#' @return List with plot objects
generate_cca_figure <- function(cca_bars) {
  # Extract data
  model_p <- cca_bars$combined_scores
  model_p$Value <- -model_p$Value
  
  scores <- cca_bars$combined_model
  scores$Value <- -scores$Value
  
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
  
  # Define theme
  spec_theme_df <- theme(
    panel.grid.major = element_blank(),
    panel.grid.minor = element_blank(),
    panel.background = element_blank(),
    axis.line = element_line(colour = "black"),
    axis.text = element_text(size = 24),
    axis.title = element_text(size = 29)
  )
  
  # Set threshold for small values to improve visualization
  model_p$Value <- ifelse(abs(model_p$Value) < .02, -.03, model_p$Value)
  
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
      legend.title = element_blank(),
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
  
  # Create output list
  fig_cca_1 <- list(
    combined_cca_plot = combined_cca_plot,
    scores_plot = scores_plot,
    models_plot = models_plot,
    cca_bars = cca_bars
  )
  
  return(fig_cca_1)
}
