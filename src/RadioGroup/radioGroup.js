import { useState } from "react";
import { toCssSelectorSafeString } from '../utils';

function RadioGroup(props) {
  const {
    id,
    className,
    name,
    options
  } = props;

  const [selectAllToggle, setSelectAllToggle] = useState(false);

  // renderer
  return (
    <div
      id={id}
      className={className}
    >
      {
        options.map(
          (option) => {
            const derivedOptionId = toCssSelectorSafeString(option);
            
            return (
              <label
                key={option}
                htmlFor={`${id}__${derivedOptionId}`}
                >
                <span>{`${option}:`}</span>
                <input
                  id={`${id}__${derivedOptionId}`}
                  className={`${className}__radio`}
                  name={name}
                  type="radio"
                />
              </label>
            );
          }
        )
      }
    </div>
  );
}

RadioGroup.defaultProps = {
  id: '',
  className: 'radio-group',
  name: '',
  options: [],
  onSelect: () => {}
};

export default RadioGroup;
