# ------------------------------------------------------
# Regression Analysis for Controllability and Decision Making
# ------------------------------------------------------

# Load required libraries
library(ordinal)
library(dplyr)
library(ggplot2)
library(tidyr)
library(lme4)
library(ggpubr)
library(zoo)
library(data.table)
library(scales)

# ------------------------------------------------------
# Helper Functions
# ------------------------------------------------------

#' Sigmoid function for probability conversion
#' 
#' @param x Input value
#' @return Sigmoid transformed value
sigmoid <- function(x) {
  return(1 / (1 + exp(-x)))
}

# ------------------------------------------------------
# Custom Themes
# ------------------------------------------------------

#' Theme for regression plots
spec_theme_reg <- theme(
  panel.grid = element_blank(),
  panel.background = element_blank(), 
  axis.title.x = element_text(vjust = 1), 
  axis.title.y = element_text(vjust = -1, margin = margin(0, 25, 0, 0)), 
  axis.line = element_line(color = "black"), 
  plot.title = element_text(size = 30),
  axis.text.x = element_text(size = 24),
  axis.text.y = element_text(size = 24, hjust = 1),
  axis.title = element_text(size = 30),
  legend.text = element_text(size = 24),
  legend.title = element_blank(),
  legend.position = c(.89, .93)
)

# ------------------------------------------------------
# Fixed Effect Visualization Functions
# ------------------------------------------------------

#' Plot fixed effects from two regression models for comparison
#' 
#' @param model_old First regression model
#' @param model_new Second regression model
#' @return ggplot object comparing fixed effects
plot_fixed_effects <- function(model_old, model_new) {
  # Extract confidence intervals
  conf_intervals_old <- model_old[3]
  conf_intervals_new <- model_new[3]
  
  # Convert to data frames and add identifiers
  fixed_effects_df_new <- as.data.frame(conf_intervals_new)
  fixed_effects_df_old <- as.data.frame(conf_intervals_old)
  fixed_effects_df_new$Term <- rownames(fixed_effects_df_new)
  fixed_effects_df_old$Term <- rownames(fixed_effects_df_old)
  fixed_effects_df_old$Group <- 1
  fixed_effects_df_new$Group <- 2
  
  # Combine data frames
  fixed_effects_df <- rbind(fixed_effects_df_old, fixed_effects_df_new)
  colnames(fixed_effects_df) <- c("lower", "upper", "var", "Group")
  
  # Calculate midpoints
  fixed_effects_df <- fixed_effects_df %>% 
    dplyr::mutate(midpoint = (lower + upper) / 2)
  
  # Convert to long format
  fixed_effects_df_long <- tidyr::pivot_longer(
    fixed_effects_df, 
    c("lower", "upper", "midpoint"), 
    names_to = "CI", 
    values_to = "Value"
  )
  
  # Convert back to wide format for plotting
  fixed_effects_df_wide <- spread(fixed_effects_df_long, CI, Value)
  
  # Define labels
  feature_labels <- c(
    "c_elastic" = "ElasticControllability",
    "c_inelastic" = "InelasticControllability",
    "(Intercept)" = "Intercept"
  )
  
  # Format variable names and filter out intercept
  fixed_effects_df_wide$var <- factor(
    fixed_effects_df_wide$var, 
    levels = names(feature_labels), 
    labels = feature_labels
  )
  fixed_effects_df_wide <- fixed_effects_df_wide %>% 
    dplyr::filter(var != "Intercept")
  
  # Create plot
  gp <- ggplot(fixed_effects_df_wide, aes(x = var)) +
    geom_errorbar(
      aes(ymin = lower, ymax = upper, color = factor(Group)), 
      width = 0.2, 
      size = 1.2, 
      position = position_dodge(width = 0.35)
    ) +
    geom_point(
      aes(y = midpoint, color = factor(Group)), 
      position = position_dodge(width = 0.35), 
      size = 4
    ) +
    coord_flip() +
    expand_limits(y = 0) +
    spec_theme_reg +
    theme(axis.title = element_text(size = 24)) +
    labs(y = "Log-odds effect on opting-in", x = "", title = "") +
    scale_x_discrete(labels = c("Elastic\nControllability", "Inelastic\nControllability")) +
    scale_color_manual(labels = c("Group 1", "Group 2"), values = c("steelblue", "navy"))
  
  return(gp)
}

# ------------------------------------------------------
# Opt-In Regression Modeling
# ------------------------------------------------------

