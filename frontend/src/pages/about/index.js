import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import { BookText, BookOpen, LibraryBig, Plus } from 'lucide-react';

export default function About() {
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
                            className={`text-5xl font-extrabold mb-4 transition-all duration-700 ease-out transform ${
                                show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                        >
                            Tentang SESPlus
                        </h1>
                        <p
                            className={`text-xl mb-8 transition-all duration-700 delay-200 ease-out transform ${
                                show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                        >
                            Membangun perpustakaan digital modern untuk pecinta buku.
                        </p>
                        <Link
                            href="/books"
                            className={`inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-700 delay-400 ease-out transform ${
                                show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                            aria-label="Jelajahi koleksi buku"
                        >
                            <BookText size={20} /> Lihat Koleksi
                        </Link>
                    </div>
                </section>

                {/* About Section */}
                <section className="max-w-7xl mx-auto px-6 py-12">
                    <h2
                        className={`text-3xl font-bold text-gray-800 mb-8 text-center transition-all duration-700 ease-out transform ${
                            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}
                    >
                        Mengenal Kami
                    </h2>
                    <div
                        className={`max-w-3xl mx-auto text-gray-600 leading-relaxed transition-all duration-700 delay-200 ease-out transform ${
                            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}
                    >
                        <p className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor et nisl ac congue. Morbi elementum quam ac purus efficitur, id efficitur dolor tempus. Mauris dolor ligula, cursus et tincidunt sit amet, finibus non nisi. Pellentesque erat elit, faucibus quis nisi viverra, bibendum congue ante
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor et nisl ac congue. Morbi elementum quam ac purus efficitur, id efficitur dolor tempus. Mauris dolor ligula, cursus et tincidunt sit amet, finibus non nisi. Pellentesque erat elit, faucibus quis nisi viverra, bibendum congue ante
                        </p>
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