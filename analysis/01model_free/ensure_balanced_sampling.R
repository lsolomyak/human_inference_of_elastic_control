# ------------------------------------------------------
# Experimental Setup and Data Processing for Controllability Study
# ------------------------------------------------------

# Load required libraries
library(dplyr)
library(ggplot2)
library(data.table)
library(zoo)      # For na.locf
library(ggpubr)   # For ggarrange

# ------------------------------------------------------
# Helper Functions
# ------------------------------------------------------

#' Get combinations of controllability conditions in the data
#' 
#' @param data Input dataset
#' @return Data frame with counts of each c_elastic/c_inelastic combination
get_data_combos <- function(data) {
  find_combinations <- function(df) {
    df %>%
      dplyr::group_by(c_elastic, c_inelastic) %>%
      dplyr::summarise(count = n()) %>%
      ungroup()
  }
  
  pairs_done <- data %>% 
    filter(block > 6 & trials %in% 0:28) %>% 
    group_by(participant, block) %>% 
    dplyr::summarise(
      c_elastic = mean(c_elastic),
      c_inelastic = mean(c_inelastic)
    )
  
  pairs_done2 <- find_combinations(pairs_done)
  
  return(pairs_done2)
}

#' Plot triangle heatmap visualization of condition frequencies
#' 
#' @param pairs_done2 Data frame with c_elastic, c_inelastic, and count columns
#' @return ggplot object
plot_triangle <- function(pairs_done2) {
  p1 <- ggplot(pairs_done2, aes(x = c_inelastic, y = c_elastic, fill = as.factor(count))) +
    geom_tile() +
    ggtitle("Current Condition Distribution") +
    labs(x = "Inelastic Controllability", y = "Elastic Controllability", fill = "Number of Blocks") +
    theme_minimal() +
    theme(
      axis.text = element_text(size = 12),
      axis.title = element_text(size = 14, face = "bold"),
      plot.title = element_text(size = 16, face = "bold"),
      legend.title = element_text(size = 12)
    )
  
  return(p1)
}

#' Get possible combinations from the predefined configuration file
#' 
#' @return Data frame with all possible controllability combinations
get_possible_combinations <- function() {
  # Load combinations from CSV
  combinations <- read.csv("data/config/subject_breakdown.csv")
  
  # Add optimal actions and filter for balanced designs
  combinations <- return_max_ev(combinations) %>% 
    select(c_elastic, c_inelastic, opt_actions, id)
  
  # Check if combinations have all three optimal actions
  combinations %>% 
    dplyr::group_by(id) %>% 
    dplyr::summarise(totals = n_distinct(opt_actions)) %>% 
    ungroup() -> check_d
  
  combinations <- left_join(combinations, check_d, by = "id")
  
  # Filter for combinations with all three optimal actions
  combinations <- combinations %>% 
    dplyr::group_by(id) %>% 
    dplyr::filter(totals == 3)
  
  # Ensure correct ID assignment
  n_ids = nrow(combinations) / 3
  vector_length <- nrow(combinations)
  repeated_numbers <- rep(1:n_ids, each = 3)
  vector <- rep(repeated_numbers, length.out = vector_length)
  combinations$id = vector
  
  return(combinations)
}

# ------------------------------------------------------
# Data Loading and Processing
# ------------------------------------------------------

# Source required helper functions
source("scripts/analyses/01model_free/return_max_ev.R")

# Load existing data
# Uncomment when running with actual data:
# load("data/data_30_5_experiment/data_july19.RData")
# c(new_data, dir) := load_data(1)

# Get the combinations from current data
# Uncomment when running with actual data:
# old_combos = get_data_combos(dats %>% filter(block > 6, trials == 21))
# new_combos = get_data_combos(new_data %>% filter(block > 6, trials == 21))

# Combine the data for visualization
# blocks_fig <- full_join(old_combos, new_combos, by = c("c_elastic", "c_inelastic")) %>%
#   mutate(count = coalesce(count.x, 0) + coalesce(count.y, 0)) %>%
#   select(c_elastic, c_inelastic, count) %>% 
#   dplyr::filter(count > 3)

# Visualize current distribution
# fig_before <- plot_triangle(blocks_fig)

# ------------------------------------------------------
# Generate Balanced Design for Next Participants
# ------------------------------------------------------

