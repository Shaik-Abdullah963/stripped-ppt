// src/components/presentation/PresentationList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { usePresentations } from '../../hooks/presentations/usePresentations';
import Container from '../ui/container/Container';
import Typography from '../ui/typography/Typography';
import Button from '../ui/button/Button';
import styles from './PresentationList.module.css';

export default function PresentationList({ onSelect }) {
  const { data, loading, error } = usePresentations();

  return (
    <Container size="md" as="main" className={styles.presentationList}>
      <Typography variant="h2">Your Presentations</Typography>

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
          <div key={deck.id} className={styles.deckRow}>
            <Typography variant="h4">{deck.title}</Typography>
            <Button onClick={() => onSelect(deck.id)}>Open Deck</Button>
          </div>
        ))}

      {Array.isArray(data) && data.length === 0 && !loading && (
        <Typography variant="body">No presentations yet.</Typography>
      )}
    </Container>
  );
}

PresentationList.propTypes = {
  /** Called with the presentation ID when user clicks “Open Deck” */
  onSelect: PropTypes.func.isRequired,
};
