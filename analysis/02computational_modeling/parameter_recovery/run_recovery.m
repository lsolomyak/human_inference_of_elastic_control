%%
% Parameter recovery using optimal subjects
clear 
clc
close all

% Load the optimal subjects data
load('optimal_subjects_control.csv'); % This should contain selected_subjects, true_P, and sim_data
%%
% If you need the original data for reference
load('C:\Users\owner\Desktop\elasticity_modeling\data\combined_data.mat'); % Contains 'data' structure

%% Initialize parameters
N = length(selected_subjects); % number of subjects for simulation (from optimal_subjects)
T = 120; % number of trials per subject
S = 10000; % number of samples for fitting

% Get parameter names from the true_P structure
param_names = fieldnames(true_P(1));

%% Create direct copy of data to sim_data to preserve structure
% Note: sim_data should already be loaded from optimal_subjects.mat

%% Run simulation for each subject
for n = 1:N
    fprintf('Simulating subject %d/%d\n', n, N);
    
    % Run simulation using the parameters from the selected optimal subjects
    sim_input = sim_data(n);
    [~, sim_outputs] = c_2s_3a_2e_3learn_sim_version(true_P(n), sim_input, 1);
    
    % Copy simulation results to sim_data
    fields_to_copy = {'num_tries', 'Reward', 'cumulative_surprise', 'inelastic'};
    
    for i = 1:length(fields_to_copy)
        field = fields_to_copy{i};
        if isfield(sim_outputs, field)
            sim_data(n).(field) = sim_outputs.(field);
        end
    end
end

%% Initialize the model with the wrapper
model{1}.lik_func = @c_2s_3a_2e_3learn_sim_version;
model{1}.name = 'c_2s_3a_2e_3learn_sim_version';

% Derive parameter specifications from the true parameters of optimal subjects
for i = 1:length(param_names)
    param = param_names{i};
    param_values = zeros(N, 1);
    
    for n = 1:N
        param_values(n) = true_P(n).(param)(1); % Take first value
    end
    
    param_mean = mean(param_values);
    param_std = std(param_values);
    
    % Determine appropriate distribution and parameters based on the data
    if param_mean > 0 && all(param_values >= 0)
        if max(param_values) <= 1
            % Beta distribution for parameters in [0, 1]
            var_param = param_std^2;
            alpha = param_mean * (param_mean * (1 - param_mean) / var_param - 1);
            beta = (1 - param_mean) * (param_mean * (1 - param_mean) / var_param - 1);
            
            % Ensure positive parameters (minimum 0.1)
            alpha = max(0.1, alpha);
            beta = max(0.1, beta);
            
            model{1}.spec.(param).type = 'beta';
            model{1}.spec.(param).val = [alpha, beta];
        else
            % Gamma distribution for strictly positive parameters
            var_param = param_std^2;
            shape = param_mean^2 / var_param;
            scale = var_param / param_mean;
            
            % Ensure positive parameters
            shape = max(0.1, shape);
            scale = max(0.1, scale);
            
            model{1}.spec.(param).type = 'gamma';
            model{1}.spec.(param).val = [shape, scale];
        end
    else
        % Normal distribution for unbounded parameters
        model{1}.spec.(param).type = 'norm';
        model{1}.spec.(param).val = [param_mean, param_std];
    end
end

model{1}.bic = nan;

%% Fit model to simulated data
disp('Starting model fitting...');

for m = 1:length(model)
    improvement = nan;
    while ~(improvement < 2) % repeat until fit stops improving
        oldbic = model{m}.bic;

        for n = 1:N
            model{m} = mfUtil1.randomP(model{m}, S); % sample random parameter values
            lik = model{m}.lik_func(model{m}.P, sim_data(n), 0); % compute log-likelihood for each sample
            model{m} = mfUtil1.computeEstimates(lik, model{m}, n); % resample parameter values
        end

        % fit prior to resampled parameters
        model{m} = mfUtil1.fit_prior(model{m});

        % compute goodness-of-fit measures 
        Nparams = 2*length(fieldnames(model{m}.spec)); % number of hyperparameters
        Ndatapoints = numel([sim_data.Reward]); % total number of datapoints 
        model{m}.evidence = sum([model{m}.fit.evidence]); % total evidence
        model{m}.bic = -2*model{m}.evidence + Nparams*log(Ndatapoints); % BIC
        improvement = oldbic - model{m}.bic; % compute improvement
        fprintf('%s - %s    old: %.2f       new: %.2f      \n', model{m}.name, 'bic', oldbic, model{m}.bic)
    end
end

%% Display parameter recovery results
parameters = param_names;
recovered_params = struct();

% Extract fitted parameters for all subjects
fits = [model{1}.fit.P];
for i = 1:length(parameters)
    param_name = parameters{i};
    if isfield(fits, param_name)
        param_values = [fits.(param_name)];
        recovered_params.(param_name) = [param_values.val];
    end
end

% Display correlation between true and recovered parameters
fprintf('\nParameter Recovery Correlations:\n');
fprintf('%-10s %-10s\n', 'Parameter', 'Correlation');
fprintf('------------------------\n');

