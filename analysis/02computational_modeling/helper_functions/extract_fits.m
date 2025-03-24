function [table_v, params_table]= extract_fits(model,i)

fits = [model{i}.fit.P];
evidence = [model{i}.fit.evidence]';

    % Get field names of parameters in fits
    param_names = fieldnames(fits);

    % Initialize a struct to store extracted parameters
    extracted_params = struct();
    ext = struct();

    % Extract parameters from fits
    for k = 1:numel(param_names)
        param_name = param_names{k};
        extracted_params.(param_name) = [fits.(param_name)];
        ext.(param_name) = [extracted_params.(param_name).val];
    end

    % Create a table from the extracted parameters
    params_table = struct2table(ext);
    table_v=extract_table(ext);
    table_v.evidence=evidence; 