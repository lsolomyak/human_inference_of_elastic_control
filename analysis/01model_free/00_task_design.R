# ============================================================================ #
# 00_task_design_utils.R
# 
# This script contains utilities for visualizing task design elements, 
# analyzing optimal strategies, and conducting power analyses for the 
# elasticity/controllability study.
#
# Author: Solomyak et al
# Last Updated: March 2024
# ============================================================================ #

# Load required packages
library(tidyr)
library(readr)
library(ggpubr)
library(dplyr)
library(data.table)
library(scales)
library(ggplot2)
library(reshape2)
library(hrbrthemes)
library(matrixStats)

# ============================================================================ #
# THEME SETTINGS
# ============================================================================ #

# Define a clean theme for triangle plots
spec_theme_triangle <- theme(
  panel.grid = element_blank(),
  panel.background = element_blank(), 
  axis.text.y = element_text(hjust = 1), 
  axis.title.x = element_text(vjust = 1),
  axis.title.y = element_text(vjust = -1), 
  legend.text = element_text(size = 18),
  legend.title = element_text(size = 24),
  axis.line = element_line(color = "black"),
  legend.position = c(.96, 0.75),
  axis.text = element_text(size = 22),
  axis.title = element_text(size = 30)
)

# Standard theme for data visualizations
spec_theme_df <- theme(
  panel.grid.major = element_blank(), 
  panel.grid.minor = element_blank(),
  panel.background = element_blank(), 
  axis.line = element_line(colour = "black"), 
  axis.text = element_text(size = 22),
  legend.key.height = unit(1.1, "cm"),
  plot.margin = margin(1, 0.05, 0.02, 0.02),
  plot.title = element_text(size = 22, face = "bold"),
  legend.text = element_text(size = 22),
  legend.position = c(.8, .8),
  legend.title = element_text(size = 22),
  axis.title = element_text(size = 32, face = "bold")
)

# ============================================================================ #
# CONTROLLABILITY SPACE FUNCTIONS
# ============================================================================ #

#' Generate all allowed points in controllability space
#'
#' @return A dataframe with all possible (c_inelastic, c_elastic) combinations
generate_allowed_points <- function() {
  cat("Generating all possible controllability points...\n")
  
  df <- c()
  k <- 1
  
  # Generate all combinations where c_inelastic + c_elastic <= 1
  for (i in 0:10) {  # c_inelastic
    for (j in 0:10) {  # c_elastic
      if ((i + j) / 10 <= 1) {
        df$c_inelastic[k] <- i
        df$c_elastic[k] <- j
        k <- k + 1
      }
    }
  }
  
  # Convert to dataframe and normalize values to [0,1] range
  df <- as.data.frame(df) / 10
  
  return(df)
}

#' Calculate the probability of winning based on controllability parameters
#'
#' @param c_inelastic Inelastic controllability parameter
#' @param c_elastic Elastic controllability parameter
#' @param num_tries Number of action attempts
#' @return Probability of winning
chance_of_winning <- function(c_inelastic, c_elastic, num_tries) {
  if (num_tries == 0) {
    prob_win <- 0.2  # Base probability
  } else if (num_tries == 1) {
    prob_win <- c_inelastic + 0.2 * (1 - c_inelastic)
  } else if (num_tries == 2) {
    prob_win <- c_inelastic + (c_elastic / 2) + 0.2 * (1 - (c_inelastic + (c_elastic / 2)))
  } else {
    prob_win <- c_inelastic + c_elastic + 0.2 * (1 - (c_inelastic + c_elastic))
  }
  
  return(prob_win)
}

#' Calculate action cost based on number of attempts
#'
#' @param num_tries Number of action attempts
#' @return Total cost
action_cost <- function(num_tries) {
  if (num_tries == 0) {
    total_cost <- 0
  } else if (num_tries == 1) {
    total_cost <- 40
  } else if (num_tries == 2) {
    total_cost <- 60
  } else {
    total_cost <- 80
  }
  
  return(total_cost)
}