#' Run regression model for opt-in decisions
#' 
#' @param data Input dataset
#' @param real Whether to use real data (1) or simulated data (0)
#' @param rep Whether participants are identified by 'id' (1) or 'participant' (0)
#' @return Regression model object
run_opt_in_regression <- function(data, real = 1, rep = 0) {
  # Filter data based on experiment phase
  if (real == 1) {
    dd <- data %>% dplyr::filter(block > 5)
    dd$block <- dd$block - 5
  }
  
  # Select relevant columns and handle participant IDs
  if (rep == 1) {
    dd <- data %>% 
      dplyr::ungroup() %>%  
      dplyr::select(id, block, trials, c_elastic, c_inelastic, total_actions)
    dd$part <- match(dd$id, sort(unique(dd$id)))
  } else {
    dd <- data %>% 
      dplyr::ungroup() %>%  
      dplyr::select(participant, block, trials, c_elastic, c_inelastic, total_actions)
    dd$part <- match(dd$participant, sort(unique(dd$participant)))
  }
  
  # Remove missing values and duplicates
  dd <- dd %>% drop_na()
  dd$num_tries <- dd$total_actions
  dd <- dd[!duplicated(dd), ]
  
  # Create block number and filter for later trials
  dd$block_num <- (dd$part - 1) * 4 + dd$block
  dd <- dd %>% dplyr::filter(trials > 14) 
  
  # Create outcome variable
  dd$total_actions_factor <- as.ordered(dd$total_actions)
  dd$block <- as.ordered(dd$block)
  dd <- dd %>% dplyr::mutate(opt_in = total_actions > 0)
  
  # Run appropriate regression model based on participant ID type
  if (rep == 1) {
    # Using ID as participant identifier
    model <- lme4::glmer(
      opt_in ~ c_elastic + c_inelastic + (1 | block_num), 
      family = binomial, 
      data = dd
    )
  } else {
    # Using participant as identifier
    model <- lme4::glmer(
      opt_in ~ c_elastic + c_inelastic + (1 | block_num), 
      family = binomial, 
      data = dd
    )
  }
  
  return(model)
}

# ------------------------------------------------------
# Regression Line Aggregation
# ------------------------------------------------------

#' Aggregate regression lines for visualization
#' 
#' @param line_data Data frame with individual regression lines
#' @return Aggregated data with means and standard errors
get_aggregated_data <- function(line_data) {
  agg_data <- line_data %>%
    dplyr::group_by(x) %>%
    dplyr::summarise(
      mean_yz = mean(yz, na.rm = TRUE),
      std_yz = sd(yz, na.rm = TRUE),
      mean_ytz = mean(ytz, na.rm = TRUE),
      std_ytz = sd(ytz, na.rm = TRUE)
    )
  
  N <- length(unique(line_data$line))
  
  agg_data <- agg_data %>%
    dplyr::mutate(
      se_yz = std_yz / sqrt(N),
      se_ytz = std_ytz / sqrt(N)
    )
  
  return(agg_data)
}

# ------------------------------------------------------
# Visualization for Opt-In Regression
# ------------------------------------------------------

#' Generate visualization of opt-in regression results
#' 
#' @param line_data Data frame with individual regression lines
#' @param agg_data Aggregated data with means and standard errors
#' @return Combined ggplot object with elastic and inelastic plots
generate_opt_reg_plot <- function(line_data, agg_data) {
  # Convert line to numeric
  line_data$line <- as.numeric(line_data$line)
  
  # Plot for elastic controllability
  elastic <- ggplot(line_data, aes(x = x, y = ytz, color = as.factor(line))) +
    geom_line(
      data = subset(line_data, line != max(line)), 
      aes(color = as.factor(line)), 
      linetype = "solid"
    ) +
    geom_line(
      data = subset(line_data, line == max(line)), 
      aes(color = as.factor(line)), 
      linetype = "dashed", 
      size = 2.4,
      color = "black"
    ) +
    spec_theme_reg +
    theme(legend.position = "none") + 
    labs(y = "", x = "Elastic controllability") +
    scale_y_continuous(
      breaks = seq(0, 1, 0.2),
      labels = scales::percent_format()
    ) +
    scale_x_continuous(
      breaks = seq(0, 1, 0.2),
      labels = scales::percent_format()
    ) +
    geom_line(
      data = agg_data, 
      aes(x = x, y = mean_ytz), 
      color = "black", 
      size = 1.8
    ) +
    geom_line(
      data = agg_data, 
      aes(x = x, y = mean_ytz), 
      color = "black",
      linetype = "dashed", 
      size = 1.8
    ) +
    geom_ribbon(
      data = agg_data, 
      aes(x = x, ymin = mean_ytz - se_ytz, ymax = mean_ytz + se_ytz),
      alpha = 0.2, 
      inherit.aes = FALSE
    )
  
  # Plot for inelastic controllability
  inelastic <- ggplot(line_data, aes(x = x, y = yz, color = as.factor(line))) +
    geom_line(
      data = subset(line_data, line != max(line)), 
      aes(color = as.factor(line)), 
      linetype = "solid"
    ) +
    geom_line(
      data = subset(line_data, line == max(line)), 
      aes(color = as.factor(line)), 
      linetype = "dashed", 
      size = 2.4,
      color = "black"
    ) +
    theme(legend.position = "none") +
    spec_theme_reg + 
    labs(y = "", x = "Inelastic controllability") +
    scale_y_continuous(
      breaks = seq(0, 1, 0.2),
      labels = scales::percent_format()
    ) +
    scale_x_continuous(
      breaks = seq(0, 1, 0.2),
      labels = scales::percent_format()
    ) +
    geom_line(
      data = agg_data, 
      aes(x = x, y = mean_yz), 
      color = "black", 
      size = 1.5
    ) +
    geom_line(
      data = agg_data, 
      aes(x = x, y = mean_yz), 
      color = "black",
      linetype = "dashed", 
      size = 1.5
    ) +
    geom_ribbon(
      data = agg_data, 
      aes(x = x, ymin = mean_yz - se_yz, ymax = mean_yz + se_yz),
      alpha = 0.2, 
      inherit.aes = FALSE
    )
  
  # Combine plots
  gs <- ggarrange(inelastic, elastic, nrow = 2)
  return(gs)
}