#' Generate balanced design for next set of participants
#' 
#' @param blocks_fig Current distribution of conditions
#' @param n_participants Number of new participants to generate conditions for
#' @return List containing new condition assignments and updated distribution
generate_balanced_design <- function(blocks_fig, n_participants = 20) {
  # Get possible combinations
  combos <- get_possible_combinations() %>% 
    select(c_inelastic, c_elastic, id)
  
  # Initialize storage for added conditions
  rows_added <- data.frame()
  entry_point <- 0  # Will be set in first iteration
  
  # Join with current distribution
  combos <- left_join(combos, blocks_fig, by = c("c_elastic", "c_inelastic"))
  
  # For each new participant
  for (i in 1:n_participants) {
    # Set initial entry point if first iteration
    if (i == 1) {
      # Uncomment and adjust when running with actual data:
      # entry <- max(new_data$participant) / 1000 * 3 + 4
      entry <- 3  # Default placeholder
      combos_old <- combos[1:entry, ]
    } else {
      combos_old <- combos_old[1:entry, ]
    }
    
    # Find IDs with minimal count
    rank_combos <- combos %>% 
      dplyr::group_by(id) %>% 
      dplyr::summarise(total_count = sum(count, na.rm = TRUE)) %>% 
      dplyr::filter(total_count == min(total_count, na.rm = TRUE)) %>% 
      dplyr::inner_join(combos, by = "id") %>%
      dplyr::distinct()
    
    # Randomly select one combination
    random_choice <- sample(1:nrow(rank_combos), 1)
    new_three <- combos[combos$id == rank_combos$id[random_choice], ]
    
    # Add optimal actions and order by them
    new_three <- return_max_ev(new_three)
    new_three <- new_three[order(new_three$opt_actions, decreasing = TRUE), ]
    new_three <- new_three %>% select(c_inelastic, c_elastic, count, id)
    
    # Add to output and update counts
    combos_old <- bind_rows(combos_old, new_three)
    rows_added <- bind_rows(rows_added, new_three)
    entry <- entry + 3
    
    # Update counts in distribution
    blocks_fig <- blocks_fig %>% 
      dplyr::mutate(combined_en = paste(c_elastic, c_inelastic, sep = '_'))
    new_three <- new_three %>% 
      dplyr::mutate(combined_en = paste(c_elastic, c_inelastic, sep = '_'))
    blocks_fig <- blocks_fig %>% 
      dplyr::mutate(
        count = if_else(
          combined_en %in% new_three$combined_en,
          count + 1,
          count
        )
      )
  }
  
  # Standardize column names
  colnames(blocks_fig) <- c("c_elastic", "c_inelastic", "count", "combined_en")
  
  return(list(
    new_design = combos_old,
    updated_distribution = blocks_fig
  ))
}

# Generate balanced design for next participants
# Uncomment when running with actual data:
# balanced_design <- generate_balanced_design(blocks_fig, n_participants = 20)
# combos_old <- balanced_design$new_design
# blocks_fig <- balanced_design$updated_distribution

# Visualize updated distribution
# fig_after <- plot_triangle(blocks_fig %>% 
#   rename(c_elastic = c_elastic, c_inelastic = c_inelastic, count = count))
# 
# fig_after <- fig_after + ggtitle("After Next Sample of 20 Participants")
# 
# # Combine visualizations
# gs <- ggarrange(fig_before, fig_after)
# 
# # Save visualization
# n <- length(unique(data$participant))
# output_dir <- "figures"
# if (!dir.exists(output_dir)) {
#   dir.create(output_dir, recursive = TRUE)
# }
# 
# png(
#   file.path(output_dir, paste0("participant_distribution_", n, "to", n+20, ".png")), 
#   width = 11, height = 7, units = "in", res = 300
# )
# print(gs)
# dev.off()

# ------------------------------------------------------
# Alternative Method for Generating Balanced Design
# ------------------------------------------------------

