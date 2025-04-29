% Set the folder where the data is stored (this part is automatically handled in the script)
data_folder = fullfile(pwd, 'modeling_data');  % Uses current working directory to access data folder

% Define the output name base
output_base_name = 'modeling_results';

% Run for the first group (initial)
run_models(fullfile(data_folder, 'dd_group1.csv'), output_base_name, 0, 'initial');

% Run for the second group (replication)
run_models(fullfile(data_folder, 'dd_group2.csv'), output_base_name, 1, 'replication');
