%%
% Parameter recovery to determine confusio betwen concentraion (epsilon)
% and bias (scale)
clear 
clc
close all

data_folder = fullfile(pwd, 'modeling_data');  % Uses current working directory to access data folder

% If you need the original data for reference
load(fullfile(data_folder, 'combined_data.mat')); % Contains 'data' structure
load(fullfile(data_folder, 'true_p.mat'))
load(fullfile(data_folder, 'sim_data.mat'))

%% Initialize parameters
N = length(sim_data); % number of subjects for simulation (from optimal_subjects)
T = 120; % number of trials per subject
S = 10000; % number of samples for fitting

% Get parameter names from the true_P structure
param_names = fieldnames(true_P(1));



%% Run simulation for each subject
for n = 1:N
    fprintf('Simulating subject %d/%d\n', n, N);
    
    % Run simulation using the parameters from the fit subjects
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

model{1}.spec.beta.type = 'beta';
model{1}.spec.beta.val = [1 1];

model{1}.spec.pers.type = 'norm';
model{1}.spec.pers.val = [0 1];

model{1}.spec.epsilon1.type = 'lognorm';
model{1}.spec.epsilon1.val = [0 1];

model{1}.spec.epsilon2.type = 'lognorm';
model{1}.spec.epsilon2.val = [0 1];

model{1}.spec.alpha1.type = 'norm';
model{1}.spec.alpha1.val = [0 1];

model{1}.spec.alpha2.type = 'norm';
model{1}.spec.alpha2.val = [0 1];

model{1}.spec.alpha3.type = 'norm';
model{1}.spec.alpha3.val = [0 1];

model{1}.spec.scale1.type = 'beta';
model{1}.spec.scale1.val = [1 1];

model{1}.spec.scale3.type = 'beta';
model{1}.spec.scale3.val = [1 1];


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


%% Focus on the parameters of interest (epsilon1 and scale1)
params_to_analyze = {'epsilon1', 'scale1'};

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
saveas(gcf, 'parameter_confusion.png');
saveas(gcf, 'parameter_confusion.fig');

%%
%% Display parameter recovery results with bias analysis
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

% Display correlation and bias between true and recovered parameters
fprintf('\nParameter Recovery Analysis:\n');
fprintf('%-10s %-12s %-12s %-12s %-12s %-12s\n', 'Parameter', 'Correlation', 'Mean Bias', 'Abs Bias', 'RMSE', 'Bias p-val');
fprintf('--------------------------------------------------------------------------------\n');

bias_results = struct();

