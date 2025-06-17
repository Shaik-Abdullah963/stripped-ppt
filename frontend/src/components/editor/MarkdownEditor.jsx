import React, { useState, useEffect } from 'react';
import { useSaveVersion } from '../../hooks/slides/useSaveVersion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Button from '../ui/button/Button';
import './MarkdownEditor.css';

export default function MarkdownEditor({
  slideId,
  initialContent,
  onSave,
  onCancel,
}) {
  // Define all state hooks at the top, always in the same order
  const [text, setText] = useState(initialContent || '');
  const { saveVersion, loading, error } = useSaveVersion();

  // Keep local text in sync if the slide changes out-of-band
  useEffect(() => {
    // Safe check to prevent the "cannot read properties of undefined" error
    if (initialContent !== undefined) {
      setText(initialContent);
    }
  }, [initialContent]);

  // Add after line 26 (after the useEffect hook)

// Update the handleSave function to ensure content is properly included
const handleSave = async () => {
  try {
    console.log('Saving content for slide:', slideId, 'Content length:', text.length);
    
    if (!slideId) {
      console.error('Cannot save: No slideId provided');
      return;
    }
    
    // Pass additional options needed by the backend
    const newVersion = await saveVersion(slideId, text, {
      slide_order: 1,
      layout_type: 'standard' 
    });
    
    console.log('Save response from backend:', newVersion);
    
    // Make sure the content is always accessible in the version object
    const enhancedVersion = {
      ...newVersion,
      content: text,  // Explicitly include the content
      id: newVersion.id  // Make sure ID is passed back
    };
    
    console.log('Enhanced version to pass back:', enhancedVersion);
    
    // Call the parent component's onSave with the enhanced version
    onSave(enhancedVersion);
  } catch (err) {
    console.error('Save failed:', err);
  }
};
  return (
    <div className="md-editor">
      {error && (
        <div className="md-editor__error">Error: {error.message}</div>
      )}

      <div className="md-editor__panes">
        <textarea
          className="md-editor__input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write your markdown here…"
          aria-label="Markdown source"
        />

        <div className="md-editor__preview">
          <ReactMarkdown
            children={text}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          />
        </div>
      </div>

      <div className="md-editor__actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </div>
  );
}