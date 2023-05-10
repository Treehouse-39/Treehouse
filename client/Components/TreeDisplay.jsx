import React from 'react';
import PersonCard from './PersonCard.jsx';

export default function (props) {
  const { people } = props;
  console.log('people from props', people);

  const peopleCards = [];
  for (let i = 0; i < people.length; i++) {
    peopleCards.push(<PersonCard personInfo={people[i]} key={people[i].id} />);
  }

  return <div>{peopleCards}</div>;
}
