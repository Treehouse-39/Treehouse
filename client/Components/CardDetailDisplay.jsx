import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function (props) {
  const navigate = useNavigate();

  const { person, setViewTree, getDetails } = props;
  const { mom, dad, spouse, children } = person;
  const { id, first_name, last_name, sex, birthday, death_date, email, phone_number, street_address, city, state, zip_code } = person.person;

  const childrenCards = [];

  if (children) {
    for (let i = 0; i < children.length; i++) {
      childrenCards.push(
        <button
          style={{ margin: '2px 5px', backgroundColor: 'lightsalmon', borderRadius: '3px' }}
          onClick={async () => {
            await getDetails(children[i].first_name, children[i].last_name, children[i].birthday);
          }}>
          {' '}
          {children[i].first_name} {children[i].last_name}{' '}
        </button>
      );
    }
  }

  return (
    <div style={{ width: '250px', height: '600px', border: '1px solid black', margin: '10px', padding: '5px', borderRadius: '5px', backgroundColor: 'lightcyan' }}>
      <button
        style={{ marginLeft: '200px', width: '50px' }}
        onClick={() => {
          setViewTree(true);
        }}>
        {' '}
        Back{' '}
      </button>
      <p style={{ fontSize: '22px' }}>
        Name: {first_name} {last_name}
      </p>
      <p>Birthday: {birthday.slice(0, 10)}</p>
      <p>{/* Death Date: {death_date.slice(0, 10)} */}</p>
      <p>Phone Number: {phone_number} </p>
      <p>Email: {email} </p>
      <p>
        Address: {street_address}, {city}, {state} {zip_code}{' '}
      </p>
      <p>
        Spouse:{' '}
        {spouse ? (
          <button
            style={{ margin: '2px 5px', backgroundColor: 'lightsalmon', borderRadius: '3px' }}
            onClick={async () => {
              await getDetails(spouse.first_name, spouse.last_name, spouse.birthday);
            }}>
            {' '}
            {spouse.first_name} {spouse.last_name}{' '}
          </button>
        ) : (
          <button
            style={{ margin: '2px 5px', backgroundColor: 'lightsteelblue', borderRadius: '3px' }}
            // add in functionality to add a new person
            onClick={() => {
              navigate('/createperson', { state: { firstName: first_name, lastName: last_name, birthday: birthday, relation: 'spouse' } });
            }}>
            {' '}
            Add Spouse{' '}
          </button>
        )}
      </p>

      <p>
        Mom:{' '}
        {mom ? (
          <button
            style={{ margin: '2px 5px', backgroundColor: 'lightsalmon', borderRadius: '3px' }}
            onClick={async () => {
              await getDetails(mom.first_name, mom.last_name, mom.birthday);
            }}>
            {' '}
            {mom.first_name} {mom.last_name}{' '}
          </button>
        ) : (
          <button
            style={{ margin: '2px 5px', backgroundColor: 'lightsteelblue', borderRadius: '3px' }}
            // add in functionality to add a new person
            onClick={() => navigate('/createperson', { state: { firstName: first_name, lastName: last_name, birthday: birthday, relation: 'mom' } })}>
            {' '}
            Add Mom{' '}
          </button>
        )}
      </p>

      <p>
        Dad:{' '}
        {dad ? (
          <button
            style={{ margin: '2px 5px', backgroundColor: 'lightsalmon', borderRadius: '3px' }}
            onClick={async () => {
              await getDetails(mom.first_name, mom.last_name, mom.birthday);
            }}>
            {' '}
            {dad.first_name} {dad.last_name}{' '}
          </button>
        ) : (
          <button
            style={{ margin: '2px 5px', backgroundColor: 'lightsteelblue', borderRadius: '3px' }}
            // add in functionality to add a new person
            onClick={() => navigate('/createperson', { state: { firstName: first_name, lastName: last_name, birthday: birthday, relation: 'dad' } })}>
            {' '}
            Add Dad{' '}
          </button>
        )}
      </p>

      <p>
        Children:
        {childrenCards.length ? <p> {childrenCards} </p> : null}
        {
          <button
            style={{ margin: '2px 5px', backgroundColor: 'lightsteelblue', borderRadius: '3px' }}
            onClick={() =>
              sex === 'female'
                ? navigate('/createperson', { state: { parentFirstName: first_name, parentLastName: last_name, parentBirthday: birthday, parentSex: 'female' } })
                : navigate('/createperson', { state: { parentFirstName: first_name, parentLastName: last_name, parentBirthday: birthday, parentSex: 'male' } })
            }>
            {' '}
            Add Child{' '}
          </button>
        }
      </p>
    </div>
  );
}
