# CCA Analysis 
require(ccaPP)
# Load required functions
base_dir <- dirname(rstudioapi::getSourceEditorContext()$path)

# Construct the full path to the script using file.path()
script_path <- file.path(base_dir,"cca_helper_functions.R")
# Check if the file exists before sourcing
if (file.exists(script_path)) {
  source(script_path)
  print('sourced properly')
} else {
  stop("The file does not exist at the specified path.")
}


c(scoress,togethers,id_new) := prepare_new_for_cca(use_saved = 0,use_combined_fit=1,dont_apply_scale = 0)
c(scoress_old_s,togethers_old,id_old) :=prepare_old_for_cca(use_combined_fit=1,apply_scale = 1)
scoress$group='b'
scoress_old_s$group='a'
togethers_combined <- rbind(togethers,togethers_old)
scores_combined <- rbind(scoress,scoress_old_s)
ccas_combined <- ccaGrid(togethers_combined  ,scores_combined %>% dplyr::select(-group,-participant_id), nCores=1,cl=NULL,seed=NULL,standardize = FALSE,method='spearman')
colnames(id_old) <-'id'
ids=bind_rows(id_old,id_new)

dataset=scores_combined$group
scores_combined <- scores_combined %>% dplyr::select(-group)
togethers_combined <- togethers_combined 

scoret_combined=as.matrix(scores_combined %>% dplyr::select(-participant_id)) %*% ccas_combined$B
scoret_combined <- as.data.frame(scoret_combined)
scoret_combined$id=ids$id
colnames(scoret_combined) <- c('score','id')
model_combineds=as.matrix(togethers_combined) %*% ccas_combined$A
m_combined <- data.frame(Scores = scoret_combined, Model = model_combineds,dataset=dataset)

color_palette <- scale_color_gradient("a" = "navyblue", 'b' = "steelblue")

color_palette <- scale_color_manual(values = c('a' = alpha("navyblue", 0.8), 'b' = alpha("steelblue", 0.8)),
                                    name='',
                                    breaks = c('a', 'b'),
                                    labels = c("Group 1", "Group 2"))

#from saved resul
correlation_label <- paste0("r =", .33, "\n", "p = <.001")

composite_scoress <- ggplot(data = m_combined, aes(x = Scores.score, y = Model)) +
  geom_point(aes(color = factor(dataset))) +  # Add points with custom colors and labels
  scale_y_continuous(limits = c(-3.1, 2.85)) +
  
  geom_smooth(method = "lm", col = "black") +  # Add best fit line for all data
  geom_text(x = max(m_combined$Scores.score) - 0.1, y = -3.2, label = correlation_label, hjust = 1, vjust = 0, family = "Arial", size = 13) +
  labs(x = 'Psychopathology\n(composite score)', y = 'Model Parameters\n(composite score)') +  # Add title with correlation and x-label
  color_palette +
  spec_theme_df + 
  theme(  # Adjust legend position
    legend.text = element_text(size = 30),  # Increase legend text size
    legend.title = element_text(size = 20),
    axis.title = element_text(size = 34,face = "plain"),
    axis.text=element_text(size = 30),
    legend.position = c(1, 1.05),
    plot.margin = margin(t = 10, r = 10, b = 50, l = 50, unit = "pt"),  # Adjust margins for x-label
    plot.background = element_rect(fill = "white", color = NA)) +  # Set plot background color to white
  coord_cartesian(clip = "off") 
print(composite_scoress)
dev.off()

composite_figure_list <- list(
  figure=composite_scoress,
  figure_data=m_combined
)





