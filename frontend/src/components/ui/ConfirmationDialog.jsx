import { AlertTriangle, X } from 'lucide-react';
import PropTypes from 'prop-types';

const ConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
    type = 'danger',
    loading = false
}) => {
    if (!isOpen) return null;

    const typeClasses = {
        danger: 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20',
        warning: 'bg-secondary hover:bg-secondary-hover text-white shadow-secondary/20',
        info: 'bg-primary hover:bg-primary-hover text-white shadow-primary/20'
    };

    const iconColors = {
        danger: 'text-red-500',
        warning: 'text-secondary',
        info: 'text-primary'
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white border border-border w-full max-w-md rounded-2xl overflow-hidden shadow-premium animate-scale-in">
                <div className="p-6 text-center">
                    <div className={`mx-auto w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 ${iconColors[type]}`}>
                        <AlertTriangle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2 font-display">{title}</h3>
                    <p className="text-text-muted text-sm px-4">
                        {message}
                    </p>
                </div>
                <div className="p-6 bg-gray-50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-white border border-border text-text font-medium rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex-1 px-4 py-2 font-bold rounded-xl transition-all shadow-lg ${typeClasses[type]} disabled:opacity-50`}
                    >
                        {loading ? 'Processing...' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    type: PropTypes.oneOf(['danger', 'warning', 'info']),
    loading: PropTypes.bool
};

export default ConfirmationDialog;