#' Calculate expected value for a given strategy and controllability parameters
#'
#' @param c_inelastic Inelastic controllability parameter
#' @param c_elastic Elastic controllability parameter
#' @param num_tries Number of action attempts
#' @return Expected value
get_ev_new <- function(c_inelastic, c_elastic, num_tries) {
  reward <- 150
  loss <- 0
  total_cost <- action_cost(num_tries)
  prob_win <- chance_of_winning(c_inelastic, c_elastic, num_tries)
  ev <- (reward - total_cost) * prob_win - ((loss + total_cost) * (1 - prob_win))
  
  return(ev)
}

#' Calculate optimal action strategies for all points in controllability space
#'
#' @return Dataframe with optimal actions for each point
calculate_optimal_strategies <- function() {
  # Generate all allowed controllability points
  df <- generate_allowed_points()
  
  # Calculate expected values for different action counts
  df <- df %>% mutate(
    ev0 = get_ev_new(c_inelastic, c_elastic, 0),
    ev1 = get_ev_new(c_inelastic, c_elastic, 1),
    ev2 = get_ev_new(c_inelastic, c_elastic, 2),
    ev3 = get_ev_new(c_inelastic, c_elastic, 3)
  )
  
  # Identify maximum expected value
  df <- df %>% 
    group_by(c_inelastic, c_elastic) %>% 
    dplyr::mutate(df = max(ev0, ev1, ev2, ev3))
  
  # Calculate advantage of each strategy over others
  df <- df %>% dplyr::mutate(
    ev_zero_minus_optimal = ev0 - max(ev1, ev2, ev3),
    ev_one_minus_optimal = ev1 - max(ev0, ev2, ev3),
    ev_two_minus_optimal = ev2 - max(ev0, ev1, ev3),
    ev_three_minus_optimal = ev3 - max(ev0, ev1, ev2)
  )
  
  # Identify optimal strategy for each point
  zero_over_one <- df %>% 
    dplyr::filter(ev_zero_minus_optimal > 0) %>% 
    dplyr::mutate(n_actions = "zero_actions", ev_minus_df = ev_zero_minus_optimal)
  
  one_over_one <- df %>% 
    dplyr::filter(ev_one_minus_optimal > 0) %>% 
    dplyr::mutate(n_actions = "one_action", ev_minus_df = ev_one_minus_optimal)
  
  two_over_one <- df %>% 
    dplyr::filter(ev_two_minus_optimal > 0) %>% 
    dplyr::mutate(n_actions = "two_action", ev_minus_df = ev_two_minus_optimal)
  
  three_over_one <- df %>% 
    dplyr::filter(ev_three_minus_optimal > 0) %>% 
    dplyr::mutate(n_actions = "three_action", ev_minus_df = ev_three_minus_optimal)
  
  # Combine all strategies
  df_combined <- bind_rows(list(zero_over_one, one_over_one, two_over_one, three_over_one))
  df_combined$n_actions <- as.factor(df_combined$n_actions)
  
  # Create a map with color coding
  map <- df_combined %>% dplyr::select(c_inelastic, c_elastic, n_actions)
  map <- map %>%
    dplyr::mutate(n_actions_color = case_when(
      n_actions == "zero_actions" ~ "#F1948A",
      n_actions == "one_action" ~ "#7DAB76",
      n_actions == "three_action" ~ "#7CA6D8",
      TRUE ~ NA_character_
    ))
  
  return(list(full_data = df_combined, map = map))
}

