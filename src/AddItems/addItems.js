import { useEffect, useRef, useState } from 'react';
import ListItems from '../ListItems/listItems';
import './addItems.css';

function AddItems(props) {
  const {
    id,
    className,
    title,
    fieldName,
    items,
    updateItems
  } = props;
  
  const [errorMsg, setErrorMsg] = useState('');

  const itemInputRef = useRef(null);

  useEffect(() => {
    itemInputRef.current.focus();
  }, []);

  // handler functions
  const onKeyup = (e) => {
    isValidInput();
    if (13 === e.keyCode) {
      onAdd();
    }
  };

  const isDuplicated = (value) => {
    return items.includes(value);
  };

  const isValidInput = () => {
    const nameInput = itemInputRef.current;
    const value = nameInput.value.trim();

    if (isDuplicated(value)) {
      setErrorMsg(`${fieldName} already exist!`);
      return false;
    }

    setErrorMsg('');
    return true;
  };

  const onAdd = (e) => {
    const nameInput = itemInputRef.current;
    const value = nameInput.value.trim();
    nameInput.focus();

    if (value === '') {
      setErrorMsg(`${fieldName} cannot be blank!`);
      return;
    }

    if (isValidInput()) {
      updateItems([...items, value]);
      nameInput.value = '';
    }
  };

  const onInputBlur = (e) => {
    const nameInput = itemInputRef.current;
    const value = nameInput.value.trim();

    // so that when not in focus and the text field is blank, can clear the error message.
    if (value === '') {
      setErrorMsg('');
    }
  };

  // renderer
  return (
    <div
      id={id}
      className={className}
    >
      <h1
        className={`${className}__title`}
      >
        {title}
      </h1>

      <label
        className={`${className}__lbl`}
        htmlFor={`${id}__input`}
      >
        <span
          className={`${className}__lbl-span`}
        >
          {`${fieldName}:`}
        </span>
        <input
          id={`${id}__input`}
          className={
            errorMsg ? 
            `${className}__input-txt ${className}__input-txt--err`
            : `${className}__input-txt`
          }
          type="text"
          ref={itemInputRef}
          onKeyUp={onKeyup}
          onBlur={onInputBlur}
        />
        <span
          className={`err-msg`}
        >
          {errorMsg}
        </span>
      </label>

      <button
        className={`${className}__btn`}
        onClick={onAdd}
      >
        Add
      </button>
      <ListItems
        items={items}
        updateItems={updateItems}
      />
    </div>
  );
}

AddItems.defaultProps = {
  id: 'add-items',
  className: 'add-items',
  title: 'Adding Items...',
  fieldName: 'Item',
  items: [],
  updateItems: () => {}
};

export default AddItems;
