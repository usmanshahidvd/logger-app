import React from 'react';

import classes from './index.module.css';

const PaginationButton = ({disable, text, onClick}) => {
  const btnClasses = [classes.PagBtn];
  if (disable) btnClasses.push(classes.Disable);
  return <button className={btnClasses.join(' ')} onClick={onClick}>{text}</button>
};

export default PaginationButton;