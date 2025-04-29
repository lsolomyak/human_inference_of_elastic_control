# ------------------------------------------------------
# Regression Analysis 3d
# ------------------------------------------------------

# Load required libraries
library(ordinal)
library(dplyr)
library(ggplot2)
library(tidyr)
library(lme4)
library(ggpubr)
library(zoo)
library(data.table)
library(scales)
# determine script directory (works when run via Rscript)
args        <- commandArgs(trailingOnly = FALSE)
file_arg    <- grep("^--file=", args, value = TRUE)
script_path <- if (length(file_arg)) sub("^--file=", "", file_arg) else getwd()
script_dir  <- dirname(normalizePath(script_path))

# point to the local “results” folder and create it



# ------------------------------------------------------
# Helper Functions
# ------------------------------------------------------

#' Sigmoid function for probability conversion
#' 
#' @param x Input value
#' @return Sigmoid transformed value
sigmoid <- function(x) {
  return(1 / (1 + exp(-x)))
}

# ------------------------------------------------------
# Custom Themes
# ------------------------------------------------------

#' Theme for regression plots
spec_theme_reg <- theme(
  panel.grid = element_blank(),
  panel.background = element_blank(), 
  axis.title.x = element_text(vjust = 1), 
  axis.title.y = element_text(vjust = -1, margin = margin(0, 25, 0, 0)), 
  axis.line = element_line(color = "black"), 
  plot.title = element_text(size = 30),
  axis.text.x = element_text(size = 24),
  axis.text.y = element_text(size = 24, hjust = 1),
  axis.title = element_text(size = 30),
  legend.text = element_text(size = 24),
  legend.title = element_blank(),
  legend.position = c(.89, .93)
)

# ------------------------------------------------------
# Fixed Effect Visualization Functions
# ------------------------------------------------------

#' Plot fixed effects from two regression models for comparison
#' 
#' @param model_old First regression model
#' @param model_new Second regression model
#' @return ggplot object comparing fixed effects
plot_fixed_effects <- function(model_old, model_new) {
  ci_old <- as.data.frame(confint(model_old, parm="beta_", method="Wald"))
  ci_new <- as.data.frame(confint(model_new, parm="beta_", method="Wald"))
  
  ci_old$Term <- rownames(ci_old);     ci_old$Group <- "initial"
  ci_new$Term <- rownames(ci_new);     ci_new$Group <- "replication"
  
  df <- rbind(ci_old, ci_new)
  colnames(df)[1:2] <- c("lower", "upper")
  df <- subset(df, Term != "(Intercept)")
  df$mid  <- (df$lower + df$upper) / 2
  df$Term <- factor(
    df$Term,
    levels = c("c_elastic", "c_inelastic"),
    labels = c("Elastic\nControllability", "Inelastic\nControllability")
  )
  
  ggplot(df, aes(x = Term, y = mid, color = Group)) +
    geom_errorbar(aes(ymin = lower, ymax = upper),
                  width = 0.2, size = 1.2,
                  position = position_dodge(0.35)) +
    geom_point(size = 4, position = position_dodge(0.35)) +
    coord_flip() +
    expand_limits(y = 0) +
    spec_theme_reg +
    labs(y = "Log-odds effect on opting-in", x = "") +
    scale_color_manual(values = c("steelblue", "navy"))
}

# ------------------------------------------------------
# Opt-In Regression Modeling
# ------------------------------------------------------

