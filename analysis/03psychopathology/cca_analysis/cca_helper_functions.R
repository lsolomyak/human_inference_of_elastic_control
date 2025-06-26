library(ccaPP)
library(dplyr)
library(tidyr)
library(ggplot2)
library(ggpubr)
library(readr)
library(data.table)

# Define project paths (update these paths based on your repository structure)
# Define project paths with absolute paths
ROOT_DIR <- "/Users/levisolomyak/Documents/GitHub/human_inference_of_elastic_control"
DATA_DIR <- file.path(ROOT_DIR, "analysis/02computational_modeling/posterior_sim/fits_for_sim")
RESULTS_DIR <- file.path(ROOT_DIR, "results/figures")
setwd(file.path(ROOT_DIR))
#' Calculate optimal actions and expected values
#'
#' @param data Dataframe with behavioral data
#' @param pre_opt Pre-optimization flag (default: 1)
#' @return Dataframe with added expected value columns and optimal actions
return_combined_ev <- function(data, pre_opt = 1) {
  # Note: This function depends on get_ev_new which should be defined elsewhere
  # The implementation below matches the provided code snippet
  
  pre_opt = 1
  print("getting max ev")
  
  data <- data %>% dplyr::mutate(
    ev_0 = get_ev_new(c_inelastic, c_elastic, 0, pre_opt),
    ev1 = get_ev_new(c_inelastic, c_elastic, 1, pre_opt),
    ev2 = get_ev_new(c_inelastic, c_elastic, 2, pre_opt),
    ev3 = get_ev_new(c_inelastic, c_elastic, 3, pre_opt)
  )
  
  setDT(data)
  data[, max_ev := pmax(ev_0, ev1, ev2, ev3)]
  
  data <- data %>% dplyr::mutate(opt_actions = case_when(
    max_ev == ev_0 ~ 0,
    max_ev == ev1 ~ 1,
    max_ev == ev3 ~ 3,
    TRUE ~ 2
  ))
  
  return(data)
}

# Note: The get_ev_new function is not provided in the original code
# This should be implemented based on the actual function definition

# Create results directory if it doesn't exist

#' Extract composite scores from CCA analysis
#'
#' @param scores_combined Combined scores dataframe
#' @param ccas_combined CCA results
#' @param id Participant IDs
#' @param rep Replication flag (1 for first dataset, 0 for second)
#' @return Dataframe with composite scores
extract_composite <- function(scores_combined, ccas_combined, id, rep) {
  scores_combined <- scores_combined %>% dplyr::select(-dataset)
  
  if(rep == 1) {
    scoret_combined <- (as.matrix(scores_combined %>% dplyr::select(-any_of(c("participant", "id")))) %*% 
                          (-1 * ccas_combined$A))
    m_combined <- data.frame(score = scoret_combined, id = id)
  } else {
    scoret_combined <- as.matrix(scores_combined %>% dplyr::select(-any_of(c("participant", "id")))) %*% 
      ccas_combined$A
    m_combined <- data.frame(score = scoret_combined, participant = id)
  }
  
  return(m_combined)
}

