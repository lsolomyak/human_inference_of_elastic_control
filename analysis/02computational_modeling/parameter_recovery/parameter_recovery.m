function parameter_recovery(fits_table, data_struct)
    % Get the scalar fields for parameters we want to analyze
    first_elem = data_struct(1);
    scalar_fields = {};
    all_fields = fieldnames(first_elem);
    for i = 1:length(all_fields)
        if isscalar(first_elem.(all_fields{i}))
            scalar_fields{end+1} = all_fields{i};
        end
    end
    
    % Get common parameter names between fits and scalar struct fields
    fit_params = fits_table.Properties.VariableNames;
    common_params = intersect(fit_params, scalar_fields);
    
    % Calculate derived parameters for true values
    valid_indices = setdiff(1:length(data_struct), 168);
    
    % Add derived parameters to data_struct
    for i = 1:length(valid_indices)
        idx = valid_indices(i);
        data_struct(idx).gamma_elasticity = (data_struct(idx).scale1) * data_struct(idx).epsilon1;
        data_struct(idx).gamma_control = (data_struct(idx).scale3) * data_struct(idx).epsilon2;
    end
    
    % Calculate derived parameters for fitted values
    fits_table.gamma_elasticity = (fits_table.scale1) .* fits_table.epsilon1;
    fits_table.gamma_control = (fits_table.scale3) .* fits_table.epsilon2;
    
    % Update common parameters to include derived parameters
    common_params = [common_params, {'gamma_elasticity', 'gamma_control'}];
    
    % Initialize figures
    figure('Name', 'Parameter Recovery Analysis');
    num_params = length(common_params);
    num_rows = ceil(sqrt(num_params));
    num_cols = ceil(num_params/num_rows);
    
    % Create matrices to store results
    corr_matrix = zeros(1, num_params);
    
    % Loop through each parameter
    for i = 1:num_params
        param_name = common_params{i};
        
        try
            % Extract values excluding index 168
            true_values = zeros(length(valid_indices), 1);
            for j = 1:length(valid_indices)
                true_values(j) = data_struct(valid_indices(j)).(param_name);
            end
            fitted_values = table2array(fits_table(valid_indices, param_name));
            
            % Check for and handle any NaN or missing values
            valid_idx = ~isnan(true_values) & ~isnan(fitted_values);
            true_values = true_values(valid_idx);
            fitted_values = fitted_values(valid_idx);
            
            % Create subplot
            subplot(num_rows, num_cols, i);
            
            % Basic scatter plot
            scatter(true_values, fitted_values, 40, 'filled', 'MarkerFaceAlpha', 0.6);
            hold on;
            
            % Add identity line
            min_val = min(min(true_values), min(fitted_values));
            max_val = max(max(true_values), max(fitted_values));
            plot([min_val, max_val], [min_val, max_val], 'r--', 'LineWidth', 1.5);
            
            % Calculate correlation
            corr_matrix(i) = corr(true_values, fitted_values);
            
            % Add correlation to plot
            r2 = corr_matrix(i)^2;
            stats_text = sprintf('R² = %.3f', r2);
            text(min_val + 0.05*(max_val-min_val), ...
                 max_val - 0.15*(max_val-min_val), ...
                 stats_text, ...
                 'FontSize', 8, 'BackgroundColor', 'white');
            
            % Labels and formatting
            xlabel('True Values');
            ylabel('Fitted Values');
            title(sprintf('Parameter: %s', param_name), 'FontWeight', 'bold');
            grid on;
            axis square;
            
            % Special formatting for derived parameters
            if strcmp(param_name, 'gamma_elasticity') || strcmp(param_name, 'gamma_control')
                title(sprintf('Derived Parameter: %s', param_name), 'FontWeight', 'bold');
            end
        catch err
            warning('Error processing parameter %s: %s', param_name, err.message);
        end
    end
    
    % Adjust subplot spacing
    set(gcf, 'Position', [100, 100, 1200, 800]);
    sgtitle('Parameter Recovery Analysis (Including Derived Parameters)', 'FontSize', 14, 'FontWeight', 'bold');
    
    % Create summary table with just correlations
    summary_table = table(common_params', ...
                        corr_matrix', ...
                        'VariableNames', {'Parameter', 'Correlation'});
    
    % Sort table by correlation strength
    summary_table = sortrows(summary_table, 'Correlation', 'descend');
    
    % Print summary statistics
    disp('Parameter Recovery Summary (sorted by correlation strength):');
    disp(summary_table);
    
    % Save results
    save('parameter_recovery_results.mat', 'summary_table');
    
    fprintf('\nAnalysis completed excluding index 168\n');
    fprintf('Derived parameters gamma_elasticity and gamma_control included in analysis\n');
end