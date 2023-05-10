import React, { useEffect, useState } from 'react';
import TreeDisplay from '../Components/TreeDisplay.jsx';
import CardDetailDisplay from '../Components/CardDetailDisplay.jsx';

export default function Home() {
  const [people, setPeople] = useState([]);
  const [viewTree, setViewTree] = useState(true);
  const [person, setPerson] = useState({});

  useEffect(() => {
    getPeople();
  }, []);

  function getPeople() {
    fetch(`/api`, {
      mode: 'no-cors',
    })
      .then((info) => info.json())
      .then((data) => {
        setPeople(data.people);
      })
      .catch((err) => console.log(`Error from fetch: ${err}`));
  }

  function getDetails(first_name, last_name, birthday) {
    fetch(`/api/getPerson/${first_name}/${last_name}/${birthday}`, {
      mode: 'no-cors',
    })
      .then((info) => info.json())
      .then((data) => {
        setPerson(data);
        setViewTree(false);
      })
      .catch((err) => console.log(`Error from fetch: ${err}`));
  }

  return (
    <>
      <h1>Home</h1>
      {viewTree ? <TreeDisplay people={people} getDetails={getDetails} /> : <CardDetailDisplay person={person} getDetails={getDetails} setViewTree={setViewTree} />}
    </>
  );
}
