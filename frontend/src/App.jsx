// 

// src/App.jsx
import React, { useState } from 'react';
import PresentationList from './components/presentation/PresentationList';
import './app.css';

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Slide Decks</h1>
      </header>

      <main>
        <PresentationList onSelect={(id) => setSelected(id)} />
        {selected !== null && (
          <div className="selected-info">
            Selected deck ID: <strong>{selected}</strong>
          </div>
        )}
      </main>
    </div>
  );
}
