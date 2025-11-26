import React from 'react';
import { Download, X } from 'lucide-react';

const ImageModal = ({ imageData, prompt, onClose }) => {
    if (!imageData) return null;

    const handleDownload = () => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = imageData;
        link.download = `brandsnap-${prompt?.substring(0, 30).replace(/[^a-z0-9]/gi, '-') || 'image'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={handleBackdropClick}
        >
            <div className="relative max-w-7xl max-h-full">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                    aria-label="Close"
                >
                    <X size={32} />
                </button>

                {/* Image */}
                <img
                    src={imageData}
                    alt={prompt || 'Asset'}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />

                {/* Bottom controls */}
                <div className="absolute -bottom-16 left-0 right-0 flex items-center justify-between text-white">
                    <p className="text-sm truncate max-w-md">{prompt}</p>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-blue hover:bg-blue-600 rounded-lg transition-colors"
                    >
                        <Download size={20} />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
