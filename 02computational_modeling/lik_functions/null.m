function [lik]= n_model(P,data)
% implementing a null model
S = size(P.pers,1); % number of samples
lik = zeros(S,1);


for n = 1:data.T

    if data.trials(n)<5
        % TODO: Add the necessary code for this condition
    else
  
     
            how_many(:,1) = (data.num_tries(n-1)==0).*P.pers;
            how_many(:,2) = P.alpha1 +(data.num_tries(n-1)==1).*P.pers; %+ P.invtemp .* (1 ./ kappa_one) + P.invtemp .* (1 ./ kappa_opt) .* (yes_control .* ticket_1);
            how_many(:,4) = P.alpha3+(data.num_tries(n-1)==3).*P.pers; %+ P.invtemp .* (1 ./ kappa_opt);
            
          %  explore_2 = ((P.invtemp .* (1 ./ kappa_one) + P.invtemp .* (1 ./ kappa_opt) .* (yes_control .* ticket_1)) + (P.invtemp .* (1 ./ kappa_opt))) ./ 2;
            how_many(:,3) = P.alpha2+(data.num_tries(n-1)==2).*P.pers;% + explore_2;
         
        switch data.num_tries(n)
            case 0
                num=how_many(:,1);
            case 1
                num=how_many(:,2);
            case 2
                num=how_many(:,3);
            case 3
                num=how_many(:,4);
        end 
           
       

        lik = lik + num - mfUtil1.logsumexp(how_many,2);
    end
 
end


