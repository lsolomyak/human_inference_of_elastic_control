# ==============================================================================
# Elastic Controllability Model Simulation
# ==============================================================================

#'
#' Transforms a vector of values into probabilities using the softmax function.
#' 
#' @param x Numeric vector of values
#' @return Vector of probabilities that sum to 1
softmax <- function(x) {
  # Subtract max(x) for numerical stability
  exp_x <- exp(x - max(x))
  exp_x / sum(exp_x)
}


#' Elastic Controllability Model Simulation
#'
#' Simulates participant behavior based on the elastic controllability model.
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
sim_c_2s_3a_2e_perseveration_learn3 <- function(
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
  
  # Extract model parameters
  beta <- params$beta
  scale1 <- params$scale1
  scale3 <- params$scale3
  epsilon1 <- params$epsilon1
  epsilon2 <- params$epsilon2 
  kaps <- params$kaps
  alpha1 <- params$alpha1
  alpha2 <- params$alpha2
  alpha3 <- params$alpha3
  pers <- params$pers
  
  # Initialize control learning data frame
  control_learning <- data.frame(trials = seq(0, num_trials - 1))
  
  # Set controllability parameters based on condition
  if (ambiguous == 1) {
    c_inelastic <- .33
    c_elastic <- .34
  } else {
    c_inelastic <- df$c_inelastic[block]
    c_elastic <- df$c_elastic[block]
  }
  
  # Initialize beliefs about controllability
  control_learning$take_more[1] <- epsilon1 * scale1
  control_learning$take_less[1] <- epsilon1 * (1 - scale1)
  control_learning$stay_two[1] <- epsilon1 * (1 - scale1)
  control_learning$dont_stay_two[1] <- epsilon1 * scale1
  control_learning$no_c[1] <- epsilon2 * (1 - scale3)
  control_learning$yes_c[1] <- 2 * epsilon2 * scale3
  control_learning$yes_control[1] <- control_learning$yes_c[1] / 
    (control_learning$no_c[1] + control_learning$yes_c[1])
  
  # Set random seed for reproducibility if provided
  if (!is.null(seed_num)) {
    set.seed(seed_num)
  } else {
    set.seed(4) # Default seed
  }
  
  # Generate state transitions and outcome matrices
  ss_transition <- rep(generate_ss(), N / 30)
  control_learning$ss_transition <- ss_transition
  
  # Generate outcome matrices based on controllability parameters
  win_1 <- generate_random_ss(c_inelastic, N)
  win_2 <- generate_random_ss(c_inelastic + c_elastic / 2, N)
  win_3 <- generate_random_ss(c_inelastic + c_elastic, N)
  
  control_learning$win_1 <- win_1
  control_learning$win_2 <- win_2
  control_learning$win_3 <- win_3
  
  # Run simulation for N trials
  for (n in 1:N) {
    # Calculate perceived controllability
    control_learning$yes_control[n] <- control_learning$yes_c[n] / 
      (control_learning$no_c[n] + control_learning$yes_c[n])
    
    # Calculate ticket probabilities
    ticket_1 <- control_learning$take_less[n] / 
      (control_learning$take_less[n] + control_learning$take_more[n])
    
    ticket_2 <- (control_learning$stay_two[n] / 
                   (control_learning$stay_two[n] + control_learning$dont_stay_two[n])) * 
      (control_learning$take_more[n] / 
         (control_learning$take_less[n] + control_learning$take_more[n]))
    
    ticket_3 <- (control_learning$dont_stay_two[n] / 
                   (control_learning$stay_two[n] + control_learning$dont_stay_two[n])) * 
      (control_learning$take_more[n] / 
         (control_learning$take_less[n] + control_learning$take_more[n]))
    
    # Store probabilities
    control_learning$ticket_1[n] <- ticket_1
    control_learning$ticket_2[n] <- ticket_2
    control_learning$ticket_3[n] <- ticket_3
    control_learning$estimated_elasticity[n] <- control_learning$yes_control[n] - 
      control_learning$yes_control[n] * ticket_1
    
    # Calculate expected values
    control_learning$ev1[n] <- 110 * (control_learning$yes_control[n] * ticket_1 + 
                                        0.2 * (1 - control_learning$yes_control[n] * ticket_1)) - 
      (0.8 * 40 * (1 - (control_learning$yes_control[n] * ticket_1)))
    
    control_learning$ev2[n] <- 90 * (control_learning$yes_control[n] * 
                                       (ticket_1 + ticket_2) + 
                                       0.2 * (1 - (control_learning$yes_control[n] * 
                                                     (ticket_1 + ticket_2)))) - 
      (0.8 * 60 * (1 - (control_learning$yes_control[n] * (ticket_1 + ticket_2))))
    
    control_learning$ev3[n] <- 70 * (control_learning$yes_control[n] * 
                                       (ticket_1 + ticket_2 + ticket_3) + 
                                       0.2 * (1 - (control_learning$yes_control[n] * 
                                                     (ticket_1 + ticket_2 + ticket_3)))) - 
      (0.8 * 80 * (1 - (control_learning$yes_control[n] * 
                          (ticket_1 + ticket_2 + ticket_3))))
    
    # Forced actions in initial phase
    if (n < 6) {
      control_learning$total_actions[n] <- 3
    } else {
      # Action selection phase: decide based on expected values
      # Set perseveration parameter
      if (n == 6) {
        pers_n <- params$pers
      } else {
        pers_n <- params$pers
      }
      
      # Calculate action values including perseveration
      how_many <- rep(0.0, 4)
      
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
      
      # Store action values
      control_learning$zero_ticket[n] <- how_many[1]
      control_learning$one_ticket[n] <- how_many[2]
      control_learning$two_ticket[n] <- how_many[3]
      control_learning$three_ticket[n] <- how_many[4]
      
      # Select action based on softmax
      control_learning$total_actions[n] <- sample(0:3, size = 1, prob = softmax(how_many))
    }
    
    # Process outcomes based on action selection
    if (control_learning$total_actions[n] == 1) {
      control_learning$expected_outcome[n] <- control_learning$yes_control[n] * ticket_1 + 
        0.2 * (1 - control_learning$yes_control[n] * ticket_1)
      control_learning$opt[n] <- 1
      control_learning$Reward[n] <- win_1[n]
      control_learning$extra[n] <- 0
      
    } else if (control_learning$total_actions[n] == 2) {
      control_learning$Reward[n] <- win_2[n]
      control_learning$expected_outcome[n] <- (control_learning$yes_control[n] * 
                                                 (ticket_1 + ticket_2) + 
                                                 0.2 * (1 - (control_learning$yes_control[n] * 
                                                               (ticket_1 + ticket_2))))
      control_learning$opt[n] <- 1
      control_learning$extra[n] <- 1
      
    } else if (control_learning$total_actions[n] == 3) {
      control_learning$Reward[n] <- win_3[n]
      control_learning$expected_outcome[n] <- (control_learning$yes_control[n] * 
                                                 (ticket_1 + ticket_2 + ticket_3) +
                                                 0.2 * (1 - (control_learning$yes_control[n] * 
                                                               (ticket_1 + ticket_2 + ticket_3))))
      control_learning$opt[n] <- 1
      control_learning$extra[n] <- 2
      
    } else {
      control_learning$Reward[n] <- 0
      control_learning$expected_outcome[n] <- 0.2
      control_learning$opt[n] <- 0
      control_learning$extra[n] <- 0
    }
    
    # Override reward for state transitions
    if (ss_transition[n] == 1) {
      control_learning$Reward[n] <- 1
    }
    
    # Update beliefs for the next trial
    if (n < N) {
      # Copy current beliefs to next trial
      control_learning$yes_c[n + 1] <- control_learning$yes_c[n]
      control_learning$take_less[n + 1] <- control_learning$take_less[n]
      control_learning$stay_two[n + 1] <- control_learning$stay_two[n]
      control_learning$take_more[n + 1] <- control_learning$take_more[n]
      control_learning$no_c[n + 1] <- control_learning$no_c[n]
      control_learning$dont_stay_two[n + 1] <- control_learning$dont_stay_two[n]
      
      # Update beliefs based on outcomes (learning)
      if (ss_transition[n] == 0) {
        if (control_learning$Reward[n] == 1) {
          # Update for positive outcome
          if (control_learning$total_actions[n] > 0) {
            control_learning$yes_c[n + 1] <- control_learning$yes_c[n] + 1.0
          }
          
          if (control_learning$total_actions[n] == 1) {
            control_learning$take_less[n + 1] <- control_learning$take_less[n] + 1.0
          } else if (control_learning$total_actions[n] == 2) {
            control_learning$stay_two[n + 1] <- control_learning$stay_two[n] + 1.0
          }
          
        } else if (control_learning$Reward[n] == 0) {
          # Update for negative outcome
          if (control_learning$total_actions[n] == 1) {
            control_learning$take_more[n + 1] <- control_learning$take_more[n] + 1.0
          } else if (control_learning$total_actions[n] == 2) {
            control_learning$dont_stay_two[n + 1] <- control_learning$dont_stay_two[n] + 1
            control_learning$take_more[n + 1] <- control_learning$take_more[n] + 1
          } else if (control_learning$total_actions[n] == 3) {
            control_learning$no_c[n + 1] <- control_learning$no_c[n] + 1.0
            control_learning$dont_stay_two[n + 1] <- control_learning$dont_stay_two[n] + kaps
            control_learning$take_more[n + 1] <- control_learning$take_more[n] + kaps
          }
        }
      }
    }
  }
  
  # Store model parameters in output
  control_learning$c_elastic <- c_elastic
  control_learning$c_inelastic <- c_inelastic
  control_learning$epsilon1 <- epsilon1
  control_learning$epsilon2 <- epsilon2
  control_learning$scale1 <- scale1
  control_learning$scale3 <- scale3
  control_learning$kaps <- kaps
  control_learning$beta <- beta
  control_learning$pers <- pers
  control_learning$alpha1 <- alpha1
  control_learning$alpha2 <- alpha2
  control_learning$alpha3 <- alpha3
  control_learning$participant <- subs
  
  # Set block information
  if (ambiguous == 1) {
    control_learning$block <- 1
  } else {
    control_learning$block <- trial_block
  }
  
  return(control_learning)
}