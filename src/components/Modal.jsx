import './Modal.css';

export default function Modal({ children, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                {children}
            </div>
        </div>
    );
}
