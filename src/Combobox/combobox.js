
import { useRef } from 'react';

function Combobox(props) {
  const {
    id,
    className,
    fieldName,
    options,
    errorMsg,
    value,
    updateValue
  } = props;

  const thisRef = useRef(null);
  const selectRef = useRef(null);

  // renderer
  return (
    <label
      htmlFor={id}
      ref={thisRef}
    >
      <span>
        {fieldName ? `${fieldName}:` : ''}
      </span>
      <select
        id={id}
        className={className}
        ref={selectRef}
        value={value}
        onChange={(e) => {
          const selectElem = selectRef.current;
          updateValue(selectElem.value);
        }}
      >
        {
          ['', ...options].map((item, i) => {
            if (item === '') {
              return (
                <option
                  key={item}
                  disabled={value === '' ? false : true}
                >
                  Please choose...
                </option>
              );
            }
            return (
              <option
                key={item}
              >
                {item}
              </option>
            );
          })
        }
      </select>
      <span
        className={`err-msg`}
      >
        {errorMsg}
      </span>
    </label>
  );
}

Combobox.defaultProps = {
  id: '',
  className: '',
  fieldName: '',
  options: [],
  errorMsg: '',
  value: '',
  updateValue: () => {}
};

export default Combobox;
