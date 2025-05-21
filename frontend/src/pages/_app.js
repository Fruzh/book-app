import '@/styles/globals.css';
import NotificationManager from '@/components/notificationManager';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Head from 'next/head';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
})

export default function App({ Component, pageProps }) {
    const router = useRouter()

    const title = useMemo(() => {
        const routeTitleMap = {
            '/': 'Home - Book App',
            '/about': 'About - Book App',
            '/books': 'Books - Book App',
            '/books/add': 'Add Book - Book App',
            '/books/[id]/views': 'Book Details - Book App',
            '/books/[id]': 'Edit Book - Book App',
        }

        return routeTitleMap[router.pathname] || 'Book App'
    }, [router.pathname])

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="A book management app" />
                <link rel="icon" href="/icon.png" />
            </Head>
            <div className={poppins.variable}>
                <NotificationManager />
                <Component {...pageProps} />
            </div>
        </>
    );
}