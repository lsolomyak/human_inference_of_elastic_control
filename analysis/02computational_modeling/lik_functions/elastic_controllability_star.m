function [lik,like]= c_2s_3a_2e_3learn(P,data)
% we scale and directed explore
% we use separate scales
S = size(P.beta,1); % number of samples
lik = zeros(S,1);
like=zeros(S,data.T); 
take_more = P.epsilon1 .*(P.scale1);
take_less = P.epsilon1.*(1-P.scale1);

stay_two = P.epsilon1 .*(1-P.scale1);
dont_stay_two = P.epsilon1 .*(P.scale1);

no_c = P.epsilon2 .*(1-P.scale3);
yes_c = 2 .* P.epsilon2 .*(P.scale3);

for n = 1:data.T
    % Set 'a' and 'opt' properly
    if data.trials(n) == 0
        % Reset for every subject
        take_more = P.epsilon1 .*(P.scale1);
        take_less = P.epsilon1.*(1-P.scale1);
        
        stay_two = P.epsilon1 .*(1-P.scale1);
        dont_stay_two = P.epsilon1 .*(P.scale1);
        
        no_c = P.epsilon2 .*(1-P.scale3);
        yes_c = 2 .* P.epsilon2 .*(P.scale3);
        
    end
    
    if data.trials(n)<5
        yes_control = yes_c ./ (no_c + yes_c);
        
        ticket_1 = take_less ./ (take_less + take_more);
        ticket_2 = (stay_two ./ (stay_two + dont_stay_two)) .* take_more ./ (take_less + take_more);
        ticket_3 = (dont_stay_two ./ (stay_two + dont_stay_two)) .* take_more ./ (take_less + take_more);
       
        
        ev1 = 110 .* (yes_control .* ticket_1 + 0.2 .* (1 - yes_control .* ticket_1)) - 0.8 .* 40 .* (1 - (yes_control .* ticket_1));
        ev2 = 90 .* (yes_control .* (ticket_1 + ticket_2) + 0.2 .* (1 - (yes_control .* (ticket_1 + ticket_2)))) - 0.8 .* 60 .* (1 - (yes_control .* (ticket_1 + ticket_2)));
        ev3 = 70 .* (yes_control .* (ticket_1 + ticket_2 + ticket_3) + 0.2 .* (1 - (yes_control .* (ticket_1 + ticket_2 + ticket_3)))) - 0.8 .* 80 .* (1 - (yes_control .* (ticket_1 + ticket_2 + ticket_3)));
      
        if n>1
            like(:,n) = like(:,n-1);
        end 
        % Do nothing for specific conditions
    else
        
        
        yes_control = yes_c ./ (no_c + yes_c);
        
        ticket_1 = take_less ./ (take_less + take_more);
        ticket_2 = (stay_two ./ (stay_two + dont_stay_two)) .* take_more ./ (take_less + take_more);
        ticket_3 = (dont_stay_two ./ (stay_two + dont_stay_two)) .* take_more ./ (take_less + take_more);
        
        ev1 = 110 .* (yes_control .* ticket_1 + 0.2 .* (1 - yes_control .* ticket_1)) - 0.8 .* 40 .* (1 - (yes_control .* ticket_1));
        ev2 = 90 .* (yes_control .* (ticket_1 + ticket_2) + 0.2 .* (1 - (yes_control .* (ticket_1 + ticket_2)))) - 0.8 .* 60 .* (1 - (yes_control .* (ticket_1 + ticket_2)));
        ev3 = 70 .* (yes_control .* (ticket_1 + ticket_2 + ticket_3) + 0.2 .* (1 - (yes_control .* (ticket_1 + ticket_2 + ticket_3)))) - 0.8 .* 80 .* (1 - (yes_control .* (ticket_1 + ticket_2 + ticket_3)));
        try
           how_many(:,1) = P.beta .* 30+ (data.num_tries(n-1)==0).*P.pers;
        catch
           how_many(:,1) = P.beta .* 30+ (data.num_tries(n-1)==0).*P.pers;
        end 
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
       
        
        
        lik = lik + num - mfUtil1.logsumexp(how_many,2);
    end
    
    % LEARNING UPDATES
    if data.ss_transition(n) == 0
        if data.Reward(n) == 1
            if data.num_tries(n)>0
                
                yes_c = yes_c + 1.0;
            end
            if data.num_tries(n) == 1
                take_less = take_less + 1.0;
            elseif data.num_tries(n) == 2
                stay_two = stay_two + 1.0;
            elseif data.num_tries(n) == 3
                % Do nothing
            end
        elseif data.Reward(n) == 0
            if data.num_tries(n) == 1
                take_more = take_more + 1.0;
            elseif data.num_tries(n) == 2
                take_more = take_more + 1;
                dont_stay_two = dont_stay_two + 1;
            elseif data.num_tries(n) == 3
                no_c = no_c + 1.0;
                take_more = take_more + P.kaps;
                dont_stay_two = dont_stay_two + P.kaps;
           
            end
        end
    end
end
like=mean(like,1); 
