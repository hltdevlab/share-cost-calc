import { useRef, useState } from 'react';
import Combobox from '../Combobox/combobox';
import { toCssSelectorSafeString } from '../utils';
import './whoPaid.css';

function WhoPaid(props) {
  const {
    idPrefix,
    className,
    title,
    itemName,
    people,
    value,
    updateValue
  } = props;

  const [errorMsg, setErrorMsg] = useState('');

  const thisRef = useRef(null);

  // renderer
  return (
    <div
      id={`${idPrefix}-${toCssSelectorSafeString(itemName)}`}
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

      <Combobox
        id={`${idPrefix}-${toCssSelectorSafeString(itemName)}__combobox`}
        options={people}
        errorMsg=""
        value={value[itemName]}
        updateValue={(childValue) => {
          if (childValue !== value) {
            const newValue = {};
            newValue[itemName] = childValue;
            updateValue(newValue);
          }
        }}
      />
      
    </div>
  );
}

WhoPaid.defaultProps = {
  idPrefix: 'who-paid',
  className: 'who-paid',
  title: 'Who Paid for',
  itemName: '',
  people: [],
  value: {},
  updateValue: () => {}
};

export default WhoPaid;