#' Scale questionnaire scores based on number of items
#'
#' @param score_df Dataframe with questionnaire scores
#' @param replication Replication flag (1 for second dataset, 0 for first)
#' @return Dataframe with scaled scores
apply_scaled <- function(score_df, replication) {
  # Calculate square roots for scaling
  npoq_sq <- sqrt(10 * 5)
  soa_sq <- sqrt(13 * 7)
  stai_sq <- sqrt(10 * 4)
  oci_sq <- sqrt(11 * 5)
  LSAS_sq <- sqrt(13 * 4)
  sds_sq <- sqrt(8 * 4)
  BIS_sq <- sqrt(10 * 4)
  eat_sq <- sqrt(4 * 4)
  AES_sq <- sqrt(4 * 4)
  staxi_sq <- sqrt(10 * 4)
  TEMPS_cyclothymic <- sqrt(12 * 2)
  TEMPS_depressive <- sqrt(8 * 2)
  TEMPS_irrit <- sqrt(8 * 2)
  TEMPS_anxious <- sqrt(3 * 2)
  TEMPS_hyper <- sqrt(8 * 2)
  
  # Create scaled scores
  results_df <- data.frame(
    TEMPS_cyc_z = scale(score_df$TEMPS_cyclothymic_score) * TEMPS_cyclothymic,
    TEMPS_hyper_z = scale(score_df$TEMPS_hyperthymi_score) * TEMPS_hyper,
    TEMPS_anxious_z = scale(score_df$TEMPS_anxious_score) * TEMPS_anxious,
    TEMPS_irrit_z = scale(score_df$TEMPS_irritable_score) * TEMPS_irrit,
    TEMPS_depressive_z = scale(score_df$TEMPS_depressive_score) * TEMPS_depressive,
    audit = scale(score_df$AUDIT_score),
    LSAS_z = scale(score_df$LSAS_score) * LSAS_sq,
    oci_z = scale(score_df$OCI_score) * oci_sq,
    eat_z = scale(score_df$EAT_score) * eat_sq,
    soa_z = scale(score_df$SoA_score) * soa_sq,
    sds_z = scale(score_df$SDS_score) * sds_sq,
    staxi_z = scale(score_df$STAXI_score) * staxi_sq,
    stai_z = scale(score_df$STAI_score) * stai_sq,
    BIS_z = scale(score_df$BIS_score) * BIS_sq,
    NPOQ_score_z = scale(score_df$NPOQ_score) * npoq_sq,
    AES_score_z = scale(score_df$AES_score) * AES_sq
  )
  
  if(replication == 1) {
    results_df$participant_id <- as.character(score_df$id)
  } else if(replication == 0) {
    results_df$participant_id <- as.character(score_df$participant)
  }
  
  return(results_df)
}

#' Prepare data for CCA analysis
#'
#' @param modelst Model parameters dataframe
#' @param scores Questionnaire scores dataframe
#' @param replication Replication flag (1 for second dataset, 0 for first)
#' @param separate Whether to use separate model parameters (1) or composite (0)
#' @return List with prepared data for CCA
prepare_cca <- function(modelst, scores, replication, separate) {
  # Remove duplicates
  modelst <- modelst %>% distinct()
  scores <- scores %>% distinct()
  
  # Create the model parameter transformations
  if(replication == 1) {
    scaless <- modelst %>%
      dplyr::select(matches('^(participant_id|scale|epsilon|beta|alpha)')) %>%
      dplyr::mutate(
        scale_epsilon_elastic = ((scale1 - 0.5) * epsilon1),
        scale_epsilon_control = ((scale3 - 0.5) * epsilon2)
      )
    
    scores <- scores %>% distinct(participant_id, .keep_all = TRUE)
    scaless <- scaless %>% distinct(participant_id, .keep_all = TRUE)
    merge_data <- left_join(scores, scaless, by = 'participant_id')
    merge_data <- merge_data %>% drop_na()
    part <- merge_data %>% dplyr::select(participant_id)
  } else {
    scaless <- modelst %>%
      dplyr::select(matches('^(participant_id|scale|epsilon|beta|alpha|elasticity_use)')) %>%
      dplyr::mutate(
        scale_epsilon_elastic = ((scale1 - 0.5) * epsilon1),
        scale_epsilon_control = ((scale3 - 0.5) * epsilon2)
      )
    
    scaless <- scaless %>% distinct(participant_id, .keep_all = TRUE)
    merge_data <- left_join(scores, scaless, by = 'participant_id')
    merge_data <- merge_data %>% drop_na()
    part <- merge_data %>% dplyr::select(participant_id)
  }
  
  # Extract scores and model parameters
  scores <- merge_data %>% dplyr::select(colnames(scores))
  scales_onlys <- merge_data %>% dplyr::select(colnames(scaless))
  
  if(separate == 0) {
    togethers <- scales_onlys %>% 
      dplyr::select(matches('^(scale_epsilon|beta|pers|alpha|elasticity_use)'))
  } else {
    togethers <- scales_onlys %>% 
      dplyr::select(matches('^(scale|epsilon|beta|alpha)')) %>% 
      dplyr::select(-matches('^(scale_epsilon_elastic|scale3|epsilon2)'))
  }
  
  scoress <- scores %>% 
    dplyr::select(-any_of(c("date", "participant", "id", "perf.y")))
  
  # Standardize parameters
  togethers <- togethers %>%
    dplyr::mutate(across(everything(), scale))
  
  return(list(scoress, togethers, part))
}

