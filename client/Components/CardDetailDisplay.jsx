import React from 'react';
import { Link } from 'react-router-dom'; 

export default function (props) {
  // const { first_name, last_name, birthday, death_date, email, phone_number, street_address, city, state, zip_code, mom_id, dad_id, spouse_id } = props.personInfo;
  const { person, setViewTree } = props;
  const { mom, dad, spouse, children } = person;
  const { first_name, last_name, birthday, death_date, email, phone_number, street_address, city, state, zip_code, mom_id, dad_id, spouse_id } = person.person;
  console.log(person)
  return (
    <div style={{ width: '200px', height: '600px', border: '1px solid black', margin: '10px', padding: '5px', borderRadius: '5px', backgroundColor: 'lightcyan'}}>
      <button style={{marginLeft: '150px', width: '50px'}} onClick={() => { setViewTree(true) }}> Back </button>
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
      <p>
        Spouse:{' '}
        { spouse ? <button style={{margin: '2px 5px'}} > {' '} {spouse.first_name} {spouse.last_name}{' '} </button> : <button style={{margin: '2px 5px'}} > Add Spouse </button> }
      </p>
      <p>
        Mom:{' '}
        { mom ? <button style={{margin: '2px 5px'}} > {' '} {mom.first_name} {mom.last_name}{' '} </button> : <button style={{margin: '2px 5px'}} > Add Mom </button> }
      </p>
      <p>
        Dad:{' '}
        { dad ? <button style={{margin: '2px 5px'}} > {' '} {dad.first_name} {dad.last_name}{' '} </button> : <button style={{margin: '2px 5px'}} > Add Dad </button> }
      </p>
      {/* // need to iterate over children array to add children to card */}
      <p>
        Children: 
        { children ? <button style={{margin: '2px 5px'}} > {' '} {children.first_name} {children.last_name}{' '} </button> : <button style={{margin: '2px 5px'}} > Add Child </button> }
      </p>
    </div>
  );
}