#' Create triangle plot showing optimal strategies
#'
#' @param df Dataframe with optimal strategy data
#' @param output_dir Directory to save the plot
#' @param filename Output filename
#' @return ggplot object
plot_optimal_triangle <- function(df, output_dir = NULL, filename = "optimal_strategies.png") {
  # Create plot
  triangle <- ggplot(df, aes(x = c_inelastic, y = c_elastic, alpha = ev_minus_df)) +
    geom_tile(aes(fill = ifelse(n_actions == "zero_actions", "#F1948A", 
                                ifelse(n_actions == "one_action", "#7DAB76", "#7CA6D8")))) +
    scale_x_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format()) +
    scale_y_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format())  + 
    spec_theme_triangle +
    xlab("Inelastic controllability") + ylab("Elastic controllability") +
    scale_fill_identity(
      name = "Optimal number\n of tickets", 
      labels = c("#F1948A" = "opt-out", "#7DAB76" = "1", "#7CA6D8" = "3"),
      guide = guide_legend(override.aes = list(alpha = ifelse(unique(df$n_actions) == "one_action", 0.5, 1)))
    ) +
    scale_alpha_continuous(name = "Advantage") +
    guides(
      alpha = guide_legend(order = 2),
      fill = guide_legend(order = 1, override.aes = list(alpha = ifelse(unique(df$n_actions) == "one_action", 0.5, 1)))
    ) +
    coord_fixed(ratio = 1, xlim = NULL, ylim = NULL, expand = FALSE, clip = "on")
  
  # Save plot if directory is provided
  if (!is.null(output_dir)) {
    if (!dir.exists(output_dir)) {
      dir.create(output_dir, recursive = TRUE)
    }
    
    png(file.path(output_dir, filename), width = 13, height = 8, units = "in", res = 400)
    print(triangle)
    dev.off()
    cat("Saved triangle plot to", file.path(output_dir, filename), "\n")
  }
  
  return(triangle)
}

#' Create empty triangle plot for controllability space
#'
#' @param output_dir Directory to save the plot
#' @param filename Output filename
#' @return ggplot object
plot_empty_triangle <- function(output_dir = NULL, filename = "empty_triangle.png") {
  # Generate all allowed points
  df <- generate_allowed_points()
  
  # Create plot
  g <- ggplot(df, aes(x = c_inelastic, y = c_elastic)) +
    geom_point(alpha = 0.1) + 
    scale_x_continuous(breaks = seq(0, 1, 0.1), labels = scales::percent_format()) + 
    scale_y_continuous(breaks = seq(0, 1, 0.1), labels = scales::percent_format()) + 
    spec_theme_df + 
    ylab("Elastic controllability") +
    xlab("Inelastic controllability") +
    coord_fixed(ratio = 1, xlim = NULL, ylim = NULL, expand = TRUE, clip = "on")
  
  # Save plot if directory is provided
  if (!is.null(output_dir)) {
    if (!dir.exists(output_dir)) {
      dir.create(output_dir, recursive = TRUE)
    }
    
    png(file.path(output_dir, filename), width = 8, height = 8, units = "in", res = 300)
    print(g)
    dev.off()
    cat("Saved empty triangle plot to", file.path(output_dir, filename), "\n")
  }
  
  return(g)
}

# ============================================================================ #
# BEHAVIORAL DATA ANALYSIS
# ============================================================================ #

#' Analyze opt-in behavior across controllability space
#'
#' @param data Experimental data
#' @param real Whether data is from real participants (1) or simulation (0)
#' @return Dataframe with opt-in rates by controllability values
generate_opt_in_triangle <- function(data, real = 1) {
  # Process data to get actions by trial
  actions_by_trial <- setDT(data)[
    !is.na(participant), 
    .(actions = max(total_actions, na.rm = TRUE)),
    by = .(participant, block, trials, c_elastic, c_inelastic)
  ]
  
  # Filter for trials of interest
  starting_from <- 15:30
  step1 <- actions_by_trial %>%
    dplyr::filter(trials %in% starting_from, actions > -1, actions < 4) %>%
    dplyr::mutate(opt_in = (actions > 0))
  
  # Apply additional filters based on data type
  if (real == 1) {
    step1 <- step1 %>% dplyr::filter(block > 6)
  } else {
    step1 <- step1 %>% dplyr::filter(c_elastic != .34, c_inelastic != .34)
  }
  
  # Aggregate by controllability values
  actions <- step1 %>%
    dplyr::group_by(c_elastic, c_inelastic) %>%
    dplyr::summarise(
      total_actions = mean(opt_in, na.rm = TRUE),
      total_part = length(unique(participant))
    ) %>%
    ungroup()
  
  return(actions)
}

