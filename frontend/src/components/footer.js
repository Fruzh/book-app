import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { usePathname } from "next/navigation";
import Image from 'next/image';

export default function Footer() {
    const pathname = usePathname();

    const handleClick = (e, href) => {
        if (pathname === href) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <Link href="/" onClick={(e) => handleClick(e, "/")} className="text-2xl font-bold text-blue-400">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={150}
                            height={40}
                            className="h-10 w-auto"
                        />
                    </Link>
                    <p className="mt-4 text-gray-300 text-sm">
                        Katalog Buku. Kelola dan jelajahi koleksi buku dengan mudah dan cepat.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Usefull link</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li>
                            <Link
                                href="/"
                                onClick={(e) => handleClick(e, "/")}
                                className={`transition hover:text-blue-400 ${pathname === "/" ? "text-blue-500 font-semibold" : ""}`}
                            >
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                onClick={(e) => handleClick(e, "/about")}
                                className={`transition hover:text-blue-400 ${pathname === "/about" ? "text-blue-500 font-semibold" : ""}`}
                            >
                                Tentang Kami
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/books"
                                onClick={(e) => handleClick(e, "/books")}
                                className={`transition hover:text-blue-400 ${pathname === "/books" ? "text-blue-500 font-semibold" : ""}`}
                            >
                                Daftar Buku
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/books/add"
                                onClick={(e) => handleClick(e, "/books/add")}
                                className={`transition hover:text-blue-400 ${pathname === "/books/add" ? "text-blue-500 font-semibold" : ""}`}
                            >
                                Tambah Buku
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Kontak</h3>
                    <p className="text-gray-300 text-sm">Email: example@bookapp.com</p>
                    <div className="flex gap-4 mt-4">
                        <a href="" className="text-gray-300 hover:text-blue-400 transition">
                            <Facebook size={20} />
                        </a>
                        <a href="" className="text-gray-300 hover:text-blue-400 transition">
                            <Twitter size={20} />
                        </a>
                        <a href="" className="text-gray-300 hover:text-blue-400 transition">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-6 text-center">
                <p className="text-sm text-gray-400">
                    © 2025 Fauzan Hafizh Ahmad.
                </p>
            </div>
        </footer>
    );
}