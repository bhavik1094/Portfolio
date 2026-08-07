import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio hero content and navigation', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /building scalable saas products/i, level: 1 })
  ).toBeInTheDocument();
  expect(screen.getAllByText(/bhavik patel/i).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /contact/i }).length).toBeGreaterThan(0);
});
