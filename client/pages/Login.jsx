import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';

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

  // Create form to request access token from Google's OAuth 2.0 server
  function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    const client_id =
      '259775907524-hfp1tbe741beir8rc9malevcfrqlmsfb.apps.googleusercontent.com';
    const redirect_uri = 'http://localhost:3000/user/google/callback';
    const scope =
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.birthday.read';

    // Parameters to pass to OAuth 2.0 endpoint.
    const params = {
      client_id: client_id,
      redirect_uri: redirect_uri,
      response_type: 'code',
      scope: scope,
      include_granted_scopes: 'true',
      // state: 'pass-through value',
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

  const { username, password } = data;
  return (
    <div id='login-page'>
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
        <button onClick={oauthSignIn}>Sign In With Google</button>
        <GoogleButton onClick={oauthSignIn} />
      </div>
    </div>
  );
};

export default Login;
