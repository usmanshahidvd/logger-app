import React from 'react';
import headersData from '../../constants/headersData';

import arrowUp from '../../assests/imgs/up-arrow.svg';
import arrowDown from '../../assests/imgs/down-arrow.svg';

const TableHeader = ({sortingColumn, setStateCallBack}) => {

  const headers = Object.keys(headersData);
  const onHeadingClick = (column, type) => {
    if (sortingColumn === column) {
      setStateCallBack({});
    } else {
      setStateCallBack({
        column,
        type
      });
    }
  }

  return (
  <thead>
    <tr>
      {headers.map((header, i) => (<th key={i} onClick={() => onHeadingClick(header, headersData[header].type)}>
        {headersData[header].name}
        <img src={header === sortingColumn ? arrowDown : arrowUp} alt="arrow-icon" />
      </th>))}
    </tr>
  </thead>
  )
};

export default TableHeader;