# ------------------------------------------------------
# Extra Action Regression Analysis
# ------------------------------------------------------

#' Run regression model for extra action decisions
#' 
#' @param data Input dataset
#' @param real Whether to use real data (1) or simulated data (0)
#' @param rep Whether participants are identified by 'id' (1) or 'participant' (0)
#' @return Processed data with regression predictions
run_extra_action_regression <- function(data, real = 1, rep = 0) {
  # Select relevant columns
  dd <- data %>% 
    dplyr::select(
      participant, block, trials, c_elastic, c_inelastic, 
      total_actions, trial_reward, ss_transition
    )
  
  # Filter data based on experiment phase
  if (real == 1) {
    dd <- dd %>% dplyr::filter(block > 5)
    dd$block <- dd$block - 5
  }
  
  # Handle missing values and duplicates
  dd$ss_transition <- na.locf(dd$ss_transition)
  dd <- dd[!duplicated(dd), ]
  
  # Create derived variables
  dd$rewarded <- if_else(dd$trial_reward > 0, 1, 0)
  
  # Handle participant IDs
  if (rep == 0) {
    dd$part <- match(dd$participant, sort(unique(dd$participant)))
  } else if (rep == 1) {
    dd$part <- match(dd$id, sort(unique(dd$id)))
  } else {
    dd$part <- match(dd$participant_id, sort(unique(dd$participant_id)))
  }
  
  # Create block number and extra actions variables
  dd$block_num <- (dd$part - 1) * 4 + dd$block
  dd$extra_actions <- if_else(dd$total_actions > 0, dd$total_actions - 1, 0)
  
  # Filter for later trials
  dd <- dd %>% dplyr::filter(trials > 14)
  dd$total_actions_factor <- as.ordered(dd$extra_actions)
  dd$block <- as.ordered(dd$block)
  
  # Run appropriate regression model
  if (rep == 0) {
    model <- clmm(
      total_actions_factor ~ c_elastic + c_inelastic + (1 | participant) + (1 | block_num), 
      link = "probit", 
      data = dd
    )
  } else {
    model <- clmm(
      total_actions_factor ~ c_elastic + c_inelastic + (1 | id) + (1 | block_num), 
      link = "probit", 
      data = dd
    )
  }
  
  # Extract thresholds and model components
  thresh1 <- model$coefficients[1]
  thresh2 <- model$coefficients[2]
  
  # Extract fixed and random effects
  fixed_effects <- coef(model)
  random_effects <- ranef(model)
  
  # Extract participant-specific effects
  if (rep == 0) {
    elastic_fits <- fixed_effects["c_elastic"] + random_effects$participant[, "c_elastic"]
    inelastic_fits <- fixed_effects["c_inelastic"] + random_effects$participant[, "c_inelastic"]
    intercept <- random_effects$participant[, 1, drop = FALSE]
  } else {
    elastic_fits <- fixed_effects["c_elastic"] + random_effects$id[, "c_elastic"]
    inelastic_fits <- fixed_effects["c_inelastic"] + random_effects$id[, "c_inelastic"]
    intercept <- random_effects$id[, 1, drop = FALSE]
  }
  
  # Create data frame with participant effects
  participant_effects <- data.frame(
    intercept = intercept, 
    slope_elastic = elastic_fits,
    slope_inelastic = inelastic_fits
  )
  
  # Create sequences for prediction
  x <- seq(0, 1, length.out = 101)
  
  # Create data frame for visualization
  line_data <- data.frame(
    x = rep(x, nrow(participant_effects)), 
    intercept = rep(participant_effects$intercept, each = length(x)),
    y = rep(participant_effects$slope_inelastic, each = length(x)) * x + 
      rep(participant_effects$intercept, each = length(x)),
    yk = rep(participant_effects$slope_elastic, each = length(x)) * x + 
      rep(participant_effects$intercept, each = length(x)),
    line = factor(rep(1:nrow(participant_effects), each = length(x)))
  )
  
  # Add percentage predictions based on thresholds
  line_data <- line_data %>% 
    mutate(perc = case_when(
      yk == thresh1 ~ 0.5,
      yk > thresh1 & yk < thresh2 ~ 0.5 + (yk / thresh2),
      TRUE ~ NA_real_
    ))
  
  # Define function to fill missing values by group
  by_sub_fill <- function(group_data) {
    # Sort data by x
    group_data <- group_data[order(group_data$x), ]
    
    # Fit linear regression model
    model <- lm(perc ~ x, data = group_data, na.action = na.omit)
    
    # Predict missing values
    predicted_values <- predict(model, newdata = group_data)
    
    # Replace missing values with predictions
    group_data$perc <- ifelse(is.na(group_data$perc), predicted_values, group_data$perc)
    
    return(group_data)
  }
  
  # Apply prediction by group
  line_data$line <- as.integer(line_data$line)
  line_data <- line_data %>%
    dplyr::group_by(line) %>%
    dplyr::mutate(perc = by_sub_fill(cur_data()))
  
  # Extract perc column and cap at 2
  linesr <- line_data$perc
  linesr <- linesr %>% 
    dplyr::mutate(perc = if_else(perc <= 2, perc, 2))
  
  return(linesr)
}

