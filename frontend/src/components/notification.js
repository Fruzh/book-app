import { useEffect, useState } from 'react';

export default function Notification({ message, type, createdAt, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    const iconStyles = {
        success: 'text-green-500 bg-green-100',
        error: 'text-red-500 bg-red-100',
        warning: 'text-orange-500 bg-orange-100',
    };

    const iconSvg = {
        success: (
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
        ),
        error: (
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            </svg>
        ),
        warning: (
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>
        ),
    };

    useEffect(() => {
        console.log(`Notification mounted: ${message}, createdAt: ${createdAt}`);
        const timer = setTimeout(() => {
            setIsVisible(false);
            console.log(`Notification set invisible: ${message}`);
            setTimeout(() => {
                onClose();
                console.log(`Notification removed from DOM: ${message}`);
            }, 300);
        }, 5000);
        
        return () => {
            clearTimeout(timer);
            console.log(`Notification cleanup: ${message}`);
        };
    }, [onClose, message]);

    if (!isVisible) {
        console.log(`Notification not rendered: ${message}`);
        return null;
    }

    return (
        <div
            className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ animation: 'slideIn 0.3s ease-out' }}
            role="alert"
        >
            <div
                className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${iconStyles[type] || iconStyles.success}`}
            >
                {iconSvg[type] || iconSvg.success}
                <span className="sr-only">{type} icon</span>
            </div>
            <div className="mx-3 text-sm font-normal">{message}</div>
            <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
                onClick={() => {
                    setIsVisible(false);
                    console.log(`Notification manual close: ${message}`);
                    setTimeout(() => {
                        onClose();
                        console.log(`Notification removed from DOM (manual close): ${message}`);
                    }, 300);
                }}
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}