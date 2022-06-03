import React from 'react';

const TableBody = ({data}) => {

  const getRow = (rowData) => (Object.values(rowData).map((colData, i) => (<td key={i}>{colData}</td>)));
  
  return (
  <tbody>
    {data.map((rowData, i) => <tr key={i}>{getRow(rowData)}</tr>)}
  </tbody>
  )
};

export default TableBody;