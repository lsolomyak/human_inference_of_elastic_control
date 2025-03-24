data {
  int<lower=0> Ntotal;
  int<lower=0> Nsubj;
  int<lower=0,upper=1> y[Ntotal];
  int<lower=0> s[Ntotal];
  }

parameters {
  real<lower=0,upper=1> theta[Nsubj];
  real<lower=0,upper=1> omega;
  real<lower=0> kappaMinusTwo;
}
transformed parameters {
  real<lower=0> kappa = kappaMinusTwo + 2;
}
model {
  omega  ~ beta(1,1);
  kappaMinusTwo  ~ gamma(0.1 , 0.1); 

  theta  ~ beta(omega*(kappa-2)+1 , (1-omega)*(kappa-2)+1 );
  for (i in 1:Ntotal) {
   y[i]  ~ bernoulli(theta[s[i]]);
   }
  
  
}