%% Main script for model fitting and analysis
% This script runs the computational model analysis pipeline

function run_models(datafile_path, output_name, group_num, run_type)
    %% Setup environment
    % Add paths and configure environment
    setup_environment()
    
    % Check inputs
    if nargin < 2 
        error('Please provide data file path and output name');
    end
    
    % Load and prepare data
    fprintf('Loading data from: %s\n', datafile_path);
    dd = readtable(datafile_path);  
    fprintf('Data loaded successfully with %d rows\n', height(dd));
    
    % Prepare data for modeling using the revised prepare_dat function
    fprintf('Preparing data for modeling...\n');
    data = prepare_data(dd, 0,group_num); % 0 indicates not a simulation
    N = size(data, 2);
    fprintf('Data prepared for %d subjects\n', N);
    
    %% Initialize models
    fprintf('Initializing models...\n');
    model = initialize_models(); % Use general initialize function
  
    %% Run model fitting with increasing sample sizes
    fprintf('Running model fitting...\n');
    
    % Define the models to run
    all_models = 1:length(model);
    
    % Run with small sample for quick testing
    [model] = run_likelihood(model, N, data, 2, all_models);
    fprintf('Completed initial run\n');
    
    % Define all sample sizes to run
    sample_sizes = [50, 500, 5000, 10000, 25000, 50000];  % Use various sample sizes

    % Run with increasing sample sizes
    for s = 1:length(sample_sizes)
        fprintf('Running with %d samples...\n', sample_sizes(s));
        [model] = run_likelihood(model, N, data, sample_sizes(s), all_models);
        fprintf('Completed %d samples\n', sample_sizes(s));
        
        % Save intermediate results every 5000+ samples
        if sample_sizes(s) >= 5000
            save(sprintf('%s_intermediate_%d_%s.mat', output_name, sample_sizes(s), run_type), 'model', 'data');
            fprintf('Saved intermediate results for %d samples\n', sample_sizes(s));
        end
    end
    
    %% Save final model fits
    fprintf('Saving model fits...\n');
    for m = 1:length(model)
        save_fits(model, data, m, sprintf('%s_model%d_%s', output_name, m, run_type), 0);
    end
    
    % Save all models in a single file
    save(sprintf('%s_all_models_%s.mat', output_name, run_type), 'model', 'data');
    fprintf('Saved all models to %s_all_models_%s.mat\n', output_name, run_type);
    
    fprintf('Analysis completed successfully for %s\n', output_name);
    
    % Calculate and display BIC values for comparison
    display_model_comparison(model);
end
function setup_environment()
    % Get the directory of the current script
    current_folder = fileparts(mfilename('fullpath'));
    
    % Define the base folder where the modeling data is stored
    main_folder = fullfile(current_folder, '..', '..', '02computational_modeling'); % Assuming '02computational_modeling' is two levels above
    
    % Display the path for confirmation
    disp(['Base folder set to: ', main_folder]);
    
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
