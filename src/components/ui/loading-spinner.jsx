import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
    size = "default",
    text = "Loading...",
    className = "",
}) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        default: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
    };

    return (
        <div
            className={`flex flex-col items-center justify-center space-y-4 ${className}`}
        >
            <Loader2
                className={`${sizeClasses[size]} animate-spin text-blue-600`}
            />
            {text && (
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{text}</p>
                </div>
            )}
        </div>
    );
};

export default LoadingSpinner;