for i = 1:length(parameters)
    param_name = parameters{i};
    if isfield(recovered_params, param_name)
        true_values = [];
        for n = 1:N
            true_values(n) = true_P(n).(param_name)(1); % Get first element
        end
        
        corr_val = corr(true_values', recovered_params.(param_name)');
        fprintf('%-10s %-10.4f\n', param_name, corr_val);
    end
end

%% Create visualization of parameter recovery
figure('Position', [100, 100, 1200, 800]);

% Determine number of parameters and subplot grid size
num_params = length(parameters);
grid_cols = min(4, num_params);
grid_rows = ceil(num_params / grid_cols);

for i = 1:length(parameters)
    param_name = parameters{i};
    if isfield(recovered_params, param_name)
        % Extract true and recovered values
        true_values = zeros(N, 1);
        for n = 1:N
            true_values(n) = true_P(n).(param_name)(1);
        end
        recovered_values = recovered_params.(param_name)';
        
        % Create subplot
        subplot(grid_rows, grid_cols, i);
        scatter(true_values, recovered_values, 50, 'filled', 'MarkerFaceAlpha', 0.7);
        hold on;
        
        % Add regression line
        coeffs = polyfit(true_values, recovered_values, 1);
        x_range = linspace(min(true_values), max(true_values), 100);
        y_fit = polyval(coeffs, x_range);
        plot(x_range, y_fit, 'r-', 'LineWidth', 2);
        
        % Add identity line
        plot([min(true_values), max(true_values)], [min(true_values), max(true_values)], 'k--');
        
        % Calculate correlation
        corr_val = corr(true_values, recovered_values);
        
        % Add title and labels
        title(sprintf('%s (r = %.4f)', param_name, corr_val));
        xlabel('True value');
        ylabel('Recovered value');
        grid on;
    end
end

% Adjust figure layout
sgtitle('Parameter Recovery with Optimal Subjects', 'FontSize', 16);

% Save the figure
saveas(gcf, 'param_recovery_optimal_subjects.png');
saveas(gcf, 'param_recovery_optimal_subjects.fig');

%% Focus on the parameters of interest (epsilon1 and scale1)
params_to_analyze = {'epsilon2', 'scale3'};

% Create a new figure for confusion analysis
figure('Position', [100, 100, 800, 800]);

% Extract true and recovered values for these parameters
true_vals = zeros(N, length(params_to_analyze));
recovered_vals = zeros(N, length(params_to_analyze));

for i = 1:length(params_to_analyze)
    param = params_to_analyze{i};
    for n = 1:N
        true_vals(n, i) = true_P(n).(param)(1);
    end
    recovered_vals(:, i) = recovered_params.(param)';
end

% Create confusion matrix of correlations
confusion_matrix = zeros(length(params_to_analyze));
for i = 1:length(params_to_analyze)
    for j = 1:length(params_to_analyze)
        confusion_matrix(i, j) = corr(true_vals(:, i), recovered_vals(:, j));
    end
end

% Display the correlation matrix as a heatmap
subplot(2, 2, 1);
imagesc(confusion_matrix);
colorbar;
caxis([-1 1]);
colormap('jet');
xticks(1:length(params_to_analyze));
yticks(1:length(params_to_analyze));
xticklabels(params_to_analyze);
yticklabels(params_to_analyze);
title('Parameter Confusion Matrix');
for i = 1:length(params_to_analyze)
    for j = 1:length(params_to_analyze)
        text(j, i, sprintf('%.4f', confusion_matrix(i, j)), ...
            'HorizontalAlignment', 'center', 'Color', 'white', 'FontWeight', 'bold');
    end
end

% Plot true vs recovered for each parameter
for i = 1:length(params_to_analyze)
    subplot(2, 2, i+1);
    scatter(true_vals(:, i), recovered_vals(:, i), 50, 'filled', 'MarkerFaceAlpha', 0.7);
    hold on;
    
    % Add regression line
    coeffs = polyfit(true_vals(:, i), recovered_vals(:, i), 1);
    x_range = linspace(min(true_vals(:, i)), max(true_vals(:, i)), 100);
    y_fit = polyval(coeffs, x_range);
    plot(x_range, y_fit, 'r-', 'LineWidth', 2);
    
    % Add identity line
    plot([min(true_vals(:, i)), max(true_vals(:, i))], ...
         [min(true_vals(:, i)), max(true_vals(:, i))], 'k--');
    
    title([params_to_analyze{i}, ' Recovery']);
    xlabel('True value');
    ylabel('Recovered value');
    grid on;
end

% Plot cross-parameter relationship
subplot(2, 2, 4);
scatter(true_vals(:, 1), recovered_vals(:, 2), 50, 'filled', 'MarkerFaceAlpha', 0.7);
hold on;

% Add regression line
coeffs = polyfit(true_vals(:, 1), recovered_vals(:, 2), 1);
x_range = linspace(min(true_vals(:, 1)), max(true_vals(:, 1)), 100);
y_fit = polyval(coeffs, x_range);
plot(x_range, y_fit, 'r-', 'LineWidth', 2);

title([params_to_analyze{1}, ' → ', params_to_analyze{2}, ' Confusion']);
xlabel(['True ', params_to_analyze{1}]);
ylabel(['Recovered ', params_to_analyze{2}]);
grid on;

% Save the confusion analysis figure
saveas(gcf, 'parameter_confusion_optimal_subjects.png');
saveas(gcf, 'parameter_confusion_optimal_subjects.fig');