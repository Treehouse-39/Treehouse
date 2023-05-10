import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CreatePerson = () => {
  const navigate = useNavigate();

  // Family ID is passed to this page through a router redirect from the signup page
  const passedState = useLocation();
  // console.log(passedState)
  // firstName, lastName, birthday, relation => of original person
  const [relation, setRelation] = useState({
    firstName: passedState.state.firstName, 
    lastName: passedState.state.lastName, 
    birthday: passedState.state.birthday, 
    relationship: passedState.state.relation, 
  });

  const [parent, setParent] = useState({
    parentFirstName: passedState.state.parentFirstName, 
    parentLastName: passedState.state.parentLastName, 
    parentBirthday: passedState.state.parentBirthday, 
    parentSex: passedState.state.parentSex
  })

  const [data, setData] = useState({
    familyTree: passedState.state.id,
    firstName: '',
    lastName: '',
    birthday: '',
    phoneNumber: 11111111,
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    sex: '',
  });


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter for incomplte entries
    if (firstName === '' || lastName === '' || birthday === null)
      return alert('Required fields: First Name, Last Name, Birthday');

    // Create person
    const createPerson = async () => {
      try {
        const res = await fetch('/api/addPerson', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        console.log(res);
        // If the response is OK, navigate to the homepage
        if (res.status === 200) navigate('/home');
        // Otherwise, alert the user to try again
        else alert('create person bad response - Required fields: First Name, Last Name, Birthday');
      } catch {
        alert('create person catch - Required fields: First Name, Last Name, Birthday');
      }
    };

    const createRelation = async () => {
      const { firstName, lastName, birthday, relationship } = relation;
      try {
        const res = await fetch(`/api/addRelation/${firstName}/${lastName}/${birthday.slice(0,10)}/${relationship}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        console.log(res);
        // If the response is OK, navigate to the homepage
        if (res.status === 200) navigate('/home');
        // // Otherwise, alert the user to try again
        // else alert('relation bad response - Required fields: First Name, Last Name, Birthday');
      } catch {
        alert('relation catch - Required fields: First Name, Last Name, Birthday');
      }
    };

    const createChild = async () => {
      console.log(parent);
      const { parentFirstName, parentLastName, parentBirthday, parentSex } = parent;
      try {
        const res = await fetch(`/api/addChild/${parentFirstName}/${parentLastName}/${parentBirthday.slice(0,10)}/${parentSex}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        console.log(res);
        // If the response is OK, navigate to the homepage
        if (res.status === 200) navigate('/home');
        // // Otherwise, alert the user to try again
        // else alert('Child issue bad response: Required fields: First Name, Last Name, Birthday');
      } catch {
        alert(' child issue catch: Required fields: First Name, Last Name, Birthday');
      }
    };

    if (relation.relationship) {
      createRelation();
    } else if (parent.parentSex) {
      createChild();
    } else {
      createPerson();
    }

  };

  const {
    firstName,
    lastName,
    birthday,
    phoneNumber,
    email,
    streetAddress,
    city,
    state,
    zipCode,
    sex,
  } = data;
  return (
    <div id='create-person-page'>
      <h2>Add yourself below! </h2>
      <div id='create-person'>
        <form id='set-person' onSubmit={handleSubmit}>
          <label id='first-name-label'>
            First Name*:
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={handleChange}
              className='inputBox'
            />
          </label>
          <br></br>
          <label id='last-name-label'>
            Last Name*:
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={handleChange}
              className='inputBox'
            />
          </label>
          <br></br>
          <label id='birthday-label'>
            Birthday*:
            <input
              type='date'
              name='birthday'
              value={birthday}
              onChange={handleChange}
              className='inputBox'
            />
          </label>
          <br></br>
          <label id='sex-label'>
            Sex*:
            <input type='text' name='sex' value={sex} onChange={handleChange}
            className='inputBox' />
          </label>
          <br></br>
          <label id='email-label'>
            Email:
            <input
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              className='inputBox'
            />
          </label>
          <br></br>
          <label id='street-address-label'>
            Street Address:
            <input
              type='text'
              name='streetAddress'
              value={streetAddress}
              onChange={handleChange}
              className='inputBox'
            />
          </label>
          <br></br>
          <label id='city-label'>
            City:
            <input
              type='text'
              name='city'
              value={city}
              onChange={handleChange}
              className='inputBox'
            />
          </label>
          <br></br>
          <label id='state-label'>
            State:
            <input
              type='text'
              name='state'
              value={state}
              onChange={handleChange}
              className='inputBox'
            />
          </label>
          <br></br>
          <label id='zip-code-label'>
            Zip Code:
            <input
              type='text'
              name='zipCode'
              value={zipCode}
              onChange={handleChange}
              className='inputBox'
            />
          </label>
          <br></br>
          <input id='login-button' type='submit' name='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
};

export default CreatePerson;
