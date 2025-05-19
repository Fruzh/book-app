export default function Loader({ message = 'Memuat...', size = 'medium', color = 'blue' }) {
    const sizeStyles = {
        small: 'w-6 h-6 border-2',
        medium: 'w-8 h-8 border-4',
        large: 'w-12 h-12 border-4',
    };

    const colorStyles = {
        blue: 'border-blue-500 border-t-transparent',
        green: 'border-green-500 border-t-transparent',
        red: 'border-red-500 border-t-transparent',
        gray: 'border-gray-500 border-t-transparent',
    };

    return (
        <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <div
                className={`rounded-full animate-spin transition-all duration-300 ${sizeStyles[size]} ${colorStyles[color]}`}
            ></div>
            {message && <p className="text-gray-600 text-sm md:text-base">{message}</p>}
        </div>
    );
}