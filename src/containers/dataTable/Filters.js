import React from 'react';
import classes from './index.module.css';

import CustomInput from '../../components/CustomInput';
import { DROP_DOWN, NUMBER } from '../../constants/inputTypes';

const Filters = ({filters, dropDowns, setStateCallBack, onSearch}) => {
  const renderFilters = () => {
    return Object.keys(filters).map(filterKey => {
      const filter = filters[filterKey];
      if(filter.type === DROP_DOWN ) {
        return <CustomInput key={filterKey} {...filter} options={dropDowns[filter.name]} onChange={(e) => {
          e.preventDefault();
          setStateCallBack(filterKey, e.target.value)}
        } />
      } 
      return <CustomInput key={filterKey} {...filter} onChange={(e) => setStateCallBack(filterKey, e.target.value)} />
    })
  }
  return (
    <div className={classes.Filters}>
      {renderFilters()}
      <button onClick={onSearch}>Search Logger</button>
    </div>
  )
}

export default Filters;