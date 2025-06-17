// src/components/slidedeck/SlideDeck.jsx
import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSlides }      from '../../hooks/slides/useSlides'
import { useCreateSlide } from '../../hooks/slides/useCreateSlide'
import { useDeleteSlide } from '../../hooks/slides/useDeleteSlide'
import MarkdownEditor     from '../editor/MarkdownEditor'
import IconButton         from '../ui/iconbutton/IconButton'
import ProgressBar        from '../ui/progressbar/ProgressBar'
import Typography         from '../ui/typography/Typography'
import Button             from '../ui/button/Button'
import { useHotkeys }     from 'react-hotkeys-hook'
import styles             from './SlideDeck.module.css'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
export default function SlideDeck({ presentationId }) {
  // Use a refreshTrigger to force re-fetch when needed
  const [persistentContent, setPersistentContent] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const refresh = () => setRefreshTrigger(prev => prev + 1);
  
  const { slides, loading, error, setSlides } = useSlides(presentationId, refreshTrigger)
  const { create } = useCreateSlide()
  const { remove } = useDeleteSlide()

  const [currentIndex, setCurrentIndex]       = useState(0)
  const [editing, setEditing]                 = useState(false)
  const [currentVersion, setCurrentVersion]   = useState(null)
  const [justSavedVersion, setJustSavedVersion] = useState(null)
  // When presentation ID changes, force a complete refresh and reset state
  useEffect(() => {
    if (presentationId) {
      console.log("Presentation changed to:", presentationId);
      
      // Reset states
      setCurrentIndex(0);
      setEditing(false);
      
      
      // Force data refresh with a slight delay to ensure clean state
      const timer = setTimeout(() => {
        refresh();
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [presentationId]);

  // Navigation handlers
  const goTo  = useCallback(i => {
    if (!slides) return
    setCurrentIndex(Math.max(0, Math.min(i, slides.length - 1)))
  }, [slides])
  const next  = () => goTo(currentIndex + 1)
  const prev  = () => goTo(currentIndex - 1)
  useHotkeys('right', next, [currentIndex, slides])
  useHotkeys('left',  prev, [currentIndex, slides])
  useEffect(() => setCurrentIndex(0), [presentationId])

  // Sync currentVersion with improved null checking
    // Sync currentVersion with improved null checking
  useEffect(() => {
    if (slides?.length && currentIndex < slides.length) {
      const slide = slides[currentIndex];
      if (slide) {
        console.log("Current slide changed:", slide);
        
        // If we just saved this slide, use the saved version instead of the API data
        if (justSavedVersion && slide.id === justSavedVersion.slideId) {
          console.log("Using just saved version instead of API data");
          setCurrentVersion(justSavedVersion.version);
          // Clear the saved version so we don't use it again
          setJustSavedVersion(null);
          return;
        }
        
        // Make sure latestVersion exists, or use a default
        const version = slide.latestVersion || { content: '' };
        
        // Normalize content field
        const normalizedVersion = {
          ...version,
          content: version.content || version.markdown_content || ''
        };
        
        console.log("Setting current version to:", normalizedVersion);
        setCurrentVersion(normalizedVersion);
        setEditing(false);
      }
    }
  }, [slides, currentIndex, justSavedVersion])
  // Add slide with improved error handling
  const handleAdd = async () => {
    try {
      const newSlide = await create({ presentationId, content: '' });
      
      // Make sure the new slide has a latestVersion
      const slideWithVersion = {
        ...newSlide,
        latestVersion: newSlide.latestVersion || { content: '' }
      };
      
      // Update the slides array
      setSlides(prev => [...prev, slideWithVersion]);
      
      // Use setTimeout to ensure the state updates before changing index
      setTimeout(() => {
        if (slides) {
          // Go to the new slide
          setCurrentIndex(slides.length);
          // Enter edit mode for the new slide
          setEditing(true);
        }
      }, 0);
    } catch (err) {
      console.error('Failed to create slide:', err);
    }
  }
  
  // Delete with improved error handling
  const handleDelete = async () => {
    if (!slides?.length || currentIndex >= slides.length) return;
    
    if (!window.confirm('Are you sure you want to delete this slide?')) {
      return;
    }
    
    try {
      const id = slides[currentIndex].id;
      // Pass the presentationId that you already have as a prop
      await remove(id, presentationId);
      
      setSlides(prev => prev.filter((_, i) => i !== currentIndex));
      
      if (currentIndex > 0) {
        goTo(currentIndex - 1);
      } else if (slides.length > 1) {
        goTo(0);
      }
    } catch (err) {
      console.error('Failed to delete slide:', err);
      alert('Failed to delete slide: ' + (err.message || 'Unknown error'));
    }
  }

const handleSave = version => {
  if (!slides?.length) return;
  
  console.log("Handling save with version:", version);
  
  // Make sure version has the content property 
  const normalizedVersion = {
    ...version,
    content: version.content || version.markdown_content || ''
  };
  
  console.log("Normalized version for UI:", normalizedVersion);
  // Store content in our persistent storage by slide ID
  const slideId = slides[currentIndex].id;
  setPersistentContent(prev => ({
    ...prev,
    [slideId]: normalizedVersion.content
  }));
  
  // Update currentVersion state for immediate UI feedback
  setCurrentVersion(normalizedVersion);
   setJustSavedVersion({
    slideId: slides[currentIndex].id,
    version: normalizedVersion
  });
  // Update slides array with new version
  const updatedSlides = slides.map((s, i) => {
    if (i === currentIndex) {
      return { 
        ...s, 
        latestVersion: normalizedVersion 
      };
    }
    return s;
  });
  
  console.log("Updated slides after save:", updatedSlides);
  setSlides(updatedSlides);
  
  // Force a complete refresh after save to ensure data consistency
  setTimeout(() => {
    console.log("Triggering refresh after save");
    refresh();
  }, 300);
  
  setEditing(false);
}

  // States
  if (loading) return <Typography>Loading slides…</Typography>
  if (error)   return <Typography color="error">Error: {error.message}</Typography>
  if (!slides?.length) {
    return (
      <div className={styles['slide-deck']}>
        <div className={styles['slide-deck__controls']}>
          <Typography>No slides yet.</Typography>
          <Button onClick={handleAdd}>+ Add Slide</Button>
        </div>
      </div>
    )
  }

  const slide    = slides[currentIndex]
  const progress = ((currentIndex + 1) / slides.length) * 100

  return (
    <div className={styles['slide-deck']}>
      {/* Add / Delete */}
      <div className={styles['slide-deck__controls']}>
        <Button onClick={handleAdd}>+ Add Slide</Button>
        <Button color="error" onClick={handleDelete}>Delete Slide</Button>
      </div>

      {/* Prev / Next */}
      <div className={styles['slide-deck__nav']}>
        <IconButton onClick={prev} disabled={currentIndex === 0} aria-label="Previous">‹</IconButton>
        <Typography>{currentIndex + 1} / {slides.length}</Typography>
        <IconButton onClick={next} disabled={currentIndex === slides.length - 1} aria-label="Next">›</IconButton>
      </div>

      {/* Edit toggle */}
      <div className={styles['slide-deck__actions']}>
        <Button onClick={() => setEditing(e => !e)}>
          {editing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {/* CONTENT: either the editor or static view */}
      <div className={styles['slide-deck__content']}>
        {editing ? (
          <div style={{ border: '2px dashed hotpink', height: '100%' }}>
            <MarkdownEditor
              slideId={slide.id}
              initialContent={currentVersion?.content || ''}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
            />
          </div>
        ) : (
  <div className={styles['slide-content']}>
    {/* Enhanced debug information */}
    {/* <div style={{ fontSize: '10px', color: '#666', marginBottom: '10px' }}>
      <pre style={{ whiteSpace: 'pre-wrap', fontSize: '10px' }}>
        {JSON.stringify({
          slideId: slide?.id,
          versionId: currentVersion?.id,
          contentLength: (currentVersion?.content || '').length,
          contentPreview: (currentVersion?.content || '').substring(0, 50)
        }, null, 2)}
      </pre>
    </div> */}
    
    {/* Content display with more explicit null handling */}
<div className={styles['slide-content__text']}>
  {(currentVersion && (currentVersion.content || currentVersion.markdown_content)) || 
   persistentContent[slide?.id] ? (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {persistentContent[slide?.id] || 
       (currentVersion && (currentVersion.content || currentVersion.markdown_content)) || 
       ''}
    </ReactMarkdown>
  ) : (
    "(No content available)"
  )}
</div>

  </div>
)}
      </div>

      {/* Progress bar */}
      <div className={styles['slide-deck__progress']}>
        <ProgressBar value={progress} />
      </div>
    </div>
  )
}

SlideDeck.propTypes = {
  presentationId: PropTypes.string.isRequired,
}