#' Run regression model for opt-in decisions
#' 
#' @param data Input dataset
#' @param real Whether to use real data (1) or simulated data (0)
#' @param rep Whether participants are identified by 'id' (1) or 'participant' (0)
#' @return Regression model object
run_opt_in_regression <- function(data, real = 1, rep = 0) {
  # Filter data based on experiment phase
  if (real == 1) {
    dd <- data %>% dplyr::filter(block > 5)
    dd$block <- dd$block - 5
  }
  
  # Select relevant columns and handle participant IDs
  if (rep == 1) {
    dd <- data %>% 
      dplyr::ungroup() %>%  
      dplyr::select(id, block, trials, c_elastic, c_inelastic, total_actions)
    dd$part <- match(dd$id, sort(unique(dd$id)))
  } else {
    dd <- data %>% 
      dplyr::ungroup() %>%  
      dplyr::select(participant, block, trials, c_elastic, c_inelastic, total_actions)
    dd$part <- match(dd$participant, sort(unique(dd$participant)))
  }
  
  # Remove missing values and duplicates
  dd <- dd %>% drop_na()
  dd$num_tries <- dd$total_actions
  dd <- dd[!duplicated(dd), ]
  
  # Create block number and filter for later trials
  dd$block_num <- (dd$part - 1) * 4 + dd$block
  dd <- dd %>% dplyr::filter(trials > 14) 
  
  # Create outcome variable
  dd$total_actions_factor <- as.ordered(dd$total_actions)
  dd$block <- as.ordered(dd$block)
  dd <- dd %>% dplyr::mutate(opt_in = total_actions > 0)
  dd <- dd %>%
    dplyr::mutate(
      c_elastic_s   = scale(c_elastic),
      c_inelastic_s = scale(c_inelastic)
    )
  # Run appropriate regression model based on participant ID type
  if (rep == 1) {
    # Using ID as participant identifier
    model <- lme4::glmer(
      opt_in ~ c_elastic + c_inelastic +(1+c_elastic + c_inelastic|id) + (1 | block_num), 
      family = binomial, 
      data = dd,
      control = glmerControl(
        optimizer  = "bobyqa",
        optCtrl    = list(maxfun = 2e5)
      )
    )
  } else {
    # Using participant as identifier
    model <- lme4::glmer(
      opt_in ~ c_elastic + c_inelastic +(1+c_elastic + c_inelastic|participant) + (1 | block_num), 
      family = binomial, 
      data = dd,
      control = glmerControl(
        optimizer  = "bobyqa",
        optCtrl    = list(maxfun = 2e5)
      )
    )
  }
  
  return(model)
}

# ------------------------------------------------------
# Regression Line Aggregation
# ------------------------------------------------------

#' Aggregate regression lines for visualization
#' 
#' @param line_data Data frame with individual regression lines
#' @return Aggregated data with means and standard errors
get_aggregated_data <- function(line_data) {
  agg_data <- line_data %>%
    dplyr::group_by(x) %>%
    dplyr::summarise(
      mean_yz = mean(yz, na.rm = TRUE),
      std_yz = sd(yz, na.rm = TRUE),
      mean_ytz = mean(ytz, na.rm = TRUE),
      std_ytz = sd(ytz, na.rm = TRUE)
    )
  
  N <- length(unique(line_data$line))
  
  agg_data <- agg_data %>%
    dplyr::mutate(
      se_yz = std_yz / sqrt(N),
      se_ytz = std_ytz / sqrt(N)
    )
  
  return(agg_data)
}

# ------------------------------------------------------
# Visualization for Opt-In Regression
# ------------------------------------------------------