#' Analyze extra actions behavior across controllability space
#'
#' @param data Experimental data
#' @param real Whether data is from real participants (1) or simulation (0)
#' @return Dataframe with extra actions by controllability values
generate_action_triangle <- function(data, real = 1) {
  # Process data to get actions by trial
  actions_by_trial <- setDT(data)[
    !is.na(participant), 
    .(actions = max(total_actions, na.rm = TRUE)),
    by = .(participant, block, trials, c_elastic, c_inelastic)
  ]
  
  # Filter for trials of interest and calculate extra actions
  starting_from <- 15:30
  step1 <- actions_by_trial %>%
    dplyr::filter(trials %in% starting_from, actions > -1, actions < 4) %>%
    dplyr::mutate(actions = if_else(actions == 0, 0, actions - 1))
  
  # Apply additional filters based on data type
  if (real == 1) {
    step1 <- step1 %>% dplyr::filter(block > 6)
  } else {
    step1 <- step1 %>% dplyr::filter(c_elastic != .34, c_inelastic != .34)
  }
  
  # Aggregate by controllability values
  actions <- step1 %>%
    dplyr::group_by(c_elastic, c_inelastic) %>%
    dplyr::summarise(
      total_actions = mean(actions, na.rm = TRUE),
      total_part = length(unique(participant))
    ) %>%
    dplyr::ungroup()
  
  return(actions)
}

#' Plot opt-in behavior across controllability space
#'
#' @param x Dataframe with opt-in rates
#' @param first Whether to include legend (0) or not (1)
#' @param output_dir Directory to save the plot
#' @param filename Output filename
#' @return ggplot object
plot_optin_triangle <- function(x, first = 1, output_dir = NULL, filename = NULL) {
  max_alpha <- max(x$total_actions)
  
  # Create gradient palette
  my_palette <- colorRampPalette(c("white", "black"))
  
  # Set title based on parameter
  if (first == 1) {
    tit <- ''
  } else {
    tit <- ''
  }
  
  # Define breaks for color scale
  breaks <- seq(0, 1, 0.25)
  
  # Calculate minimum value for color scaling
  min_actions <- min(x$total_actions)
  
  # Create custom palette with proper scaling
  custom_palette <- c(
    rep("white", round(min_actions * 500)), 
    my_palette(500 - round(min_actions * 500))
  )
  
  # Define red edge condition function
  red_edge_condition <- function(data) {
    (data$c_inelastic == 0 & data$c_elastic >= 0 & data$c_elastic < 0.67)
  }
  
  # Create plot
  g <- ggplot() +
    geom_tile(data = x, aes(x = c_inelastic, y = c_elastic, fill = total_actions, alpha = total_actions)) +
    geom_segment(
      data = x[red_edge_condition(x), ], 
      aes(x = 0, y = c_elastic, xend = 0, yend = c_elastic + 0.1),
      color = "#F25C54", size = 4
    ) +
    scale_fill_gradientn(
      colors = custom_palette, 
      name = "% Opt in", 
      limits = c(0, 1), 
      breaks = breaks, 
      labels = scales::percent(breaks)
    ) +
    scale_alpha_continuous(range = c(0, 1), breaks = seq(0, 1, 0.25), guide = "none") +
    scale_color_identity()
  
  # Apply appropriate theme based on parameter
  if (first == 1) {
    g <- g + theme(
      panel.grid.major = element_blank(),
      panel.grid.minor = element_blank(),
      panel.background = element_blank(),
      axis.line = element_line(colour = "black"),
      axis.text = element_text(size = 16),
      axis.title = element_text(size = 30),
      legend.position = "none"
    )
  } else {
    g <- g + theme(
      panel.grid.major = element_blank(),
      panel.grid.minor = element_blank(),
      panel.background = element_blank(),
      axis.line = element_line(colour = "black"),
      axis.text = element_text(size = 16),
      axis.title = element_text(size = 30),
      legend.title = element_text(size = 30),
      legend.text = element_text(size = 22),
      legend.position = c(0.92, 1.03),
      legend.justification = c(1, 1),
      legend.key.height = unit(2, "lines"),
      legend.key = element_rect(colour = "black", fill = NA, size = 1)
    )
  }
  
  # Finalize plot
  g <- g + coord_fixed(
    ratio = 1, 
    xlim = c(0, 1), 
    ylim = c(0, 1), 
    expand = FALSE, 
    clip = "on"
  ) +
    labs(
      x = "Inelastic controllability", 
      y = "Elastic controllability", 
      fill = "% Opt in", 
      color = "Outline color", 
      title = tit
    ) +
    scale_x_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format()) +
    scale_y_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format())
  
  # Save plot if directory and filename are provided
  if (!is.null(output_dir) && !is.null(filename)) {
    if (!dir.exists(output_dir)) {
      dir.create(output_dir, recursive = TRUE)
    }
    
    png(file.path(output_dir, filename), width = 8, height = 8, units = "in", res = 300)
    print(g)
    dev.off()
    cat("Saved opt-in triangle plot to", file.path(output_dir, filename), "\n")
  }
  
  return(g)
}

