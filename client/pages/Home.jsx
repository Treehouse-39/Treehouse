// make fetch request
// get all people from database
// create a person card for each entry in the DB
//
import React, { useEffect, useState } from 'react';
import TreeDisplay from '../Components/TreeDisplay.jsx';
import CardDetailDisplay from '../Components/CardDetailDisplay.jsx';

export default function Home() {
  const [people, setPeople] = useState([]);
  // const [TreeDisplay, setTreeDisplay] = useState(true);
  useEffect(() => {
    getPeople();
  }, []);

  function getPeople() {
    fetch(`/api`, {
      mode: 'no-cors',
    })
      .then((info) => info.json())
      .then((data) => {
        console.log('returned people list', data);
        setPeople(data.people);
      })
      .catch((err) => console.log(`Error from fetch: ${err}`));
  }

  console.log(people);

  return (
    <>
      <h1>Home</h1>
      {/* {TreeDisplay ? <TreeDisplay people={people} /> : <CardDetailDisplay />} */}
      <TreeDisplay people={people} />
    </>
  );
}