#' Generate visualization of opt-in regression results
#' 
#' @param line_data Data frame with individual regression lines
#' @param agg_data Aggregated data with means and standard errors
#' @return Combined ggplot object with elastic and inelastic plots
generate_opt_reg_plot <- function(line_data, agg_data) {
  # Convert line to numeric
  line_data$line <- as.numeric(line_data$line)
  
  # Plot for elastic controllability
  elastic <- ggplot(line_data, aes(x = x, y = ytz, color = as.factor(line))) +
    geom_line(
      data = subset(line_data, line != max(line)), 
      aes(color = as.factor(line)), 
      linetype = "solid"
    ) +
    geom_line(
      data = subset(line_data, line == max(line)), 
      aes(color = as.factor(line)), 
      linetype = "dashed", 
      size = 2.4,
      color = "black"
    ) +
    spec_theme_reg +
    theme(legend.position = "none") + 
    labs(y = "", x = "Elastic controllability") +
    scale_y_continuous(
      breaks = seq(0, 1, 0.2),
      labels = scales::percent_format()
    ) +
    scale_x_continuous(
      breaks = seq(0, 1, 0.2),
      labels = scales::percent_format()
    ) +
    geom_line(
      data = agg_data, 
      aes(x = x, y = mean_ytz), 
      color = "black", 
      size = 1.8
    ) +
    geom_line(
      data = agg_data, 
      aes(x = x, y = mean_ytz), 
      color = "black",
      linetype = "dashed", 
      size = 1.8
    ) +
    geom_ribbon(
      data = agg_data, 
      aes(x = x, ymin = mean_ytz - se_ytz, ymax = mean_ytz + se_ytz),
      alpha = 0.2, 
      inherit.aes = FALSE
    )
  
  # Plot for inelastic controllability
  inelastic <- ggplot(line_data, aes(x = x, y = yz, color = as.factor(line))) +
    geom_line(
      data = subset(line_data, line != max(line)), 
      aes(color = as.factor(line)), 
      linetype = "solid"
    ) +
    geom_line(
      data = subset(line_data, line == max(line)), 
      aes(color = as.factor(line)), 
      linetype = "dashed", 
      size = 2.4,
      color = "black"
    ) +
    theme(legend.position = "none") +
    spec_theme_reg + 
    labs(y = "", x = "Inelastic controllability") +
    scale_y_continuous(
      breaks = seq(0, 1, 0.2),
      labels = scales::percent_format()
    ) +
    scale_x_continuous(
      breaks = seq(0, 1, 0.2),
      labels = scales::percent_format()
    ) +
    geom_line(
      data = agg_data, 
      aes(x = x, y = mean_yz), 
      color = "black", 
      size = 1.5
    ) +
    geom_line(
      data = agg_data, 
      aes(x = x, y = mean_yz), 
      color = "black",
      linetype = "dashed", 
      size = 1.5
    ) +
    geom_ribbon(
      data = agg_data, 
      aes(x = x, ymin = mean_yz - se_yz, ymax = mean_yz + se_yz),
      alpha = 0.2, 
      inherit.aes = FALSE
    )
  
  # Combine plots
  gs <- ggarrange(inelastic, elastic, nrow = 2)
  return(gs)
}

# ------------------------------------------------------
# Extra Action Regression Analysis
# ------------------------------------------------------

