# Resource Elasticity of Control

## Abstract 
Action is only warranted when it affords control over the environment. The controllability of an environment, however, may depend on the effort, time, and money that we are willing and able to invest. In such environments, controllability is not fixed. Rather, it is elastic to invested resources. Here, we investigate whether and how people infer this elasticity of control, hypothesizing that individual differences in elasticity inference are responsible for misallocation of resources that may lead to psychopathology. To test these hypotheses, we developed a novel treasure hunt game where participants encountered environments with varying degrees of controllability and elasticity. Across two pre-registered studies (N=514), we demonstrate that people infer elasticity and adapt their resource allocation accordingly. We present a computational model that explains how people make this inference, and identify individual elasticity biases which lead to suboptimal resource management. Importantly, we show that overestimation of elasticity is associated with elevated psychopathology involving an impaired sense of control. These findings establish the elasticity of control as a distinct cognitive construct guiding adaptive behavior, and a computational marker for control-related psychopathology.

Author
Levi Solomyak (levi.solomyak [at] huji.ac.il)



## Repository Structure

```bash
# Resource Elasticity of Control

├── data/                                    # Data files and preprocessing scripts
│
├── raw/                                     # Raw experimental data
├── processed/                               # Cleaned and processed datasets
│
├── experiments/                             # Experimental task implementation
│
├── assets/                                  # Visual assets for the treasure hunt game
├── planets/                                 # Planet configuration files
├── task/                                    # Core game implementation
    ├── components/                          # UI components
    └── controllers/                         # Game logic and mechanics
│
├── analysis/                                # Analysis scripts and notebooks
│
├── models/                                  # Computational model implementations
    ├── controllability/                     # Controllability model
    └── elastic/                             # Elastic controllability model
├── preprocessing/                           # Data cleaning and preparation
├── modeling/                                # Model fitting and comparison
└── visualization/                           # Plotting and figure generation
│
├── questionnaires/                          # Psychometric measurement tools
│
├── scales/                                  # Individual questionnaire implementations
└── processing/                              # Questionnaire scoring scripts
│
├── utils/                                   # Utility functions and helpers
│
├── statistics/                              # Statistical analysis functions
└── helpers/                                 # General helper functions
│
├── tests/                                   # Unit tests and integration tests
│
├── experiment/                              # Task-related tests
└── analysis/                                # Analysis pipeline tests
│
└── results/                                 # Generated outputs and figures
    ├── figures/                            # Generated figures
    └── tables/                             # Generated tables
```




