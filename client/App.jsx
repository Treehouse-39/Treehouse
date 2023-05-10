import React, { Component } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import CreatePerson from './pages/CreatePerson.jsx';

const App = () => {

  const router = createHashRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: 'home',
      element: <Home />,
    },
    {
      path: 'signup',
      element: <Signup />,
    },
    {
      path: 'createperson',
      element: <CreatePerson />,
    },
  ]);

  return (
    <div id="main-content">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
