# ==============================================================================
# Control Study Utility Functions
# ==============================================================================
#
# Utility functions for posterior analysis 

# ==============================================================================

library(ggplot2)
library(data.table)
library(dplyr)

# Define a clean theme for ggplot2 visualizations
#' Clean Theme for ggplot2
#'
#' Provides a minimal theme for plotting with clean background and clear labels.
spec_theme <- theme(
  panel.grid.major = element_blank(),  # Remove major grid lines
  panel.grid.minor = element_blank(),  # Remove minor grid lines
  panel.background = element_blank(),  # White background
  axis.line = element_line(colour = "black"),  # Add axis lines
  axis.text = element_text(size = 14),  # Axis text size
  plot.title = element_text(size = 21, face = "bold"),  # Title formatting
  axis.title = element_text(size = 14, face = "bold")  # Axis title formatting
)

#' Generate a Sequence of Binary Outcomes
#'
#' Creates a balanced sequence of binary (0/1) outcomes based on a parameter.
#'
#' @param m Parameter determining the number of 1s in the sequence
#' @return Vector of binary values
generate_seq <- function(m) {
  full_trial <- c()
  
  # Handle even values of m
  if (m %% 2 == 0) {
    for (i in 1:6) {
      n = m / 2
      ones <- rep(1, n)  # Create 'n' ones
      zeros <- rep(0, 5 - n)  # Fill the rest with zeros
      trial_seq = sample(c(ones, zeros))  # Shuffle the sequence
      trial_seq = sample(trial_seq)  # Shuffle again for good measure
      full_trial <- c(full_trial, trial_seq)  # Add to the full sequence
    }
  } else {
    # Handle odd values of m
    for (i in 1:3) {
      n = m
      ones <- rep(1, n)  # Create 'n' ones
      zeros <- rep(0, 10 - n)  # Fill the rest with zeros
      trial_seq = sample(c(ones, zeros))  # Shuffle the sequence
      trial_seq = sample(trial_seq)  # Shuffle again for good measure
      full_trial <- c(full_trial, trial_seq)  # Add to the full sequence
    }
  }
  
  return(full_trial)
}

#' Generate All Allowed Control Parameter Combinations
#'
#' Creates a data frame with all possible combinations of inelastic and elastic 
#' controllability parameters where their sum is less than or equal to 1.
#'
#' @return Data frame with columns c_inelastic and c_elastic
generate_allowed_points <- function() {
  df <- c()
  k = 1
  
  # Iterate through all possible combinations
  for (i in 0:10) {  # Inelastic control (0 to 1 in 0.1 increments)
    for (j in 0:100) {  # Elastic control (0 to 10 in 0.1 increments)
      # Check if the sum is <= 1 (constraint for valid control parameters)
      if ((i + j) / 10 <= 1) {
        df$c_inelastic[k] = i
        df$c_elastic[k] = j
        k = k + 1
      }
    }
  }
  
  # Convert to data frame and normalize values to 0-1 range
  df <- as.data.frame(df) / 10
  return(df)
}

#' Calculate Chance of Winning Based on Control Parameters
#'
#' Computes the probability of winning based on inelastic control, elastic control,
#' and number of attempts.
#'
#' @param c_in Inelastic controllability parameter (0-1)
#' @param c_el Elastic controllability parameter (0-1)
#' @param num_tries Number of attempts (0-3)
#' @param pre_opt Optional pre-optimization parameter (default NULL)
#' @return Probability of winning (0-1)
chance_of_winning <- function(c_in, c_el, num_tries, pre_opt = NULL) {
  # Base chance of winning without trying is 20%
  if (num_tries == 0) {
    prob_win = 0.2
  }
  # With 1 try, get inelastic control benefit
  else if (num_tries == 1) {
    prob_win = c_in + (0.2 * (1 - c_in))
  }
  # With 2 tries, get half of elastic control benefit
  else if (num_tries == 2) {
    prob_win = c_in + (c_el / 2) + (0.2 * (1 - (c_in + (c_el / 2))))
  }
  # With 3 tries, get full elastic control benefit
  else if (num_tries == 3) {
    prob_win = c_in + c_el + (0.2 * (1 - (c_in + c_el)))
  }
  
  return(prob_win)
}

#' Calculate Action Cost
#'
#' Determines the cost associated with each action level.
#'
#' @param num_tries Number of attempts (0-3)
#' @return Cost value
action_cost <- function(num_tries) {
  if (num_tries == 0) {
    total_cost = 0
  } else if (num_tries == 1) {
    total_cost = 40
  } else if (num_tries == 2) {
    total_cost = 60
  } else if (num_tries == 3) {
    total_cost = 80
  }
  return(total_cost)
}

