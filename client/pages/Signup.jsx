import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: '',
    family_name: '',
  });

  const [famId, setfamId] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter for incomplte entries
    if (username === '' || password === '' || family_name === '') alert('Missing username, password, or family name');

    // Create user
    const createUser = async () => {
      try {
        const res = await fetch('/user/createuser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const parsedRes = await res.json();

        // If the server returns an error, alert the user
        if (parsedRes.err) alert('Unable to create user. Please try again');
        // Otherwise, navigate to the homepage
        else {
          console.log('parsedRes', parsedRes);
          setfamId(parsedRes);
        }
      } catch {
        alert('Unable to create user. Please try again');
      }
    };

    createUser();
  };

  // When famId changes, redirect to create person passing down the famId
  useEffect(() => {
    if (famId) navigate('/createperson', { state: { id: famId } });
  });

  const { username, password, family_name } = data;
  return (
    <div>
      <h1>Treehouse</h1>
      <div id="login">
        <h3>Sign Up Today</h3>
        <form id="set-login" onSubmit={handleSubmit}>
          <label id="username-label">
            Username:
            <input type="text" name="username" value={username} onChange={handleChange} />
          </label>
          <br></br>
          <label id="password-label">
            Password:
            <input type="text" name="password" value={password} onChange={handleChange} />
          </label>
          <br></br>
          <label id="family-name-label">
            Family Name:
            <input type="text" name="family_name" value={family_name} onChange={handleChange} />
          </label>

          <input id="signup-button" type="submit" name="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