for i = 1:length(parameters)
    param_name = parameters{i};
    if isfield(recovered_params, param_name)
        true_values = [];
        for n = 1:N
            true_values(n) = true_P(n).(param_name)(1); % Get first element
        end
        
        recovered_values = recovered_params.(param_name)';
        
        % Calculate bias metrics
        bias = recovered_values - true_values'; % Raw bias (recovered - true)
        mean_bias = mean(bias); % Mean bias (positive = overestimation, negative = underestimation)
        abs_bias = mean(abs(bias)); % Mean absolute bias
        rmse = sqrt(mean(bias.^2)); % Root mean squared error
        
        % Test if bias is significantly different from zero
        [~, p_val] = ttest(bias); % One-sample t-test against zero
        
        % Correlation
        corr_val = corr(true_values', recovered_values);
        
        % Store results
        bias_results.(param_name).correlation = corr_val;
        bias_results.(param_name).mean_bias = mean_bias;
        bias_results.(param_name).abs_bias = abs_bias;
        bias_results.(param_name).rmse = rmse;
        bias_results.(param_name).p_value = p_val;
        bias_results.(param_name).true_values = true_values';
        bias_results.(param_name).recovered_values = recovered_values;
        bias_results.(param_name).bias = bias;
        
        fprintf('%-10s %-12.4f %-12.4f %-12.4f %-12.4f %-12.4f\n', ...
                param_name, corr_val, mean_bias, abs_bias, rmse, p_val);
    end
end

%% Specific analysis for scale1 bias
if isfield(bias_results, 'scale1')
    fprintf('\n=== SCALE1 BIAS ANALYSIS ===\n');
    scale1_bias = bias_results.scale1.bias;
    
    fprintf('Scale1 bias statistics:\n');
    fprintf('  Mean bias: %.6f\n', bias_results.scale1.mean_bias);
    fprintf('  Median bias: %.6f\n', median(scale1_bias));
    fprintf('  Std of bias: %.6f\n', std(scale1_bias));
    fprintf('  Min bias: %.6f\n', min(scale1_bias));
    fprintf('  Max bias: %.6f\n', max(scale1_bias));
    
    % Determine bias direction
    if bias_results.scale1.mean_bias > 0
        fprintf('  Direction: OVERESTIMATION (recovered > true)\n');
    elseif bias_results.scale1.mean_bias < 0
        fprintf('  Direction: UNDERESTIMATION (recovered < true)\n');
    else
        fprintf('  Direction: UNBIASED\n');
    end
    
    % Percentage of subjects with positive/negative bias
    pct_overest = sum(scale1_bias > 0) / length(scale1_bias) * 100;
    pct_underest = sum(scale1_bias < 0) / length(scale1_bias) * 100;
    pct_perfect = sum(scale1_bias == 0) / length(scale1_bias) * 100;
    
    fprintf('  %.1f%% of subjects overestimated\n', pct_overest);
    fprintf('  %.1f%% of subjects underestimated\n', pct_underest);
    fprintf('  %.1f%% of subjects perfectly recovered\n', pct_perfect);
    
    % Statistical significance of bias
    if bias_results.scale1.p_value < 0.05
        fprintf('  Bias is STATISTICALLY SIGNIFICANT (p = %.6f)\n', bias_results.scale1.p_value);
    else
        fprintf('  Bias is NOT statistically significant (p = %.6f)\n', bias_results.scale1.p_value);
    end
end

%% Enhanced visualization with bias information
% Update the existing confusion analysis with bias plots
figure('Position', [100, 100, 1200, 900]);

% Focus on the parameters of interest (epsilon1 and scale1)
params_to_analyze = {'epsilon1', 'scale1'};

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
subplot(2, 3, 1);
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
    subplot(2, 3, i+1);
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
    
    param_name = params_to_analyze{i};
    if isfield(bias_results, param_name)
        title_str = sprintf('%s Recovery\nr=%.3f, bias=%.4f', ...
                           param_name, bias_results.(param_name).correlation, ...
                           bias_results.(param_name).mean_bias);
    else
        title_str = [param_name, ' Recovery'];
    end
    title(title_str);
    xlabel('True value');
    ylabel('Recovered value');
    grid on;
end

% Plot cross-parameter relationship
subplot(2, 3, 4);
scatter(true_vals(:, 1), recovered_vals(:, 2), 50, 'filled', 'MarkerFaceAlpha', 0.7);
hold on;

% Add regression line
coeffs = polyfit(true_vals(:, 1), recovered_vals(:, 2), 1);
x_range = linspace(min(true_vals(:, 1)), max(true_vals(:, 1)), 100);
y_fit = polyval(coeffs, x_range);
plot(x_range, y_fit, 'r-', 'LineWidth', 2);

cross_corr = corr(true_vals(:, 1), recovered_vals(:, 2));
title(sprintf('%s → %s Confusion\nr=%.3f', params_to_analyze{1}, params_to_analyze{2}, cross_corr));
xlabel(['True ', params_to_analyze{1}]);
ylabel(['Recovered ', params_to_analyze{2}]);
grid on;

% Add bias distribution plots
for i = 1:length(params_to_analyze)
    subplot(2, 3, i+4);
    param_name = params_to_analyze{i};
    if isfield(bias_results, param_name)
        bias_vals = bias_results.(param_name).bias;
        histogram(bias_vals, 20, 'FaceAlpha', 0.7);
        hold on;
        
        % Add vertical line at zero
        ylims = ylim;
        plot([0 0], ylims, 'k--', 'LineWidth', 2);
        
        % Add vertical line at mean bias
        mean_bias = bias_results.(param_name).mean_bias;
        plot([mean_bias mean_bias], ylims, 'r-', 'LineWidth', 2);
        
        title(sprintf('%s Bias Distribution\nMean=%.4f', param_name, mean_bias));
        xlabel('Bias (Recovered - True)');
        ylabel('Frequency');
        grid on;
        
        % Add text annotation
        if mean_bias > 0
            bias_dir = 'Overestimation';
        else
            bias_dir = 'Underestimation';
        end
        text(0.7, 0.8, bias_dir, 'Units', 'normalized', 'FontSize', 10, ...
             'BackgroundColor', 'white', 'EdgeColor', 'black');
    end
end

% Save the enhanced confusion analysis figure
saveas(gcf, 'parameter_confusion_with_bias.png');
saveas(gcf, 'parameter_confusion_with_bias.fig');