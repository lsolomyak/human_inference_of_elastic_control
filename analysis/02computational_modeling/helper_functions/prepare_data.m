function data=prepare_data(dd,sim,rep)
if rep==1
    dd.participant_id=dd.id;
else
    dd.participant_id=dd.participant;
end 
if rep==0
    for i=1:length(unique(dd.participant_id))
        
        dd = sortrows(dd, {'participant_id', 'block', 'trials'});
        
        current_list=unique(dd.participant_id);
        part_to_keep=current_list(i);
        disp(part_to_keep);
        dats=dd(dd.participant_id==part_to_keep,:);
        if height(dats)>100
            try
                %    dats=dats(1:120,:);
            catch
            end
            data(i).T=size(dats,1);
            try
                if dats.trials(1)==29
                    disp('shifted one')
                    disp(dats.participant(1));
                end
            catch
                stop_here=1;
            end
           % try
            %    data(i).num_tries=dats.num_tries;
           % catch
                data(i).num_tries=dats.total_actions;
           % end
            %  data(i).participant=dats.participant(1);
            data(i).participant=dats.participant(1);
            data(i).participant_id=string(dats.participant_id(1));
            
            % Assuming 'dats' is a structure with field 'trial_reward'
            % and 'data' is a structure array
            
            data(i).Reward = dats.trial_reward > 0;
            data(i).trial_reward=dats.trial_reward;
            % Calculate cost based on number of tries
            data(i).trials=dats.trials;
            try
                data(i).elastic_norm_likelihood=dats.elastic_norm_likelihood;
                data(i).inelastic_norm_likelihood=dats.inelastic_norm_likelihood;
                data(i).flat_norm_likelihood=dats.flat_norm_likelihood;
            catch
            end
            % Store the cost
            data(i).cost=0;
            data(i).cost = 80 .*(data(i).num_tries==3 & data(i).trials>4 )+60 .*(data(i).num_tries==2)+40 .*(data(i).num_tries==1);
            data(i).outcome=data(i).trial_reward-data(i).cost;
            
            
            
            %  data(i).content = dats.slider_7_normalized;  % Numeric with NaN
            %    data(i).excited = dats.slider_excited_normalized;  % Numeric with NaN
            
            
            data(i).c_elastic=dats.c_elastic;
            data(i).c_inelastic=dats.c_inelastic;
            %     data(i).id=string(dats.id);
            
            %    data(i).Reward=dats.Reward;
            data(i).ss_transition=dats.ss_transition;
            if sim==1
                data(i).beta=dats.beta(1);
                data(i).epsilon1=dats.epsilon1(1);
                data(i).epsilon2=dats.epsilon2(1);
                data(i).scale1=dats.scale1(1);
                data(i).scale3=dats.scale3(1);
                data(i).pers=dats.pers(1);
                data(i).kaps=dats.kaps(1);
                data(i).alpha1=dats.alpha1(1);
                data(i).alpha2=dats.alpha2(1);
                data(i).alpha3=dats.alpha3(1);
            end
            
        end
    end
else
    dd = sortrows(dd, {'id', 'block', 'trials'});
    
    for i=1:length(unique(dd.id))
        current_list=unique(dd.id);
        part_to_keep=current_list(i);
        dats=dd(dd.id==part_to_keep,:);
        %dats= sortrows(dats, [1 2 3]);
        dats = sortrows(dats, {'id', 'block', 'trials'});
        
        if sim==1
            data(i).beta=dats.beta(1);
            data(i).epsilon1=dats.epsilon1(1);
            data(i).epsilon2=dats.epsilon2(1);
            data(i).scale1=dats.scale1(1);
            data(i).scale3=dats.scale3(1);
            data(i).pers=dats.pers(1);
            data(i).kaps=dats.kaps(1);
            data(i).alpha1=dats.alpha1(1);
            data(i).alpha2=dats.alpha2(1);
            data(i).alpha3=dats.alpha3(1);
        end
        data(i).T=size(dats,1);
        if dats.trials(1)==29
            disp('shifted one')
            disp(dats.id(1));
        end
        try
            data(i).num_tries=dats.num_tries;
        catch
            data(i).num_tries=dats.total_actions;
        end
        %  data(i).id=dats.id(1);
        data(i).id=dats.id(1);
        data(i).participant_id=string(dd.id(1));
     %   data(i).participant=double(dd.participant(1));
        
        data(i).c_elastic=dats.c_elastic;
        data(i).c_inelastic=dats.c_inelastic;
        data(i).Reward =dats.trial_reward>0;
        
        
        
        
        
        
        %data(i).Reward=dats.Reward;
        data(i).ss_transition=dats.ss_transition;
        data(i).trials=dats.trials;
        
    end
end