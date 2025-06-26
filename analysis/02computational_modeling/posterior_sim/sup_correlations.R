# Outputs the shared variance between parameters used in the supplementary figure 
# CCA Analysis 
require(ccaPP)
# Load required functions
base_dir <- dirname(rstudioapi::getSourceEditorContext()$path)

# Construct the full path to the script using file.path()
script_path <- file.path(base_dir,"run_sim.R")

spec_theme_cor <- theme(
  panel.grid = element_blank(),
  panel.background = element_blank(),
  axis.title.x = element_text(vjust = 1),
  axis.title.y = element_text(vjust = -1),
  legend.text = element_text(size = 28),
  legend.title = element_text(size = 28),
  axis.line = element_line(color = "black"),
  plot.title = element_text(size = 30),
  axis.text.x  = element_text(size = 22),
  axis.text.y  = element_text(size = 22,hjust = 1),
  axis.title = element_text(size = 24),
  legend.margin = margin(t = 0, r = 15, b = 0, l = 25)  # Add margin between figure and legend
)
model_old <- read_csv('./analysis/02computational_modeling/posterior_sim/fits_for_sim/initial_fit.csv')
model1 <- read_csv('./analysis/02computational_modeling/posterior_sim/fits_for_sim/replication_fit.csv')
model_old$participant=as.character(model_old$participant)
model1$participant=as.character(model1$participant)
model_elast <- bind_rows(model_old,model1)
model_elast$participant_id=model_elast$participant
# Calculate the correlation matrix excluding 'participant'
plot_cor <- function(model_old){
  library(dplyr)
  library(ggplot2)
  library(reshape2)
  scale_old  <- model_old %>% 
    dplyr::mutate(scale_epsilon_elastic =((scale1-.5) * epsilon1),scale_epsilon_control=(scale3-.5) * epsilon2) %>% 
    dplyr::select(scale_epsilon_elastic,scale_epsilon_control,beta,alpha1,alpha2,alpha3,pers,kaps)
  
  scale_old <- scale_old[, c("kaps","pers","alpha1", "alpha2", "alpha3", "beta" ,"scale_epsilon_control", "scale_epsilon_elastic")]
  
  cor_matrix <- cor(scale_old)
  melted_cor_matrix <- melt(cor_matrix)
  melted_cor_matrix$value <- melted_cor_matrix$value^2
  # Convert back to a wide format
  shared_variance_matrix <- acast(melted_cor_matrix, Var1 ~ Var2, value.var="value")
  lower_tri <- shared_variance_matrix
  lower_tri[upper.tri(lower_tri)] <- NA
  # Melt the lower triangle matrix for ggplot
  melted_lower_tri <- melt(lower_tri, na.rm = TRUE)
  # Create a heatmap of the correlation matrix with Greek annotations
  ga <- # Load necessary libraries
    library(ggplot2)
  library(reshape2)
  library(wesanderson)
  # Assuming `melted_lower_tri` is your melted lower triangular matrix of shared variances
  cor_plot_model <- ggplot(melted_lower_tri, aes(Var1, Var2, fill = value)) +
    geom_tile() +
    geom_text(aes(label = round(value, 2)), color = "black", size = 6) +
    scale_fill_gradient2(name = "Shared variance",
                         low = "blue", mid = "white", high = "red",
                         midpoint = 0, limits = c(0, 1),
                         breaks = seq(0, 1, by = 0.25)) +
    labs(x = "", y = "") +
    scale_x_discrete(labels = (c(    expression(kappa),
                                     expression(rho),
                                     expression(alpha[1]), 
                                     expression(alpha[2]),
                                     expression(alpha[3]),
                                     expression(beta),
                                     
                                     expression(gamma[controllability]),
                                     expression(gamma[elasticity])))) +
    scale_y_discrete(position = "right", labels = (c(    expression(kappa),
                                                         expression(rho),
                                                         expression(alpha[1]), 
                                                         expression(alpha[2]),
                                                         expression(alpha[3]),
                                                         expression(beta),
                                                         
                                                         expression(gamma[controllability]),
                                                         expression(gamma[elasticity])))) +
    spec_theme_cor + 
    theme(axis.text.x = element_text(angle = 45, hjust = 1),
          legend.key.height = unit(.75, "cm"),  # Elongate the legend
          legend.text = element_text(size = 12),  # Adjust legend text size
          plot.margin = unit(c(0, 0, 0, 1.5), "cm")) # Add padding to the left
  
  return(cor_plot_model)
}
m_old <- plot_cor(model_old)
m_new <- plot_cor(model1)