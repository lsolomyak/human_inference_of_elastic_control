# ------------------------------------------------------
# Optimal Action Decision Visualization Based on Controllability
# ------------------------------------------------------

# Load required packages
library(matrixStats)
library(hrbrthemes)
library(dplyr)
library(ggplot2)
library(scales)

# ------------------------------------------------------
# Helper Functions
# ------------------------------------------------------

#' Generate grid of allowed points in controllability space
#' 
#' @return dataframe with columns for inelastic and elastic controllability values
generate_allowed_points <- function() {
  df <- c()
  k <- 1
  for (i in 0:10) {  # inelastic controllability
    for (j in 0:10) {  # elastic controllability
      if ((i + j)/10 <= 1) {
        df$c_inelastic[k] <- i
        df$c_elastic[k] <- j 
        k <- k + 1
      }  
    }
  }
  df <- as.data.frame(df)/10
  return(df)
}

#' Calculate probability of winning based on controllability and number of tries
#' 
#' @param c_inelastic inelastic controllability (0-1)
#' @param c_elastic elastic controllability (0-1)
#' @param num_tries number of attempts (0-3)
#' @return probability of winning
chance_of_winning <- function(c_inelastic, c_elastic, num_tries) {
  if (num_tries == 0) {
    prob_win <- 0.2  # baseline chance
  } else if (num_tries == 1) {
    prob_win <- c_inelastic + 0.2 * (1 - c_inelastic)
  } else if (num_tries == 2) {
    prob_win <- c_inelastic + (c_elastic/2) + 0.2 * (1 - (c_inelastic + (c_elastic/2)))
  } else {
    prob_win <- c_inelastic + c_elastic + 0.2 * (1 - (c_inelastic + c_elastic))
  }
  return(prob_win)
}

#' Calculate action cost based on number of tries
#' 
#' @param num_tries number of attempts (0-3)
#' @return total cost
action_cost <- function(num_tries) {
  if (num_tries == 0)
    total_cost <- 0
  else if (num_tries == 1)
    total_cost <- 40
  else if (num_tries == 2)
    total_cost <- 60
  else
    total_cost <- 80
  
  return(total_cost)
}

#' Calculate expected value given controllability and number of tries
#' 
#' @param c_inelastic inelastic controllability (0-1)
#' @param c_elastic elastic controllability (0-1)
#' @param num_tries number of attempts (0-3)
#' @return expected value
get_ev <- function(c_inelastic, c_elastic, num_tries) {
  reward <- 150
  loss <- 0
  total_cost <- action_cost(num_tries)
  prob_win <- chance_of_winning(c_inelastic, c_elastic, num_tries)
  ev <- (reward - total_cost) * prob_win - ((loss + total_cost) * (1 - prob_win))
  return(ev)
}

# ------------------------------------------------------
# Data Processing
# ------------------------------------------------------

# Generate data points
df <- generate_allowed_points()

# Calculate expected values for different numbers of tries
df <- df %>% mutate(
  ev0 = get_ev(c_inelastic, c_elastic, 0),
  ev1 = get_ev(c_inelastic, c_elastic, 1),
  ev2 = get_ev(c_inelastic, c_elastic, 2),
  ev3 = get_ev(c_inelastic, c_elastic, 3)
) 

# Find optimal action
df <- df %>% 
  group_by(c_inelastic, c_elastic) %>% 
  dplyr::mutate(max_ev = max(ev0, ev1, ev2, ev3))

# Calculate advantage of each action over optimal alternatives
df <- df %>% 
  dplyr::mutate(
    ev_zero_minus_optimal = ev0 - max(ev1, ev2, ev3),
    ev_one_minus_optimal = ev1 - max(ev0, ev2, ev3),
    ev_two_minus_optimal = ev2 - max(ev0, ev1, ev3),
    ev_three_minus_optimal = ev3 - max(ev0, ev1, ev2)
  )

# Create datasets filtered by optimal action
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

# Combine datasets
df <- bind_rows(list(zero_over_one, one_over_one, two_over_one, three_over_one))
df$n_actions <- as.factor(df$n_actions)

# Prepare map data
map <- df %>% dplyr::select(c_inelastic, c_elastic, n_actions)
map <- map %>%
  dplyr::mutate(n_actions_color = case_when(
    n_actions == "zero_actions" ~ "#F1948A",
    n_actions == "one_action" ~ "#7DAB76",
    n_actions == "three_action" ~ "#7CA6D8",
    TRUE ~ NA_character_
  ))

# ------------------------------------------------------
# Visualization
# ------------------------------------------------------

# Custom theme for triangle plots
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

# Create triangle visualization
triangle <- ggplot(df, aes(x = c_inelastic, y = c_elastic, alpha = ev_minus_df)) +
  geom_tile(aes(fill = ifelse(n_actions == "zero_actions", "#F1948A", 
                              ifelse(n_actions == "one_action", "#7DAB76", "#7CA6D8")))) +
  scale_x_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format()) +
  scale_y_continuous(breaks = seq(0, 1, 0.2), labels = scales::percent_format()) + 
  spec_theme_triangle +
  xlab("Inelastic controllability") + 
  ylab("Elastic controllability") +
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

# ------------------------------------------------------
# Save Plots
# ------------------------------------------------------

# Define output directory
output_dir <- 'figures'

# Save triangle plot
png(file.path(output_dir, 'triangle_plot.png'), width = 13, height = 8, units = "in", res = 400)
print(triangle)
dev.off()

# Create and save empty triangle (reference plot)
empty_triangle <- ggplot(df, aes(x = c_inelastic, y = c_elastic)) +
  geom_point(alpha = 0.1) + 
  scale_x_continuous(breaks = seq(0, 1, 0.1), labels = scales::percent_format()) + 
  scale_y_continuous(breaks = seq(0, 1, 0.1), labels = scales::percent_format()) + 
  spec_theme_triangle + 
  ylab("Elastic controllability") +
  xlab("Inelastic controllability") +
  coord_fixed(ratio = 1, xlim = NULL, ylim = NULL, expand = TRUE, clip = "on")

png(file.path(output_dir, 'empty_triangle.png'), width = 8, height = 8, units = "in", res = 300)
print(empty_triangle)
dev.off()