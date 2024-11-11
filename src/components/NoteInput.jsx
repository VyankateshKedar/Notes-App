// src/components/NoteInput.js
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import '../styles/NoteInput.css';

const NoteInput = forwardRef(({ onAddNote }, ref) => {
  const [noteText, setNoteText] = useState('');
  const textareaRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    },
  }));

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addNote();
    }
  };

  const addNote = () => {
    if (noteText.trim()) {
      onAddNote(noteText.trim());
      setNoteText('');
    }
  };

  return (
    <div className="note-input-container">
      <textarea
        ref={textareaRef}
        placeholder="Enter your text here..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        onKeyPress={handleKeyPress}
        className="note-textarea"
      />
      <button className="send-btn" onClick={addNote}>
        ➤
      </button>
    </div>
  );
});

export default NoteInput;
