import React from 'react';
import ReactDOM from 'react-dom';
import '../../assets/styles/Model.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <div
            className="modal-backdrop"
            onClick={handleBackdropClick}
        >
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="modal-close-button">
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