#' Run regression model for extra action decisions
#' 
#' @param data Input dataset
#' @param real Whether to use real data (1) or simulated data (0)
#' @param rep Whether participants are identified by 'id' (1) or 'participant' (0)
#' @return Processed data with regression predictions
run_extra_action_regression <- function(data, real = 1, rep = 0) {
  # Select relevant columns
  cols <- c("participant","block","trials","c_elastic","c_inelastic",
            "total_actions","trial_reward","ss_transition")
  if (rep==1) cols <- c("id", cols)
  dd <- data %>% select(all_of(cols))


  
  # Filter data based on experiment phase
  if (real == 1) {
    dd <- dd %>% dplyr::filter(block > 5)
    dd$block <- dd$block - 5
  }
  
  # Handle missing values and duplicates
  dd$ss_transition <- na.locf(dd$ss_transition)
  dd <- dd[!duplicated(dd), ]
  
  # Create derived variables
  dd$rewarded <- if_else(dd$trial_reward > 0, 1, 0)
  
  # Handle participant IDs
  if (rep == 0) {
    dd$part <- match(dd$participant, sort(unique(dd$participant)))
  } else if (rep == 1) {
    dd$part <- match(dd$id, sort(unique(dd$id)))
  } else {
    dd$part <- match(dd$participant_id, sort(unique(dd$participant_id)))
  }
  
  # Create block number and extra actions variables
  dd$block_num <- (dd$part - 1) * 4 + dd$block
  dd$extra_actions <- if_else(dd$total_actions > 0, dd$total_actions - 1, 0)
  
  # Filter for later trials
  dd <- dd %>% dplyr::filter(trials > 14)
  dd$total_actions_factor <- as.ordered(dd$extra_actions)
  dd$block <- as.ordered(dd$block)
  dd <- dd %>%
    dplyr::mutate(
      c_elastic_s   = scale(c_elastic),
      c_inelastic_s = scale(c_inelastic)
    )
  # Run appropriate regression model
  if (rep == 0) {
    model <- clmm(
      total_actions_factor ~ c_elastic + c_inelastic + (1 +c_elastic + c_inelastic | participant) + (1 | block_num), 
      link = "probit", 
      data = dd,
      control = clmm.control(
        maxIter   = 50,    # Newton–Raphson iterations
        maxIterEM = 200,   # EM iterations
        tol       = 1e-4   # convergence tolerance
      )
    )
  } else {
    model <- clmm(
      total_actions_factor ~ c_elastic + c_inelastic + (1 | id) + (1 | block_num), 
      link = "probit", 
      data = dd,
      control = clmm.control(
        maxIter   = 50,    # Newton–Raphson iterations
        maxIterEM = 200,   # EM iterations
        tol       = 1e-4   # convergence tolerance
      )
    )
  }
  
  # Extract thresholds and model components
  thresh1 <- model$coefficients[1]
  thresh2 <- model$coefficients[2]
  
  # Extract fixed and random effects
  fixed_effects <- coef(model)
  random_effects <- ranef(model)
  
  # Extract participant-specific effects
# Extract fixed and random effects (option 1)
fixed_coefs <- model$beta
if (rep == 0) {
  ran_int <- ranef(model)$participant[, "(Intercept)"]
} else {
  ran_int <- ranef(model)$id[, "(Intercept)"]
}

participant_effects <- data.frame(
  intercept        = ran_int,
  slope_elastic    = fixed_coefs["c_elastic"],
  slope_inelastic  = fixed_coefs["c_inelastic"]
)

  # Create data frame with participant effects
  participant_effects <- data.frame(
    intercept = intercept, 
    slope_elastic = elastic_fits,
    slope_inelastic = inelastic_fits
  )
  
  # Create sequences for prediction
  x <- seq(0, 1, length.out = 101)
  
  # Create data frame for visualization
  line_data <- data.frame(
    x = rep(x, nrow(participant_effects)), 
    intercept = rep(participant_effects$intercept, each = length(x)),
    y = rep(participant_effects$slope_inelastic, each = length(x)) * x + 
      rep(participant_effects$intercept, each = length(x)),
    yk = rep(participant_effects$slope_elastic, each = length(x)) * x + 
      rep(participant_effects$intercept, each = length(x)),
    line = factor(rep(1:nrow(participant_effects), each = length(x)))
  )
  
  # Add percentage predictions based on thresholds
  line_data <- line_data %>% 
    mutate(perc = case_when(
      yk == thresh1 ~ 0.5,
      yk > thresh1 & yk < thresh2 ~ 0.5 + (yk / thresh2),
      TRUE ~ NA_real_
    ))
  
  # Define function to fill missing values by group
  by_sub_fill <- function(group_data) {
    # Sort data by x
    group_data <- group_data[order(group_data$x), ]
    
    # Fit linear regression model
    model <- lm(perc ~ x, data = group_data, na.action = na.omit)
    
    # Predict missing values
    predicted_values <- predict(model, newdata = group_data)
    
    # Replace missing values with predictions
    group_data$perc <- ifelse(is.na(group_data$perc), predicted_values, group_data$perc)
    
    return(group_data)
  }
  
  # Apply prediction by group
  line_data$line <- as.integer(line_data$line)
  line_data <- line_data %>%
    dplyr::group_by(line) %>%
    dplyr::mutate(perc = by_sub_fill(cur_data()))
  
  # Extract perc column and cap at 2
  linesr <- line_data$perc
  linesr <- linesr %>% 
    dplyr::mutate(perc = if_else(perc <= 2, perc, 2))
  
  return(linesr)
}
# Load required libraries
library(zoo)
library(ordinal)

run_extra_action_regression <- function(data, real = 1, rep = 0) {
  # Select relevant columns
  base_cols <- c("participant","block","trials",
                 "c_elastic","c_inelastic",
                 "total_actions","trial_reward","ss_transition")
  cols <- if (rep == 1) c("id", base_cols) else base_cols
  dd <- dplyr::select(data, dplyr::all_of(cols))
  
  # Filter by experiment phase
  if (real == 1) {
    dd <- dd %>% 
      dplyr::filter(block > 5) %>% 
      dplyr::mutate(block = block - 5)
  }
  
  # Handle missing values and duplicates
  dd$ss_transition <- zoo::na.locf(dd$ss_transition)
  dd <- dd[!duplicated(dd), ]
  
  # Derived variables
  dd <- dd %>%
    dplyr::mutate(
      rewarded      = ifelse(trial_reward > 0, 1, 0),
      part          = if (rep == 1) match(id, unique(id)) else match(participant, unique(participant)),
      block_num     = (part - 1) * 4 + block,
      extra_actions = ifelse(total_actions > 0, total_actions - 1, 0)
    ) %>%
    dplyr::filter(trials > 14) %>%
    dplyr::mutate(
      total_actions_factor = as.ordered(extra_actions),
      block                = as.ordered(block),
      c_elastic_s          = as.numeric(scale(c_elastic)),
      c_inelastic_s        = as.numeric(scale(c_inelastic))
    )
  
  # Fit cumulative link mixed model
  if (rep == 1) {
    model <- ordinal::clmm(
      total_actions_factor ~ c_elastic_s + c_inelastic_s +
        (1 + c_elastic_s + c_inelastic_s | id) +
         (1 | block_num),
      link    = "probit",
      data    = dd,
      control = ordinal::clmm.control(maxIter = 50)
    )
  } else {
    model <- ordinal::clmm(
      total_actions_factor ~ c_elastic_s + c_inelastic_s +
        (1 + c_elastic_s + c_inelastic_s | participant) +
        (1 | block_num),
      link    = "probit",
      data    = dd,
      control = ordinal::clmm.control(maxIter = 50)
    )
  }
  
  return(model)
}

