function plotCorrelationHeatmap(dataTable)
    % Convert table to matrix if needed
    if istable(dataTable)
        dataMatrix = table2array(dataTable);
        varNames = dataTable.Properties.VariableNames;
    else
        dataMatrix = dataTable;
        varNames = cellstr(num2str((1:size(dataMatrix,2))'));
    end
    
    % Calculate correlation matrix
    R = corrcoef(dataMatrix);
    
    % Create figure
    figure('Name', 'Correlation Heatmap', 'NumberTitle', 'off');
    
    % Create heatmap
    h = heatmap(R, 'XDisplayLabels', varNames, 'YDisplayLabels', varNames);
    
    % Customize appearance
    h.Colormap = parula;  % You can change to 'jet', 'hot', etc.
    h.ColorLimits = [-1 1];  % Set limits for correlation values
    h.ColorbarVisible = 'on';
    
    % Add title
    title('Correlation Matrix Heatmap');
    
    % Display numerical values in cells
    h.CellLabelFormat = '%.2f';
end

% Example usage:
% plotCorrelationHeatmap(your_table);