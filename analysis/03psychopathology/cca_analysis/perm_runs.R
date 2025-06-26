# ============================================================================
# CCA Permutation Testing Script
# ============================================================================

library(dplyr)
library(tidyr)
library(ggplot2)
library(ggpubr)
library(ccaPP)
library(ggrepel)
library(here)
# Load helper functions

require(ccaPP)
# Load required functions
# at top:
source(here::here("analysis","03psychopathology","cca_analysis","cca_helper_functions.R"))





# Option to reload and reprocess data
  # Load and prepare data
  c(scoress, togethers) := prepare_new_for_cca(use_saved = 0, 
                                               use_combined_fit = 1, 
                                               dont_apply_scale = 0)
  
  c(scoress_old_s, togethers_old) := prepare_old_for_cca(use_combined_fit = 1, 
                                                         apply_scale = 1)
  
    scoress <- scoress %>% dplyr::select(-participant_id)
    scoress_old_s <- scoress_old_s %>% dplyr::select(-participant_id)


# Set seed for reproducibility
set.seed(342)

# Option to use saved permutation results

  # Load processed data for new permutation tests

  # Run permutation tests for original dataset
  perm_old <- permTest(
    togethers_old,
    scoress_old_s, 
    R = 10000,
    fun = maxCorGrid,
    permutations = NULL, 
    nCores = 1,
    cl = NULL,
    seed = NULL,
    standardize = FALSE,
    method = 'spearman'
  )
  
  # Run permutation test removing elasticity from original dataset
  perm_old_el <- permTest(
    togethers_old %>% dplyr::select(-pers, -kaps, -scale_epsilon_elastic),
    scoress_old_s, 
    R = 10000,
    fun = maxCorGrid,
    permutations = NULL, 
    nCores = 1,
    cl = NULL,
    seed = NULL,
    standardize = FALSE,
    method = 'spearman'
  )
  
  # Run permutation tests for replication dataset
  cat("Running permutation tests for replication dataset...\n")
  perm_new <- permTest(
    togethers %>% dplyr::select(-pers, -kaps),
    scoress,
    R = 10000, 
    fun = maxCorGrid,
    nCores = 1,
    cl = NULL,
    seed = NULL,
    standardize = FALSE,
    method = 'pearson'
  )
  
  # Run permutation test removing elasticity from replication dataset
  perm_use_new <- permTest(
    togethers %>% dplyr::select(-pers, -kaps, -scale_epsilon_elastic),
    scoress,
    R = 10000, 
    fun = maxCorGrid,
    nCores = 1,
    cl = NULL,
    seed = NULL,
    standardize = FALSE,
    method = 'pearson'
  )
  
  # Combine datasets
  togethers_combined <- rbind(togethers_old, togethers)
  scores_combined <- rbind(scoress_old_s, scoress)
  
  # Run permutation test on combined data
  cat("Running permutation tests on combined data...\n")
  perm_c <- permTest(
    togethers_combined %>% dplyr::select(-pers, -kaps),
    scores_combined %>% dplyr::select(-audit), 
    R = 10000,
    fun = maxCorGrid,
    permutations = NULL, 
    nCores = 1,
    cl = NULL,
    seed = NULL,
    standardize = FALSE,
    method = 'spearman'
  )
  
  # Run permutation test removing elasticity from combined dataset
  perm_c_el <- permTest(
    togethers_combined %>% dplyr::select(-pers, -kaps, -scale_epsilon_elastic),
    scores_combined, 
    R = 250,
    fun = maxCorGrid,
    permutations = NULL, 
    nCores = 1,
    cl = NULL,
    seed = NULL,
    standardize = FALSE,
    method = 'spearman'
  )
  
  # Run additional permutation tests
  cat("Running elasticity permutation tests...\n")
  perm_elastic_old <- run_elasticity_perm(scoress_old_s, togethers_old, 250)
  perm_elastic_new <- run_elasticity_perm(scoress, togethers, 250)
  
  # Save permutation results
  perm_test_results <- list(
    perm_old = perm_old,
    perm_new = perm_new,
    perm_old_el = perm_old_el,
    perm_use_new = perm_use_new,
    perm_c = perm_c,
    perm_c_el = perm_c_el,
    elastic_perm_old = perm_elastic_old,
    elastic_perm_new = perm_elastic_new,
    cor_old = 0.4522,
    cor_new = 0.446452
  )
  
  save(perm_test_results, file = "data/cca_data/perm_test_results.RData")


