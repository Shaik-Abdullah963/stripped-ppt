import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarkdownEditor from './MarkdownEditor';

// Mock react-markdown first (since it's an ES module)
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="react-markdown">{children}</div>
}), { virtual: true });

// Find the correct path to your Markdown component and mock it
jest.mock('../../components/markdown/Markdown', () => ({ content }) => (
  <div data-testid="markdown-preview">{content}</div>
), { virtual: true });

// Mock React Syntax Highlighter without importing it
jest.mock('react-syntax-highlighter/dist/esm/prism', () => function MockSyntaxHighlighter() {
  return <pre data-testid="code-block">Code block</pre>;
}, { virtual: true });

// Mock required plugins
jest.mock('remark-gfm', () => ({ default: jest.fn() }), { virtual: true });
jest.mock('rehype-highlight', () => ({ default: jest.fn() }), { virtual: true });

describe('MarkdownEditor Component', () => {
  test('renders editor and preview sections', () => {
    render(<MarkdownEditor value="# Test" onChange={jest.fn()} />);
    
    // Check if editor exists
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    
    // UPDATED: Look for react-markdown instead of markdown-preview
    expect(screen.getByTestId('react-markdown')).toBeInTheDocument();
    
    // Check the content in the preview
    const previewArea = screen.getByTestId('react-markdown');
    expect(previewArea).toBeInTheDocument();
  });
});