#' Plot extra actions across controllability space
#'
#' @param x Dataframe with extra actions data
#' @param first Whether to include legend (0) or not (1) 
#' @param output_dir Directory to save the plot
#' @param filename Output filename
#' @return ggplot object
plot_extra_triangle <- function(x, first = 1, output_dir = NULL, filename = NULL) {
  max_alpha <- max(x$total_actions)
  
  # Create palette
  my_palette <- colorRampPalette(c("white", "black"))
  
  # Calculate minimum for scaling
  min_actions <- min(x$total_actions)
  
  # Create custom palette
  custom_palette <- c(
    rep("white", round(min_actions * 500)), 
    my_palette(500 - round(min_actions * 500))
  )
  
  # Create plot
  g <- ggplot() +
    geom_tile(data = x, aes(x = c_inelastic, y = c_elastic, fill = total_actions, alpha = total_actions)) +
    scale_fill_gradientn(
      colors = custom_palette,
      name = "Extra tickets",
      limits = c(0, max(x$total_actions)),
      guide = guide_colorbar(title.position = "top")
    ) +
    labs(title = '') +
    coord_fixed(ratio = 1, xlim = NULL, ylim = NULL, expand = FALSE, clip = "on") +
    labs(
      x = "Inelastic controllability", 
      y = "Elastic controllability", 
      alpha = "Extra tickets", 
      title = ''
    ) +
    scale_x_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format()) +
    scale_y_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format()) +
    scale_alpha_continuous(range = c(0, 1), guide = guide_legend(reverse = TRUE)) +
    theme(
      legend.position = c(1.01, 1),
      legend.justification = c(1, 1),
      legend.key.height = unit(2, "lines")
    ) +
    guides(alpha = "none")
  
  # Apply theme based on parameter
  if (first == 1) {
    g <- g + theme(
      panel.grid.major = element_blank(),
      panel.grid.minor = element_blank(),
      panel.background = element_blank(),
      axis.line = element_line(colour = "black"),
      axis.text = element_text(size = 16),
      axis.title = element_text(size = 30),
      legend.position = "none"
    )
  } else {
    g <- g + theme(
      panel.grid.major = element_blank(),
      panel.grid.minor = element_blank(),
      panel.background = element_blank(),
      axis.line = element_line(colour = "black"),
      axis.text = element_text(size = 16),
      axis.title = element_text(size = 30),
      legend.title = element_text(size = 30),
      legend.text = element_text(size = 24)
    )
  }
  
  # Save plot if directory and filename are provided
  if (!is.null(output_dir) && !is.null(filename)) {
    if (!dir.exists(output_dir)) {
      dir.create(output_dir, recursive = TRUE)
    }
    
    png(file.path(output_dir, filename), width = 8, height = 8, units = "in", res = 300)
    print(g)
    dev.off()
    cat("Saved extra tickets triangle plot to", file.path(output_dir, filename), "\n")
  }
  
  return(g)
}

# ============================================================================ #
# POWER ANALYSIS FUNCTIONS
# ============================================================================ #

