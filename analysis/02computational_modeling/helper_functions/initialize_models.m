function model = initialize_models()
% Initializes parameters for all models based on specified priors
% 
% Parameter priors:
% - beta: sampled from a Beta distribution (alpha=1, beta=1)
% - epsilon: sampled from a Lognormal distribution (mu=0, sigma=1)
% - alpha1, alpha2, alpha3, pers, kappa: sampled from a Normal distribution (mu=0, sigma=1)
% - scale parameters: sampled from a Beta distribution (alpha=1, beta=1)

% Initialize associative learning model
model{1}.lik_func = @associtie;
model{1}.name = 'associative';

model{1}.spec.beta.type = 'beta';
model{1}.spec.beta.val = [1 1];

model{1}.spec.pers.type = 'norm';
model{1}.spec.pers.val = [0 1];

model{1}.spec.lr.type = 'beta';
model{1}.spec.lr.val = [1 1];

model{1}.spec.prior1.type = 'beta';
model{1}.spec.prior1.val = [1 1];

model{1}.spec.prior2.type = 'beta';
model{1}.spec.prior2.val = [1 1];

model{1}.spec.prior3.type = 'beta';
model{1}.spec.prior3.val = [1 1];

model{1}.spec.alpha1.type = 'norm';
model{1}.spec.alpha1.val = [0 1];

model{1}.spec.alpha2.type = 'norm';
model{1}.spec.alpha2.val = [0 1];

model{1}.spec.alpha3.type = 'norm';
model{1}.spec.alpha3.val = [0 1];
model{1}.bic = nan;

% Initialize non-controllability model (nc_3s_3a_3e)
model{2}.lik_func = @nc_3s_3a_3e;
model{2}.name = 'nc_3s_3a_3e';

model{2}.spec.beta.type = 'beta';
model{2}.spec.beta.val = [1 1];

model{2}.spec.pers.type = 'norm';
model{2}.spec.pers.val = [0 1];

model{2}.spec.epsilon1.type = 'lognorm';
model{2}.spec.epsilon1.val = [0 1];

model{2}.spec.epsilon2.type = 'gamma';
model{2}.spec.epsilon2.val = [2 1];

model{2}.spec.epsilon3.type = 'gamma';
model{2}.spec.epsilon3.val = [2 1];

model{2}.spec.alpha1.type = 'norm';
model{2}.spec.alpha1.val = [0 1];

model{2}.spec.alpha2.type = 'norm';
model{2}.spec.alpha2.val = [0 1];

model{2}.spec.alpha3.type = 'norm';
model{2}.spec.alpha3.val = [0 1];

model{2}.spec.scale1.type = 'beta';
model{2}.spec.scale1.val = [1 1];

model{2}.spec.scale2.type = 'beta';
model{2}.spec.scale2.val = [1 1];

model{2}.spec.scale3.type = 'beta';
model{2}.spec.scale3.val = [1 1];

model{2}.bic = nan;

% Initialize elastic controllability model (c_2s_3a_2e)
model{3}.lik_func = @c_2s_3a_2e;
model{3}.name = 'c_2s_3a_2e';

model{3}.spec.beta.type = 'beta';
model{3}.spec.beta.val = [1 1];

model{3}.spec.pers.type = 'norm';
model{3}.spec.pers.val = [0 1];

model{3}.spec.epsilon1.type = 'lognorm';
model{3}.spec.epsilon1.val = [0 1];

model{3}.spec.epsilon2.type = 'lognorm';
model{3}.spec.epsilon2.val = [0 1];

model{3}.spec.alpha1.type = 'norm';
model{3}.spec.alpha1.val = [0 1];

model{3}.spec.alpha2.type = 'norm';
model{3}.spec.alpha2.val = [0 1];

model{3}.spec.alpha3.type = 'norm';
model{3}.spec.alpha3.val = [0 1];

model{3}.spec.scale1.type = 'beta';
model{3}.spec.scale1.val = [1 1];

model{3}.spec.scale3.type = 'beta';
model{3}.spec.scale3.val = [1 1];

model{3}.bic = nan;

% Initialize elastic controllability with learning model (c_2s_3a_2e_3learn)
model{4}.lik_func = @c_2s_3a_2e_3learn;
model{4}.name = 'c_2s_3a_2e_3learn';

model{4}.spec.beta.type = 'beta';
model{4}.spec.beta.val = [1 1];

model{4}.spec.pers.type = 'norm';
model{4}.spec.pers.val = [0 1];

model{4}.spec.epsilon1.type = 'lognorm';
model{4}.spec.epsilon1.val = [0 1];

model{4}.spec.epsilon2.type = 'lognorm';
model{4}.spec.epsilon2.val = [0 1];

model{4}.spec.alpha1.type = 'norm';
model{4}.spec.alpha1.val = [0 1];

model{4}.spec.alpha2.type = 'norm';
model{4}.spec.alpha2.val = [0 1];

model{4}.spec.alpha3.type = 'norm';
model{4}.spec.alpha3.val = [0 1];

model{4}.spec.scale1.type = 'beta';
model{4}.spec.scale1.val = [1 1];

model{4}.spec.scale3.type = 'beta';
model{4}.spec.scale3.val = [1 1];

model{4}.spec.kaps.type = 'beta';
model{4}.spec.kaps.val = [1 1];

model{4}.bic = nan;

% Initialize asymmetric model (c_2s_3a_2e_3learn_pos_assym)
model{5}.lik_func = @c_2s_3a_2e_3learn_pos_assym;
model{5}.name = 'c_2s_3a_2e_3learn_pos_assym';

model{5}.spec.beta.type = 'beta';
model{5}.spec.beta.val = [1 1];

model{5}.spec.pers.type = 'norm';
model{5}.spec.pers.val = [0 1];

model{5}.spec.epsilon1.type = 'lognorm';
model{5}.spec.epsilon1.val = [0 1];

model{5}.spec.epsilon2.type = 'lognorm';
model{5}.spec.epsilon2.val = [0 1];

model{5}.spec.alpha1.type = 'norm';
model{5}.spec.alpha1.val = [0 1];

model{5}.spec.alpha2.type = 'norm';
model{5}.spec.alpha2.val = [0 1];

model{5}.spec.alpha3.type = 'norm';
model{5}.spec.alpha3.val = [0 1];

model{5}.spec.scale1.type = 'beta';
model{5}.spec.scale1.val = [1 1];

model{5}.spec.scale3.type = 'beta';
model{5}.spec.scale3.val = [1 1];

model{5}.spec.kaps.type = 'beta';
model{5}.spec.kaps.val = [1 1];

model{5}.spec.pos.type = 'lognorm';
model{5}.spec.pos.val = [0 1];

model{5}.spec.ss_learn.type = 'lognorm';
model{5}.spec.ss_learn.val = [0 1];

model{5}.bic = nan;

% Initialize null model
model{6}.lik_func = @n_model;
model{6}.name = 'null model';

model{6}.spec.pers.type = 'norm';
model{6}.spec.pers.val = [0 1];

model{6}.spec.alpha1.type = 'norm';
model{6}.spec.alpha1.val = [0 1];

model{6}.spec.alpha2.type = 'norm';
model{6}.spec.alpha2.val = [0 1];

model{6}.spec.alpha3.type = 'norm';
model{6}.spec.alpha3.val = [0 1];

model{6}.bic = nan;
