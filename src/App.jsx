// src/App.js
import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import NoteInput from './components/NoteInput';
import './styles/App.css';
import main from './assets/main.png';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './hooks/useLocalStorage';
import GroupPopup from './components/GroupPopup';

const App = () => {
  const [groups, setGroups] = useLocalStorage('groups', []);
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Controls visibility of sidebar on mobile
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Controls visibility of group creation popup
  const noteInputRef = useRef(null);

  // Handle adding a new note
  const handleAddNote = (noteText) => {
    if (selectedGroup) {
      const newNote = {
        id: uuidv4(),
        text: noteText,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        groupId: selectedGroup.id,
      };

      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
  };

  // Handle selecting a group
  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setIsSidebarVisible(false); // Hide sidebar and show main content on mobile
    if (noteInputRef.current) {
      noteInputRef.current.focus();
    }
  };

  // Handle creating a new group
  const handleCreateGroup = (groupName, color) => {
    const newGroup = {
      id: uuidv4(),
      name: groupName,
      color: color,
      initials: groupName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase(),
    };

    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setIsPopupOpen(false); // Close popup after group creation
  };

  // Handle returning to the sidebar view
  const handleBackToSidebar = () => {
    setIsSidebarVisible(true);
    setSelectedGroup(null);
  };

  // Handle opening the popup to create a new group
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="app">
      {/* Sidebar visibility controlled by isSidebarVisible */}
      <div className={`sidebar ${isSidebarVisible ? '' : 'hide'}`}>
        <Sidebar
          groups={groups}
          onSelectGroup={handleSelectGroup}
          onCreateGroup={handleOpenPopup} // Open popup when "+" button is clicked
        />
      </div>

      {/* Main content visibility controlled by isSidebarVisible */}
      <div className={`main-content ${isSidebarVisible ? '' : 'active'}`}>
        {selectedGroup ? (
          <div className="group-content">
            {/* Header section with back button and group title */}
            <div className="group-header">
              <button className="back-btn" onClick={handleBackToSidebar}>←</button>
              <div className="group-initials-header" style={{ backgroundColor: selectedGroup.color }}>
                {selectedGroup.initials}
              </div>
              <h2 className="group-title-header">{selectedGroup.name}</h2>
            </div>

            {/* Notes list */}
            <div className="notes-list">
              {notes
                .filter((note) => note.groupId === selectedGroup.id)
                .map((note) => (
                  <div key={note.id} className="note-item">
                    <p>{note.text}</p>
                    <small>
                      {note.date} • {note.time}
                    </small>
                  </div>
                ))}
            </div>

            {/* Input area at the bottom */}
            <NoteInput ref={noteInputRef} onAddNote={handleAddNote} />
          </div>
        ) : (
          <div className="welcome-section">
            <img
              src={main}
              alt="Pocket Notes Illustration"
              className="welcome-image"
            />
            <h2>Pocket Notes</h2>
            <p>
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
            <footer>🔒 end-to-end encrypted</footer>
          </div>
        )}
      </div>

      {/* Group creation popup, rendered when isPopupOpen is true */}
      {isPopupOpen && (
        <GroupPopup
          onClose={handleClosePopup}
          onCreate={handleCreateGroup}
        />
      )}
    </div>
  );
};

export default App;
