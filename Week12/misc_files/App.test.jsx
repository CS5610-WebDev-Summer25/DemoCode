import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Blackjack title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Blackjack/i);
  expect(titleElement).toBeInTheDocument();
});
