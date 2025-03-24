function [lik, outputs] = dirichlet_model(P, data)


S = size(P.beta, 1); % Number of samples
lik = zeros(S, 1);
T = data.T;

% Initialize storage for model outputs
control = zeros(S, T);
elasticity = zeros(S, T);
inelastic_control = zeros(S, T);
elastic_control = zeros(S, T);
flat_posterior = zeros(S, T);
inelastic_posterior = zeros(S, T);
elastic_posterior = zeros(S, T);
ticket_1_prob = zeros(S, T);
ticket_2_prob = zeros(S, T);
ticket_3_prob = zeros(S, T);


flat_probs = [0, 0, 0, 0];       % Flat function (no controllability)
inelastic_probs = [0, 1, 1, 1];  % Inelastic function (step)
elastic_probs = [0, 0, 0.5, 1];  % Elastic function (linear)

outputs = struct();

for n = 1:T
    %new block
    if data.trials(n) == 0
        
        flat_acc = P.concentration_control .* (1 - P.bias_control);
        inelastic_acc = P.concentration_control .* P.bias_control .* (1 - P.bias_elastic);
        elastic_acc = P.concentration_control .* P.bias_control .* P.bias_elastic;
        
    end
    
    % get posteriors 
    total_acc = flat_acc + inelastic_acc + elastic_acc;
    flat_post = flat_acc ./ total_acc;
    inelastic_post = inelastic_acc ./ total_acc;
    elastic_post = elastic_acc ./ total_acc;
    
    % Store posteriors for analysis later
    flat_posterior(:, n) = flat_post;
    inelastic_posterior(:, n) = inelastic_post;
    elastic_posterior(:, n) = elastic_post;
    % store control
    inelastic_control(:, n) = inelastic_post;
    elastic_control(:, n) = elastic_post;
    
    % prob of boarding is a weighted sum 
    ticket_1_prob(:, n) = flat_probs(2) .* flat_post + inelastic_probs(2) .* inelastic_post + elastic_probs(2) .* elastic_post;
    ticket_2_prob(:, n) = flat_probs(3) .* flat_post + inelastic_probs(3) .* inelastic_post + elastic_probs(3) .* elastic_post;
    ticket_3_prob(:, n) = flat_probs(4) .* flat_post + inelastic_probs(4) .* inelastic_post + elastic_probs(4) .* elastic_post;
    
    %for each ticket quantity ----chance of boarding+chance of walking
    control_1 = ticket_1_prob(:, n) + 0.2 .* (1 - ticket_1_prob(:, n));
    control_2 = ticket_2_prob(:, n) + 0.2 .* (1 - (ticket_2_prob(:, n)));
    control_3 = ticket_3_prob(:, n) + 0.2 .* (1 - (ticket_3_prob(:, n)));
  
    if any(control_1 > 1) || any(control_2 > 1) || any(control_3 > 1)
        error('Control values exceeded 1.0. Check probability calculations.');
    end
    %expected values
    ev0 = 30; % .2*150
    ev1 = 110 .* control_1 - 40 .* (1 - control_1);
    ev2 = 90 .* control_2 -  60 .* (1 - control_2);
    ev3 = 70 .* control_3 -  80 .* (1 - control_3);
    
    % Set up softmax 
    try
        how_many = zeros(S, 4);
        how_many(:, 1) = P.beta .* ev0 + (data.num_tries(n-1) == 0) .* P.pers;
        how_many(:, 2) = P.beta .* ev1 + P.alpha1 + (data.num_tries(n-1) == 1) .* P.pers;
        how_many(:, 3) = P.beta .* ev2 + P.alpha2 + (data.num_tries(n-1) == 2) .* P.pers;
        how_many(:, 4) = P.beta .* ev3 + P.alpha3 + (data.num_tries(n-1) == 3) .* P.pers;
    catch
        % First trial 
        how_many = zeros(S, 4);
        how_many(:, 1) = P.beta .* ev0;
        how_many(:, 2) = P.beta .* ev1 + P.alpha1;
        how_many(:, 3) = P.beta .* ev2 + P.alpha2;
        how_many(:, 4) = P.beta .* ev3 + P.alpha3;
    end
    
    
    if data.trials(n) > 4 % 
        choice_idx = data.num_tries(n) + 1; % Convert from 0-3 to 1-4
        lik = lik + how_many(:, choice_idx) - mfUtil1.logsumexp(how_many, 2);
        
    end
    
    
    % Update accumulators with normalized likelihoods
    if data.ss_transition(n) == 0 && data.num_tries(n) > 0 
        flat_norm = data.flat_norm_likelihood(n);
        inelastic_norm = data.inelastic_norm_likelihood(n);
        elastic_norm = data.elastic_norm_likelihood(n);
        
        % Update accumulators with normalized likelihoods
        flat_acc = flat_acc + flat_norm;
        inelastic_acc = inelastic_acc + inelastic_norm;
        elastic_acc = elastic_acc + elastic_norm;
    end
end

% Store outputs
outputs.control = control;
outputs.elasticity = elasticity;
outputs.inelastic_control = inelastic_control;
outputs.elastic_control = elastic_control;
outputs.flat_posterior = flat_posterior;
outputs.inelastic_posterior = inelastic_posterior;
outputs.elastic_posterior = elastic_posterior;
outputs.ticket_1_prob = ticket_1_prob;
outputs.ticket_2_prob = ticket_2_prob;
outputs.ticket_3_prob = ticket_3_prob;
outputs.c_elastic = data.c_elastic;
outputs.c_inelastic = data.c_inelastic;
outputs.ss_transition = data.ss_transition;

end

