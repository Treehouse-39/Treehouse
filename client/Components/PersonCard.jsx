import React from 'react';

export default function PersonCard(props) {
  const { first_name, last_name, sex, birthday, death_date } = props.personInfo;
  const { getDetails } = props;
  return (
    <>
      <button
        style={{ width: '160px', height: '120px', border: '1px solid black', margin: '8px', padding: '3px', borderRadius: '5px', backgroundColor: 'lightgreen' }}
        onClick={() => {
          getDetails(first_name, last_name, birthday);
          // get person query
        }}>
        <p>
          Name: {first_name} {last_name}
        </p>
        <p>Birthday: {birthday.slice(0, 10)}</p>
      </button>
    </>
  );
}
