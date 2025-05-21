import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 text-center px-4">
            <h1 className="text-9xl font-bold mb-4">404</h1>
            <h1 className="text-2xl font-bold mb-4">Halaman Tidak Ditemukan</h1>
            <p className="mb-6 text-md">
                Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
}