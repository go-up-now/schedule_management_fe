import React, { useEffect } from 'react';

interface Props {
    setShowToast: (value: boolean) => void;
    showToast: boolean;
    icon: React.ReactNode;
    message: string;
    backgroundColor?: string;
    messageColor?: string;
    iconColor?: string;
    closeButtonColor?: string;
    autoHideDuration?: number;
}

export default function Toast({
    setShowToast,
    showToast,
    icon,
    message,
    backgroundColor = 'bg-green-500',
    messageColor = 'text-gray-500',
    iconColor = 'text-blue-500',
    closeButtonColor = 'text-white',
    autoHideDuration = 3500,
}: Props) {
    useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                setShowToast(false);
            }, autoHideDuration);
        }
    }, [showToast, autoHideDuration, setShowToast]);

    return (
        <div
            id="toast-default"
            className={`flex items-center w-full max-w-xs p-4 ${backgroundColor} rounded-lg shadow fixed bottom-5 right-5 transition-transform transition-opacity duration-500 ease-in-out ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
            role="alert"
        >
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconColor}  rounded-lg`}>
                {icon}
                <span className="sr-only">Icon</span>
            </div>
            <div className={`ms-3 text-sm font-medium ${messageColor}`}>{message}</div>
            <button
                type="button"
                className={`ms-auto -mx-1.5 -my-1.5 bg-none border-none rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 ${closeButtonColor}`}
                data-dismiss-target="#toast-default"
                aria-label="Close"
                onClick={() => setShowToast(false)}
            >
                <span className="sr-only">Close</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
    );
}
