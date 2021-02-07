import { useEffect, useRef, useState } from "react";
import { toCssSelectorSafeString } from '../utils';
import "./checkboxGroup.css";

function CheckboxGroup(props) {
  const {
    id,
    className,
    name,
    options,
    value,
    updateValue
  } = props;

  const [isSelectAllToggle, setIsSelectAllToggle] = useState(false);

  const thisRef = useRef(null);

  useEffect(() => {
    updateValue(generateValue());
  }, []);

  useEffect(() => {
    if (isAllSelected() && !isSelectAllToggle) {
      setIsSelectAllToggle(true);
    }
    else if (isAllDeselected() && isSelectAllToggle) {
      setIsSelectAllToggle(false);
    }
  }, [value]);

  const generateValue = () => {
    const thisElem = thisRef.current;
    let newValue = {};
    const checkboxes = thisElem.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      newValue[checkbox.value] = checkbox.checked;
    });
    return newValue;
  };

  const isAllSelected = () => {
    for (const key of Object.keys(value)) {
      const isSelected = value[key];
      if (!isSelected) return false;
    }
    return true;
  };
  const isAllDeselected = () => {
    for (const key of Object.keys(value)) {
      const isSelected = value[key];
      if (isSelected) return false;
    }
    return true;
  };

  // renderer
  return (
    <div
      id={id}
      className={className}
      ref={thisRef}
    >
      {
        options.map(
          (option) => {
            const derivedItemId = toCssSelectorSafeString(option);
            
            return (
              <label
                key={option}
                htmlFor={`${id}__${derivedItemId}`}
                >
                <input
                  id={`${id}__${derivedItemId}`}
                  className={`${className}__checkbox`}
                  type="checkbox"
                  name={name}
                  value={option}
                  checked={value[option] ? true : false}
                  onChange={(e) => {
                    updateValue(generateValue());
                  }}
                />
                <span>{option}</span>
              </label>
            );
          }
        )
      }
      <button
        onClick={() => {
          const thisElem = thisRef.current;
          const checkboxes = thisElem.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach((checkbox) => {
            checkbox.checked = !isSelectAllToggle;
          });
          setIsSelectAllToggle(!isSelectAllToggle);

          updateValue(generateValue());
        }}
      >
        {isSelectAllToggle ? 'Deselect All' : 'Select All'}
      </button>
    </div>
  );
}

CheckboxGroup.defaultProps = {
  id: '',
  className: 'checkbox-group',
  name: '',
  options: [],
  value: {},
  updateValue: () => {}
};

export default CheckboxGroup;
