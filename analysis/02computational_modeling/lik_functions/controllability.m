function [lik,like]= nc_3s_3a_3e(P,data)
% NC_3S_3A
S = size(P.beta,1); % number of samples
lik = zeros(S,1);
like=zeros(S,data.T); 


for n = 1:data.T
    if data.trials(n) == 0
        one_ticket_a = P.epsilon1 .* P.scale1;
        one_ticket_b = 2.0 * P.epsilon1 .*(1-P.scale1);
        two_ticket_a = 1.5 * P.epsilon2 .* (P.scale2);
        two_ticket_b = 1.5 * P.epsilon2 .* (1-P.scale2);
        three_ticket_a = 2.0 * P.epsilon3 .* (P.scale3);
        three_ticket_b = P.epsilon3 .* (1- P.scale3);
    end
    
    if data.trials(n)<5
        
        if n>1
            like(:,n) = like(:,n-1);
          
        end 
        ev1 = 110 .* ((one_ticket_a ./ (one_ticket_a + one_ticket_b)) + 0.2 .* (1 - (one_ticket_a ./ (one_ticket_a + one_ticket_b)))) - 0.8 .* 40 .* (1 - (one_ticket_a ./ (one_ticket_a + one_ticket_b)));
        ev2 = 90 .* (two_ticket_a ./ (two_ticket_a + two_ticket_b) + 0.2 .* (1 - (two_ticket_a ./ (two_ticket_a + two_ticket_b)))) - 0.8 .* 60 .* (1 - two_ticket_a ./ (two_ticket_a + two_ticket_b));
        ev3 = 70 .* (three_ticket_a ./ (three_ticket_a + three_ticket_b) + 0.2 .* (1 - three_ticket_a ./ (three_ticket_a + three_ticket_b))) - 0.8 .* 80 .* (1 - three_ticket_a ./ (three_ticket_a + three_ticket_b));
        
        % Do 
        % TODO: Add the necessary code for this condition
    else
   % kappa1 = one_ticket_a + one_ticket_b;
   % kappa2 = two_ticket_a + two_ticket_b;
    %kappa3 = three_ticket_a + three_ticket_b;

        ev1 = 110 .* ((one_ticket_a ./ (one_ticket_a + one_ticket_b)) + 0.2 .* (1 - (one_ticket_a ./ (one_ticket_a + one_ticket_b)))) - 0.8 .* 40 .* (1 - (one_ticket_a ./ (one_ticket_a + one_ticket_b)));
        ev2 = 90 .* (two_ticket_a ./ (two_ticket_a + two_ticket_b) + 0.2 .* (1 - (two_ticket_a ./ (two_ticket_a + two_ticket_b)))) - 0.8 .* 60 .* (1 - two_ticket_a ./ (two_ticket_a + two_ticket_b));
        ev3 = 70 .* (three_ticket_a ./ (three_ticket_a + three_ticket_b) + 0.2 .* (1 - three_ticket_a ./ (three_ticket_a + three_ticket_b))) - 0.8 .* 80 .* (1 - three_ticket_a ./ (three_ticket_a + three_ticket_b));
        
           how_many(:,1) = P.beta .* 30+ (data.num_tries(n-1)==0).*P.pers;
            how_many(:,2) = P.beta .* ev1+P.alpha1 +(data.num_tries(n-1)==1).*P.pers; %+ P.invtemp .* (1 ./ kappa_one) + P.invtemp .* (1 ./ kappa_opt) .* (yes_control .* ticket_1);
            how_many(:,4) = P.beta .* ev3+P.alpha3+(data.num_tries(n-1)==3).*P.pers; %+ P.invtemp .* (1 ./ kappa_opt);
            
          %  explore_2 = ((P.invtemp .* (1 ./ kappa_one) + P.invtemp .* (1 ./ kappa_opt) .* (yes_control .* ticket_1)) + (P.invtemp .* (1 ./ kappa_opt))) ./ 2;
            how_many(:,3) = P.beta .* ev2+P.alpha2+(data.num_tries(n-1)==2).*P.pers;% + explore_2;
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
        
       
        like(:,n) = like(:,n-1) + num - mfUtil1.logsumexp(how_many,2);

        lik = lik + num - mfUtil1.logsumexp(how_many(:,:), 2);
    end
    
    % LEARNING UPDATES
    if data.ss_transition(n) == 0
        if data.Reward(n) == 1
            if data.num_tries(n) == 1
                one_ticket_a = one_ticket_a + 1.0;
            elseif data.num_tries(n) == 2
                two_ticket_a = two_ticket_a + 1.0;
            elseif data.num_tries(n) == 3
                three_ticket_a = three_ticket_a + 1.0;
            end
        elseif data.Reward(n) == 0
            if data.num_tries(n) == 1
                one_ticket_b = one_ticket_b + 1.0;
            elseif data.num_tries(n) == 2
                two_ticket_b = two_ticket_b + 1.0;
            elseif data.num_tries(n) == 3
                three_ticket_b = three_ticket_b + 1.0;
            end
        end
    end
end
like=mean(like,1); 



