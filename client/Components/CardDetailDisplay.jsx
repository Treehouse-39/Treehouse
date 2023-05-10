import React from 'react';

export default function (props) {
  // const { first_name, last_name, birthday, death_date, email, phone_number, street_address, city, state, zip_code, mom_id, dad_id, spouse_id } = props.personInfo;
  const { mom, dad, spouse, children, person } = props;
  console.log('person object from card details', person.person.first_name);
  return (
    <div style={{ width: '180px', height: '280px', border: '1px solid black', margin: '10px', padding: '5px' }}>
      <p>
        Name: {person.person.first_name} {person.person.last_name}
      </p>
      {/* <p>
        Birthday: {person.person.birthday.slice(0, 10)} - {person.person.death_date.slice(0, 10)}
      </p>
      <p>Phone Number: {phone_number} </p>
      <p>Email: {email} </p>
      <p>
        Address: {street_address}, {city}, {state} {zip_code}{' '}
      </p>
      <p>
        Spouse: <button> spouse </button>
      </p>
      <p>
        Mom: <button> {mom.first_name} </button>{' '}
      </p>
      <p>
        Dad: <button> dad </button>{' '}
      </p> */}
    </div>
  );
}
