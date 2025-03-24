# ------------------------------------------------------
# Controllability Triangles Visualization
# ------------------------------------------------------

# Load required libraries
library(hrbrthemes)
library(grDevices)
library(dplyr)
library(ggplot2)
library(scales)
library(data.table)
library(ggpubr)  # For ggarrange

# ------------------------------------------------------
# Helper Functions
# ------------------------------------------------------

#' Generate opt-in triangle data
#' 
#' @param data Input dataset
#' @param real Whether to use real data (1) or simulated data (0)
#' @return Aggregated data frame with opt-in rates
generate_opt_in_triangle <- function(data, real = 1) {
  actions_by_trial <- setDT(data)[
    !is.na(participant), 
    .(actions = max(total_actions, na.rm = TRUE)),
    by = .(participant, block, trials, c_elastic, c_inelastic)
  ]
  
  starting_from <- 15:30
  step1 <- actions_by_trial %>%
    dplyr::filter(trials %in% starting_from, actions > -1, actions < 4) %>%
    dplyr::mutate(opt_in = (actions > 0))
  
  if (real == 1) {
    step1 <- step1 %>% dplyr::filter(block > 6)
  } else {
    step1 <- step1 %>% dplyr::filter(c_elastic != .34, c_inelastic != .34)
  }
  
  actions <- step1 %>%
    dplyr::group_by(c_elastic, c_inelastic) %>%
    dplyr::summarise(
      total_actions = mean(opt_in, na.rm = TRUE),
      total_part = length(unique(participant))
    ) %>%
    dplyr::ungroup()
  
  return(actions)
}

#' Generate action count triangle data
#' 
#' @param data Input dataset
#' @param real Whether to use real data (1) or simulated data (0)
#' @return Aggregated data frame with action counts
generate_action_triangle <- function(data, real) {
  actions_by_trial <- setDT(data)[
    !is.na(participant), 
    .(actions = max(total_actions, na.rm = TRUE)),
    by = .(participant, block, trials, c_elastic, c_inelastic)
  ]
  
  starting_from <- 15:30
  step1 <- actions_by_trial %>%
    dplyr::filter(trials %in% starting_from, actions > -1, actions < 4) %>%
    dplyr::mutate(actions = if_else(actions == 0, 0, actions - 1))
  
  if (real == 1) {
    step1 <- step1 %>% dplyr::filter(block > 6)
  } else {
    step1 <- step1 %>% dplyr::filter(c_elastic != .34, c_inelastic != .34)
  }      
  
  actions <- step1 %>%
    dplyr::group_by(c_elastic, c_inelastic) %>%
    dplyr::summarise(
      total_actions = mean(actions, na.rm = TRUE),
      total_part = length(unique(participant))
    ) %>%
    dplyr::ungroup()
  
  return(actions)
}

#' Plot opt-in triangle
#' 
#' @param x Data frame with c_elastic, c_inelastic, and total_actions columns
#' @param first Whether this is the first plot (controls legend display)
#' @return ggplot object
plot_optin_triangle <- function(x, first) {
  max_alpha <- max(x$total_actions)
  
  my_palette <- colorRampPalette(c("white", "black")) 
  
  if (first == 1) {
    tit <- ''
  } else {
    tit <- ''
  }
  
  breaks <- seq(0, 1, 0.25)
  num_breaks <- length(breaks)
  
  # Determine the minimum total_actions value
  min_actions <- min(x$total_actions)
  
  # Create a custom palette where white is used for values below the minimum
  custom_palette <- c(
    rep("white", round(min_actions * 500)), 
    my_palette(500 - round(min_actions * 500))
  )
  
  # Define the red edge condition
  red_edge_condition <- function(data) {
    (data$c_inelastic == 0 & data$c_elastic >= 0 & data$c_elastic < 0.6)
  }
  
  g <- ggplot() +
    geom_tile(
      data = x, 
      aes(x = c_inelastic, y = c_elastic, fill = total_actions, alpha = total_actions)
    ) +
    geom_segment(
      data = x[red_edge_condition(x), ], 
      aes(x = 0, y = c_elastic, xend = 0, yend = c_elastic + 0.1),
      color = "#F25C54", 
      size = 1
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
  
  # Apply appropriate theme based on whether it's the first plot
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
  
  g <- g + coord_fixed(ratio = 1, xlim = c(0, 1), ylim = c(0, 1), expand = FALSE, clip = "on") +
    labs(
      x = "Inelastic controllability", 
      y = "Elastic controllability", 
      fill = "% Opt in", 
      color = "Outline color", 
      title = tit
    ) +
    scale_x_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format()) +
    scale_y_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format())
  
  return(g)
}

#' Plot extra tickets triangle
#' 
#' @param x Data frame with c_elastic, c_inelastic, and total_actions columns
#' @param first Whether this is the first plot (controls legend display)
#' @return ggplot object
plot_extra_triangle <- function(x, first) {
  max_alpha <- max(x$total_actions)
  my_palette <- colorRampPalette(c("white", "black"))
  colors <- my_palette(100)
  colors <- c("white", colors)  # Add white color as the first category
  
  # Determine the minimum total_actions value
  min_actions <- min(x$total_actions)
  
  # Create a custom palette where white is used for values below the minimum
  custom_palette <- c(
    rep("white", round(min_actions * 500)), 
    my_palette(500 - round(min_actions * 500))
  )
  
  tit <- ''
  
  g <- ggplot() +
    geom_tile(
      data = x, 
      aes(x = c_inelastic, y = c_elastic, fill = total_actions, alpha = total_actions)
    ) +
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
      title = tit
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
  
  # Apply appropriate theme based on whether it's the first plot
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
  
  return(g)
}

# ------------------------------------------------------
# Data Processing and Visualization
# ------------------------------------------------------

# Define output directory
output_dir <- 'figures'

# Generate opt-in triangle data
# Uncomment and adapt these lines when you have the data loaded
# opt_new <- generate_opt_in_triangle(data_final, 1)
# opt_old <- generate_opt_in_triangle(data_old, 1)

# Read simulation data
# elasticity_data <- read.csv('data/simulation_outputs/elasticity_reverse_march11.csv', sep = ',')
# controllability_data <- read.csv('data/simulation_outputs/controllability_data_march10.csv', sep = ',')

# Generate opt-in triangles for simulation data
# opt_elasticity <- generate_opt_in_triangle(elasticity_data, 1)
# opt_c <- generate_opt_in_triangle(controllability_data, 1)

# Generate action triangle data
# actions_new <- generate_action_triangle(data_final, 1)
# actions_old <- generate_action_triangle(data_old, 1)
# actions_sim <- generate_action_triangle(elasticity_data, 0)
# actions_control <- generate_action_triangle(controllability_data, 0)

# Create plots
# Uncomment these lines when you have the data loaded
# p1 <- plot_optin_triangle(opt_old, 1)
# p2 <- plot_optin_triangle(opt_new, 0)
# p3 <- plot_extra_triangle(actions_old, 1)
# p4 <- plot_extra_triangle(actions_new, 0)

# Combine plots and save
# ghw <- ggarrange(p1, p2, nrow = 1, ncol = 2)
# png(file.path(output_dir, 'opt_in_comparison.png'), width = 16, height = 12, units = "in", res = 500)
# print(ghw)
# dev.off()

# triangle_extra <- ggarrange(p3, p4)
# png(file.path(output_dir, 'triangle_extra.png'), width = 16, height = 12, units = "in", res = 500)
# print(triangle_extra)
# dev.off()

# Example usage:
# 1. Load your data
# 2. Uncomment the relevant sections above
# 3. Run the script to generate and save visualizations