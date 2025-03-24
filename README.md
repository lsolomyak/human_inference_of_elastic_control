# Resource Elasticity of Control

## Abstract 
Action is only warranted when it affords control over the environment. The controllability of an environment, however, may depend on the effort, time, and money that we are willing and able to invest. In such environments, controllability is not fixed. Rather, it is elastic to invested resources. Here, we investigate whether and how people infer this elasticity of control, hypothesizing that individual differences in elasticity inference are responsible for misallocation of resources that may lead to psychopathology. To test these hypotheses, we developed a novel treasure hunt game where participants encountered environments with varying degrees of controllability and elasticity. Across two pre-registered studies (N=514), we demonstrate that people infer elasticity and adapt their resource allocation accordingly. We present a computational model that explains how people make this inference, and identify individual elasticity biases which lead to suboptimal resource management. Importantly, we show that overestimation of elasticity is associated with elevated psychopathology involving an impaired sense of control. These findings establish the elasticity of control as a distinct cognitive construct guiding adaptive behavior, and a computational marker for control-related psychopathology.

Author
Levi Solomyak (levi.solomyak [at] huji.ac.il)

## Experiment

This code analyzes data from an experiment that can be found at:
**https://run.pavlovia.org/levi.solomyak/control_2_rep**

Feel free to give it a go! Just make sure to enter 1 under Participant 

To see a video of a few sample trials. You cant see here what the participant pressed- so you'll get a much better feel for it by actually doing the task. 
https://www.loom.com/share/d8dd07f543c342feab5672a884b19198



## Repository Structure

```bash
|-analysis
  |  |-01model_free
  |  |  |-power_analysis
  |  |-02computational_modeling
  |  |  |-data
  |  |  |-helper_functions
  |  |  |-lik_functions
  |  |  |-parameter_recovery
  |  |  |-posterior_sim
  |  |-03psychopathology
  |  |  |-cca_analysis
  |  |  |-process_raw
  |-data
  |  |-behavior
  |  |  |-processed
  |  |  |-raw
  |  |-questionnaires
  |  |  |-processed
  |  |  |-raw
  |-experiment
  |  |-images
  |  |  |-distinguiish_actions
  |  |  |-gambling_task
  |  |  |  |-risk_distributions_final
  |  |  |-instr_new_draft
  |  |  |-islands
  |  |  |-planes
  |-manuscript
  |-pre_registration
```




