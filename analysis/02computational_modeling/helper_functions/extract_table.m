% Convert structure fields to separate variables
function myTable=extract_table(myStruct)

fieldNames = fieldnames(myStruct);
numFields = numel(fieldNames);

% Determine the maximum vector length
maxVectorLength = max(cellfun(@numel, struct2cell(myStruct)));

% Create a cell array to store the vectors
vectorCell = cell(numFields, maxVectorLength);

% Extract and transpose the vectors from each field
for i = 1:numFields
    currentVector = myStruct.(fieldNames{i});
    vectorCell(i, 1:numel(currentVector)) = num2cell(currentVector);
end

% Create a table from the transposed cell array
myTable = cell2table(vectorCell', 'VariableNames', fieldNames);



end 