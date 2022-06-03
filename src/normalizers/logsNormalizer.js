import headersData from "../constants/headersData";

const logsNormalizer = (logs) => {
  const requiredColumns = Object.keys(headersData);
  const normalizedLogs = logs.reduce((newLogs, curLog) => {
    const newLog = {};
    requiredColumns.forEach(column => (newLog[column] = curLog[column]));
    newLogs.push(newLog);
    return newLogs;
  }, []);
  return normalizedLogs;
}

export default logsNormalizer;