#' Calculate Expected Value for a Given Control Setting and Action Level
#'
#' Computes the expected value for a specific combination of control parameters
#' and action level.
#'
#' @param c_in Inelastic controllability parameter (0-1)
#' @param c_el Elastic controllability parameter (0-1)
#' @param num_tries Number of attempts (0-3)
#' @param pre_opt Pre-optimization parameter (used in some analyses)
#' @return Expected value
get_ev_new <- function(c_in, c_el, num_tries, pre_opt) {
  # Calculate the cost of the action
  total_cost = action_cost(num_tries)
  
  # Calculate probability of winning with these parameters
  prob_win = chance_of_winning(c_in, c_el, num_tries, pre_opt)
  
  # Expected value calculation:
  # (reward-cost)*prob_win - cost*(1-prob_win)
  ev = ((150 - total_cost) * prob_win) - (total_cost * (1 - prob_win))
  
  return(ev)
}

#' Calculate Expected Value (Legacy Version)
#'
#' Original version of the expected value calculation function.
#'
#' @param c_in Inelastic controllability parameter (0-1)
#' @param c_el Elastic controllability parameter (0-1)
#' @param num_tries Number of attempts (0-3)
#' @return Expected value
get_ev <- function(c_in, c_el, num_tries) {
  # Calculate the cost of the action
  total_cost = action_cost(num_tries)
  
  # Calculate probability of winning
  prob_win = chance_of_winning(c_in, c_el, num_tries)
  
  # Calculate expected value
  ev = ((150 - total_cost) * prob_win) - (total_cost * (1 - prob_win))
  
  return(ev)
}

#' Inverse Logit Function
#'
#' Transforms a value from log-odds scale to probability scale.
#'
#' @param x Value on the log-odds scale
#' @return Value on the probability scale (0-1)
inv.logit <- function(x) {
  exp(x) / (1 + exp(x))
}

#' Return Combined Expected Values
#'
#' Calculates expected values for all action levels and determines the optimal action.
#'
#' @param data Data frame containing c_inelastic and c_elastic columns
#' @param pre_opt Pre-optimization parameter (default = 1)
#' @return Data frame with added EV calculations and optimal action
return_combined_ev <- function(data, pre_opt = 1) {
  # Log status
  message("Calculating maximum expected values...")
  
  # Calculate expected values for each action level (0-3)
  data <- data %>% dplyr::mutate(
    ev_0 = get_ev_new(c_inelastic, c_elastic, 0, pre_opt),
    ev1 = get_ev_new(c_inelastic, c_elastic, 1, pre_opt),
    ev2 = get_ev_new(c_inelastic, c_elastic, 2, pre_opt),
    ev3 = get_ev_new(c_inelastic, c_elastic, 3, pre_opt)
  )
  
  # Convert to data.table for faster operations
  setDT(data)
  
  # Find the maximum expected value among all action levels
  data[, max_ev := pmax(ev_0, ev1, ev2, ev3)]
  
  # Determine which action yields the maximum expected value
  data <- data %>% dplyr::mutate(opt_actions = case_when(
    max_ev == ev_0 ~ 0,
    max_ev == ev1 ~ 1,
    max_ev == ev3 ~ 3,
    TRUE ~ 2
  ))
  
  return(data)
}

#' Generate Structured State Transitions
#'
#' Creates a vector of binary state transitions with structured randomness.
#' Specifically ensures one transition per five trials.
#'
#' @param length Length of the vector (default 30)
#' @return Vector of binary state transitions
generate_ss <- function(length = 30) {
  # Create a vector of zeros
  vector <- rep(0, length)
  
  # Determine the number of ones to be inserted
  num_ones <- length %/% 5  # Integer division - one 1 per every 5 positions
  
  # Insert ones randomly within every 5-element block
  for (i in 1:num_ones) {
    start_index <- 5 * (i - 1) + 1
    end_index <- 5 * i
    vector[sample(start_index:end_index, 1)] <- 1  # Place one 1 in each 5-element block
  }
  
  return(vector)
}

# Create output directory for figures
dir <- file.path("~/Desktop/Documents/Control_studies/Control_studies/scripts/analyses/02_modeling/figures", 
                 paste0(Sys.Date()))
if (!dir.exists(dir)) dir.create(dir)