#' Prepare first dataset for CCA
#'
#' @param use_combined_fit Whether to use combined fit (1) or separate (0)
#' @param apply_scale Whether to apply scaling (1) or not (0)
#' @param separate Whether to use separate model parameters (1) or composite (0)
#' @return List with prepared data for CCA
prepare_old_for_cca <- function(use_combined_fit = 0, apply_scale = 1, separate = 1) {
  print('preparing first dataset')
  
  # Load scores
  library(here)
  score_old <- read.csv(file.path(ROOT_DIR ,'data', 'questionnaires', 'processed', 'scores_group1_31_3_24.csv'))
  score_old <- score_old[, -1]  
  
  if(apply_scale == 0) {
    score_df_old <- score_old %>% 
      dplyr::mutate(across(-participant, ~if(is.numeric(.)) scale(.) else .))
    score_df_old$participant_id <- as.character(score_df_old$participant)
  } else {
    score_df_old <- apply_scaled(score_old, 0)
  }
  
  # Load model parameters
  if(use_combined_fit == 1) {
    model_combined <- read_csv(file.path(DATA_DIR, 'e_c_star.csv'))
    
    model_combined <- model_combined %>%
      dplyr::mutate(dataset = ifelse(grepl("[a-zA-Z]", participant), 2, 1))
    model_combined$participant_id <- model_combined$participant
    model_old <- model_combined %>% dplyr::filter(dataset == 1) 
    model_old$participant <- as.numeric(model_old$participant)
  } else {
    model_old <- read.csv(file.path(DATA_DIR, 'group1/c_1.csv'))
    nc_old <- read.csv(file.path(DATA_DIR, 'group1/nc_1.csv'))
    model_old <- model_old %>% dplyr::rename(m1_evidence = evidence)
    model_old <- left_join(model_old, nc_old %>% dplyr::select(participant, evidence), by = 'participant')
    model_old <- model_old %>% 
      dplyr::mutate(elasticity_use = m1_evidence - evidence) %>% 
      dplyr::select(-m1_evidence, -evidence)
  }
  
  # Prepare data for CCA
  result <- prepare_cca(model_old, score_df_old, 0, separate=0)
  scoress_old_s <- result[[1]]
  togethers_old <- result[[2]]
  part <- result[[3]]
  
  return(list(scoress_old_s, togethers_old, part))
}

#' Prepare second dataset for CCA
#'
#' @param use_saved Whether to use saved scores (1) or recalculate (0)
#' @param use_combined_fit Whether to use combined fit (1) or separate (0)
#' @param dont_apply_scale Whether to not apply scaling (1) or apply it (0)
#' @param separate Whether to use separate model parameters (1) or composite (0)
#' @return List with prepared data for CCA
prepare_new_for_cca <- function(use_saved = 0, use_combined_fit = 0, dont_apply_scale = 0, separate = 0) {
  # Load model parameters
  if(use_combined_fit == 1) {
    model_combined <- read_csv(file.path(DATA_DIR, 'e_c_star.csv'))
    
    model_combined <- model_combined %>%
      dplyr::mutate(dataset = ifelse(grepl("[a-zA-Z]", participant), 2, 1))
    
    model1 <- model_combined %>% dplyr::filter(dataset == 2)
    model1$participant_id <- as.character(model1$participant)
    model1$participant <- as.character(model1$participant_id)
  } else {
    print('using separate fit')
    model1 <- read_csv(file.path(DATA_DIR, 'group2/c_02.csv'))
    nc_new <- read.csv(file.path(DATA_DIR, 'group2/nc_02.csv'))
    model1 <- model1 %>% dplyr::rename(m1_evidence = evidence)
    model1 <- left_join(model1, nc_new %>% dplyr::select(participant, evidence), by = 'participant')
    model1 <- model1 %>% 
      dplyr::mutate(elasticity_use = m1_evidence - evidence) %>% 
      dplyr::select(-m1_evidence, -evidence)
    model1 <- model1 %>% dplyr::mutate(participant_id = participant)
  }
  
  # Load and prepare scores
  if(use_saved) {
    scores_df <- read.csv(file.path(ROOT_DIR,'data', 'questionnaires', 'processed', 'scores_group1_31_3_24.csv'))
    scoress_df <- scoress_df %>% distinct(id, .keep_all = TRUE)
    result <- prepare_cca(model1, scoress_df, 1, 0)
    scoress <- result[[1]]
    togethers <- result[[2]]
    part <- result[[3]]
  } else {
    #scores <- read.csv('data/questionnaires/processed/scores_group2_31_3_24.csv')
    scores <-read.csv(file.path(ROOT_DIR,'data', 'questionnaires', 'processed', 'scores_group2_31_3_24.csv'))
    
    scores <- scores[, -1]
    scores$participant_id <- scores$id
    
    if(dont_apply_scale == 1) {
      scores <- scores %>% 
        dplyr::mutate(across(where(is.numeric), scale))
    } else {
      scores <- apply_scaled(scores, 1)
    }
    
    result <- prepare_cca(model1, scores, 1, separate)
    scoress <- result[[1]]
    togethers <- result[[2]]
    part <- result[[3]]
  }
  
  return(list(scoress, togethers, part))
}

