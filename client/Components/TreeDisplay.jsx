import React from 'react';
import PersonCard from './PersonCard.jsx';

export default function TreeDisplay(props) {
  const { people, getDetails } = props;

  const peopleCards = [];
  for (let i = 0; i < people.length; i++) {
    peopleCards.push(<PersonCard personInfo={people[i]} getDetails={getDetails} key={people[i].id} />);
  }

  return <div>{peopleCards}</div>;
}
