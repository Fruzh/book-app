import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BookForm from '@/components/bookForm';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Loader from '@/components/loader';

export default function EditBook() {
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetch(`/api/books/${id}`, {
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(res.status === 404 ? 'Buku tidak ditemukan' : 'Gagal memuat buku');
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log('Fetched book:', data);
                    setBook(data);
                })
                .catch((err) => {
                    console.error('Failed to fetch book:', err.message, err.stack);
                    setError(err.message);
                    window.dispatchEvent(
                        new CustomEvent('showNotification', {
                            detail: {
                                message: err.message,
                                type: 'error',
                            },
                        })
                    );
                });
        }
    }, [id]);

    const handleSubmit = async (formData) => {
        console.log('Submitting FormData:', Array.from(formData.entries()));
        try {
            setIsSaving(true);
            const res = await fetch(`/api/books/${id}`, {
                method: 'PUT',
                body: formData,
            });

            console.log('PUT response status:', res.status, 'headers:', Object.fromEntries(res.headers));
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                console.error('API error response:', errorData);
                throw new Error(errorData.error || 'Gagal memperbarui buku');
            }

            const responseData = await res.json();
            console.log('PUT response data:', responseData);

            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Buku berhasil diubah',
                        type: 'success',
                    },
                })
            );
            router.push('/books');
        } catch (error) {
            console.error('Error updating book:', error.message, error.stack);
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

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const res = await fetch(`/api/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                },
            });

            console.log('DELETE response status:', res.status, 'headers:', Object.fromEntries(res.headers));
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                console.error('API error response:', errorData);
                throw new Error(errorData.error || 'Gagal menghapus buku');
            }

            const responseData = await res.json();
            console.log('DELETE response data:', responseData);

            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Buku berhasil dihapus',
                        type: 'success',
                    },
                })
            );
            router.push('/books');
        } catch (error) {
            console.error('Error deleting book:', error.message, error.stack);
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
            setIsDeleting(false);
        }
    };

    if (error) {
        return (
            <>
                <Navbar />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800">Error</h1>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={() => router.push('/books')}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                        Kembali ke Daftar Buku
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    if (!book) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center min-h-screen">
                    <Loader message="Memuat buku..." size="large" color="blue" />
                </div>
                <Footer />
            </>
        );
    }

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

    if (isDeleting) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center min-h-screen">
                    <Loader message="Menghapus buku..." size="large" color="red" />
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10 min-h-[80vh]">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Edit Buku</h1>
                <BookForm
                    initialData={book}
                    onSubmit={handleSubmit}
                    onDelete={handleDelete}
                />
            </div>
            <Footer />
        </>
    );
}