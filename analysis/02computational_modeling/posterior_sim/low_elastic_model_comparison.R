# Control Studies: Analysis Functions
# This script contains functions for analyzing elasticity and controllability data
# from behavioral experiments.

library(data.table)
library(dplyr)
library(ggplot2)
library(ggpubr)
library(scales)

# Define theme for plots
spec_theme_cor <- theme_minimal() +
  theme(
    text = element_text(size = 14),
    axis.title = element_text(size = 16, face = "bold"),
    plot.title = element_text(size = 18, face = "bold"),
    legend.title = element_text(size = 14),
    legend.text = element_text(size = 12)
  )

#' Generate Action Triangle by Inelastic Parameter
#'
#' Analyzes participant actions based on inelastic controllability parameter.
#'
#' @param data Dataframe containing participant data
#' @param real Boolean indicating if data is from real participants (1) or simulation (0)
#' @return Dataframe with summarized actions by inelastic parameter
generate_action_triangle_by_inelastic <- function(data, real) {
  # Aggregate actions by trial
  actions_by_trial <- setDT(data)[!is.na(participant), 
                                  .(actions = max(total_actions, na.rm = TRUE)),
                                  by = .(participant, block, trials, c_elastic, c_inelastic)]
  
  # Filter data based on elastic controllability and trial range
  starting_from <- 15:30
  actions_by_trial <- actions_by_trial %>% 
    dplyr::filter(c_elastic < 0.31)
  
  # Process actions data
  step1 <- actions_by_trial %>%
    dplyr::filter(trials %in% starting_from, actions > -1, actions < 4) %>%
    dplyr::mutate(actions = if_else(actions == 0, 0, actions - 1))
  
  # Additional filtering based on whether data is real or simulated
  if (real == 1) {
    step1 <- step1 %>% dplyr::filter(block > 6)
  } else {
    step1 <- step1 %>% dplyr::filter(c_elastic != 0.34, c_inelastic != 0.34)
  }
  
  # Calculate summary statistics
  actions_step1 <- summarySE(step1, measurevar = "actions", 
                             groupvars = c('participant', 'c_inelastic'), na.rm = TRUE)
  actions_step2 <- summarySE(actions_step1, measurevar = "actions_mean", 
                             groupvars = c('c_inelastic'), na.rm = TRUE)
  
  return(actions_step2)
}

#' Generate Opt-in by Control Parameter
#'
#' Analyzes participant opt-in decisions based on total control parameter.
#'
#' @param data Dataframe containing participant data
#' @param real Boolean indicating if data is from real participants (1) or simulation (0)
#' @return Dataframe with summarized opt-in rates by total control parameter
generate_opt_in_by_control <- function(data, real) {
  # Aggregate actions by trial
  actions_by_trial <- setDT(data)[!is.na(participant), 
                                  .(actions = max(total_actions, na.rm = TRUE)),
                                  by = .(participant, block, trials, c_elastic, c_inelastic)]
  
  # Filter data based on trial range
  starting_from <- 5:30
  
  # Process actions data
  step1 <- actions_by_trial %>%
    dplyr::filter(trials %in% starting_from, actions > -1, actions < 4) %>%
    dplyr::mutate(
      actions = actions > 0,
      total_control = as.numeric(c_inelastic + c_elastic)
    )
  
  # Additional filtering based on whether data is real or simulated
  if (real == 1) {
    step1 <- step1 %>% dplyr::filter(block > 6)
  } else {
    step1 <- step1 %>% dplyr::filter(c_elastic != 0.34, c_inelastic != 0.34)
  }
  
  # Calculate summary statistics
  actions_step1 <- summarySE(step1, measurevar = "actions", 
                             groupvars = c('participant', 'total_control'), na.rm = TRUE)
  actions_step2 <- summarySE(actions_step1, measurevar = "actions_mean", 
                             groupvars = c('total_control'), na.rm = TRUE)
  
  return(actions_step2)
}

