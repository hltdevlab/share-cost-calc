import { useRef } from "react";
import CheckboxGroup from '../CheckboxGroup/checkboxGroup';
import { toCssSelectorSafeString } from '../utils';
import './whoSharing.css';

function WhoSharing(props) {
  const {
    className,
    title,
    itemName,
    people,
    value,
    updateValue
  } = props;

  const thisRef = useRef(null);

  // renderer
  return (
    <div
      className={className}
      ref={thisRef}
    >
      <h1 className={`${className}__title`}>
        {`${title} `}
        <span  className={`${className}__item-name`}>
          {itemName}
        </span>
        ?
      </h1>

      <CheckboxGroup
        id={toCssSelectorSafeString(itemName)}
        name={toCssSelectorSafeString(itemName)}
        options={people}
        value={value[itemName]}
        updateValue={(childValue) => {
          const childValueStr = JSON.stringify(childValue);
          const valueStr = JSON.stringify(value[itemName]);
          if (childValueStr !== valueStr) {
            const newValue = {};
            newValue[itemName] = {...childValue};
            updateValue(newValue);
          }
        }}
      />
    </div>
  );
}

WhoSharing.defaultProps = {
  className: 'who-sharing',
  title: 'Who Sharing',
  itemName: '',
  people: [],
  value: {},
  updateValue: () => {}
};

export default WhoSharing;
