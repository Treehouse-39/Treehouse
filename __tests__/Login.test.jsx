import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

// Import Comonent
import Login from '../client/pages/Login';

// Mock Window Alert
global.alert = jest.fn();

test('Loads and displays Login Page', () => {
  // ARRANGE
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  // ASSERT
  expect(screen.getByText('Treehouse')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Username:' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Password:' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
});

test('Displays erorr if fields are empty', () => {
  // ARRANGE
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  // ACT
  fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  // ASSERT
  expect(global.alert).toHaveBeenCalled();
});
