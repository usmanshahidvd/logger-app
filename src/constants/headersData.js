import { DATE, NUMBER, TEXT } from './inputTypes';
import {LOG_ID,
  APPLICATION_TYPE,
  APPLICATION_ID,
  ACTION_TYPE,
  USER_ID,
  CREATION_TIME_STAMP} from './requiredColumns';

const headersData = {
  [LOG_ID]: {
    name: "Log ID",
    type: NUMBER
  },
  [APPLICATION_TYPE]: {
    name: "Application Type",
    type: TEXT
  },
  [APPLICATION_ID]: {
    name: "Application ID",
    type: NUMBER
  },
  [ACTION_TYPE]: {
    name: "Action",
    type: TEXT
  },
  [USER_ID]: {
    name: "User Id",
    type: NUMBER
  },
  [CREATION_TIME_STAMP]: {
    name: "Date : Time",
    type: DATE
  },
};

export default headersData;