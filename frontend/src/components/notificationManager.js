import { useState, useEffect } from 'react';
import Notification from './notification';

export default function NotificationManager() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const handleNotification = (event) => {
            const { message, type } = event.detail;
            console.log('Received notification:', { message, type });
            const id = Date.now() + Math.random().toString(36).slice(2);
            const createdAt = Date.now();
            setNotifications((prev) => {
                const newNotifications = [...prev, { id, message, type, createdAt }];
                console.log('Current notifications:', newNotifications);
                return newNotifications;
            });
        };

        window.addEventListener('showNotification', handleNotification);
        return () => {
            window.removeEventListener('showNotification', handleNotification);
            setNotifications([]);
            console.log('NotificationManager cleanup: Cleared notifications and event listener');
        };
    }, []);

    const removeNotification = (id) => {
        setNotifications((prev) => {
            const updated = prev.filter((n) => n.id !== id);
            console.log(`Removed notification from state: ${id}, Remaining:`, updated);
            return updated;
        });
    };

    if (notifications.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-6 right-6 z-[1000]">
            {notifications.map((notification, index) => (
                <div
                    key={notification.id}
                    className="mb-[0px] mt-[10px]"
                >
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        createdAt={notification.createdAt}
                        onClose={() => removeNotification(notification.id)}
                    />
                </div>
            ))}
        </div>
    );
}