#' Run power analysis for binomial data
#'
#' @param data Experimental data
#' @param n_samples Number of participants to sample
#' @param n_bootstraps Number of bootstrap iterations 
#' @param stan_model_path Path to Stan model file
#' @return Results of power analysis
run_power_analysis <- function(data, n_samples = 25, n_bootstraps = 10, 
                               stan_model_path = NULL) {
  # Filter data to use consistent controllability values
  dd <- data %>% filter(block > 5)
  dd <- dd %>% select(participant, block, trials, c_elastic, c_inelastic, total_actions, trial_reward)
  dd <- dd %>% drop_na()
  
  # Create binary variables
  dd$rewarded <- if_else(dd$trial_reward > 0, 1, 0)
  dd$opted_in <- if_else(dd$total_actions > 0, 1, 0)
  dd$second_ticket <- if_else(dd$total_actions > 1, 1, 0)
  dd$third_ticket <- if_else(dd$total_actions > 2, 1, 0)
  dd <- dd %>% drop_na()
  
  # Filter for specific condition of interest
  ambiguous <- dd %>% filter(c_elastic == .34) %>% group_by(participant)
  
  # Check if Stan model path is provided
  if (is.null(stan_model_path)) {
    stop("Please provide a path to the Stan model file.")
  }
  
  # Try to load Stan model
  tryCatch({
    filed <- rstan::stan_model(stan_model_path)
  }, error = function(e) {
    stop("Error loading Stan model: ", e$message)
  })
  
  # Get total participants
  total_participants <- n_distinct(ambiguous$participant)
  if (total_participants < n_samples) {
    warning("Number of requested samples (", n_samples, 
            ") exceeds available participants (", total_participants, ").",
            " Will sample with replacement.")
  }
  
  # Initialize results collection
  hdi_widths <- numeric(n_bootstraps)
  
  # Run bootstrapped power analysis
  for (i in 1:n_bootstraps) {
    cat("Running bootstrap iteration", i, "of", n_bootstraps, "\n")
    
    # Sample participants with replacement
    selected_participants <- ambiguous$participant[
      sample(1:nrow(ambiguous), n_samples, replace = TRUE)
    ]
    
    # Create dataset for this bootstrap iteration
    datas <- c()
    for (j in 1:length(selected_participants)) {
      sub_add <- ambiguous %>% filter(participant == selected_participants[j])
      datas <- rbind(datas, sub_add)
    }
    datas <- as.data.frame(datas)
    
    # Create unique participant IDs for this sample
    setDT(datas)[, participant := .GRP, by = rleid(participant)]
    
    # Prepare data for Stan
    data_for_stan <- list(
      n_participants = n_samples,
      y = datas$opted_in,
      Nsubj = n_samples,
      Ntotal = nrow(datas),
      s = datas$participant
    )
    
    # Set Stan options and run model
    rstan::rstan_options(auto_write = TRUE)
    iterations <- 6000
    
    # Fit Stan model
    beta_binomial <- tryCatch({
      rstan::sampling(
        filed, 
        data = data_for_stan,
        iter = iterations,
        warmup = iterations / 2,
        chains = 2, 
        cores = 2
      )
    }, error = function(e) {
      warning("Error in Stan sampling: ", e$message)
      return(NULL)
    })
    
    # Skip this iteration if sampling failed
    if (is.null(beta_binomial)) {
      next
    }
    
    # Extract posterior samples
    omega_samples <- as.data.frame(beta_binomial)$a_p
    
    # Compute HDI with 95% coverage
    hdi <- HDInterval::hdi(omega_samples, credMass = 0.95)
    hdi_width <- hdi[2] - hdi[1]
    hdi_widths[i] <- hdi_width
  }
  
  # Summarize results
  mean_hdi_width <- mean(hdi_widths, na.rm = TRUE)
  sd_hdi_width <- sd(hdi_widths, na.rm = TRUE)
  
  cat("Power analysis results:\n")
  cat("  Mean HDI width:", mean_hdi_width, "\n")
  cat("  SD of HDI width:", sd_hdi_width, "\n")
  
  return(list(
    hdi_widths = hdi_widths,
    mean_width = mean_hdi_width,
    sd_width = sd_hdi_width,
    n_samples = n_samples
  ))
}

