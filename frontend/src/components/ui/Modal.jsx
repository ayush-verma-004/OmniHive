import { X } from 'lucide-react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className={`bg-white border border-border w-full ${maxWidth} rounded-2xl overflow-hidden shadow-premium animate-scale-in`}>
                <div className="p-6 border-b border-border flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-text font-display">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-text-muted hover:text-text hover:bg-gray-100 rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    maxWidth: PropTypes.string
};

export default Modal;
