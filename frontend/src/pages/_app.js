import '@/styles/globals.css';
import NotificationManager from '@/components/notificationManager';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
})

export default function App({ Component, pageProps }) {
    return (
        <div className={poppins.variable}>
            <NotificationManager />
            <Component {...pageProps} />
        </div>
    );
}