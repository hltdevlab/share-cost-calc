import { useEffect, useRef, useState } from 'react';
import './whatCost.css';

function WhatCost(props) {
  const {
    id,
    className,
    title,
    itemName,
    fieldName,
    value,
    updateValue
  } = props;
  
  const [errorMsg, setErrorMsg] = useState('');

  const thisRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
    updateValue(generateValue());
  }, []);

  // handler functions
  const isValidInput = () => {
    const inputElem = inputRef.current;
    const floatValue = parseFloat(inputElem.value);

    if (isNaN(floatValue)) {
      setErrorMsg('Please input valid number.');
    }
    else if (inputElem.min && floatValue < inputElem.min) {
      setErrorMsg(`Value must not be lesser than ${inputElem.min}.`);
    }
    else if (inputElem.max && floatValue > inputElem.max) {
      setErrorMsg(`Value must not be more than ${inputElem.max}.`);
    }
    else {
      setErrorMsg('');
      return true;
    }

    return false;
  };

  const generateValue = () => {
    const newValue = {};
    if (isValidInput()) {
      const inputElem = inputRef.current;
      const floatValue = parseFloat(inputElem.value);
      newValue[itemName] = floatValue;
      return newValue;
    }
    return newValue[itemName] = 0;
  }

  const _onChange = (e) => {
    isValidInput();
    const inputElem = inputRef.current;
    const newValue = {};
    const floatValue = parseFloat(inputElem.value);
    newValue[itemName] = floatValue;
    updateValue(newValue);
    
  };

  // renderer
  return (
    <div
      id={id}
      className={className}
      ref={thisRef}
    >
      <h1 className={`${className}__title`}>
        {`${title} `}
        <span className={`${className}__item-name`}>
          {itemName}
        </span>
        ?
      </h1>

      <label
        className={`${className}__lbl`}
        htmlFor={`${id}__input`}
      >
        <span className={`${className}__lbl-span`}>
          {`${fieldName}:`}
        </span>
        <input
          id={`${id}__input`}
          className={
            errorMsg ? 
            `${className}__input-txt ${className}__input-txt--err`
            : `${className}__input-txt`
          }
          type="number"
          step="0.01"
          min="0"
          ref={inputRef}
          value={value}
          onChange={_onChange}
        />
        <span className={`err-msg`}>
          {errorMsg}
        </span>
      </label>
      
    </div>
  );
}

WhatCost.defaultProps = {
  id: 'what-cost',
  className: 'what-cost',
  title: 'What is the Cost of',
  itemName: '',
  fieldName: 'Cost ($)',
  value: 0,
  updateValue: () => {}
};

export default WhatCost;
