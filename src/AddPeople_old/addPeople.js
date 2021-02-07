import { useEffect, useRef, useState } from 'react';
import './addPeople.css';

function AddPeople({ updatePeople }) {
  const [people, _setPeople] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const peopleRef = useRef(people);
  const setPeople = (data) => {
    peopleRef.current = data;
    _setPeople(data);
  };

  const nameInputRef = useRef(null);

  // Lifecycle useEffect
  useEffect(() => {
    console.log('component did mount');
    // const nameInput = document.querySelector('.add-people #input-name');
    const nameInput = nameInputRef.current;
    nameInput.addEventListener('keyup', onKeyup);

    return () => {
      console.log('component will unmount');
      nameInput.removeEventListener('keyup', onKeyup);
    };
  }, []);

  // Updating container when people changes
  useEffect(() => {
    console.log('Updating container: ' + people);
    updatePeople(people);
  }, [people]);
  
  // handler functions
  const onKeyup = (e) => {
    if (13 === e.keyCode) {
      onAdd();
    }

    // const nameInput = document.querySelector('.add-people #input-name');
    const nameInput = nameInputRef.current;
    if (isDuplicated(nameInput.value)) {
      setErrorMsg('name already exist!');
    }
    else {
      setErrorMsg('');
    }
  };

  const updateErrorMsg = () => {
    // const nameInput = document.querySelector('.add-people #input-name');
    const nameInput = nameInputRef.current;
    if (isDuplicated(nameInput.value)) {
      setErrorMsg('name already exist!');
    }
    else {
      setErrorMsg('');
    }
  };

  const isDuplicated = (value) => {
    console.log('isDuplicated: ' + peopleRef.current);
    console.log('isDuplicated: ' + peopleRef.current.includes(value));
    return peopleRef.current.includes(value);
  };

  const onAdd = (e) => {
    // const nameInput = document.querySelector('.add-people #input-name');
    const nameInput = nameInputRef.current;
    const value = nameInput.value;
    nameInput.focus();
    
    if (!isDuplicated(value)) {
      setPeople([...peopleRef.current, value]);
      nameInput.value = '';
      updateErrorMsg();
    }
  };

  // renderer
  return (
    <div className="add-people">
      <h1>
        Adding People...
      </h1>

      <label
        className="add-people__lbl"
        htmlFor="input-name"
      >
        <span className="add-people__lbl-span">Name:</span>
        <input
          id="input-name"
          className={errorMsg? 'add-people__input-txt add-people__input-txt--err' : 'add-people__input-txt'}
          type="text"
          ref={nameInputRef}
        />
        <span className="add-people__input-err-msg">{errorMsg}</span>
      </label>

      <button
        className="add-people__btn"
        onClick={onAdd}
      >
        Add
        
      </button>
    </div>
  );
}

export default AddPeople;
