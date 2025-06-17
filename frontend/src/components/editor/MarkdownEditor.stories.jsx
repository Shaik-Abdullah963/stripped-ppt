import React from 'react';
import MarkdownEditor from './MarkdownEditor';

export default {
  title: 'Components/MarkdownEditor',
  component: MarkdownEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export const BasicText = {
  args: {
    content: 'This is a **bold** and *italic* text in markdown.'
  }
};

export const Headings = {
  args: {
    content: `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
    `
  }
};

export const CodeBlocks = {
  args: {
    content: `
\`\`\`javascript
// This is a JavaScript code block
function greeting(name) {
  return \`Hello, \${name}!\`;
}

console.log(greeting('World'));
\`\`\`
    `
  }
};

export const ListsAndLinks = {
  args: {
    content: `
## Unordered List
- Item 1
- Item 2
  - Nested Item 2.1
  - Nested Item 2.2
- Item 3

## Ordered List
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

[Link to GitHub](https://github.com)
    `
  }
};