# ============================================================================
# VISUALIZATION OF PERMUTATION RESULTS
# ============================================================================

# Create data for permutation visualization
perms <- list(
  perms1 = perm_test_results$perm_new$cor,
  perms2 = perm_test_results$perm_old$cor,
  cor_old = 0.4522,
  cor_new = 0.446452
)

# Calculate confidence bounds
bounds_set_1 <- quantile(perm_test_results$perm_old$cor, probs = c(0.025, 0.975))
bounds_set_2 <- quantile(perm_test_results$perm_new$cor, probs = c(0.025, 0.975))

# Create data frame for basic permutation plot
data_to_plot_basic <- tibble(
  value = c(perm_test_results$perm_old$cor, perm_test_results$perm_new$cor),
  set = factor(c(
    rep('Group 2', length(perm_test_results$perm_old$cor)),
    rep('Group 1', length(perm_test_results$perm_old$cor))
  ))
)

# Create basic permutation plot
cat("Creating basic permutation plot...\n")
basic_plot <- plot_perm(data_to_plot_basic, perms)

dir.create("figures/permutation", recursive = TRUE, showWarnings = FALSE)

# Save basic permutation plot
png("figures/permutation/basic_permutation_plot.png", 
    width = 8, height = 4, units = "in", res = 300)
print(basic_plot)
dev.off()

# Create data frame for complex permutation plot
data_to_plot_complex <- tibble(
  value = c(perm_test_results$elastic_perm_old, perm_test_results$elastic_perm_new),
  set = factor(c(
    rep('Group 2', length(perm_test_results$elastic_perm_old)),
    rep('Group 1', length(perm_test_results$elastic_perm_new))
  ))
)

# Define theme for complex plot
spec_theme_df <- theme(
  panel.grid.major = element_blank(),
  panel.grid.minor = element_blank(),
  panel.background = element_blank(),
  axis.line = element_line(colour = "black"),
  axis.text = element_text(size = 24),
  axis.title = element_text(size = 29),
  legend.text = element_text(size = 35)
)

# Calculate bounds for complex plot
bounds_set_2 <- quantile(perm_test_results$elastic_perm_old, probs = c(0.025, 0.975))
bounds_set_1 <- quantile(perm_test_results$elastic_perm_new, probs = c(0.025, 0.975))

# Create complex permutation plot
perm_test_complex <- ggplot(data_to_plot_complex, aes(x = value, fill = set)) +
  geom_density(alpha = 0.55, color = NA) +
  labs(x = "Canonical correlation of\nparameters with psychopathology", y = "") +
  geom_segment(aes(x = bounds_set_1[1], xend = bounds_set_1[2], y = .25, yend = .25), 
               color = "#FFA500", size = 4) +
  geom_segment(aes(x = bounds_set_2[1], xend = bounds_set_2[2], y = .75, yend = .75), 
               color = "#008000", size = 4) +
  scale_x_continuous(limits = c(0.17, 0.52)) +
  scale_y_continuous(expand = c(0, 0)) +
  spec_theme_df + 
  theme(
    axis.line.y = element_blank(),
    axis.ticks.y = element_blank(),
    axis.text.y = element_blank(),
    axis.text.x = element_text(size = 24),
    axis.title.x = element_text(size = 29),
    legend.text = element_text(size = 35)
  ) +
  scale_fill_manual(name = '', values = c("#FFA500", "#008000")) +
  guides(fill = guide_legend(override.aes = list(shape = c(NA, NA)))) +
  geom_point(aes(x = perms$cor_new, y = .95), fill = '#008000', color = '#008000', size = 7) +
  geom_point(aes(x = perms$cor_old, y = .3), fill = '#FFA500', color = '#FFA500', size = 7) +
  theme(plot.margin = margin(t = 50, r = 0, b = 0, l = 0))

# Save complex permutation plot
png("figures/permutation/complex_permutation_plot.png", 
    width = 8, height = 4, units = "in", res = 300)
print(perm_test_complex)
dev.off()

# Arrange both plots together
arranged_plot <- ggarrange(
  basic_plot, 
  perm_test_complex, 
  nrow = 2, 
  common.legend = TRUE, 
  legend = 'right', 
  heights = c(1, 1)
)

# Save combined permutation plot
png("figures/permutation/combined_permutation_plots.png", 
    width = 13, height = 7, units = "in", res = 300)
print(arranged_plot)
dev.off()

cat("Permutation analysis completed. Results saved to figures/permutation/ directory.\n")