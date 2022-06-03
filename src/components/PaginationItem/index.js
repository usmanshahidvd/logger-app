import React from 'react';

import classes from './index.module.css';

const PaginationItem = ({active, text, onClick}) => {
  const btnClasses = [classes.PagItem];
  if (active) btnClasses.push(classes.Active);
  return <button className={btnClasses.join(' ')} onClick={onClick}>{text}</button>
};

export default PaginationItem;