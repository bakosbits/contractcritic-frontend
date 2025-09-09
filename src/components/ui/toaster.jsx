import React from "react";
import {
    X,
    CheckCircle,
    AlertCircle,
    AlertTriangle,
    Info,
    Loader2,
} from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { Button } from "@/components/ui/button";

const ToastVariantStyles = {
    default: "bg-white border-gray-200 text-gray-900",
    success: "bg-green-50 border-green-200 text-green-900",
    destructive: "bg-red-50 border-red-200 text-red-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
    loading: "bg-blue-50 border-blue-200 text-blue-900",
};

const ToastIcons = {
    default: Info,
    success: CheckCircle,
    destructive: AlertCircle,
    warning: AlertTriangle,
    loading: Loader2,
};

const ToastIconColors = {
    default: "text-blue-500",
    success: "text-green-500",
    destructive: "text-red-500",
    warning: "text-yellow-500",
    loading: "text-blue-500",
};

const Toast = ({ toast, onDismiss }) => {
    const Icon = ToastIcons[toast.variant] || ToastIcons.default;
    const iconColor = ToastIconColors[toast.variant] || ToastIconColors.default;
    const variantStyles =
        ToastVariantStyles[toast.variant] || ToastVariantStyles.default;

    return (
        <div
            className={`
                ${variantStyles}
                border rounded-lg shadow-lg p-4 mb-3 max-w-sm w-full
                transform transition-all duration-300 ease-in-out
                animate-in slide-in-from-right-full
            `}
        >
            <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${iconColor}`}>
                    <Icon
                        className={`w-5 h-5 ${toast.variant === "loading" ? "animate-spin" : ""}`}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    {toast.title && (
                        <h4 className="text-sm font-semibold mb-1">
                            {toast.title}
                        </h4>
                    )}
                    {toast.description && (
                        <p className="text-sm opacity-90">
                            {toast.description}
                        </p>
                    )}
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDismiss(toast.id)}
                    className="flex-shrink-0 h-6 w-6 p-0 hover:bg-gray-100"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export function Toaster() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2 max-h-screen overflow-hidden">
            <div className="flex flex-col space-y-2 max-h-96 overflow-y-auto">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onDismiss={removeToast}
                    />
                ))}
            </div>
        </div>
    );
}

export default Toaster;