#' Get Mean Difference Between Control and Elasticity
#'
#' @param actions_sim_c Dataframe containing simulation results
#' @return Dataframe with summarized differences by inelastic parameter
get_mean_diff_c_and_e <- function(actions_sim_c) {
  actions_sim_cs <- actions_sim_c %>% 
    dplyr::group_by(c_inelastic) %>% 
    dplyr::summarise(
      extra_elastic = mean(extra_elastic),
      extra_control = mean(extra_control)
    ) %>% 
    ungroup()
  
  return(actions_sim_cs)
}

#' Generate and Plot Inelastic Parameter Curves
#'
#' Creates a plot comparing real behavior to model predictions for inelastic parameter.
#'
#' @param data_combined Combined behavioral data
#' @param elasticity_data Simulation data for elasticity model
#' @param controllability_data Simulation data for controllability model
#' @param title Title for the plot
#' @param output_dir Output directory for saving the plot
#' @return ggplot object with the plotted curves
get_low_elastic_curves <- function(data_combined, elasticity_data, controllability_data, 
                                   title, output_dir = NULL) {
  # Generate data for plotting
  actions_combined <- generate_action_triangle_by_inelastic(data_combined, 1)
  actions_sim <- generate_action_triangle_by_inelastic(
    elasticity_data %>% dplyr::filter(epsilon2 < 20, scale1 < 0.5), 0
  )
  actions_control <- generate_action_triangle_by_inelastic(controllability_data, 0)
  actions_sim$extra_elastic <- actions_sim$total_actions
  
  # Create plot
  plot_inelastic_tickets <- ggplot() +
    # Lines for different models and behavior
    geom_line(data = actions_sim, 
              aes(x = c_inelastic, y = actions_mean_mean, color = "Elastic controllability model")) +
    geom_line(data = actions_control, 
              aes(x = c_inelastic, y = actions_mean_mean, color = "Controllability model")) +
    geom_line(data = actions_combined, 
              aes(x = c_inelastic, y = actions_mean_mean, color = "Behavior")) +
    
    # Error bars for behavioral data
    geom_errorbar(data = actions_combined, 
                  aes(x = c_inelastic, 
                      ymin = actions_mean_mean - se, 
                      ymax = actions_mean_mean + se), 
                  width = 0.1, color = 'black') +
    
    # Points for different models and behavior
    geom_point(data = actions_sim, 
               aes(x = c_inelastic, y = actions_mean_mean, color = "Elastic controllability model"), 
               size = 5) +
    geom_point(data = actions_control, 
               aes(x = c_inelastic, y = actions_mean_mean, color = "Controllability model"), 
               size = 5) +
    geom_point(data = actions_combined, 
               aes(x = c_inelastic, y = actions_mean_mean, color = "Behavior"), 
               size = 5) +
    
    # Color scheme and styling
    scale_color_manual(values = c(
      "Elastic controllability model" = "#8B4513", 
      "Controllability model" = "#DAA520", 
      "Behavior" = "#2C3E50"
    )) +
    spec_theme_cor + 
    theme(axis.text = element_text(size = 16), legend.position = "bottom") +
    
    # Axis formatting
    expand_limits(y = 0) +
    scale_x_continuous(labels = scales::percent_format()) +
    
    # Labels
    labs(
      x = "Inelastic Controllability",
      y = "Average Actions",
      title = "Effect of Inelastic Controllability on Actions",
      color = "Model Type"
    )
  
  # Save plot if output directory is provided
  if (!is.null(output_dir)) {
    png(paste0(output_dir, '/plot_opt_in_curves_', title, '.png'), 
        width = 11, height = 7, units = "in", res = 300)
    print(plot_inelastic_tickets)
    dev.off()
    message("Plot saved successfully to ", output_dir)
  }
  
  return(plot_inelastic_tickets)
}

