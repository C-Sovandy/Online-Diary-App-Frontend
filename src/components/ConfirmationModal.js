import './styles/ConfirmationModal.css';
import React from 'react';
 // Import the CSS file

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div>
      {isOpen && (
        <div className="overlay">
          <div className="modal">
            <h3>Confirmation</h3>
            <p>Are you sure you want to delete this item?</p>
            <div className="button-container">
              <button className="button cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="button confirm" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmationModal;
