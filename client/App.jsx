import React, { Component } from 'react';
// require('dotenv').config();
// import * as dotenv from 'dotenv';

const App = () => {

  /* OAUTH 
  // Create form to request access token from Google's OAuth 2.0 server
  function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    const client_id = '';
    const redirect_uri = 'http://localhost:3000/user/google/callback';
    const scope = 'https://www.googleapis.com/auth/userinfo.email';

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
  */
 
  return (
    <p>Hello world</p>
  );
};

export default App;
