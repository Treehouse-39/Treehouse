import React from 'react';
import PersonCard from './PersonCard.jsx';

export default function (props) {
  //   const { first_name, last_name, birthday, death_date, email, phone_number, street_address, city, state, zip_code, mom_id, dad_id, spouse_id } = props.personInfo;

  const { people } = props;
  console.log(props);
  return (
    <div>
      {people.map((person) => (
        <PersonCard personInfo={person} key={person.id} />
      ))}
    </div>
  );
}
