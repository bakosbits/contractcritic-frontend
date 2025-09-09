import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = ({
        title,
        description,
        variant = "default",
        duration = 5000,
        persistent = false,
    }) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = {
            id,
            title,
            description,
            variant,
            duration,
            persistent,
            createdAt: Date.now(),
        };

        setToasts((prev) => [...prev, newToast]);

        // Auto remove after duration (unless persistent)
        if (!persistent && duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const removeAllToasts = () => {
        setToasts([]);
    };

    // Convenience methods for different toast types
    const toast = {
        success: (title, description, options = {}) =>
            addToast({
                title,
                description,
                variant: "success",
                duration: 4000,
                ...options,
            }),

        error: (title, description, options = {}) =>
            addToast({
                title,
                description,
                variant: "destructive",
                duration: 8000,
                ...options,
            }),

        warning: (title, description, options = {}) =>
            addToast({
                title,
                description,
                variant: "warning",
                duration: 6000,
                ...options,
            }),

        info: (title, description, options = {}) =>
            addToast({
                title,
                description,
                variant: "default",
                duration: 5000,
                ...options,
            }),

        loading: (title, description, options = {}) =>
            addToast({
                title,
                description,
                variant: "loading",
                persistent: true,
                ...options,
            }),

        // Generic toast function (maintains compatibility with existing code)
        default: ({ title, description, variant = "default", ...options }) =>
            addToast({ title, description, variant, ...options }),
    };

    const value = {
        toasts,
        toast,
        addToast,
        removeToast,
        removeAllToasts,
    };

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
};
