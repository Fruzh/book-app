import { useState, useEffect } from 'react';

export default function Modal({ title, message, onConfirm, onCancel }) {
    const [isEntering, setIsEntering] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        console.log('Modal mounted, starting enter animation');
        const timer = setTimeout(() => {
            setIsEntering(true);
            console.log('Modal enter animation triggered');
        }, 10);

        return () => {
            clearTimeout(timer);
            console.log('Modal unmounted, resetting animation states');
            setIsEntering(false);
            setIsExiting(false);
        };
    }, []);

    const handleCancel = () => {
        console.log('Modal cancel clicked, starting exit animation');
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            onCancel();
            console.log('Modal exit animation complete, cancelled');
        }, 300);
    };

    const handleConfirm = () => {
        console.log('Modal confirm clicked, starting exit animation');
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            onConfirm();
            console.log('Modal exit animation complete, confirmed');
        }, 300);
    };

    return (
        <div
    className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        isEntering && !isExiting
            ? 'opacity-100 backdrop-blur-sm bg-black/50'
            : 'opacity-0 backdrop-blur-none bg-black/0'
    }`}
>

            <div
                className={`bg-white p-6 rounded-lg shadow-2xl max-w-md w-full transition-all duration-300 ${
                    isEntering && !isExiting
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-4'
                }`}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}