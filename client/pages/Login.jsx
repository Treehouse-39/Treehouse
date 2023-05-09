import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter for incomplte entries
    if (username === '' || password === '')
      alert('Please enter a username/password.');

    // Check login data
    const checkLogin = async () => {
      try {
        const res = await fetch('/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const parsedRes = await res.json();

        // If the server returns an error, alert the user
        if (parsedRes.err) alert('Incorrect username/passowrd');
        // Otherwise, navigate to the homepage
        else navigate('/home');
      } catch {
        alert('Incorrect username/password');
      }
    };

    checkLogin();
  };

  const { username, password } = data;
  return (
    <div>
      <h1>Treehouse</h1>
      <div id='login'>
        <h3>Login</h3>
        <form id='set-login' onSubmit={handleSubmit}>
          <label id='username-label'>
            Username:
            <input
              type='text'
              name='username'
              value={username}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label id='password-label'>
            Password:
            <input
              type='text'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <input id='login-button' type='submit' name='submit' value='Login' />
        </form>
      </div>
      <div id='signup'>
        <p>Don't have an account?</p>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