#' Generate balanced design using an alternative method
#' 
#' @param blocks_fig Current distribution of conditions
#' @param n_participants Number of new participants to generate conditions for
#' @return Data frame with balanced design for new participants
generate_alternative_design <- function(blocks_fig, n_participants = 15) {
  # Add optimal actions
  blocks_figs <- blocks_fig %>% 
    filter(count < 12) %>% 
    return_max_ev()
  
  blocks_figs$count <- as.numeric(blocks_figs$count)
  
  # Order by count
  blocks_figs <- blocks_figs[order(blocks_figs$count), ]
  
  # Initialize combinations list
  combinations <- list()
  
  # While we don't have enough combinations
  while (length(combinations) < n_participants) {
    # Temporary list to store current combination
    temp <- list()
    
    # Select rows with opt_actions = 1, then 0, then 3
    for (opt_action in c(1, 0, 3)) {
      # Get the row with the smallest count that has not been used in this combination
      row_indices <- which(
        blocks_figs$opt_actions == opt_action & 
          !(1:nrow(blocks_figs) %in% unlist(temp))
      )
      
      if (length(row_indices) > 0) {
        # Add to current combination
        temp <- c(temp, list(row_indices[1]))
      }
    }
    
    # If we have 3 rows
    if (length(temp) == 3) {
      # Add to combinations
      combinations <- c(combinations, list(temp))
      
      # Increase count of used rows
      for (row_idx in temp) {
        blocks_figs[row_idx, "count"] <- blocks_figs[row_idx, "count"] + 1
      }
      
      # Reorder blocks_figs
      blocks_figs <- blocks_figs[order(blocks_figs$count), ]
    } else {
      # Break if we can't find enough combinations
      break
    }
  }
  
  # Combine all combinations into a single dataframe
  final_blocks <- do.call(
    rbind, 
    lapply(combinations, function(x) blocks_figs[unlist(x), ])
  )
  
  return(final_blocks)
}

# Generate alternative design
# Uncomment when running with actual data:
# alternative_design <- generate_alternative_design(blocks_fig, n_participants = 15)

# ------------------------------------------------------
# Save Results
# ------------------------------------------------------

# Save new design to CSV
# Uncomment when running with actual data:
# write.csv(combos_old, "data/config/subject_breakdown.csv", row.names = FALSE)
# 
# # Backup old file first
# file.rename('data/config/subject_breakdown.csv', 'data/config/subject_breakdown_backup.csv')
# 
# # Save alternative design if preferred
# # write.csv(alternative_design, "data/config/subject_breakdown.csv", row.names = FALSE)

# ------------------------------------------------------
# Track Optimal Actions by Block
# ------------------------------------------------------

#' Analyze and visualize distribution of optimal actions by block
#' 
#' @param data Combined dataset
#' @return Plot showing optimal action distribution across blocks
track_optimal_actions <- function(data) {
  # Process data
  dd <- data %>% 
    filter(block > 6) %>%
    dplyr::select(participant, block, trials, c_elastic, c_inelastic, 
                  total_actions, trial_reward, ss_transition)
  
  # Handle missing values
  dd$ss_transition <- na.locf(dd$ss_transition)
  dd <- dd %>% drop_na()
  
  # Process data for analysis
  dd$num_tries <- dd$total_actions
  dd <- dd[!duplicated(dd), ]
  dd$rewarded <- if_else(dd$trial_reward > 0, 1, 0)
  dd$total_actions <- if_else(dd$total_actions > 0, dd$total_actions - 1, 0)
  
  # Add optimal actions
  dd <- return_max_ev(dd)
  
  # Adjust block numbering
  dd$block <- dd$block - 6
  dd$part <- match(dd$participant, sort(unique(dd$participant)))
  dd$block_num <- (dd$part - 1) * 4 + dd$block
  
  # Count optimal actions by block
  block_ot <- dd %>% dplyr::count(block, opt_actions)
  
  # Create visualization
  g <- ggplot(block_ot, aes(x = factor(block), y = n, fill = factor(opt_actions))) +
    geom_col(position = "dodge") +
    labs(
      x = "Block Number",
      y = "Count",
      fill = "Optimal Actions",
      title = "Distribution of Optimal Actions by Block"
    ) +
    theme_minimal() +
    theme(
      axis.text = element_text(size = 12),
      axis.title = element_text(size = 14, face = "bold"),
      plot.title = element_text(size = 16, face = "bold"),
      legend.title = element_text(size = 12)
    )
  
  return(g)
}

# Analyze and visualize optimal actions
# Uncomment when running with actual data:
# common_cols <- intersect(names(dats), names(new_data))
# dt1_subset <- dats[, ..common_cols]
# dt2_subset <- new_data[, ..common_cols]
# data <- rbind(dt1_subset, dt2_subset)
# 
# opt_action_plot <- track_optimal_actions(data)
# 
# png(
#   file.path(output_dir, "tracking_optimal_actions.png"), 
#   width = 11, height = 7, units = "in", res = 300
# )
# print(opt_action_plot)
# dev.off()