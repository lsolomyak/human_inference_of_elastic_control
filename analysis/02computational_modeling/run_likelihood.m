function [model]=run_likelihood(model,N,data,samples,which_models_to_do) 
% initiliaze model
% run likelihood on specified numer of samples f


%%
S = samples; % number of samples

for m = which_models_to_do
   
   
    improvement =nan;
    while ~(improvement < 0) % repeat until fit stops improving
        oldbic = model{m}.bic;
        
        for n = 1:N
            model{m} = mfUtil1.randomP(model{m}, S); % sample random parameter values
            [lik] = model{m}.lik_func(model{m}.P, data(n)); % compute log-likelihood for each sample
            model{m} = mfUtil1.computeEstimates(lik, model{m}, n); % resample parameter values with each sample weighted by its likelihoods
        end

        % fit prior to resampled parameters
        model{m} = mfUtil1.fit_prior(model{m});
        
        % compute goodness-of-fit measures
        Nparams = 2*length(fieldnames(model{m}.spec)); % number of hyperparameters (assumes 2 hyperparameters per parameter)
  
        Ndatapoints = numel(vertcat(data(1:N).Reward)); % total number of datapoints
%       else
%         Ndatapoints = numel([data.c]); % total number of datapoints 
%       end 
        model{m}.evidence = sum([model{m}.fit.evidence]); % total evidence
        model{m}.bic = -2*model{m}.evidence + Nparams*log(Ndatapoints)-(N*20); % Bayesian Information Criterion
        improvement = oldbic - model{m}.bic; % compute improvement of fit
        fprintf('%s - %s    old: %.2f       new: %.2f      \n', model{m}.name, 'bic', oldbic, model{m}.bic)
    end
    
end
%mkdir(sprintf('results/%s',date))
%save(sprintf('results/%s/%.f_model_fits.mat',date,samples),'model')


