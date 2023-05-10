import React from 'react';

export default function PersonCard(props) {
  const { first_name, last_name, sex, birthday, death_date } = props.personInfo;
  const { getDetails } = props;
  return (
    <>
    {/* style={{ (sex === 'male') ? {backgroundColor: 'lightblue'} : {backgroundColor: 'lightpink'} }}; */}
      <button
        style={{ width: '180px', height: '80px', border: '1px solid black', margin: '10px', padding: '5px', borderRadius: '5px', backgroundColor: 'lightgreen' }}
        onClick={async () => {
          console.log('clicked');
          await getDetails(first_name, last_name, birthday);
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