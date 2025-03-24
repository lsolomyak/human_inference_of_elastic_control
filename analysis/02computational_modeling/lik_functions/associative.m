function [lik, like] = associtie(P, data)
% Simple associative learning model with costs and rewards
% Takes parameters P and data, returns log-likelihoods

S = size(P.beta, 1); % number of samples
lik = zeros(S, 1);
like = zeros(S, data.T);


% Constants for rewards and costs
reward1 = 110; cost1 = 40;
reward2 = 90;  cost2 = 60;
reward3 = 70;  cost3 = 80;
safe_prob = 0.2; % probability of reward even when unsuccessful
fail_prob = 0.8; % probability of cost when unsuccessful
received_reward=data.trial_reward-data.cost;
for n = 1:data.T
    % Skip initialization trials
    if data.trials(n)==0
  % Initialize value estimates for the three options
Q1 = ones(S, 1) .* P.prior1; % Prior for option 1
Q2 = ones(S, 1) .* P.prior2; % Prior for option 2
Q3 = ones(S, 1) .* P.prior3; % Prior for option 3
    end
    
    % Calculate expected values using current Q values
    % These are already learned estimates of success probabilities
    EV1 = reward1 .* (Q1 + safe_prob .* (1-Q1)) - fail_prob .* cost1 .* (1-Q1);
    EV2 = reward2 .* (Q2 + safe_prob .* (1-Q2)) - fail_prob .* cost2 .* (1-Q2);
    EV3 = reward3 .* (Q3 + safe_prob .* (1-Q3)) - fail_prob .* cost3 .* (1-Q3);
    
    
    % Option values including perseverance and biases
    how_many = zeros(S, 4);
    try 
    how_many(:, 1) = P.beta .* 30 + (data.num_tries(n-1) == 0) .* P.pers; % No try option
    how_many(:, 2) = P.beta .* EV1 + P.alpha1 + (data.num_tries(n-1) == 1) .* P.pers; % Option 1
    how_many(:, 3) = P.beta .* EV2 + P.alpha2 + (data.num_tries(n-1) == 2) .* P.pers; % Option 2
    how_many(:, 4) = P.beta .* EV3 + P.alpha3 + (data.num_tries(n-1) == 3) .* P.pers; % Option 3
    catch
      how_many(:, 1) = P.beta .* 30 ; % No try option
    how_many(:, 2) = P.beta .* EV1 + P.alpha1; % Option 1
    how_many(:, 3) = P.beta .* EV2 + P.alpha2; % Option 2
    how_many(:, 4) = P.beta .* EV3 + P.alpha3; % Option 3
       
    end
    % Get the chosen option value
    switch data.num_tries(n)
        case 0
            num = how_many(:, 1);
        case 1
            num = how_many(:, 2);
        case 2
            num = how_many(:, 3);
        case 3
            num = how_many(:, 4);
    end
    
    % Update log-likelihood
    if data.trials(n) > 4 % 
    lik = lik + num - mfUtil1.logsumexp(how_many, 2);
    end
    % Learning update - only if there was a state transition
        % Update option values based on reward outcomes
        if data.num_tries(n) == 1
            Q1 = Q1 + P.lr .* (received_reward(n) - Q1); % Update Q1 using prediction error
        elseif data.num_tries(n) == 2
            Q2 = Q2 + P.lr .* (received_reward(n) - Q2); % Update Q2 using prediction error
        elseif data.num_tries(n) == 3
            Q3 = Q3 + P.lr .* (received_reward(n) - Q3); % Update Q3 using prediction error
        end
end