# ------------------------------------------------------
# Main Execution
# ------------------------------------------------------

# Output directory for saving plots
output_dir <- "figures/regression"

# Uncomment the following lines to run the analysis with your data

# # Run regression models
model_old <- run_opt_in_regression(data_old, real = 1)
model_new <- run_opt_in_regression(data_final, real = 1)
# 
# # Plot fixed effects comparison
ps1 <- plot_fixed_effects(model_old, model_new)
# 
# # Save fixed effects plot
output_dir <- "results"
if (!dir.exists(output_dir)) dir.create(output_dir)
setwd(output_dir)

# now any png() will land here
png("fig3c.png", width=12, height=5, units="in", res=300)
print(ps1)
dev.off()
png(
  file.path(output_dir, "basic_regression_comparison.png"),
  width = 12, height = 5, units = "in", res = 300
)
print(ps1)
dev.off()

# 
# # Run extra action regression
linesr_new <- run_extra_action_regression(data_final, real = 1, rep = 1)
linesr_old <- run_extra_action_regression(data_old, real = 1, rep = 0)
# extract fixed‐effect estimates and their SEs
check_p <- function(linesr){
  beta <- linesr_new$beta
se   <- sqrt(diag(vcov(linesr_new)))

# compute z‐statistic for c_elastic_s
z_elastic <- beta["c_elastic_s"] / se["c_elastic_s"]

# two‐sided p‐value
p_elastic <- 2 * (1 - pnorm(abs(z_elastic)))
if(p_elastic <.0001){ p_elastic=.0001; print('p value is below .0001')}
}
check_p(linesr_new)
check_p(linesr_old)

plot_extra_action_effects <- function(model_old, model_new) {
  get_ci <- function(mod, grp) {
    beta <- mod$beta[c("c_elastic_s","c_inelastic_s")]
    se   <- sqrt(diag(vcov(mod)))[names(beta)]
    data.frame(
      Term     = names(beta),
      lower    = beta - 1.96*se,
      midpoint = beta,
      upper    = beta + 1.96*se,
      Group    = grp,
      row.names = NULL
    )
  }
  
  ci_old <- get_ci(model_old, "initial")
  ci_new <- get_ci(model_new, "replication")
  df     <- rbind(ci_old, ci_new)
  
  df$Term <- factor(df$Term,
                    levels = c("c_elastic_s","c_inelastic_s"),
                    labels = c("Elastic\ncontrollability","Inelastic\ncontrollability")
  )
  
  ggplot(df, aes(x = Term, y = midpoint, color = Group)) +
    geom_errorbar(aes(ymin = lower, ymax = upper),
                  width = 0.2, size = 1.2,
                  position = position_dodge(0.35)) +
    geom_point(size = 4, position = position_dodge(0.35)) +
    coord_flip() +
    expand_limits(y = 0) +
    spec_theme_reg +
    labs(y = "Effect on extra actions\n", x = "") +
    geom_hline(yintercept = 0) +
    scale_color_manual(values = c("steelblue","navy"))
}
ps2 <- plot_extra_action_effects(linesr_old,linesr_new)
output_dir <- "results"
if (!dir.exists(output_dir)) dir.create(output_dir)
setwd(output_dir)

# now any png() will land here
png("fig3c_part2.png", width=12, height=5, units="in", res=300)
print(ps2)

