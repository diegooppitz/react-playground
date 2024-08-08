import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MarkdownEditor from '../components/MarkdownEditor';

describe('MarkdownEditor', () => {
  it('renders textarea when showTextArea is true', () => {
    render(<MarkdownEditor newTextArea={() => {}} />);
    const textarea = screen.getByTestId('test1') as HTMLSpanElement;
    expect(screen.getByTestId('test1')).toHaveTextContent('test');
  });
});