# ------------------------------------------------------
# Main Execution
# ------------------------------------------------------

# Output directory for saving plots
output_dir <- "figures/regression"

# Uncomment the following lines to run the analysis with your data

# # Run regression models
# model_old <- run_opt_in_regression(data_old, real = 1)
# model_new <- run_opt_in_regression(data_final, real = 1)
# 
# # Plot fixed effects comparison
# ps1 <- plot_fixed_effects(model_old, model_new)
# 
# # Save fixed effects plot
# if (!dir.exists(output_dir)) {
#   dir.create(output_dir, recursive = TRUE)
# }
# png(
#   file.path(output_dir, "basic_regression_comparison.png"), 
#   width = 12, height = 5, units = "in", res = 300
# )
# print(ps1)
# dev.off()
# 
# # Run extra action regression
# linesr_new <- run_extra_action_regression(data_final, real = 1, rep = 0)
# 
# # Create elastic regression plot
# elastic_plot <- ggplot(linesr_new, aes(x = x, y = perc, color = factor(intercept))) +
#   geom_line() +
#   spec_theme_reg +
#   geom_smooth(method = "lm", se = TRUE, color = "black") +
#   labs(y = "# of extra actions", x = "Elastic controllability") +
#   expand_limits(y = 0) +
#   scale_y_continuous(limits = c(0, 2), breaks = seq(0, 2, 1)) +
#   scale_x_continuous(labels = scales::percent_format())
# 
# # Save elastic regression plot
# png(
#   file.path(output_dir, "elastic_regression.png"), 
#   width = 8, height = 8, units = "in", res = 700
# )
# print(elastic_plot)
# dev.off()
# 
# # Process opt-in regression visualization data
# agg_1 <- get_aggregated_data(d1)
# agg_2 <- get_aggregated_data(d2)
# 
# # Create opt-in regression plots
# gs_1 <- generate_opt_reg_plot(d1, agg_1)
# gs_2 <- generate_opt_reg_plot(d2, agg_2)
# 
# # Add annotations to plots
# gs_with_annotation_1 <- ggpubr::annotate_figure(
#   gs_1,
#   top = text_grob("Dataset 1", color = "black", size = 30),
#   left = text_grob(
#     "Probability of opt in", 
#     color = "black", 
#     size = 30, 
#     rot = 90, 
#     x = 1.15, 
#     y = 0.5
#   )
# )
# 
# gs_with_annotation_2 <- ggpubr::annotate_figure(
#   gs_2,
#   top = text_grob("Dataset 2", color = "black", size = 30)
# )
# 
# # Combine and save plots
# combined_plots <- ggarrange(gs_with_annotation_1, gs_with_annotation_2)
# png(
#   file.path(output_dir, "opt_in_comparison.png"), 
#   width = 8, height = 8, units = "in", res = 700
# )
# print(combined_plots)
# dev.off()