import { useRef, useEffect, useState } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import AddPeople from './AddPeople/addPeople';
import AddItems from './AddItems/addItems';
import WhoSharing from './WhoSharing/whoSharing';
import WhatCost from './WhatCost/whatCost';
// import RadioGroup from './RadioGroup/radioGroup';
import WhoPaid from './WhoPaid/whoPaid';
import Summary from './Summary/summary';
import SwitchTransitionContainer from './SwitchTransitionContainer/switchTransitionContainer';
import Pagination from './Pagination/pagination';
import { calculateReturnText } from './calcUtils';

// import logo from './logo.svg';
import './App.css';

function App() {
  const [people, setPeople] = useState([]);
  const [items, setItems] = useState([]);
  const [summaryText, setSummaryText] = useState('');
  const [index, setIndex] = useState(0);
  // const [transitionDirection, setTransitionDirection] = useState('left');
  const nodeRef = useRef(null);

  /* json with item name as the keys */
  const [whoSharingJson, setWhoSharingJson] = useState({});
  const [whatCostJson, setWhatCostJson] = useState({});
  const [whoPaidJson, setWhoPaidJson] = useState({});
  /* ---------- */

  useEffect(() => {
    items
      .filter(item => (!people.includes(whoPaidJson[item])))
      .forEach(item => (whoPaidJson[item] = ''));
  }, [
    people
  ]);

  useEffect(() => {
    if(!whoSharingJson) return;

    const keysToBeDelete = Object.keys(whoSharingJson)
      .filter(key => (
        !items.includes(key)
      ));
    
    // ensuring the jsons only have valid items in it.
    keysToBeDelete.forEach(key => {
      delete whoSharingJson[key];
      delete whatCostJson[key];
      delete whoPaidJson[key];
    });

    setWhoSharingJson((whoSharingJson) => ({...whoSharingJson}));
    setWhatCostJson((whatCostJson) => ({...whatCostJson}));
    setWhoPaidJson((whoPaidJson) => ({...whoPaidJson}));
   }, [items]);

  useEffect(() => {
    // defining when to do the calculations.
   setSummaryText(calculateReturnText({
      people,
      items,
      whoSharingJson,
      whatCostJson,
      whoPaidJson
    }));
  }, [
      people,
      whoSharingJson,
      whatCostJson,
      whoPaidJson
  ]);

  const updatePeople = (data) => {
    const dataStr = JSON.stringify(data);
    const peopleStr = JSON.stringify(people);
    if (peopleStr !== dataStr) {
      console.log(`People:\n${JSON.stringify(data)}`);
      setPeople(data);
    }
  };

  const updateItems = (data) => {
    const dataStr = JSON.stringify(data);
    const itemsStr = JSON.stringify(items);
    if (itemsStr !== dataStr) {
      console.log(`Items:\n${JSON.stringify(data)}`);
      setItems(data);
    }
  };

  let cards = [(
    <AddPeople
      items={people}
      updateItems={updatePeople}
    />
  ), (
    <AddItems
      items={items}
      updateItems={updateItems}
    />
  )];

  const whoSharingCards = items.map(
    item => (
      <WhoSharing
        key={item}
        itemName={item}
        people={people}
        value={(() => {
          // passing in the json for this item instead of the full whoSharingJson.
          const newValue = {};
          newValue[item] = {...whoSharingJson[item]};
          return newValue;
        })()}
        updateValue={(childValue) => {
          // this childValue contains only the json for this item.
          // so when doing comparison, needs to check with the respective one.
          const childValueStr = JSON.stringify(childValue);
          const whoSharingJsonStr = JSON.stringify(whoSharingJson[item]);
          if (childValueStr !== whoSharingJsonStr) {
            const newValue = {
              ...whoSharingJson,
              ...childValue
            }
            console.log(`WhoSharing:\n${JSON.stringify(newValue, null, 2)}`);
            setWhoSharingJson(newValue);
          }
        }}
      />
    )
  );

  const whoPaidCards = items.map(
    item => (
      <WhoPaid
        key={item}
        itemName={item}
        people={people}
        value={(() => {
          const newValue = {};
          if (whoPaidJson[item]) {
            newValue[item] = whoPaidJson[item];
          }
          else {
            newValue[item] = '';
          }
          return newValue;
        })()}
        updateValue={(childValue) => {
          if (childValue) {
            const childValueStr = JSON.stringify(childValue);
            const whoPaidJsonStr = JSON.stringify(whoPaidJson[item]);
            if (childValueStr !== whoPaidJsonStr) {
              const newValue = {
                ...whoPaidJson,
                ...childValue
              }
              console.log(`WhoPaid:\n${JSON.stringify(newValue, null, 2)}`);
              setWhoPaidJson(newValue);
            }
          }
        }}
      />
    )
  );

  const whatCostCards = items.map(
    item => (
      <WhatCost
        key={item}
        itemName={item}
        value={whatCostJson[item]}
        updateValue={(childValue) => {
          if (childValue !== undefined && childValue !== null) {
            const childValueStr = JSON.stringify(childValue);
            const whatCostJsonStr = JSON.stringify(whatCostJson[item]);
            if (childValueStr !== whatCostJsonStr) {
              const newValue = {
                ...whatCostJson,
                ...childValue
              }
              console.log(`WhatCost:\n${JSON.stringify(newValue, null, 2)}`);
              setWhatCostJson(newValue);
            }
          }
        }}
      />
    )
  );

  cards = [
    ...cards,
    ...whoSharingCards,
    ...whoPaidCards,
    ...whatCostCards
  ];

  // only add in summary card if there is results
  if (summaryText !== '') {
    cards = [
      ...cards,
      (
        <Summary summaryText={summaryText} />
      )
    ];
  }
  
  return (
    <div className="App">
      <Pagination
        maxCount={cards.length}
        pageIndex={index}
        updateIndex={(childIndex) => {
          /*
          if (index > childIndex) {
            // prev clicked
            console.log('right');
            setTransitionDirection('right');
          }
          else if (index < childIndex) {
            // next clicked
            console.log('left');
            setTransitionDirection('left');
          }
          */
          if (childIndex !== index) {
            setIndex(childIndex);
          }
        }}
      />

      <SwitchTransitionContainer
        keyIndex={index}
      >
        {cards[index]}
      </SwitchTransitionContainer>

    </div>
  );
}

export default App;
