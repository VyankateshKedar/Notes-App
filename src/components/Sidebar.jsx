// src/components/Sidebar.js
import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ groups, onSelectGroup, onCreateGroup }) => {
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
      <button className="add-group-btn" onClick={onCreateGroup}>
        +
      </button>
    </div>
  );
};

export default Sidebar;
