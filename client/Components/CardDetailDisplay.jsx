import React from 'react';

export default function () {
  const { first_name, last_name, birthday, death_date, email, phone_number, street_address, city, state, zip_code, mom_id, dad_id, spouse_id } = props.personInfo;

  return (
    <div style={{ width: '180px', height: '80px', border: '1px solid black', margin: '10px', padding: '5px'}}>
      <p>Name: {first_name} {last_name}</p>
      <p>Birthday: {birthday.slice(0, 10)} - {death_date.slice(0, 10)}</p>
      <p>Phone Number: {phone_number} </p>  
      <p>Email: {email} </p>  
      <p>Address: {street_address}, {city}, {state} {zip_code} </p>  
      <p>Spouse: <button> spouse </button> 
      </p>  
      <p>Mom: <button> mom </button> </p>  
      <p>Dad: <button> dad </button>  </p>  

    </div>
  );

};