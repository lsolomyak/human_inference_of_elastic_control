# ------------------------------------------------------
# Heatmap of Extra Actions by Controllability 
# ------------------------------------------------------

# Load required libraries
library(hrbrthemes)
library(ggplot2)
library(dplyr)
library(data.table)
library(scales)

# ------------------------------------------------------
# Custom Theme for Triangle Plots
# ------------------------------------------------------

#' Custom theme for triangle plots with clean, minimal appearance
spec_theme_triangle <- theme(
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

# ------------------------------------------------------
# Visualization Functions
# ------------------------------------------------------

#' Plot heatmap triangle of extra actions
#' 
#' @param x Data frame with c_elastic, c_inelastic, and total_actions columns
#' @param starting Starting trial number (for file naming)
#' @return ggplot object with heatmap visualization
plot_extra_triangle <- function(x, starting) {
  # Create a black and white color palette
  my_palette <- colorRampPalette(c("white", "black"))
  
  # Create the plot
  g <- ggplot() +
    geom_tile(data = x, aes(x = c_inelastic, y = c_elastic, fill = total_actions)) +
    scale_fill_gradientn(
      colors = my_palette(100), 
      name = "Extra tickets", 
      limits = c(0, max(x$total_actions)), 
      breaks = seq(0, max(x$total_actions), 0.2)
    ) +
    spec_theme_triangle +
    coord_fixed(ratio = 1, xlim = NULL, ylim = NULL, expand = FALSE, clip = "on") +
    labs(x = "Inelastic controllability", y = "Elastic controllability", alpha = "total_actions") +
    scale_x_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format()) +
    scale_y_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format())
  
  # Save the plot
  output_dir <- 'figures'
  if (!dir.exists(output_dir)) {
    dir.create(output_dir, recursive = TRUE)
  }
  
  png(file.path(output_dir, 'action_heatmap.png'), width = 13, height = 8, units = "in", res = 300)
  print(g)
  dev.off()
  
  return(g)
}

#' Generate and process data for action triangle visualization
#' 
#' @param data Input dataset
#' @param real Whether to use real data (1) or not (0)
#' @return List containing processed data and plot
generate_action_triangle <- function(data, real = 1) {
  # Extract actions by trial
  actions_by_trial <- setDT(data)[
    !is.na(participant), 
    .(actions = max(total_actions, na.rm = TRUE)),
    by = .(participant, block, trials, c_elastic, c_inelastic)
  ]
  
  # Filter and process data
  starting_from <- 15:30
  step1 <- actions_by_trial %>%
    dplyr::filter(trials %in% starting_from, actions > -1, actions < 4) %>%
    dplyr::mutate(actions = if_else(actions == 0, 0, actions - 1))
  
  if (real == 1) {
    step1 <- step1 %>% dplyr::filter(block > 6)
  }
  
  # Aggregate data
  actions <- step1 %>%
    dplyr::group_by(c_elastic, c_inelastic) %>%
    dplyr::summarise(
      total_actions = mean(actions, na.rm = TRUE),
      total_part = length(unique(participant))
    ) %>%
    dplyr::ungroup()
  
  # Generate plot
  g <- plot_extra_triangle(actions, starting_from[1])
  
  return(list(actions, g))
}

# ------------------------------------------------------
# Usage Example
# ------------------------------------------------------

# Uncomment the following line when you have loaded your data
# results <- generate_action_triangle(data_final, 1)
# actions <- results[[1]]
# plot <- results[[2]]

# Alternative syntax with destructuring (data.table style)
# c(actions, g) := generate_action_triangle(data_final, 1)