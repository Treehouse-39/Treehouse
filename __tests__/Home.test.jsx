import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

// Import Comonent
import Home from '../client/pages/Home';
import CardDetailDisplay from '../client/Components/CardDetailDisplay';

test('Loads and displays PersonCard components on Login Page', async () => {
  // Mock the browser fetch function
  window.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          people: [
            { first_name: 'testfirstname1', last_name: 'testlastname1', birthday: 'testbirthday1', id: 1 },
            { first_name: 'testfirstname2', last_name: 'testlastname2', birthday: 'testbirthday2', id: 2 },
          ],
        }),
    });
  });
  // ARRANGE
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  // ACT
  const personOne = await screen.findByText('Name: testfirstname1 testlastname1');
  const personTwo = await screen.findByText('Name: testfirstname1 testlastname1');
  // ASSERT
  expect(personOne).toBeInTheDocument();
  expect(personTwo).toBeInTheDocument();
});
