import React from 'react';

export default function (props) {
  // const { first_name, last_name, birthday, death_date, email, phone_number, street_address, city, state, zip_code, mom_id, dad_id, spouse_id } = props.personInfo;
  const { mom, dad, spouse, children, person } = props;
  const { first_name, last_name, birthday, death_date, email, phone_number, street_address, city, state, zip_code, mom_id, dad_id, spouse_id } = person.person;
  return (
    <div style={{ width: '200px', height: '280px', border: '1px solid black', margin: '10px', padding: '5px' }}>
      <p>
        Name: {first_name} {last_name}
      </p>
      <p>
        Birthday: {birthday.slice(0, 10)} 
      </p>
      <p>
        Death Date: {death_date.slice(0, 10)}
      </p>
      <p>Phone Number: {phone_number} </p>
      <p>Email: {email} </p>
      <p>
        Address: {street_address}, {city}, {state} {zip_code}{' '}
      </p>
      {/* <p>
        Spouse:{' '}
        <button>
          {' '}
          {spouse ? spouse.first_name : 'add spouse'} {spouse.last_name}{' '}
        </button>
      </p>
      <p>
        Mom:{' '}
        <button>
          {' '}
          {mom.first_name} {mom.last_name}{' '}
        </button>{' '}
      </p>
      <p>
        Dad:{' '}
        <button>
          {' '}
          {dad.first_name} {dad.last_name}{' '}
        </button>{' '}
      </p> */}
    </div>
  );
}
