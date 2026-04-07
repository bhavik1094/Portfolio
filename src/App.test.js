import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio hero content and navigation', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /bhavik patel/i, level: 1 })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /full stack developer/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
});
