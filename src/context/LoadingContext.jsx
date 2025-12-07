import React, { createContext, useState, useContext } from 'react';
import Loader from '../components/Loader';

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
    const [loadingOperations, setLoadingOperations] = useState(new Set());

    const startLoading = (key = 'default') => {
        setLoadingOperations(prev => new Set([...prev, key]));
    };

    const stopLoading = (key = 'default') => {
        setLoadingOperations(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
        });
    };

    const isLoading = (key) => {
        if (key) {
            return loadingOperations.has(key);
        }
        return loadingOperations.size > 0;
    };

    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading, isLoading }}>
            {children}
            {loadingOperations.size > 0 && (
                <Loader overlay={true} text="Loading..." size="large" />
            )}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