# ============================================================================ #
# EXPERIMENTAL DESIGN HELPERS
# ============================================================================ #

#' Get data combinations used in experiment
#'
#' @param data Experimental data
#' @return Counts of different controllability combinations
get_data_combos <- function(data) {
  # Find all unique combinations and their counts
  find_combinations <- function(df) {
    df %>%
      dplyr::group_by(c_elastic, c_inelastic) %>%
      dplyr::summarise(count = n()) %>%
      ungroup()
  }
  
  # Extract unique combinations per participant
  pairs_done <- data %>% 
    filter(block > 6 & trials %in% 0:28) %>% 
    group_by(participant, block) %>% 
    dplyr::summarise(
      c_elastic = mean(c_elastic),
      c_inelastic = mean(c_inelastic)
    )
  
  # Summarize counts of each combination
  pairs_done2 <- find_combinations(pairs_done)
  
  return(pairs_done2)
}

#' Plot triangle showing distribution of controllability combinations in experiment
#'
#' @param pairs_done2 Dataframe with counts of combinations
#' @param output_dir Directory to save the plot
#' @param filename Output filename
#' @return ggplot object
plot_triangle <- function(pairs_done2, output_dir = NULL, filename = "experiment_distribution.png") {
  p1 <- ggplot(pairs_done2, aes(x = c_inelastic, y = c_elastic, fill = as.factor(count))) +
    geom_tile() +
    ggtitle("Controllability Combinations Distribution") +
    labs(x = "Inelastic Controllability", y = "Elastic Controllability", fill = "n_blocks") +
    theme_minimal() +
    theme(
      plot.title = element_text(size = 16, face = "bold"),
      axis.title = element_text(size = 14),
      legend.title = element_text(size = 12),
      legend.text = element_text(size = 10)
    )
  
  # Save plot if directory is provided
  if (!is.null(output_dir)) {
    if (!dir.exists(output_dir)) {
      dir.create(output_dir, recursive = TRUE)
    }
    
    png(file.path(output_dir, filename), width = 8, height = 6, units = "in", res = 300)
    print(p1)
    dev.off()
    cat("Saved controllability distribution plot to", file.path(output_dir, filename), "\n")
  }
  
  return(p1)
}