#' Generate and Plot Total Control Curves
#'
#' Creates a plot comparing real behavior to model predictions for total control parameter.
#'
#' @param data_combined Combined behavioral data
#' @param elasticity_data Simulation data for elasticity model
#' @param controllability_data Simulation data for controllability model
#' @param title Title for the plot
#' @param output_dir Output directory for saving the plot
#' @return ggplot object with the plotted curves
get_low_control_curves <- function(data_combined, elasticity_data, controllability_data, 
                                   title, output_dir = NULL) {
  # Generate data for plotting
  actions_combined <- generate_opt_in_by_control(data_combined, 1)
  actions_sim <- generate_opt_in_by_control(
    elasticity_data %>% dplyr::filter(epsilon2 < 10), 0
  )
  actions_control <- generate_opt_in_by_control(controllability_data, 0)
  
  # Create plot
  plot_control_tickets <- ggplot() +
    # Lines for different models and behavior
    geom_line(data = actions_sim, 
              aes(x = total_control, y = actions_mean_mean, color = "Elastic controllability model")) +
    geom_line(data = actions_control, 
              aes(x = total_control, y = actions_mean_mean, color = "Controllability model")) +
    geom_line(data = actions_combined, 
              aes(x = total_control, y = actions_mean_mean, color = "Behavior")) +
    
    # Error bars for behavioral data
    geom_errorbar(data = actions_combined, 
                  aes(x = total_control, 
                      ymin = actions_mean_mean - se, 
                      ymax = actions_mean_mean + se), 
                  width = 0.1, color = 'black') +
    
    # Points for different models and behavior
    geom_point(data = actions_sim, 
               aes(x = total_control, y = actions_mean_mean, color = "Elastic controllability model"), 
               size = 5) +
    geom_point(data = actions_control, 
               aes(x = total_control, y = actions_mean_mean, color = "Controllability model"), 
               size = 5) +
    geom_point(data = actions_combined, 
               aes(x = total_control, y = actions_mean_mean, color = "Behavior"), 
               size = 5) +
    
    # Color scheme and styling
    scale_color_manual(values = c(
      "Elastic controllability model" = "#8B4513", 
      "Controllability model" = "#DAA520", 
      "Behavior" = "#2C3E50"
    )) +
    spec_theme_cor + 
    theme(axis.text = element_text(size = 16), legend.position = "bottom") +
    
    # Axis formatting
    expand_limits(y = 0) +
    scale_x_continuous(labels = scales::percent_format()) +
    scale_y_continuous(labels = scales::percent_format()) +
    
    # Labels
    labs(
      x = "Total Control",
      y = "Opt-in Rate",
      title = "Effect of Total Control on Decision to Opt-in",
      color = "Model Type"
    )
  
  # Save plot if output directory is provided
  if (!is.null(output_dir)) {
    png(paste0(output_dir, '/plot_control_tickets_', title, '.png'), 
        width = 11, height = 7, units = "in", res = 300)
    print(plot_control_tickets)
    dev.off()
    message("Plot saved successfully to ", output_dir)
  }
  
  return(plot_control_tickets)
}

#' Generate Combined Plot with Both Curves
#'
#' @param data_combined Combined behavioral data
#' @param elasticity_data Simulation data for elasticity model
#' @param controllability_data Simulation data for controllability model
#' @param title Title for the plot
#' @param output_dir Output directory for saving the plot
#' @return ggarrange object with both plots combined
generate_combined_plot <- function(data_combined, elasticity_data, controllability_data, 
                                   title, output_dir = NULL) {
  # Generate both plots
  elastic_curve <- get_low_elastic_curves(
    data_combined, 
    elasticity_data %>% dplyr::filter(epsilon2 < 20, scale1 < 0.5),
    controllability_data,
    title
  )
  
  opt_curve <- get_low_control_curves(
    data_combined,
    elasticity_data %>% dplyr::filter(epsilon2 < 10),
    controllability_data,
    title
  )
  
  # Combine plots
  sim_diff <- ggarrange(
    opt_curve, 
    elastic_curve,
    nrow = 2,
    labels = c("A", "B"),
    common.legend = TRUE,
    legend = "bottom"
  )
  
  # Save combined plot if output directory is provided
  if (!is.null(output_dir)) {
    png(paste0(output_dir, '/plot_both_curves_', title, '.png'), 
        width = 11, height = 15, units = "in", res = 600)
    print(sim_diff)
    dev.off()
    message("Combined plot saved successfully to ", output_dir)
  }
  
  return(sim_diff)
}

