// src/App.jsx
import React, { useState } from 'react'
import PresentationList from './components/presentation/PresentationList'
import SlideDeck from './components/slidedeck/SlideDeck'
import './app.css'

export default function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Slide Decks</h1>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <PresentationList 
            onSelect={id => setSelected(id)} 
            selectedId={selected} // Added selectedId prop to highlight active presentation
          />
        </aside>

        <section className="content">
          {selected !== null ? (
            <SlideDeck presentationId={selected} />
          ) : (
            <div className="empty-state">
              Pick a deck to get started
            </div>
          )}
        </section>
      </main>
    </div>
  )
}