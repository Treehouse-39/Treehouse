import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePerson = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    familyTree: 0,
    firstName: '',
    lastName: '',
    birthday: Date.now(),
    phoneNumber: 11111111,
    email: '',
    deathDate: Date.now(),
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter for incomplte entries
    if (firstName === '' || lastName === '' || birthday === undefined)
      return alert('Required fields: First Name, Last Name, Birthday');

    // Create person
    const createPerson = async () => {
      try {
        const res = await fetch('/api/addPerson', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        // const parsedRes = await res.json();
        console.log(res);
        // If the server returns an error, alert the user
        // if (res) alert('Incorrect username/passowrd');
        // Otherwise, navigate to the homepage
        if (res.status === 200) navigate('/home');
        else alert('Required fields: First Name, Last Name, Birthday');
      } catch {
        alert('Required fields: First Name, Last Name, Birthday');
      }
    };

    createPerson();
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
  } = data;
  return (
    <div id='create-person-page'>
      <h1>Add yourself below </h1>
      <div id='create-person'>
        <form id='set-person' onSubmit={handleSubmit}>
          <label id='first-name-label'>
            First Name:
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label id='last-name-label'>
            Last Name:
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label id='birthday-label'>
            Birthday:
            <input
              type='date'
              name='birthday'
              value={birthday}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label id='phone-number-label'>
            Phone Number:
            <input
              type='tel'
              name='phoneNumber'
              value={phoneNumber}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label id='email-label'>
            Email:
            <input
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
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
            />
          </label>
          <br></br>
          <input id='login-button' type='submit' name='submit' value='Login' />
        </form>
      </div>
    </div>
  );
};

export default CreatePerson;