#' Get Opt-in Rate Statistics
#'
#' @param data_combined Combined data
#' @param real Boolean indicating if data is from real participants (1) or simulation (0)
#' @return Dataframe with summarized opt-in statistics
get_opt <- function(data_combined, real = 0) {
  data_combined <- return_combined_ev(data_combined)
  data_combined <- data_combined %>% 
    dplyr::filter(opt_actions == 0) %>% 
    dplyr::mutate(opt_in = total_actions > 0)
  
  if (real == 1) {
    sum1 <- summarySE(data_combined, measurevar = "opt_in", groupvars = c("id"), na.rm = TRUE)
  } else {
    sum1 <- summarySE(data_combined, measurevar = "opt_in", groupvars = c("participant"), na.rm = TRUE)
  }
  
  sum2 <- summarySE(sum1, measurevar = "opt_in_mean")
  return(sum2)
}

#' Get Extra Actions Statistics
#'
#' @param data_combined Combined data
#' @param real Boolean indicating if data is from real participants (1) or simulation (0)
#' @return Dataframe with summarized extra actions statistics
get_extra <- function(data_combined, real = 0) {
  data_combined <- return_combined_ev(data_combined)
  data_combined <- data_combined %>% 
    dplyr::mutate(extra = if_else(total_actions < 2, 0, total_actions - 1))
  
  if (real == 1) {
    sum1 <- summarySE(data_combined, measurevar = "extra", 
                      groupvars = c("id", "opt_actions"), na.rm = TRUE)
  } else {
    sum1 <- summarySE(data_combined, measurevar = "extra", 
                      groupvars = c("participant", "opt_actions"), na.rm = TRUE)
  }
  
  sum2 <- summarySE(sum1, measurevar = "extra_mean", groupvars = "opt_actions")
  return(sum2)
}

# Example of usage
#' Run Analysis and Generate Plots
#'
#' @param data_path Path to the combined data file
#' @param elasticity_path Path to the elasticity data file
#' @param controllability_path Path to the controllability data file
#' @param output_dir Directory to save output plots
#' @param title Title suffix for generated plots
run_analysis <- function(data_path, elasticity_path, controllability_path, output_dir, title = "study_results") {
  # Load data
  if (endsWith(data_path, ".rds")) {
    data_combined <- readRDS(data_path)
  } else {
    data_combined <- read.csv(data_path, sep = ',')
  }
  
  elasticity_data <- read.csv(elasticity_path, sep = ',')
  controllability_data <- read.csv(controllability_path, sep = ',')
  
  # Create output directory if it doesn't exist
  if (!dir.exists(output_dir)) {
    dir.create(output_dir, recursive = TRUE)
    message("Created output directory: ", output_dir)
  }
  
  # Generate and save individual plots
  elastic_curve <- get_low_elastic_curves(
    data_combined, 
    elasticity_data %>% dplyr::filter(epsilon2 < 20, scale1 < 0.5),
    controllability_data,
    title,
    output_dir
  )
  
  opt_curve <- get_low_control_curves(
    data_combined,
    elasticity_data %>% dplyr::filter(epsilon2 < 10),
    controllability_data,
    title,
    output_dir
  )
  
  # Generate combined plot
  combined_plot <- generate_combined_plot(
    data_combined,
    elasticity_data %>% dplyr::filter(epsilon2 < 20, scale1 < 0.5),
    controllability_data,
    title,
    output_dir
  )
  
  return(list(
    elastic_curve = elastic_curve,
    opt_curve = opt_curve,
    combined_plot = combined_plot
  ))
}

# Example usage:
# results <- run_analysis(
#   data_path = "data/combined_data.rds",
#   elasticity_path = "data/elasticity_data.csv",
#   controllability_path = "data/controllability_data.csv",
#   output_dir = "results/figures",
#   title = "experiment_1"
# )