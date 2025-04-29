
# ============================================================================ #
# BEHAVIORAL DATA ANALYSIS-Generates Figures 3A and 3B
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
  
  
  
  # Create plot
  g <- ggplot() +
    geom_tile(data = x, aes(x = c_inelastic, y = c_elastic, fill = total_actions, alpha = total_actions)) +
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

if (interactive()) {
  # load CSVs relative to project root
  initial_data     <- readr::read_csv(here("data","behavior","processed","initial_study.csv"))
  replication_data <- readr::read_csv(here("data","behavior","processed","replication_study.csv"))
  
  # compute triangles
  init_opt <- generate_opt_in_triangle(initial_data)
  rep_opt  <- generate_opt_in_triangle(replication_data)
  init_extra <- generate_action_triangle(initial_data)
  rep_extra  <- generate_action_triangle(replication_data)
  # plot side‐by‐side
  p1 <- plot_optin_triangle(init_opt, first=1)
  p2 <- plot_optin_triangle(rep_opt,  first=0)
  combo <- ggpubr::ggarrange(p1, p2, ncol=2)
  
  p3 <- plot_extra_triangle(init_extra, first=1)
  p4 <- plot_extra_triangle(rep_extra,  first=0)
  combo_extra <- ggpubr::ggarrange(p3, p4, ncol=2)
  
  # save into project results folder
  dir.create(here("results"), showWarnings=FALSE)
  ggplot2::ggsave(here("results","fig1a.png"),
                  plot=combo, width=16, height=8, dpi=300)
  ggplot2::ggsave(here("results","fig1b.png"),
                  plot=combo_extra, width=16, height=8, dpi=300)
  
}


