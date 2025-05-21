import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Loader from '@/components/loader';
import { getCategoryStyles } from '@/utils/categoryStyles';

export default function BookDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`/api/books/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        setError('Buku tidak ditemukan');
                        setLoading(false);
                        return null;
                    }
                    return res.json();
                })
                .then((data) => {
                    setBook(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch book:', error);
                    setError(error.message);
                    setLoading(false);
                    window.dispatchEvent(
                        new CustomEvent('showNotification', {
                            detail: {
                                message: 'Gagal memuat buku',
                                type: 'error',
                            },
                        })
                    );
                });
        }
    }, [id]);

    if (loading) {
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

    if (error) {
        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <main className="max-w-7xl xl:w-7xl mx-auto px-4 py-8 flex-grow">
                    <h1 className="text-3xl font-bold text-gray-800">Error</h1>
                    <p className="mt-4 text-red-600">{error}</p>
                    <button
                        onClick={() => router.push('/books')}
                        className="cursor-pointer mt-20 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                        Kembali ke Daftar Buku
                    </button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 animate-fadeIn">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cover Buku */}
                        <div className="flex-shrink-0 mx-auto lg:mx-0">
                            <div className="aspect-[5/8] w-full sm:w-56 md:w-64 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                                <img
                                    src={book.image || '/default-book.png'}
                                    alt={`Sampul buku ${book.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Detail Buku */}
                        <div className="flex-1 space-y-1">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-snug">
                                {book.title}
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 italic mb-3">
                                oleh {book.author}
                            </p>
                            <span
                                className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${getCategoryStyles(
                                    book.category
                                )}`}
                            >
                                {book.category || 'Tidak ada kategori'}
                            </span>

                            <div className="prose prose-sm sm:prose-base lg:prose-lg text-gray-700 max-w-none">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-6 mb-2">
                                    Deskripsi
                                </h3>
                                <p>{book.desc || 'Tidak ada deskripsi tersedia.'}</p>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-6 mb-2">
                                    Isi Buku
                                </h3>
                                <p>{book.content || 'Tidak ada konten tersedia.'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigasi */}
                    <div className="flex justify-between items-center gap-4 mt-8">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 text-gray-700 bg-gray-100 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-all duration-200 justify-center"
                            aria-label="Kembali ke daftar buku"
                        >
                            <ArrowLeft size={20} /> Kembali
                        </button>
                        <Link
                            href={`/books/${book.id}`}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 justify-center"
                            aria-label={`Edit buku ${book.title}`}
                        >
                            <Pencil size={20} /> Edit
                        </Link>
                    </div>
                </div>

                <style jsx>{`
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
        }
    `}</style>
            </div>
            
            <Footer />
        </>
    );
}