#' Prepare local data for CCA
#'
#' @param score_df Scores dataframe
#' @param all_model Model parameters dataframe
#' @return List with prepared data for CCA
prep_local <- function(score_df, all_model) {
  scaless <- all_model %>% 
    dplyr::select(matches('^(id|scale|epsilon|beta)')) %>%
    dplyr::mutate(
      scale_epsilon_elastic = ((scale1 - 0.5) * log(1 + epsilon1)),
      scale_epsilon_control = ((scale3 - 0.5) * log(1 + epsilon2))
    )
  
  score_df <- score_df %>% distinct(id, .keep_all = TRUE)
  merge_data <- left_join(score_df, scaless, by = 'id')
  merge_data <- merge_data %>% drop_na()
  
  scoress <- merge_data %>% dplyr::select(colnames(score_df))
  scoress <- apply_scaled(scoress, 1)
  
  scales_onlys <- merge_data %>% dplyr::select(colnames(scaless))
  scoress <- scoress %>% 
    dplyr::select(-any_of(c("date", "participant", "id", "perf.y"))) 
  togethers <- scales_onlys %>% dplyr::select(scale_epsilon_control, scale_epsilon_elastic, beta)
  
  return(list(scoress, togethers))
}

#' Convert matrix to long format dataframe for plotting
#'
#' @param matrix_data Matrix data
#' @param source_name Source name for identification
#' @return Long format dataframe
matrix_to_long_df <- function(matrix_data, source_name) {
  df <- as.data.frame(matrix_data) %>%
    mutate(Variable = rownames(.)) %>%
    pivot_longer(cols = -Variable, names_to = "Feature", values_to = "Value") %>%
    mutate(Source = source_name)
  return(df)
}

#' Renormalize loadings by standard deviation
#'
#' @param scoress Scores dataframe
#' @param cca_proj CCA projection
#' @return Renormalized loadings
renormalize_sd <- function(scoress, cca_proj) {
  sd_rep <- apply(scoress, 2, sd)
  loadings_scoredf <- t(cca_proj$A)
  colnames(loadings_scoredf) <- colnames(scoress)
  
  sd_rep_vector <- as.vector(sd_rep)
  names(sd_rep_vector) <- names(sd_rep)
  
  scaled_loadings <- sweep(loadings_scoredf, 2, sd_rep_vector, `*`)
  
  return(scaled_loadings)
}

#' Plot CCA results
#'
#' @param all_loadings_model Model loadings
#' @param all_loading_scores Score loadings
#' @param tit Title for the plot
#' @return None (produces a plot)
plot_ccas <- function(all_loadings_model, all_loading_scores, tit) {
  # Plot score loadings
  scores_pl <- ggplot(all_loading_scores, aes(x = Feature, y = Value, fill = Source)) +
    geom_bar(stat = "identity", position = "dodge") +
    facet_wrap(~ Source, ncol = 1, scales = "free_x") +
    coord_flip() +
    theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
    theme_classic() +
    theme(legend.position = "none") +
    labs(title = "Questionnaires", x = NULL, y = "Value")
  
  # Plot model loadings
  models_pl <- ggplot(all_loadings_model, aes(x = Feature, y = Value, fill = Source)) +
    geom_bar(stat = "identity", position = "dodge") +
    facet_wrap(~ Source, ncol = 1, scales = "free_x") +
    coord_flip() +
    theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
    theme_classic() +
    theme(legend.position = "none")
  
  # Combine plots
  co_plot <- ggarrange(scores_pl, models_pl, nrow = 1)
  
  # Save plot
  png(file.path(RESULTS_DIR, paste0(tit, '_co_plot.png')), width = 12, height = 12, units = "in", res = 400)
  print(co_plot)
  dev.off()
  
  print('plotted successfully')
}

