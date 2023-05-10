import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

// Import Component
import Signup from '../client/pages/Signup';

// Mock Window Alert
global.alert = jest.fn();

test('Loads and displays Signup Page', () => {
  // ARRANGE
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
  // ASSERT
  expect(screen.getByText('Treehouse')).toBeInTheDocument();
  expect(screen.getByText('Sign Up Today')).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Username:' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Password:' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Family Name:' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
});

test('Displays erorr if fields are empty', () => {
  // ARRANGE
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
  // ACT
  fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
  // ASSERT
  expect(global.alert).toHaveBeenCalled();
});
