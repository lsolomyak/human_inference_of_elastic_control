#' Load and Process Experimental Data
#'
#' This function loads data from multiple directories, cleans it, and filters participants
#' based on quality criteria including completion rates and accuracy.
#'
#' @param recurs Logical, whether to search subdirectories recursively
#' @return A cleaned data frame of experimental results
#' @export
#' 
#' ':=' <- function(lhs, rhs) {
frame <- parent.frame()
lhs <- as.list(substitute(lhs))
if (length(lhs) > 1)
  lhs <- lhs[-1]
if (length(lhs) == 1) {
  do.call(`=`, list(lhs[[1]], rhs), envir=frame)
  return(invisible(NULL)) 
}
if (is.function(rhs) || is(rhs, 'formula'))
  rhs <- list(rhs)
if (length(lhs) > length(rhs))
  rhs <- c(rhs, rep(list(NULL), length(lhs) - length(rhs)))
for (i in 1:length(lhs))
  do.call(`=`, list(lhs[[i]], rhs[[i]]), envir=frame)
return(invisible(NULL)) 
}



# summary of data 
summarySE <- function(data = NULL, measurevar, groupvars = NULL, na.rm = FALSE,
                      conf.interval = .95, .drop = TRUE) {
  library(plyr)
  
  # New version of length which can handle NA's: if na.rm==T, don't count them
  length2 <- function(x, na.rm = FALSE) {
    if (na.rm) {
      sum(!is.na(x))
    } else {
      length(x)
    }
  }
  
  # This does the summary. For each group's data frame, return a vector with
  # N, mean, median, and sd
  
  datac <- plyr::ddply(data, groupvars, .drop=.drop,
                       .fun = function(xx, col) {
                         c(N      = length2(xx[[col]], na.rm=na.rm),
                           mean   = mean(xx[[col]], na.rm=na.rm),
                           median = median(xx[[col]], na.rm=na.rm),
                           sd      = sd(xx[[col]], na.rm=na.rm)
                         )
                       },
                       measurevar
  )
  
  # Rename the "mean" and "median" columns    
  datac <- plyr::rename(datac, c("mean" = paste(measurevar, "_mean", sep = "")))
  datac <- plyr::rename(datac, c("median" = paste(measurevar, "_median", sep = "")))
  
  datac$se <- datac$sd / sqrt(datac$N)  # Calculate standard error of the mean
  
  # Confidence interval multiplier for standard error
  # Calculate t-statistic for confidence interval:
  # e.g., if conf.interval is .95, use .975 (above/below), and use df=N-1
  ciMult <- qt(conf.interval / 2 + .5, datac$N - 1)
  datac$ci <- datac$se * ciMult
  
  return(datac)
}


