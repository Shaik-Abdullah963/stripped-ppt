import React from 'react';
import { http } from 'msw';
import SlideDeck from './SlideDeck';

export default {
  title: 'Components/SlideDeck',
  component: SlideDeck,
  parameters: {
    layout: 'fullscreen',
  },
};

// MSW handlers to mock API responses - FIXED PATH
const defaultHandlers = [
  http.get('/presentations/:presentationId/slides', ({ params }) => {
    // New format for MSW v2
    return new Response(
      JSON.stringify([
        { 
          id: 1, 
          latestVersion: { 
            id: 101, 
            markdown_content: '# Title Slide\n\nPresentation by John Doe', 
            layout_type: 'title' 
          } 
        },
        { 
          id: 2, 
          latestVersion: { 
            id: 102, 
            markdown_content: '# Content Slide\n\n- Point 1\n- Point 2\n- Point 3', 
            layout_type: 'content' 
          } 
        },
        { 
          id: 3, 
          latestVersion: { 
            id: 103, 
            markdown_content: '# Thank You\n\nAny questions?', 
            layout_type: 'title' 
          } 
        }
      ]),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  })
];

// Update remaining story handlers accordingly
export const Default = {
  args: {
    presentationId: '1'
  },
  parameters: {
    msw: {
      handlers: defaultHandlers
    }
  }
};

// Also update these handlers:
export const LoadingState = {
  args: {
    presentationId: '1'
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/presentations/:presentationId/slides', () => {
          // Add delay effect
          return new Response(
            JSON.stringify([]),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
      ]
    }
  }
};

// And similarly update the other story handlers...