#' Balance conditions for new participants
#'
#' @param existing_data Existing experimental data
#' @param n_new_participants Number of new participants to design for
#' @param possible_combinations_path Path to CSV with possible controllability combinations
#' @param output_path Path to save the new condition assignments
#' @return Dataframe with new balanced condition assignments
balance_experimental_conditions <- function(existing_data, n_new_participants = 20,
                                            possible_combinations_path = NULL,
                                            output_path = NULL) {
  # Get existing combination counts
  old_combos <- get_data_combos(existing_data %>% filter(block > 6, trials == 21))
  
  # Load possible combinations if provided, otherwise generate them
  if (!is.null(possible_combinations_path) && file.exists(possible_combinations_path)) {
    combinations <- read.csv(possible_combinations_path)
    
    # Ensure it has necessary columns
    if (!all(c("c_elastic", "c_inelastic", "opt_actions") %in% colnames(combinations))) {
      stop("Possible combinations file must contain c_elastic, c_inelastic, and opt_actions columns")
    }
  } else {
    cat("Generating possible controllability combinations...\n")
    
    # Generate allowed points
    df <- generate_allowed_points()
    
    # Calculate expected values
    df <- df %>% mutate(
      ev0 = get_ev_new(c_inelastic, c_elastic, 0),
      ev1 = get_ev_new(c_inelastic, c_elastic, 1),
      ev2 = get_ev_new(c_inelastic, c_elastic, 2),
      ev3 = get_ev_new(c_inelastic, c_elastic, 3)
    )
    
    # Determine optimal actions
    df <- df %>% mutate(
      opt_actions = apply(
        cbind(ev0, ev1, ev2, ev3), 1,
        function(x) which.max(x) - 1  # 0-based indexing for actions
      )
    )
    
    combinations <- df %>% select(c_inelastic, c_elastic, opt_actions)
  }
  
  # Ensure each participant gets all 3 optimal action types (0, 1, 3)
  combinations_with_all_types <- combinations %>%
    group_by(id = ceiling(row_number() / 3)) %>%
    mutate(type_count = n_distinct(opt_actions)) %>%
    filter(type_count == 3) %>%
    select(-type_count)
  
  # Check if we have enough combinations
  if (nrow(combinations_with_all_types) / 3 < n_new_participants) {
    warning("Not enough unique combinations with all 3 action types. Some participants will have repeated combinations.")
  }
  
  # Join with existing combination counts
  combined_data <- left_join(combinations_with_all_types, old_combos, 
                             by = c("c_elastic", "c_inelastic")) %>%
    mutate(count = ifelse(is.na(count), 0, count))
  
  # Initialize results dataframe
  rows_added <- c()
  
  # Assign conditions to new participants
  for (p in 1:n_new_participants) {
    # Get the rank of combinations based on frequency
    rank_combos <- combined_data %>% 
      group_by(id) %>% 
      summarise(total_count = sum(count, na.rm = TRUE)) %>% 
      filter(total_count == min(total_count)) %>% 
      inner_join(combined_data, by = "id") %>%
      distinct()
    
    # Randomly select one participant's worth of combinations (3 conditions)
    random_choice <- sample(unique(rank_combos$id), 1)
    
    # Extract the selected combinations
    new_three <- combined_data[combined_data$id == random_choice, ]
    
    # Sort by optimal actions (decreasing)
    new_three <- new_three[order(new_three$opt_actions, decreasing = TRUE), ]
    
    # Add to results
    rows_added <- bind_rows(rows_added, new_three)
    
    # Update counts for next iteration
    for (i in 1:nrow(new_three)) {
      combined_data <- combined_data %>% mutate(
        count = ifelse(
          c_elastic == new_three$c_elastic[i] & c_inelastic == new_three$c_inelastic[i],
          count + 1,
          count
        )
      )
    }
  }
  
  # Save results if output path is provided
  if (!is.null(output_path)) {
    # Ensure directory exists
    output_dir <- dirname(output_path)
    if (!dir.exists(output_dir)) {
      dir.create(output_dir, recursive = TRUE)
    }
    
    write.csv(rows_added, output_path, row.names = FALSE)
    cat("Saved balanced conditions to", output_path, "\n")
  }
  
  return(rows_added)
}

# ============================================================================ #
# STAN MODEL FOR POWER ANALYSIS
# ============================================================================ #

#' Create Stan model for power analysis
#'
#' @param output_path Path to save the Stan model
#' @return Path to the created Stan model file
create_power_analysis_model <- function(output_path = "power_analysis.stan") {
  # Stan model code
  stan_code <- "
data {
  int<lower=0> Ntotal;
  int<lower=0> Nsubj;
  int<lower=0,upper=1> y[Ntotal];
  int<lower=0> s[Ntotal];
}

parameters {
  real<lower=0,upper=1> theta[Nsubj];
  real<lower=0,upper=1> omega;
  real<lower=0> kappaMinusTwo;
}

transformed parameters {
  real<lower=0> kappa = kappaMinusTwo + 2;
}

model {
  omega ~ beta(1,1);
  kappaMinusTwo ~ gamma(0.1, 0.1); 

  theta ~ beta(omega*(kappa-2)+1, (1-omega)*(kappa-2)+1);
  for (i in 1:Ntotal) {
    y[i] ~ bernoulli(theta[s[i]]);
  }
}
"

# Ensure directory exists
output_dir <- dirname(output_path)
if (!dir.exists(output_dir) && output_dir != ".") {
  dir.create(output_dir, recursive = TRUE)
}

# Write Stan code to file
writeLines(stan_code, output_path)
cat("Saved Stan model to", output_path, "\n")

return(output_path)
}
