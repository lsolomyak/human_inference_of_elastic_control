require(dplyr)
data_combined <- bind_rows(data_old,data_final)
data_combined <- return_combined_ev(data_combined,1)
summarise_data <- function(data, type_calc=1, trial_range,replication) {
  # Filter trials within the specified range
  data <- data %>% distinct()
  data_filtered <- data %>% dplyr::filter(block>6)
  data_filtered <- subset(data, trials >= trial_range[1] & trials <= trial_range[2])
  data_filtered <- data_filtered %>% distinct()
  data_filtered <- return_combined_ev(data_filtered)
  data_filtered$date <- as.Date(sub("_.*", "", as.character(data_filtered$date)))
  
  # Calculate 'opt_in' and 'extra_actions'
  data_filtered$opt_in <- ifelse(data_filtered$total_actions > 0, 1, 0)
  data_extra <- data_filtered
  setDT(data_extra)
  data_extra[, extra_actions := ifelse(total_actions < 2, 0, total_actions - 1)] # Group by participant and opt_actions
  #data_extra[, extra_actions := ifelse(total_actions == 0, NA, ifelse(total_actions == 1, 0, total_actions - 1))]
  
  data_extra <- as.data.frame(data_extra)
  data_extra <- data_extra %>% dplyr::mutate(take_ex=opt_actions==3)
  if(replication==0){
    grouped_data1 <- summarySE(data_filtered,measurevar = "opt_in",groupvars = c("participant","date","opt_actions"),na.rm=TRUE)
    
    grouped_data_2 <- summarySE(data_extra,measurevar = "extra_actions",groupvars = c("participant","date","opt_actions"),na.rm=TRUE)
    
    # grouped_data1 <- data_filtered %>%
    #       dplyr::group_by(participant, opt_actions) %>%
    #       dplyr::summarise(opt_in = mean(opt_in,na.rm=TRUE)) %>%
    #       dplyr::ungroup()
    # grouped_data_2 <- data_extra %>%
    #       dplyr::group_by(participant, opt_actions) %>%
    #       dplyr::summarise(extra_actions = mean(extra_actions,na.rm=TRUE)) %>%
    #       dplyr::ungroup()
    grouped_data <- left_join(grouped_data1,grouped_data_2,by=c('participant','opt_actions','date'))
    
    # df_pivoted <- grouped_data %>%
    #       tidyr::pivot_wider(names_from = opt_actions, values_from = c(opt_in, extra_actions))
    # 
  }else{
    
    # grouped_data1 <- data_filtered %>%
    #       dplyr::group_by(id, opt_actions) %>%
    #       dplyr::summarise(opt_in = mean(opt_in,na.rm=TRUE)) %>%
    #       dplyr::ungroup()
    grouped_data1 <- summarySE(data_filtered,measurevar = "opt_in",groupvars = c("id","opt_actions"),na.rm=TRUE)
    
    grouped_data_2 <- summarySE(data_extra,measurevar = "extra_actions",groupvars = c("id","opt_actions"),na.rm=TRUE)
    
    
    # grouped_data_2 <- data_extra %>%
    #       dplyr::group_by(id, opt_actions) %>%
    #       dplyr::summarise(extra_actions = mean(extra_actions,na.rm=TRUE)) %>%
    #       dplyr::ungroup()
    grouped_data <- left_join(grouped_data1,grouped_data_2,by=c('id','opt_actions'))
    
    
    # df_pivoted <- grouped_data %>%
    #       tidyr::pivot_wider(names_from = opt_actions, values_from = c(opt_in, extra_actions))
    # 
  }
  # Pivot the data for opt_actions
  
  # Rename columns for clarity
  # colnames(df_pivoted) <- gsub("opt_in.", "opt_in_", colnames(df_pivoted))
  # colnames(df_pivoted) <- gsub("extra_actions.", "extra_actions_", colnames(df_pivoted))
  # 
  # # Group by participant only and calculate means
  # if(replication==0){
  #       participant_grouped <- aggregate(cbind(opt_in, extra_actions) ~ participant, data_filtered, function(x) mean(x, na.rm = TRUE))
  #       
  # colnames(participant_grouped) <- c("participant", "mean_opt_in", "mean_extra_actions")
  # final_df <- merge(df_pivoted, participant_grouped, by = "participant")
  # 
  # }else{
  #       participant_grouped <- aggregate(cbind(opt_in, extra_actions) ~ id, data_filtered, function(x) mean(x, na.rm = TRUE))
  #       
  #   colnames(participant_grouped) <- c("id", "mean_opt_in", "mean_extra_actions")
  #   final_df <- left_join(df_pivoted, participant_grouped, by = "id")
  #   
  # }
  # # Merge the data frames on participant
  return(grouped_data )
}
data_old_summ <- summarise_data(data_old %>% dplyr::filter(block>6),1,c(15,30),0)
data_final_summ <- summarise_data(data_final %>% dplyr::filter(block>6),1,c(15,30),1)
data_combined_sum <- bind_rows(data_old_summ,data_final_summ)
# Plotting
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

