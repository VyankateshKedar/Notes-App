// src/components/GroupPopup.js
import React, { useState } from 'react';
import '../styles/GroupPopup.css';

const GroupPopup = ({ onClose, onCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF5722');

  const colors = [
    '#FF5722',
    '#8BC34A',
    '#FFC107',
    '#03A9F4',
    '#9C27B0',
    '#3F51B5',
  ];

  const handleCreate = () => {
    if (groupName.trim()) {
      onCreate(groupName.trim(), selectedColor);
      setGroupName('');
      setSelectedColor('#FF5722');
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>Create New Group</h3>
        <label>Group Name</label>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <label>Choose Color</label>
        <div className="color-options">
          {colors.map((color) => (
            <span
              key={color}
              className={`color-circle ${
                selectedColor === color ? 'selected' : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></span>
          ))}
        </div>
        <button className="create-btn" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default GroupPopup;
