import React from 'react';

export default function PersonCard(props) {
  const { first_name, last_name, sex, birthday, death_date } = props.personInfo;
  const { getDetails } = props;
  return (
    < div id={'home-page'} >
    {/* style={{ (sex === 'male') ? {backgroundColor: 'lightblue'} : {backgroundColor: 'lightpink'} }}; */}
      <button id={'personCard'}
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
    </div>
  );
}
