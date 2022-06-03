import { APPLICATION_TYPE, ACTION_TYPE } from '../constants/requiredColumns';

const normalizedDropDowns = (logs) => {
  const dropDowns = {
    [APPLICATION_TYPE]: [],
    [ACTION_TYPE]: [],
  };
  logs.forEach(log => {
    if(log[APPLICATION_TYPE] && !dropDowns[APPLICATION_TYPE].includes(log[APPLICATION_TYPE])) {
      dropDowns[APPLICATION_TYPE].push(log[APPLICATION_TYPE]);
    }
    if(log[ACTION_TYPE] && !dropDowns[ACTION_TYPE].includes(log[ACTION_TYPE])) {
      dropDowns[ACTION_TYPE].push(log[ACTION_TYPE]);
    }
  });

  return dropDowns;
}

export default normalizedDropDowns;