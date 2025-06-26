if (!require(here)) install.packages("here")
library(here)
library(rstudioapi)

# Get the directory where the script is located
base_dir <- dirname(rstudioapi::getSourceEditorContext()$path)

# Construct the full path to the script using file.path()
script_path <- file.path(base_dir,"run_sim.R")

# Check if the file exists before sourcing
if (file.exists(script_path)) {
  source(script_path)
  print('sourced properly')
} else {
  stop("The file does not exist at the specified path.")
}

setwd(base_dir)


data_f <- data_combined %>% group_by(participant) %>% distinct(c_elastic,c_inelastic) %>% ungroup()
data_f <- do.call("rbind", replicate(20, data_f, simplify = FALSE))

#NOTE these must be changed to run from relevant direcrr
source("./elastic_controllability_star.R")
source("./controllability_sim.R")
source("./elastic_controllability.R") # model 1
generate_sim_data <- function(data_f,n_agents=250, full=0,elasticity_model=2){
  # set params 
  require(readr)

  if(elasticity_model==1){
    params <- read_csv('/Users/levisolomyak/Documents/GitHub/human_inference_of_elastic_control/analysis/02computational_modeling/posterior_sim/fits_for_sim/e_c.csv')
    print('lets do')
  } else if(elasticity_model==0) {
    params <- read_csv('./fits_for_sim/n_c.csv')

    # Extract the first row per participant
  }else if(elasticity_model==3){
    params=read_csv('./fits_for_sim/e_c_star.csv')
    print('here')
  

  }
  
  generic_params <- function(df, n_agents) {
    set.seed(3)
    new_params <- data.frame()
    new_params <- data.frame(matrix(ncol = length(names(df)), nrow = n_agents))
    colnames(new_params) <- names(df)
    for (col in names(df)) {
      new_params[[col]] <- sample(df[[col]], n_agents, replace = TRUE)
    }
    return(new_params)
  }
  
  new_params <- generic_params(params, n_agents)
  
  # 40 agents
  learning_all <- c()
  learning <- c()
  df_list <- list()
  df_learning <-list()
  df_combined <- c()
  c_learned <- c()
  bandit_total <- c()
  for(n in 1:n_agents){
    # 3 rows from the csv 
    block=1
    # learning <- c()
    unique_participant_id = paste0(sample(100:1000, 1), "_sim_", n)
    if(full==0){
  
      learning_all <- rbind(learning_all,learning)
      
      num_blocks=4
      recovery_type=1
      
      for(i in 1:num_blocks){
        # reset learning 
        learning <- c()
        block <- 4 * (n - 1) + i
        trial_block=i+1
        
        #simulate other values 
        if(elasticity_model==1){
          learning=sim_c_2s_3a_2e_perseveration(data_f,control_learning,block,new_params[n,],ambiguous=0,unique_participant_id,trial_block,1)
        } else if(elasticity_model==0){
          learning=sim_nc_3s_3a_3e_perseveration(data_f,control_learning,block,new_params[n,],ambiguous=0,unique_participant_id,trial_block,1)
          
        } else if(elasticity_model==3){
          learning=sim_c_2s_3a_2e_perseveration_learn3(data_f,control_learning,block,new_params[n,],ambiguous=0,unique_participant_id,trial_block,1)
          
        }
        learning_all <- rbind(learning_all,learning)
        
      }
      
      
    }else{
      #  print(n)
      df <- generate_allowed_points()
      # df <- df %>% dplyr::filter(c_elastic<.31)
      for(trial_block in 1:nrow(df)){
        learning <- c()
        
        block=trial_block
        if(elasticity_model==3){
          
          learning=sim_c_2s_3a_2e_perseveration_learn3(df,control_learning,block,new_params[n,],ambiguous=0,unique_participant_id,trial_block,1)
          
        } else if(elasticity_model==0) {
          learning=sim_nc_3s_3a_3e_perseveration(data_f,control_learning,block,new_params[n,],ambiguous=0,unique_participant_id,trial_block,1)
          
          
        }else{
          learning=sim_c_2s_3a_2e_perseveration(df,control_learning,block,new_params[n,],ambiguous=0,unique_participant_id,trial_block,1)
          
        }
        
        learning_all <- rbind(learning_all,learning)
        
        
      }
      
    }
    
  }
  
  learning_all$rewarded=if_else(learning_all$Reward>0,1,0)
  learning_all <- learning_all %>% mutate(trial_reward=case_when(
    rewarded==1 & total_actions==0~150,
    rewarded==1 & total_actions==1~110,
    rewarded==1 & total_actions==2~90,
    rewarded==1 & total_actions==3~70,
    rewarded==0 & total_actions==0~0,
    rewarded==0 & total_actions==1~-40,
    rewarded==0 & total_actions==2~-60,
    rewarded==0 & total_actions==3~-80,
  ))
  


return(learning_all)}
elasticity_star <-   generate_sim_data(data_f,1000,0,3)
elasticity <-   generate_sim_data(data_f,1000,0,1)
controllability <-   generate_sim_data(data_f,1000,0,0)