#' Run CCA and plot results
#'
#' @param modelst Model parameters dataframe
#' @param scores Questionnaire scores dataframe
#' @param separate Whether to use separate model parameters (1) or composite (0)
#' @param tit Title for the plot
#' @param replication Replication flag (1 for second dataset, 0 for first)
#' @return List with CCA results
run_cca <- function(modelst, scores, separate = 1, tit, replication = 1) {
  modelst <- modelst %>% distinct()
  scores <- scores %>% distinct()
  
  if(replication == 1) {
    scaless <- modelst %>% 
      dplyr::select(matches('^(id|scale|epsilon|beta)')) %>%
      dplyr::mutate(
        scale_epsilon_elastic = ((scale1 - 0.5) * epsilon1),
        scale_epsilon_control = ((scale3 - 0.5) * epsilon2)
      ) 
    merge_data <- left_join(scores, scaless, by = 'id')
  } else {
    scaless <- modelst %>% 
      dplyr::select(matches('^(participant|scale|epsilon|beta)')) %>%
      dplyr::mutate(
        scale_epsilon_elastic = ((scale1 - 0.5) * epsilon1),
        scale_epsilon_control = ((scale3 - 0.5) * epsilon2)
      ) 
    merge_data <- left_join(scores, scaless, by = 'participant')
  }
  
  merge_data <- merge_data %>% drop_na()
  
  scores <- merge_data %>% dplyr::select(colnames(scores))
  scales_onlys <- merge_data %>% dplyr::select(colnames(scaless))
  
  if(separate == 0) {
    togethers <- scales_onlys %>% dplyr::select(scale_epsilon_control, scale_epsilon_elastic, beta)
  } else {
    togethers <- scales_onlys %>% dplyr::select(scale1, scale3, epsilon1, epsilon2, beta)
  }
  
  scoress <- scores %>% 
    dplyr::select(-any_of(c("date", "participant", "id", "perf.y"))) 
  
  togethers <- togethers %>%
    dplyr::mutate(across(everything(), scale))
  
  # Run CCA
  ccas <- ccaPP::CCAproj(scoress, togethers, k = 1, method = 'spearman', standardize = FALSE)
  
  # Extract loadings
  loadings_scoredf <- t(ccas$A)
  loadings_scale <- t(ccas$B)
  
  # Calculate composite scores
  composite <- list()
  composite$quest_score <- as.matrix(scoress) %*% ccas$A
  composite$model_score <- as.matrix(togethers) %*% ccas$B
  
  composite <- as.data.frame(composite)
  
  # Name loadings
  colnames(loadings_scoredf) <- colnames(scoress)
  colnames(loadings_scale) <- colnames(togethers)
  combined <- cbind(loadings_scoredf, loadings_scale)
  
  loadings_df <- as.data.frame(t(combined))
  loadings_df$variable <- rownames(loadings_df)
  colnames(loadings_df) <- c("value", "variable")
  
  # Plot loadings
  plot_ccas(loadings_scale, loadings_scoredf, 'combined_c')
  
  # Run permutation test
  perm <- ccaPP::permTest(scoress, togethers, R = 1, fun = ccaPP::maxCorGrid, 
                          permutations = NULL, nCores = 1, cl = NULL, seed = NULL, 
                          standardize = TRUE)
  
  # Calculate Pearson correlation
  pears <- cor(composite$quest_score, composite$model_score, method = "pearson")
  
  return(list(pears, ccas, composite, perm, togethers, scoress, loadings_df))
}

