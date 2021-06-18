import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history'
import App from './App';
import { Router } from 'react-router-dom';

test('renders App', () => {
  const history = createMemoryHistory();
  const {container} = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(container).toBeInTheDocument();
});

test('renders App', () => {
  const history = createMemoryHistory();
  const {container} = render(
    <Router history={history}>
      <App />
    </Router>
  );

  // userEvent.click(screen.getByText(/home/i))
  expect(container).toBeInTheDocument();
});
