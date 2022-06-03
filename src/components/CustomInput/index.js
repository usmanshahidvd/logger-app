import React from 'react';

import classes from './index.module.css';
import { DATE, DROP_DOWN, NUMBER, TEXT } from '../../constants/inputTypes';

const CustomInput = (props) => {

  const renderInput = ({type, value, placeholder, min, onChange, options}) => {
    
    switch(type) {
      case TEXT: 
      case NUMBER: return <input type={type} value={value} onChange={onChange} placeholder={placeholder} />;
      case DATE: return <input type={type} min={min} value={value} onChange={onChange} placeholder={placeholder} />;
      case DROP_DOWN: 
      return <select value={value} onChange={onChange} >
        {options && options.length > 0 && <option value='' ></option>}
        {options.map(opt => <option key={opt} value={opt} >{opt}</option>)}
        </select>
      default : return <input type={type} value={value} onChange={onChange} placeholder={placeholder} />;
    }
  }

  return (
    <div className={classes.CustomInput}>
      <label>{props.label}</label>
      {renderInput(props)}
    </div>
  )
}

export default CustomInput;