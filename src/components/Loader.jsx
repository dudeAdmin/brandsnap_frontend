import React from 'react';

const Loader = ({ 
    size = 'medium', 
    overlay = false, 
    text = '', 
    inline = false 
}) => {
    const sizeClasses = {
        small: 'w-4 h-4 border-2',
        medium: 'w-8 h-8 border-3',
        large: 'w-12 h-12 border-4'
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                className={`${sizeClasses[size]} border-brand-blue border-t-transparent rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            />
            {text && (
                <p className="text-sm text-gray-600 font-medium animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );

    if (inline) {
        return spinner;
    }

    if (overlay) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                <div className="bg-white rounded-lg p-8 shadow-2xl">
                    {spinner}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-8">
            {spinner}
        </div>
    );
};

export default Loader;
