# ==============================================================================
# Standard Controllability Model Simulation
# ==============================================================================

#' Softmax Function for Action Selection
#'
#' Transforms a vector of values into probabilities using the softmax function.
#' 
#' @param x Numeric vector of values
#' @return Vector of probabilities that sum to 1
softmax <- function(x) {
  exp(x) / sum(exp(x))
}

#' Generate Random SS Value
#'
#' Helper function to generate random success/failure based on controllability.
#'
#' @param c_val Controllability value
#' @param n Number of values to generate
#' @return Vector of binary outcomes (0 or 1)
generate_random_ss <- function(c_val, n) {
  sample(c(0, 1), size = n, replace = TRUE, prob = c(1 - c_val, c_val))
}

#' Generate SS Transition
#'
#' Helper function to generate state transitions.
#'
#' @param n Number of transitions to generate
#' @return Vector of binary state transitions
generate_ss <- function(n = 30) {
  sample(c(0, 1), size = n, replace = TRUE, prob = c(0.8, 0.2))
}

#' Standard Controllability Model Simulation with Perseveration
#'
#' Simulates participant behavior based on the standard controllability model
#' with perseveration parameter.
#'
#' @param df Data frame containing experimental conditions
#' @param control_learning Optional pre-existing control learning data frame
#' @param block Block number to simulate
#' @param params List of model parameters
#' @param ambiguous Boolean flag for ambiguous condition
#' @param subs Subject/participant ID
#' @param trial_block Trial block number
#' @param forced_choice Whether to use forced choice (default = 1)
#' @param seed_num Random seed for reproducibility
#' @return Data frame with simulation results
sim_nc_3s_3a_3e_perseveration <- function(
    df, 
    control_learning = NULL,
    block, 
    params, 
    ambiguous = 0, 
    subs = "sim", 
    trial_block = 1, 
    forced_choice = 1, 
    seed_num = NULL
) {
  # Initialize simulation parameters
  num_trials <- 30
  N <- num_trials
  
  # Initialize control learning data frame
  control_learning <- data.frame(trials = seq(0, num_trials - 1))
  
  # Extract model parameters
  beta <- params$beta + 0.05
  scale1 <- params$scale1
  scale2 <- params$scale2
  scale3 <- params$scale3
  epsilon1 <- params$epsilon1
  epsilon2 <- params$epsilon2
  epsilon3 <- params$epsilon3
  alpha1 <- params$alpha1
  alpha2 <- params$alpha2
  alpha3 <- params$alpha3
  pers <- params$pers
  
  # Set controllability parameters based on condition
  if (ambiguous == 1) {
    c_inelastic <- 0.33
    c_elastic <- 0.34
  } else {
    c_inelastic <- df$c_inelastic[block]
    c_elastic <- df$c_elastic[block]
  }
  
  # Initialize action values vector
  how_many <- rep(0.0, 4)
  
  # Initialize beliefs about controllability
  control_learning$one_ticket_a[1] <- epsilon1 * scale1
  control_learning$one_ticket_b[1] <- 2 * epsilon1 * (1 - scale1)
  control_learning$two_ticket_a[1] <- 1.5 * epsilon2[1] * scale2
  control_learning$two_ticket_b[1] <- 1.5 * epsilon2[1] * (1 - scale2)
  control_learning$three_ticket_a[1] <- 2 * epsilon3[1] * scale3
  control_learning$three_ticket_b[1] <- epsilon3[1] * (1 - scale3)
  
  # Set random seed for reproducibility if provided
  if (!is.null(seed_num)) {
    set.seed(seed_num)
  }
  
  # Generate state transitions
  ss_transition <- generate_ss()
  control_learning$ss_transition <- ss_transition
  
  # Generate outcome matrices based on controllability parameters
  win_1 <- c(
    generate_random_ss(c_inelastic, 10),
    generate_random_ss(c_inelastic, 10),
    generate_random_ss(c_inelastic, 10)
  )
  
  win_2 <- c(
    generate_random_ss(c_inelastic + c_elastic / 2, 10),
    generate_random_ss(c_inelastic + c_elastic / 2, 10),
    generate_random_ss(c_inelastic + c_elastic / 2, 10)
  )
  
  win_3 <- c(
    generate_random_ss(c_inelastic + c_elastic, 10),
    generate_random_ss(c_inelastic + c_elastic, 10),
    generate_random_ss(c_inelastic + c_elastic, 10)
  )
  
  # Store outcome matrices
  control_learning$win_1 <- win_1
  control_learning$win_2 <- win_2
  control_learning$win_3 <- win_3
  
  # Initialize expected values
  control_learning$ev3[1] <- 30
  control_learning$ev2[1] <- 30
  control_learning$ev1[1] <- 30
  
  # Run simulation for N trials
  for (n in 1:N) {
    # Calculate expected values for each action
    p1 <- control_learning$one_ticket_a[n] / 
      (control_learning$one_ticket_a[n] + control_learning$one_ticket_b[n])
    p2 <- control_learning$two_ticket_a[n] / 
      (control_learning$two_ticket_a[n] + control_learning$two_ticket_b[n])
    p3 <- control_learning$three_ticket_a[n] / 
      (control_learning$three_ticket_a[n] + control_learning$three_ticket_b[n])
    
    # Expected value calculations
    control_learning$ev1[n] <- 110 * (p1 + 0.2 * (1 - p1)) - 0.8 * 40 * (1 - p1)
    control_learning$ev2[n] <- 90 * (p2 + 0.2 * (1 - p2)) - 0.8 * 60 * (1 - p2)
    control_learning$ev3[n] <- 70 * (p3 + 0.2 * (1 - p3)) - 0.8 * 80 * (1 - p3)
    
    # Forced actions in initial phase
    if (n < 6) {
      control_learning$total_actions[n] <- 3
    } else {
      # Set perseveration parameter
      if (n == 6) {
        pers_n <- params$pers
      } else {
        pers_n <- params$pers
      }
      
      # Calculate action values including perseveration
      if (n > 1) {
        how_many[1] <- beta * 30 + (control_learning$total_actions[n - 1] == 0) * pers_n
        how_many[2] <- beta * control_learning$ev1[n] + alpha1 + 
          (control_learning$total_actions[n - 1] == 1) * pers_n
        how_many[3] <- beta * control_learning$ev2[n] + alpha2 + 
          (control_learning$total_actions[n - 1] == 2) * pers_n
        how_many[4] <- beta * control_learning$ev3[n] + alpha3 + 
          (control_learning$total_actions[n - 1] == 3) * pers_n
      } else {
        how_many[1] <- beta * 30
        how_many[2] <- beta * control_learning$ev1[n] + alpha1
        how_many[3] <- beta * control_learning$ev2[n] + alpha2
        how_many[4] <- beta * control_learning$ev3[n] + alpha3
      }
      
      # Select action based on softmax
      control_learning$total_actions[n] <- sample(0:3, size = 1, prob = softmax(how_many))
    }
    
    # Determine reward based on state transition and action
    if (ss_transition[n] == 1) {
      control_learning$Reward[n] <- 1
    } else {
      if (control_learning$total_actions[n] == 1) {
        control_learning$Reward[n] <- win_1[n]
      } else if (control_learning$total_actions[n] == 2) {
        control_learning$Reward[n] <- win_2[n]
      } else if (control_learning$total_actions[n] == 3) {
        control_learning$Reward[n] <- win_3[n]
      } else {
        control_learning$Reward[n] <- 0
      }
    }
    
    # Update beliefs for the next trial
    if (n < N) {
      # Copy current beliefs to next trial
      control_learning$one_ticket_a[n + 1] <- control_learning$one_ticket_a[n]
      control_learning$one_ticket_b[n + 1] <- control_learning$one_ticket_b[n]
      control_learning$two_ticket_a[n + 1] <- control_learning$two_ticket_a[n]
      control_learning$two_ticket_b[n + 1] <- control_learning$two_ticket_b[n]
      control_learning$three_ticket_a[n + 1] <- control_learning$three_ticket_a[n]
      control_learning$three_ticket_b[n + 1] <- control_learning$three_ticket_b[n]
      
      # Update beliefs based on outcomes (learning)
      if (ss_transition[n] == 0) {
        if (control_learning$Reward[n] == 1) {
          # Update for positive outcome
          if (control_learning$total_actions[n] == 1) {
            control_learning$one_ticket_a[n + 1] <- control_learning$one_ticket_a[n] + 1.0
          } else if (control_learning$total_actions[n] == 2) {
            control_learning$two_ticket_a[n + 1] <- control_learning$two_ticket_a[n] + 1.0
          } else if (control_learning$total_actions[n] == 3) {
            control_learning$three_ticket_a[n + 1] <- control_learning$three_ticket_a[n] + 1.0
          }
        } else if (control_learning$Reward[n] == 0) {
          # Update for negative outcome
          if (control_learning$total_actions[n] == 1) {
            control_learning$one_ticket_b[n + 1] <- control_learning$one_ticket_b[n] + 1
          } else if (control_learning$total_actions[n] == 2) {
            control_learning$two_ticket_b[n + 1] <- control_learning$two_ticket_b[n] + 1
          } else if (control_learning$total_actions[n] == 3) {
            control_learning$three_ticket_b[n + 1] <- control_learning$three_ticket_b[n] + 1
          }
        }
      }
    }
  }
  
  # Store model parameters in output
  control_learning$c_elastic <- c_elastic
  control_learning$c_inelastic <- c_inelastic
  control_learning$epsilon1 <- params$epsilon1
  control_learning$epsilon2 <- params$epsilon2
  control_learning$epsilon3 <- params$epsilon3
  control_learning$scale1 <- params$scale1
  control_learning$scale2 <- params$scale2
  control_learning$scale3 <- params$scale3
  control_learning$beta <- params$beta
  control_learning$pers <- params$pers
  control_learning$alpha1 <- params$alpha1
  control_learning$alpha2 <- params$alpha2
  control_learning$alpha3 <- params$alpha3
  control_learning$participant <- subs
  
  # Set block information
  if (ambiguous == 1) {
    control_learning$block <- 1
  } else {
    control_learning$block <- trial_block
  }
  
  return(control_learning)
}