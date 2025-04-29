softmax <- function(x) {
  exp_x <- exp(x - max(x))
  exp_x / sum(exp_x)
}




sim_c_2s_3a_2e_perseveration <- function(df,control_learning,block,params,ambigious,subs,trial_block,forced_choice=1,seed_num){
  num_trials=30
  control_learning <- list(
    trials=seq(0,num_trials-1))
  
  control_learning <- as.data.frame(control_learning)
  beta= params$beta
  scale1= params$scale1
  scale2=params$scale2
  scale3=params$scale3
  
  epsilon1=params$epsilon1
  epsilon2=params$epsilon2

  # kaps=params$kaps * 1.1
  alpha1=params$alpha1;
  alpha2=params$alpha2;
  alpha3=params$alpha3 ;
  pers=params$pers; 
  N=30; 
  # ########print("dont know this")
  opt_in=0
  
  
  if(ambigious==1){
    c_inelastic=.33
    c_elastic= .34
  }else{
    c_inelastic=df$c_inelastic[block]
    c_elastic=  df$c_elastic[block]
  }
  
#  print(c_elastic)
  mu_opt <- 0
  how_many <- rep(0.0, 4)

  control_learning$take_more[1] <- epsilon1 * scale1
  control_learning$take_less[1] <- epsilon1 * (1 - scale1)
  control_learning$stay_two[1] <- epsilon1 * (1-scale1)
  control_learning$dont_stay_two[1] <- epsilon1 * (scale1)
  control_learning$no_c[1] <- epsilon2 * (1 - scale3)
  control_learning$yes_c[1] <- 2 * epsilon2 * scale3
  control_learning$yes_control[1] <- control_learning$yes_c[1] / (control_learning$no_c[1] + control_learning$yes_c[1])

  
  
  set.seed(42)
  
  ss_transition=generate_ss()
  #ss_transition <- rep(0,30)
  control_learning$ss_transition=ss_transition
  ####print(c_inelastic)
  set.seed(42)
  win_1=c(generate_random_ss(c_inelastic,10),generate_random_ss(c_inelastic,10),generate_random_ss(c_inelastic,10))#,generate_random_ss(c_inelastic,5),generate_random_ss(c_inelastic,5),generate_random_ss(c_inelastic,5))
  
  win_2=c(generate_random_ss(c_inelastic+c_elastic/2,10),generate_random_ss(c_inelastic+c_elastic/2,10),generate_random_ss(c_inelastic+c_elastic/2,10))# ,generate_random_ss(c_inelastic+c_elastic/2,5),generate_random_ss(c_inelastic+c_elastic/2,5),generate_random_ss(c_inelastic+c_elastic/2,5))
  win_3=c(generate_random_ss(c_inelastic+c_elastic,10),generate_random_ss(c_inelastic+c_elastic,10),generate_random_ss(c_inelastic+c_elastic,10))#,generate_random_ss(c_inelastic+c_elastic,5),generate_random_ss(c_inelastic+c_elastic,5),generate_random_ss(c_inelastic+c_elastic,5))
  
  
  control_learning$win_1=win_1
  control_learning$win_2=win_2
  control_learning$win_3=win_3
  
  
  
  for(n in 1:N) {
    
    control_learning$yes_control[n] <- control_learning$yes_c[n] / (control_learning$no_c[n] + control_learning$yes_c[n])
    
    ticket_1 <- control_learning$take_less[n] / (control_learning$take_less[n] + control_learning$take_more[n])
    ticket_2 <- (control_learning$stay_two[n] / (control_learning$stay_two[n] + control_learning$dont_stay_two[n])) * (control_learning$take_more[n] / (control_learning$take_less[n] + control_learning$take_more[n]))
    ticket_3 <- (control_learning$dont_stay_two[n] / (control_learning$stay_two[n] + control_learning$dont_stay_two[n])) * (control_learning$take_more[n] / (control_learning$take_less[n] + control_learning$take_more[n]))
    control_learning$ticket_1[n]=ticket_1
    control_learning$ticket_2[n]=ticket_2
    control_learning$ticket_3[n]=ticket_3
    
    
    if(n<6) {
      control_learning$total_actions[n]=3
      control_learning$ev1[n] <- 110 * (control_learning$yes_control[n] * ticket_1 + 0.2 * (1 - control_learning$yes_control[n] * ticket_1)) - (0.8 * 40 * (1 - (control_learning$yes_control[n] * ticket_1)))
      control_learning$ev2[n] <- 90 * (control_learning$yes_control[n] * (ticket_1 + ticket_2) + 0.2 * (1 - (control_learning$yes_control[n] * (ticket_1 + ticket_2)))) - (0.8 * 60 * (1 - (control_learning$yes_control[n] * (ticket_1 + ticket_2))))
      control_learning$ev3[n] <- 70 * (control_learning$yes_control[n] * (ticket_1 + ticket_2 + ticket_3) + 0.2 * (1 - (control_learning$yes_control[n] * (ticket_1 + ticket_2 + ticket_3)))) - (0.8 * 80 * (1 - (control_learning$yes_control[n] * (ticket_1 + ticket_2 + ticket_3))))
      
    } 
    else {
      # Debugging: ##print variables before calculating 'how_many'
      
      control_learning$ev1[n] <- 110 * (control_learning$yes_control[n] * ticket_1 + 0.2 * (1 - control_learning$yes_control[n] * ticket_1)) - (0.8 * 40 * (1 - (control_learning$yes_control[n] * ticket_1)))
      control_learning$ev2[n] <- 90 * (control_learning$yes_control[n] * (ticket_1 + ticket_2) + 0.2 * (1 - (control_learning$yes_control[n] * (ticket_1 + ticket_2)))) - (0.8 * 60 * (1 - (control_learning$yes_control[n] * (ticket_1 + ticket_2))))
      control_learning$ev3[n] <- 70 * (control_learning$yes_control[n] * (ticket_1 + ticket_2 + ticket_3) + 0.2 * (1 - (control_learning$yes_control[n] * (ticket_1 + ticket_2 + ticket_3)))) - (0.8 * 80 * (1 - (control_learning$yes_control[n] * (ticket_1 + ticket_2 + ticket_3))))

      
      if(n==6){
        #pers=0
        pers=params$pers; 
        
      }else{
        pers=params$pers; 
      }
      
      if(n>1){
      how_many[1] <- beta * 30 + (control_learning$total_actions[n-1]==0)  * pers;
      #print(paste('beta','beta'))
      #print(control_learning$ev1[n])
      #print((control_learning$total_actions[n-1]==1))
      
      how_many[2] <- beta * control_learning$ev1[n] + alpha1+(control_learning$total_actions[n-1]==1)  * pers
      how_many[3] <- beta * control_learning$ev2[n] + alpha2+(control_learning$total_actions[n-1]==2) * pers
      how_many[4] <- beta * control_learning$ev3[n]+  alpha3+(control_learning$total_actions[n-1]==3) * pers;
      }else{
            how_many[1] <- beta * 30;
            #print(paste('beta','beta'))
            #print(control_learning$ev1[n])
            #print((control_learning$total_actions[n-1]==1))
            
            how_many[2] <- beta * control_learning$ev1[n] + alpha1;
            how_many[3] <- beta * control_learning$ev2[n] + alpha2;
            how_many[4] <- beta * control_learning$ev3[n]+  alpha3;
            
      }
  
      control_learning$zero_ticket[n]=how_many[1]
      control_learning$one_ticket[n]=how_many[2]
      control_learning$two_ticket[n]=how_many[3]
      control_learning$three_ticket[n]=how_many[4]
      
      control_learning$total_actions[n]=sample(0:3,size=1,prob=softmax(how_many))
     
      
    }
    if(ss_transition[n]==1){
      control_learning$Reward[n]=1
    }
    else{
      if(control_learning$total_actions[n] == 1){
        control_learning$Reward[n]=win_1[n]
      }else if(control_learning$total_actions[n] == 2){
        control_learning$Reward[n]=win_2[n]
        
      }else if(control_learning$total_actions[n] == 3){
        control_learning$Reward[n]=win_3[n]
      }else{
        control_learning$Reward[n]=0
      }
      
    }
    
    #####print(n)
    if(n<30){
      
      control_learning$yes_c[n + 1] <- control_learning$yes_c[n]
      control_learning$take_less[n + 1] <- control_learning$take_less[n]
      control_learning$stay_two[n + 1] <- control_learning$stay_two[n]
      control_learning$take_more[n + 1] <- control_learning$take_more[n]
      control_learning$no_c[n + 1] <- control_learning$no_c[n]
      control_learning$dont_stay_two[n + 1] <- control_learning$dont_stay_two[n]
      
      
      if((ss_transition[n]==0)){
     # print('time to learn')
        if(control_learning$Reward[n] == 1){
          if(control_learning$total_actions[n]>0){
            control_learning$yes_c[n+1]=control_learning$yes_c[n] + 1.0;
            
          }
          if(control_learning$total_actions[n] == 1){
            control_learning$take_less[n+1]=control_learning$take_less[n]+ 1.0;
            ######print("update occuring")
          }else if (control_learning$total_actions[n] == 2){
            control_learning$stay_two[n+1]=control_learning$stay_two[n]+1.0;
            #####print("update occuring")
            
          } else if (control_learning$total_actions[n]==3){
            
          }
          
          
        } else if (control_learning$Reward[n]==0){
          if(control_learning$total_actions[n]==1){
            control_learning$take_more[n+1]= control_learning$take_more[n]+1.0; 
            #####print("update occuring")
            
          }else if (control_learning$total_actions[n]==2){
            control_learning$dont_stay_two[n+1]= control_learning$dont_stay_two[n]+1; 
            #####print("update occuring")
            control_learning$take_more[n+1]= control_learning$take_more[n]+1.0; 
            
          } else if (control_learning$total_actions[n]==3){
            
            control_learning$no_c[n+1] = control_learning$no_c[n] + 1.0;
          }
          
          
        }   
      }
    }
    
  }
  
  control_learning$c_elastic=c_elastic
  control_learning$c_inelastic=c_inelastic
  control_learning$epsilon1=params$epsilon1
  control_learning$epsilon2=params$epsilon2
  
  control_learning$scale1=scale1
  #  control_learning$scale2=params$scale2
  control_learning$scale3=scale3
  
  control_learning$beta=beta
  control_learning$pers=pers
  
  control_learning$alpha1=alpha1
  control_learning$alpha2=alpha2
  control_learning$alpha3=alpha3
  
  control_learning$participant=subs
  if(ambigious==1){
    control_learning$block=1
  }else{
    control_learning$block=trial_block
  }
  
  
  
  return(control_learning)}

