import { useRouter } from 'next/router';
import { useState } from 'react';
import BookForm from '@/components/bookForm';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Loader from '@/components/loader';

export default function AddBook() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (formData) => {
        console.log('Submitting FormData:', Array.from(formData.entries()));
        try {
            setIsSaving(true);
            const res = await fetch('/api/books', {
                method: 'POST',
                body: formData,
            });

            console.log('POST response status:', res.status, 'headers:', Object.fromEntries(res.headers));
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                console.error('API error response:', errorData);
                throw new Error(errorData.error || 'Gagal menambahkan buku');
            }

            const responseData = await res.json();
            console.log('POST response data:', responseData);

            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Buku berhasil ditambahkan',
                        type: 'success',
                    },
                })
            );
            router.push('/books');
        } catch (error) {
            console.error('Error adding book:', error.message, error.stack);
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: error.message,
                        type: 'error',
                    },
                })
            );
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    if (isSaving) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center min-h-screen">
                    <Loader message="Menyimpan buku..." size="large" color="green" />
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10 min-h-[80vh]">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Tambah Buku Baru</h1>
                <BookForm onSubmit={handleSubmit} />
            </div>
            <Footer />
        </>
    );
}