#' Run combined CCA and plot results
#'
#' @param scores_combined Combined scores dataframe
#' @param models_combined Combined model parameters dataframe
#' @param tit Title for the plot
#' @return List with CCA results
run_combined <- function(scores_combined, models_combined, tit) {
  # Run CCA projection
  cca_proj <- ccaPP::ccaProj(scores_combined, models_combined, k = 1, 
                             method = 'spearman', standardize = FALSE)
  
  # Renormalize loadings
  loading_scores_proj_n <- renormalize_sd(scores_combined, cca_proj)
  loadings_model_proj <- t(cca_proj$B)
  
  # Name loadings
  colnames(loadings_model_proj) <- colnames(models_combined)
  
  # Convert to long format for plotting
  loading_scores_proj_n_long <- matrix_to_long_df(loading_scores_proj_n, "Loading Scores Proj N")
  loadings_model_proj_long <- matrix_to_long_df(loadings_model_proj, "Loadings Model Proj")
  
  # Combine loadings
  all_loading_scores <- bind_rows(loading_scores_proj_n_long, loading_scores_proj_n_long) 
  all_loadings_model <- bind_rows(loadings_model_proj_long, loadings_model_proj_long) 
  
  # Plot results
  plot_ccas(all_loadings_model, all_loading_scores, tit)
  
  return(list(all_loading_scores, all_loadings_model))
}

#' Run and plot separate CCAs
#'
#' @param scoress First dataset scores
#' @param togethers First dataset model parameters
#' @param scoress_old Second dataset scores
#' @param togethers_old Second dataset model parameters
#' @param tit Title for the plot
#' @return List with CCA results
run_and_plot_separate <- function(scoress, togethers, scoress_old, togethers_old, tit) {
  # Run CCAs for both datasets
  cca_proj <- ccaPP::ccaProj(scoress, togethers, k = 1, method = 'spearman', standardize = FALSE)
  cca_grid <- ccaPP::ccaGrid(scoress, togethers, k = 1, method = 'spearman', standardize = FALSE)
  cca_proj_old <- ccaPP::ccaProj(scoress_old, togethers_old, k = 1, method = 'spearman', standardize = FALSE)
  cca_grid_old <- ccaPP::ccaGrid(scoress_old, togethers_old, k = 1, method = 'spearman', standardize = FALSE)
  
  # Renormalize loadings
  loading_scores_proj_n <- renormalize_sd(scoress, cca_proj)
  loading_scores_grid_n <- renormalize_sd(scoress, cca_grid)
  loading_scores_proj_n_old <- -1 * renormalize_sd(scoress_old, cca_proj_old)
  loading_scores_grid_n_old <- -1 * renormalize_sd(scoress_old, cca_grid_old)
  
  # Extract model loadings
  loadings_model_proj <- t(cca_proj$B)
  loadings_model_cca <- t(cca_grid$B)
  loadings_model_proj_old <- -1 * t(cca_proj_old$B)
  loadings_model_cca_old <- -1 * t(cca_grid_old$B)
  
  # Name loadings
  colnames(loadings_model_proj) <- colnames(togethers)
  colnames(loadings_model_cca) <- colnames(togethers)
  colnames(loadings_model_proj_old) <- colnames(togethers_old)
  colnames(loadings_model_cca_old) <- colnames(togethers_old)
  
  # Convert to long format for plotting
  loading_scores_proj_n_long <- matrix_to_long_df(loading_scores_proj_n, "Loading Scores Proj N")
  loading_scores_grid_n_long <- matrix_to_long_df(loading_scores_grid_n, "Loading Scores Grid N")
  loading_scores_proj_n_old_long <- matrix_to_long_df(loading_scores_proj_n_old, "Loading Scores Proj N Old")
  loading_scores_grid_n_old_long <- matrix_to_long_df(loading_scores_grid_n_old, "Loading Scores Grid N Old")
  
  loadings_model_proj_long <- matrix_to_long_df(loadings_model_proj, "Loadings Model Proj")
  loadings_model_cca_long <- matrix_to_long_df(loadings_model_cca, "Loadings Model Grid")
  loadings_model_proj_old_long <- matrix_to_long_df(loadings_model_proj_old, "Loadings Model Proj Old")
  loadings_model_cca_old_long <- matrix_to_long_df(loadings_model_cca_old, "Loadings Model Grid Old")
  
  # Combine loadings
  all_loading_scores <- bind_rows(
    loading_scores_proj_n_long, 
    loading_scores_grid_n_long, 
    loading_scores_proj_n_old_long, 
    loading_scores_grid_n_old_long
  )
  
  all_loadings_model <- bind_rows(
    loadings_model_proj_long, 
    loadings_model_cca_long, 
    loadings_model_proj_old_long, 
    loadings_model_cca_old_long
  )
  
  # Plot results
  plot_ccas(all_loadings_model, all_loading_scores, tit)
  
  return(list(all_loadings_model, all_loading_scores))
}

