# ------------------------------------------------------
# Power Analysis for Controllability Experiment
# ------------------------------------------------------

# Load required libraries
library(dplyr)
library(data.table)
library(rstan)
library(ggplot2)
library(HDInterval)  # For hdi function

# ------------------------------------------------------
# Data Preparation
# ------------------------------------------------------

#' Prepare data for power analysis
#' 
#' @param data Input dataset with experimental results
#' @return Data frame filtered for ambiguous conditions
prepare_data <- function(data) {
  # Filter for post-practice blocks
  dd <- data %>% filter(block > 5)
  
  # Select relevant columns
  dd <- dd %>% select(
    participant, block, trials, c_elastic, c_inelastic, 
    total_actions, trial_reward
  )
  
  # Remove rows with missing values
  dd <- dd %>% drop_na()
  
  # Create derived measures
  dd <- dd %>% mutate(
    rewarded = if_else(trial_reward > 0, 1, 0),
    opted_in = if_else(total_actions > 0, 1, 0),
    second_ticket = if_else(total_actions > 1, 1, 0),
    third_ticket = if_else(total_actions > 2, 1, 0)
  )
  
  # Filter for ambiguous controllability condition
  ambiguous <- dd %>% 
    filter(c_elastic == .34) %>% 
    group_by(participant)
  
  return(ambiguous)
}

#' Create bootstrap sample for power analysis
#' 
#' @param ambiguous_data Data from ambiguous condition
#' @param n_participants Number of participants to sample
#' @return List with data formatted for Stan
create_bootstrap_sample <- function(ambiguous_data, n_participants = 25) {
  # Select participants with replacement
  df <- as.data.frame(ambiguous_data)
  selected_participants <- sample(unique(df$participant), n_participants, replace = TRUE)
  
  # Create bootstrap sample
  bootstrap_data <- data.frame()
  for (participant in selected_participants) {
    sub_data <- df %>% filter(participant == participant)
    bootstrap_data <- rbind(bootstrap_data, sub_data)
  }
  
  # Convert to data.table and create unique participant IDs
  setDT(bootstrap_data)
  bootstrap_data[, participant := .GRP, by = rleid(participant)]
  
  # Format data for Stan
  stan_data <- list(
    n_participants = n_participants,
    y = bootstrap_data$opted_in,
    Nsubj = n_participants,
    Ntotal = nrow(bootstrap_data),
    s = bootstrap_data$participant
  )
  
  return(list(
    bootstrap_data = bootstrap_data,
    stan_data = stan_data
  ))
}

# ------------------------------------------------------
# Bayesian Modeling with Stan
# ------------------------------------------------------

#' Run Bayesian power analysis using Stan
#' 
#' @param stan_data Data formatted for Stan
#' @param stan_model_path Path to Stan model file
#' @param iterations Number of iterations for MCMC
#' @return Stan model output
run_bayesian_model <- function(stan_data, stan_model_path, iterations = 6000) {
  # Compile Stan model
  stan_model <- rstan::stan_model(stan_model_path)
  
  # Set options for parallel processing
  rstan::rstan_options(auto_write = TRUE)
  options(mc.cores = parallel::detectCores(logical = FALSE))
  
  # Record start time
  start_time <- Sys.time()
  cat("Starting MCMC sampling at", format(start_time), "\n")
  
  # Run MCMC sampling
  beta_binomial <- rstan::sampling(
    stan_model, 
    data = stan_data,
    iter = iterations,
    warmup = iterations/2,
    chains = 2,
    cores = 2
  )
  
  # Record end time
  end_time <- Sys.time()
  cat("MCMC sampling completed in", difftime(end_time, start_time, units = "mins"), "minutes\n")
  
  return(beta_binomial)
}

# ------------------------------------------------------
# Analysis and Visualization
# ------------------------------------------------------

#' Analyze posterior distribution and create visualization
#' 
#' @param model Stan model output
#' @param parameter Parameter to analyze (default: "a_p")
#' @return List with HDI information and plot
analyze_posterior <- function(model, parameter = "a_p") {
  # Extract posterior samples
  posterior_samples <- as.data.frame(model)
  param_samples <- posterior_samples[[parameter]]
  
  # Compute HDI (Highest Density Interval)
  hdi_result <- HDInterval::hdi(param_samples, credMass = 0.95)
  hdi_width <- hdi_result[2] - hdi_result[1]
  
  # Create visualization
  plot <- ggplot(data = posterior_samples, aes_string(x = parameter)) +
    geom_density(fill = "lightblue", alpha = 0.7) +
    geom_vline(xintercept = hdi_result, linetype = "dashed", color = "red") +
    labs(
      title = paste("Posterior Distribution of", parameter),
      subtitle = paste0("95% HDI: [", round(hdi_result[1], 3), ", ", round(hdi_result[2], 3), "]"),
      x = parameter,
      y = "Density"
    ) +
    theme_minimal() +
    theme(
      axis.title = element_text(size = 12),
      plot.title = element_text(size = 14, face = "bold"),
      plot.subtitle = element_text(size = 10)
    )
  
  return(list(
    hdi = hdi_result,
    hdi_width = hdi_width,
    plot = plot
  ))
}

# ------------------------------------------------------
# Main Execution
# ------------------------------------------------------

# Uncomment the following lines to run the analysis with your data
# Load your data first, e.g., data <- read.csv("your_data.csv")

# # 1. Prepare data
# ambiguous_data <- prepare_data(data)
# 
# # 2. Create bootstrap sample
# bootstrap_results <- create_bootstrap_sample(ambiguous_data, n_participants = 25)
# 
# # 3. Run Bayesian model
# model_results <- run_bayesian_model(
#   bootstrap_results$stan_data,
#   "scripts/analyses/02_modeling/power_analysis.stan",
#   iterations = 6000
# )
# 
# # 4. Analyze and visualize results
# analysis_results <- analyze_posterior(model_results, "a_p")
# 
# # 5. Display and save results
# print(analysis_results$hdi)
# print(paste("HDI width:", analysis_results$hdi_width))
# 
# # Save plot to file
# output_dir <- "figures/power_analysis"
# if (!dir.exists(output_dir)) {
#   dir.create(output_dir, recursive = TRUE)
# }
# 
# ggsave(
#   file.path(output_dir, "posterior_distribution.png"),
#   analysis_results$plot,
#   width = 8,
#   height = 6,
#   units = "in",
#   dpi = 300
# )
#
# print(analysis_results$plot)