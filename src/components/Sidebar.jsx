// src/components/Sidebar.js
import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { v4 as uuidv4 } from 'uuid';
import GroupPopup from './GroupPopup';

const Sidebar = ({ groups, onSelectGroup, onCreateGroup }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddGroup = () => {
    setIsPopupOpen(true);
  };

  const handleCreateGroup = (name, color) => {
    const newGroup = {
      id: uuidv4(),
      name,
      initials: generateInitials(name),
      color,
    };

    onCreateGroup(newGroup); // Notify App about the new group
    setIsPopupOpen(false);
  };

  const generateInitials = (name) => {
    const words = name.split(' ');
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    } else {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
  };

  return (
    <div className="sidebar">
      <h2>Pocket Notes</h2>
      <div className="groups-list">
        {groups.map((group) => (
          <div
            key={group.id}
            className="group-item"
            onClick={() => onSelectGroup(group)}
          >
            <span
              className="group-initials"
              style={{ backgroundColor: group.color }}
            >
              {group.initials}
            </span>
            <span className="group-name">{group.name}</span>
          </div>
        ))}
      </div>
      <button className="add-group-btn" onClick={handleAddGroup}>
        +
      </button>

      {isPopupOpen && (
        <GroupPopup
          onClose={() => setIsPopupOpen(false)}
          onCreate={handleCreateGroup}
        />
      )}
    </div>
  );
};

export default Sidebar;
