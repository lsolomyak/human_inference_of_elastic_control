# How to Run

To execute the main scripts and run the models:

1. Open MATLAB (or Octave).

2. Set the working directory to the root of this repository.

3. Run the main script `execute_scripts.m`:

    ```matlab
    run('execute_scripts.m')
    ```

This script will call the necessary functions and start the modeling process.

## Data

Both the initial and replication data are located in the `modeling_data/` folder. This folder contains the datasets required for running the models.


## Likelihood Functions

All likelihood functions are located in the `lik_functions/` folder. These functions are used for model fitting and are automatically called by `execute_scripts.m`.

## Posterior/simulation analysis can be run in the posterior_sim folder by running in R 
```run_sim.R```

## Additional Files

- **`run_likelihood.m`**: Runs likelihood calculations.
- **`run_models.m`**: Contains code to execute the model simulations