load_data <- function(recurs = FALSE) {
  # Required packages
  require(readr)
  require(data.table)
  require(dplyr)
  require(zoo)  # For na.locf
  require(tidyr)
  
  # Source helper functions
  source("scripts/analyses/01model_free/accuracy_check.R")
  
  message("Loading data...")
  
  # Create lists of file paths 
  data_paths <- list(
    initial_study = list.files("data/initial_study", pattern = "*.csv", 
                               full.names = TRUE, recursive = recurs),
    replication_study = list.files("data/replication_study", pattern = "*.csv", 
                                   full.names = TRUE, recursive = recurs)
  )
  
  # Read all CSV files
  message("Reading CSV files...")
  data_sets <- list(
    initial = lapply(data_paths$initial_study, function(file) {
      read_csv(file, show_col_types = FALSE)
    }),
    replication = lapply(data_paths$replication_study, function(file) {
      read_csv(file, show_col_types = FALSE)
    })
  )
  
  # Combine data frames
  message("Combining data sets...")
  initial_data <- rbindlist(data_sets$initial, fill = TRUE)
  replication_data <- rbindlist(data_sets$replication, fill = TRUE)
  
  # Combine all data into a single dataset
  # Add a source column to track which study the data came from
  initial_data$source <- "initial"
  replication_data$source <- "replication"
  
  # Combine into one dataset
  dats <- rbindlist(list(initial_data, replication_data), fill = TRUE)
  
  # Convert participant ID to numeric
  dats$participant <- as.numeric(dats$participant)
  
  # Define columns to keep
  cols_to_keep <- c(
    'participant', 'id', 'block', 'date', 'trials', 
    'c_inelastic', 'c_elastic', 'ss_transition', 'total_actions', 
    'opt_in.keys', 'correct_chosen', 'trial_reward', 'cdf_pos', 
    'action_2.rt', 'slider_7.response', 'slider_excited.response', 'opt_in.rt',
    'trial_started', 'trial_ended_real'
  )
  
  # Find the first row with non-NA c_inelastic value
  index_to_start <- which(!is.na(dats$c_inelastic))[1]
  
  # Subset data from that index and keep only selected columns
  dats <- setDT(dats)[index_to_start:nrow(dats), ..cols_to_keep]
  
  # Fill missing values for specific columns
  cols_to_fill <- c("participant", "id", "c_inelastic", "c_elastic", "block", "trials", "ss_transition")
  dats$ss_transition[1] <- 0  # Initialize first value
  dats[, (cols_to_fill) := lapply(.SD, na.locf), .SDcols = cols_to_fill]
  
  # Filter to keep only non practice data here 
  dats <- dats %>% 
    dplyr::filter(block >= 6) %>%
    mutate_all(function(x) ifelse(x == "", NaN, x))
  
 
  # Summarize data by groups
  message("Summarizing data...")
  dats_summarized <- dats %>%
    dplyr::group_by(participant, id, block, trials, date, c_inelastic, c_elastic) %>%
    dplyr::summarise(
      ss_transition = mean(ss_transition, na.rm = TRUE),
      total_actions = mean(total_actions, na.rm = TRUE),
      opt_in.keys = first(opt_in.keys),
      opt_in.rt = first(opt_in.rt),
      correct_chosen = mean(correct_chosen, na.rm = TRUE),
      trial_reward = mean(trial_reward, na.rm = TRUE),
      cdf_pos = mean(cdf_pos, na.rm = TRUE),
      action_2.rt = mean(action_2.rt, na.rm = TRUE)) %>%
    ungroup() %>%
    dplyr::mutate(across(all_of(slider_cols), ~ sapply(., function(x) {
      if(all(is.na(x))) NA else na.omit(x)[1]
    })))
  
  # Load participant group data (if available)
  both_groups_path <- 'data/participant_groups.csv'
  if (file.exists(both_groups_path)) {
    both_groups <- read_csv(both_groups_path)
    # Filter only participants in the both_groups dataset
    dats_filtered <- dats_summarized %>% 
      dplyr::filter(participant %in% both_groups$participant)
    message(paste("Filtered to", length(unique(dats_filtered$participant)), 
                  "participants from groups file"))
  } else {
    message("No participant groups file found. Using all participants.")
    dats_filtered <- dats_summarized
  }
  

  # Check accuracy and filter participants with ≥90% accuracy
  message("Checking accuracy and filtering participants...")
  
  # Check if the summarySE function is available, otherwise define it
  if (!exists("summarySE", mode = "function")) {
    message("summarySE function not found, using built-in summary instead")
    # Simple alternative if summarySE is not available
    accr <- dats_filtered %>%
      dplyr::group_by(participant) %>%
      dplyr::summarize(
        correct_chosen_mean = mean(correct_chosen, na.rm = TRUE),
        correct_chosen_sd = sd(correct_chosen, na.rm = TRUE),
        correct_chosen_n = sum(!is.na(correct_chosen))
      )
  } else {
    accr <- summarySE(dats_filtered, measurevar = "correct_chosen", 
                      groupvars = "participant", na.rm = TRUE)
  }
  
  message(paste('Proportion of subjects with ≥90% accuracy:', 
                mean(accr$correct_chosen_mean > 0.90, na.rm = TRUE)))
  
  accr <- accr[accr$correct_chosen_mean >= 0.90, ]
  dats <- dats_filtered %>% dplyr::filter(participant %in% accr$participant)
  message(paste("Number of participants after accuracy filter:", length(unique(dats$participant))))
  
  # Filter participants who completed exactly 4 blocks
  summary <- dats %>%
    dplyr::group_by(participant) %>%
    dplyr::summarize(blocks_completed = n_distinct(block))
  
  participants_with_4_blocks <- summary %>%
    dplyr::filter(blocks_completed == 4)
  
  dats1 <- dats %>% dplyr::filter(participant %in% participants_with_4_blocks$participant)
  message(paste("Number of participants after block completion filter:", 
                length(unique(dats1$participant))))
  
  # Make sure participants were exposed to unique combinations in blocks 7-9
  summary <- dats1 %>%
    dplyr::filter(block %in% c(7, 8, 9), trials == 25) %>%
    dplyr::group_by(participant) %>%
    dplyr::summarize(unique_combinations = n_distinct(paste0(c_elastic, c_inelastic)))
  
  unique_3 <- summary %>% dplyr::filter(unique_combinations == 3)
  dats <- dats1 %>% dplyr::filter(participant %in% unique_3$participant)
  message(paste("Number of participants after unique combinations filter:", 
                length(unique(dats$participant))))
  
  # Final data cleanup
  dats <- dats %>% 
    dplyr::select(-opt_in.keys) %>%
    dplyr::group_by(participant, id, block, trials, c_inelastic, c_elastic) %>% 
    dplyr::summarise(
      ss_transition = mean(ss_transition, na.rm = TRUE),
      total_actions = mean(total_actions, na.rm = TRUE),
      trial_reward = mean(trial_reward, na.rm = TRUE)
    ) %>%
    dplyr::ungroup() %>%
    drop_na()
  
  # Function to check and filter participants by action levels
  check_opt_levels <- function(data_subset) {
    too_many <- data_subset %>% 
      dplyr::group_by(participant) %>% 
      dplyr::filter(trials > 4) %>% 
      dplyr::summarise(
        mean0 = mean(total_actions == 0, na.rm = TRUE),
        mean1 = mean(total_actions == 1, na.rm = TRUE),
        mean2 = mean(total_actions == 2, na.rm = TRUE),
        mean3 = mean(total_actions == 3, na.rm = TRUE)
      ) %>% 
      ungroup()
    
    too_manys <- too_many %>% 
      dplyr::filter(mean0 >= 0.9 | mean1 > 0.9 | mean2 > 0.9 | mean3 > 0.9)
    
    message("Removing participants with >90% identical actions:")
    print(too_manys)
    
    data_filtered <- data_subset %>% 
      dplyr::filter(!participant %in% too_manys$participant)
    
    message(paste("Final participant count:", length(unique(data_filtered$participant))))
    return(data_filtered)
  }
  
  # Apply final filtering
  dats_final <- check_opt_levels(dats)
  
  return(dats_final)
}

