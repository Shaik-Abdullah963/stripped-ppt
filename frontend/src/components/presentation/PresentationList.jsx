// src/components/presentation/PresentationList.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePresentations } from '../../hooks/presentations/usePresentations';
import { useCreatePresentation } from '../../hooks/presentations/useCreatePresentation';
import { useDeletePresentation } from '../../hooks/presentations/useDeletePresentation';
import Container from '../ui/container/Container';
import Typography from '../ui/typography/Typography';
import Button from '../ui/button/Button';
import styles from './PresentationList.module.css';

export default function PresentationList({ onSelect, selectedId }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { data, loading, error } = usePresentations(refreshTrigger);
  const { create } = useCreatePresentation();
  const { remove } = useDeletePresentation();
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  
  // Re-fetch presentations when refreshTrigger changes
  
  const handleCreatePresentation = async () => {
    if (!newTitle.trim()) {
      setNewTitle('');
      return;
    }
    
    try {
      const newPresentation = await create({ title: newTitle });
      setNewTitle('');
      setCreating(false);
      // Trigger a refresh instead of using refetch
      setRefreshTrigger(prev => prev + 1);
      // Optionally auto-select the newly created presentation
      onSelect(newPresentation.id);
    } catch (err) {
      console.error('Failed to create presentation:', err);
    }
  };

  // Add this handler for deleting presentations
  const handleDeletePresentation = async (id) => {
    if (window.confirm('Are you sure you want to delete this presentation?')) {
      try {
        await remove(id);
        // Refresh the list after deletion
        setRefreshTrigger(prev => prev + 1);
      } catch (err) {
        console.error('Failed to delete presentation:', err);
      }
    }
  };

  return (
    <Container size="md" as="main" className={styles.presentationList}>
      <div className={styles.header}>
        <Typography variant="h2">Your Presentations</Typography>
        
        {!creating ? (
          <Button onClick={() => setCreating(true)}>New Presentation</Button>
        ) : (
          <div className={styles.createForm}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Presentation title"
              className={styles.titleInput}
              autoFocus
            />
            <Button onClick={handleCreatePresentation}>Create</Button>
            <Button variant="secondary" onClick={() => setCreating(false)}>Cancel</Button>
          </div>
        )}
      </div>

      {loading && (
        <Typography className={styles.loadingText}>Loading…</Typography>
      )}

      {error && (
        <Typography variant="caption" className={styles.errorText}>
          Error: {error.message}
        </Typography>
      )}

      {Array.isArray(data) && data.length > 0 &&
        data.map((deck) => (
          <div 
            key={deck.id} 
            // Add the selected class when this presentation matches the selectedId
            className={`${styles.deckRow} ${deck.id === selectedId ? styles.selectedDeck : ''}`}
          >
            <Typography variant="h4">{deck.title}</Typography>
            <div className={styles.deckButtons}>
              <Button onClick={() => onSelect(deck.id)}>Open Deck</Button>
              <Button 
                className={styles.danger} 
                onClick={() => handleDeletePresentation(deck.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}

      {Array.isArray(data) && data.length === 0 && !loading && (
        <Typography variant="body">No presentations yet.</Typography>
      )}
    </Container>
  );
}

PresentationList.propTypes = {
  /** Called with the presentation ID when user clicks "Open Deck" */
  onSelect: PropTypes.func.isRequired,
  /** ID of the currently selected presentation */
  selectedId: PropTypes.string
};