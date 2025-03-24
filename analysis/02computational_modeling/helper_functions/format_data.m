% works for feedback but not no feedback trials
function [data]=format_data(dd,i)
try
    data(i).T=size(dd,1);
    data(i).num_tries=dd.num_tries;
    data(i).Reward=dd.Reward;
    data(i).ss_transition=dd.ss_transition;
    data(i).trials=dd.trials;
    

    
    data(i)=struct2table(data);
end
end



    