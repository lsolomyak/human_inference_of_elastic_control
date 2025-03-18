%% Main script for model fitting and analysis
% This script runs the computational model analysis pipeline
% Usage: run_analysis(datafile_path, output_name)

function run_analysis(datafile_path, output_name, group_num)
    %% Setup environment
    % Add paths and configure environment
    setup_environment();
    
    % Check inputs
    if nargin < 2 
        error('Please provide data file path and output name');
    end
    
    % Set default group if not provided
    if nargin < 3
        group_num = 1; % Default to group 1
    end
    
    % Load and prepare data
    fprintf('Loading data from: %s\n', datafile_path);
    dd = readtable(datafile_path);  
    fprintf('Data loaded successfully with %d rows\n', height(dd));
    
    % Prepare data for modeling using the revised prepare_dat function
    fprintf('Preparing data for modeling...\n');
    data = prepare_dat(dd, 0); % 0 indicates not a simulation
    N = size(data, 2);
    fprintf('Data prepared for %d subjects\n', N);
    
    %% Initialize models
    fprintf('Initializing models...\n');
    if group_num == 1
        model = initialize_models(); % Use general initialize function
    else
        model = initialize_for_CCA(); % Use the specific CCA initialization function
    end
    fprintf('Models initialized successfully\n');
    
    %% Run model fitting with increasing sample sizes
    fprintf('Running model fitting...\n');
    
    % Define the models to run
    all_models = 1:length(model);
    
    % Run with small sample for quick testing
    [model] = run_likelihood(model, N, data, 1, all_models);
    fprintf('Completed initial run\n');
    
    % Run with increasing sample sizes
    sample_sizes = [50, 500, 5000, 25000, 50000];
    for s = 1:length(sample_sizes)
        fprintf('Running with %d samples...\n', sample_sizes(s));
        [model] = run_likelihood(model, N, data, sample_sizes(s), all_models);
        fprintf('Completed %d samples\n', sample_sizes(s));
        
        % Save intermediate results every 5000+ samples
        if sample_sizes(s) >= 5000
            save(sprintf('%s_intermediate_%d.mat', output_name, sample_sizes(s)), 'model', 'data');
            fprintf('Saved intermediate results for %d samples\n', sample_sizes(s));
        end
    end
    
    %% Save final model fits
    fprintf('Saving model fits...\n');
    for m = 1:length(model)
        save_fits(model, data, m, sprintf('%s_model%d', output_name, m), 0);
    end
    
    % Save all models in a single file
    save(sprintf('%s_all_models.mat', output_name), 'model', 'data');
    fprintf('Saved all models to %s_all_models.mat\n', output_name);
    
    fprintf('Analysis completed successfully for %s\n', output_name);
    
    % Calculate and display BIC values for comparison
    display_model_comparison(model);
end

function setup_environment()
    % Detect OS and set paths
    if ismac
        disp('Running on Mac OS X');
        main_folder = '/Users/levisolomyak/Desktop/Documents/Control_studies/Control_studies/scripts/analyses/02_modeling/Matlab/';
    elseif isunix
        disp('Running on Unix');
        main_folder = pwd; % Current directory
    elseif ispc
        disp('Running on Windows');
        main_folder = 'C:\Users\owner\Desktop\elasticity_modeling';
    else
        disp('Unknown system');
        main_folder = pwd; % Current directory
    end
    
    % Add paths
    addpath(genpath(main_folder));
    fprintf('Added paths from: %s\n', main_folder);
end

function display_model_comparison(model)
    % Display BIC values for model comparison
    fprintf('\n\nModel Comparison (BIC values):\n');
    fprintf('----------------------------\n');
    for m = 1:length(model)
        fprintf('Model %d (%s): BIC = %f\n', m, model{m}.name, model{m}.bic);
    end
    
    % Find best model
    bic_values = zeros(1, length(model));
    for m = 1:length(model)
        bic_values(m) = model{m}.bic;
    end
    [min_bic, best_idx] = min(bic_values);
    fprintf('\nBest model: Model %d (%s) with BIC = %f\n', best_idx, model{best_idx}.name, min_bic);
end
