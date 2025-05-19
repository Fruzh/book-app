import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import { BookOpen, BookText, LibraryBig, Plus } from 'lucide-react';
import Loader from '@/components/loader';

export default function Home() {
    const [books, setBooks] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetch('/api/books')
            .then((res) => res.json())
            .then((data) => setBooks(data.slice(0, 3)))
            .catch((error) => console.error('Failed to fetch books:', error));
    }, []);

    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(true);
        }, 10);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center">
                    <div className="max-w-7xl mx-auto px-6">
                        <h1
                            className={`text-5xl leading-[1.2] font-extrabold mb-4 transition-all duration-700 ease-out transform ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                                }`}
                        >
                            Katalog Buku SESPlus
                        </h1>

                        <p
                            className={`text-xl mb-8 transition-all duration-700 delay-200 ease-out transform ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                                }`}
                        >
                            Jelajahi, kelola, dan tambahkan koleksi buku favorit Anda dengan mudah.
                        </p>

                        <Link
                            href="/books"
                            className={`inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-700 delay-400 ease-out transform ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                                }`}
                        >
                            <BookOpen size={20} /> Lihat Koleksi
                        </Link>

                    </div>
                </section>

                {/* Buku Teratas */}
                <section className="max-w-4xl mx-auto px-6 py-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Buku Teratas
                    </h2>
                    {isClient && books.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                            {books.map((book, index) => (
                                <Link
                                    key={book.id}
                                    href={`/books/${book.id}/views`}
                                    className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 fade-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="aspect-square bg-gray-100 flex items-center justify-center text-blue-600 text-6xl">
                                        {book.image ? (
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <BookText size={48} />
                                        )}
                                    </div>
                                    <div className="p-5 text-center">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {book.title}
                                        </h2>
                                        <p className="text-sm text-gray-600 italic line-clamp-1">
                                            oleh {book.author}
                                        </p>
                                        {/* <p className="text-sm text-gray-500 mt-full line-clamp-2">
                                            {book.desc}
                                        </p> */}
                                    </div>
                                </Link>
                            ))}
                        </div>

                    ) : (
                        <div className="flex justify-center items-center py-12">
                            <Loader message="Memuat buku..." size="large" color="blue" />
                        </div>
                    )}
                    <div className="text-center mt-10">
                        <Link
                            href="/books"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Lihat Semua Buku
                        </Link>
                    </div>
                </section>

                {/* Fitur */}
                <section className="bg-white py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            Katalog Buku SESPlus
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div
                                className={`text-center p-6 transition-all duration-700 ease-out transform ${show ? "opacity-100 delay-100" : "opacity-0"
                                    }`}
                            >
                                <div className="flex justify-center text-blue-600 mb-4">
                                    <LibraryBig size={48} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Koleksi Lengkap
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Temukan berbagai buku dari berbagai genre dalam satu platform.
                                </p>
                            </div>

                            <div
                                className={`text-center p-6 transition-all duration-700 ease-out transform ${show ? "opacity-100 delay-200" : "opacity-0"
                                    }`}
                            >
                                <div className="flex justify-center text-blue-600 mb-4">
                                    <Plus size={48} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Mudah Dikelola
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Tambah, edit, atau hapus buku dengan antarmuka yang intuitif.
                                </p>
                            </div>

                            <div
                                className={`text-center p-6 transition-all duration-700 ease-out transform ${show ? "opacity-100 delay-300" : "opacity-0"
                                    }`}
                            >
                                <div className="flex justify-center text-blue-600 mb-4">
                                    <BookOpen size={48} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Akses Cepat
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Navigasi cepat dan responsif untuk pengalaman pengguna terbaik.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}