plot_opt_dist <- function(combined_data){
  real <- ggplot(combined_data, aes(x = opt_in_mean, fill = factor(opt_actions))) +
    geom_density(adjust=2) +
    facet_wrap(~opt_actions) +
    # scale_y_continuous(limits=c(0,20))+
    scale_x_continuous(labels=scales::percent_format())+
    scale_fill_manual(name='Optimal number\nof tickets',
                      values = c("#F1948A", "#BED5BB", "#7CA6D8"),
                      labels = rev(c(" ", " ", "opt-out")))+
    labs(title = "",
         x = "Opt-in %", y = "") +
    spec_theme_cor+ theme(axis.title.x = element_text(size=34, margin = margin(t = 20, r = 0, b = 0, l = 0)),  # Increase top margin
                          axis.title.y = element_text(size = 34, margin = margin(r = 20, l = 0, t = 0, b = 0)), 
                          
                          axis.text = element_text(size=26),
                          # axis.text.y = element_blank(),
                          # axis.line.y = element_blank(),
                          # axis.ticks.y = element_blank(),
                          strip.background = element_blank(),
                          strip.text = element_blank())
  return(real)}

plot_extra_dist <- function(combined_data){
  real <- ggplot(combined_data, aes(x = extra_actions_mean, fill = factor(opt_actions))) +
    geom_density() +
    facet_wrap(~opt_actions) +
    scale_fill_manual(name='Optimal number\nof tickets',
                      values = c("#F1948A", "#BED5BB", "#7CA6D8"),
                      labels = rev(c(" ", " ", "opt-out")))+
    labs(title = "",
         x = "Extra tickets", y = " ") +
    spec_theme_cor+ theme(axis.title.x = element_text(size=34, margin = margin(t = 20, r = 0, b = 0, l = 0)),  # Increase top margin
                          axis.title.y = element_text(size = 34, margin = margin(r = 20, l = 0, t = 0, b = 0)), 
                          
                          axis.text = element_text(size=26),
                          # axis.text.y = element_blank(),
                          # axis.line.y = element_blank(),
                          # axis.ticks.y = element_blank(),
                          strip.background = element_blank(),
                          strip.text = element_blank())
  return(real)}
p_opt <- plot_opt_dist(data_combined_sum)


p_extra <- plot_extra_dist(data_combined_sum)

p_dist <- ggarrange(p_opt,p_extra,nrow = 2,ncol = 1,common.legend = TRUE,legend='right')
p_dist <- annotate_figure(p_dist,
                          left=text_grob(label = "Participants (density)",rot = 90,size=34,vjust = 1.5))

dir='/Users/levisolomyak/Desktop/Documents/Control_studies/Control_studies/scripts/analyses/01model_free/for_paper/figures'
png(paste0(dir,'/extra_dist_break2s.png'), width = 28, height = 10, units = "in",res=500)
print(p_dist)
dev.off()
dir.create(here::here("results"), showWarnings=FALSE)

ggsave(filename=here::here("results","distributionfig3d.png"),
       plot=p_dist,width=28,height=10,dpi=400)