#' Combine disparate datasets
#'
#' @param model1 First model dataframe
#' @param model_old Second model dataframe
#' @return Combined model dataframe
combine_disparate <- function(model1, model_old) {
  print('This function combines models')
  model1 <- model1 %>% distinct()
  model_old <- model_old %>% distinct()
  
  # Align columns
  all_columns <- union(names(model1), names(model_old))
  
  # Add missing columns to model1
  missing_in_model1 <- setdiff(all_columns, names(model1))
  model1s <- model1
  model1s[missing_in_model1] <- NA
  
  # Add missing columns to model_old
  missing_in_model_old <- setdiff(all_columns, names(model_old))
  model_olds <- model_old
  model_olds[missing_in_model_old] <- NA
  
  # Ensure same column order
  model1s <- model1s[all_columns]
  model_olds <- model_olds[all_columns]
  
  # Combine dataframes
  model_both <- rbind(model1s, model_olds)
  
  return(model_both)
}

#' Extract composite behavioral measures
#'
#' @param data_repst Behavioral data
#' @param composite_behavior Composite CCA scores
#' @param old Dataset flag (0 for second dataset, 1 for first)
#' @return List with regression results
get_composite <- function(data_repst, composite_behavior, old = 0) {
  # Note: This implementation matches the provided code snippet
  # It depends on return_combined_ev which should be defined elsewhere
  
  data_repst <- return_combined_ev(data_repst)
  data_repst1 <- data_repst %>% 
    dplyr::filter(trials > 14, block > 6) 
  
  data_repst1 <- data_repst1 %>% 
    dplyr::mutate(
      opt = total_actions > 0,
      extra = if_else(total_actions > 1, total_actions - 1, 0)
    ) 
  
  data_repst1 <- data_repst1 %>%
    dplyr::mutate(extra_es = if_else(opt_actions == 0, NA, extra))
  
  if(old == 0) {
    data_repst1 <- data_repst1 %>% 
      dplyr::group_by(id, opt_actions) %>% 
      dplyr::summarise(
        opt = mean(opt),
        ex = mean(extra),
        extra_es = mean(extra_es)
      ) %>% 
      ungroup()
    
    data_repst12 <- pivot_wider(
      data_repst1, 
      id_cols = id, 
      names_from = opt_actions, 
      values_from = c(opt, ex),
      names_glue = "{.value}_{opt_actions}"
    )
  } else {
    data_repst1 <- data_repst1 %>% 
      dplyr::group_by(participant, opt_actions) %>% 
      dplyr::summarise(
        opt = mean(opt),
        ex = mean(extra),
        extra_es = mean(extra_es)
      ) %>% 
      ungroup()
    
    data_repst12 <- pivot_wider(
      data_repst1, 
      id_cols = participant, 
      names_from = opt_actions, 
      values_from = c(opt, ex),
      names_glue = "{.value}_{opt_actions}"
    )
  }
  
  data_repst12 <- data_repst12 %>% 
    dplyr::mutate(ex1_ex3 = ex_1 - ex_3, opt1_opt_3 = opt_1 - opt_3)
  
  if(old == 0) {
    composite_behaviors2 <- left_join(composite_behavior, data_repst12, by = 'id')
  } else {
    composite_behaviors2 <- left_join(composite_behavior, data_repst12, by = 'participant')
  }
  
  composite_behaviors2[, sapply(composite_behaviors2, is.numeric)] <- 
    scale(composite_behaviors2[, sapply(composite_behaviors2, is.numeric)])
  
  x = confint(lm(ex1_ex3 ~ score, data = composite_behaviors2))
  o = confint(lm(opt1_opt_3 ~ score, data = composite_behaviors2))
  
  print(x)
  print(o)
  
  return(list(x, o, composite_behaviors2))
}

# Example usage
# result <- prepare_old_for_cca()
# scoress_old <- result[[1]]
# togethers_old <- result[[2]]
# part_old <- result[[3]]
#
# result <- prepare_new_for_cca()