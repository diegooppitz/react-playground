import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '.';

describe('Header Component', () => {
  test('renders the header component with the title', () => {
    render(<Header />);
    expect(screen.getByText('Outlook Calendar')).toBeInTheDocument();
  });

  test('renders the new event button', () => {
    render(<Header />);
    expect(screen.getByText('New Event')).toBeInTheDocument();
  });
});