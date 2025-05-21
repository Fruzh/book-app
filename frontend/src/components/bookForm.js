import { useState, useEffect } from 'react';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import Modal from './modal';

export default function BookForm({ onSubmit, initialData = {}, onDelete }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [descError, setDescError] = useState('');
    const [contentError, setContentError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [imageError, setImageError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const categories = [
        'Fiksi',
        'Non-Fiksi',
        'Fantasi',
        'Misteri',
        'Romansa',
        'Sains',
        'Sejarah',
        'Biografi',
        'Teknologi',
        'Bisnis',
        'Filsafat',
        'Psikologi',
        'Anak-Anak',
        'Petualangan',
        'Horor',
    ];

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setTitle(initialData.title || '');
            setAuthor(initialData.author || '');
            setDesc(initialData.desc || '');
            setContent(initialData.content || '');
            setCategory(initialData.category || '');
            if (initialData.image) {
                setImagePreview(initialData.image);
            }
        }
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setImageError('Harap unggah file gambar');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setImageError('Gambar terlalu besar, maksimum 5MB');
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setImageError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setTitleError('');
        setAuthorError('');
        setDescError('');
        setContentError('');
        setCategoryError('');
        setImageError('');

        // Kumpulkan error dalam array sementara
        const errors = [];

        // Validasi title
        if (!title) {
            setTitleError('Judul wajib diisi');
            errors.push('Judul wajib diisi');
        } else if (title.length < 5) {
            setTitleError('Judul minimal 5 karakter');
            errors.push('Judul minimal 5 karakter');
        }

        // Validasi author
        if (!author) {
            setAuthorError('Penulis wajib diisi');
            errors.push('Penulis wajib diisi');
        } else if (author.length < 5) {
            setAuthorError('Penulis minimal 5 karakter');
            errors.push('Penulis minimal 5 karakter');
        }

        // Validasi desc
        if (!desc) {
            setDescError('Deskripsi wajib diisi');
            errors.push('Deskripsi wajib diisi');
        } else if (desc.length < 5) {
            setDescError('Deskripsi minimal 5 karakter');
            errors.push('Deskripsi minimal 5 karakter');
        }

        // Validasi content
        if (!content) {
            setContentError('Isi buku wajib diisi');
            errors.push('Isi buku wajib diisi');
        } else if (content.length < 5) {
            setContentError('Isi buku minimal 5 karakter');
            errors.push('Isi buku minimal 5 karakter');
        }

        // Validasi category
        if (!category) {
            setCategoryError('Kategori wajib dipilih');
            errors.push('Kategori wajib dipilih');
        }

        // Validasi image
        if (!image && !initialData.image) {
            setImageError('Gambar wajib diunggah');
            errors.push('Gambar wajib diunggah');
        }

        // Tampilkan notifikasi error
        if (errors.length > 0) {
            errors.forEach((error) => {
                window.dispatchEvent(
                    new CustomEvent('showNotification', {
                        detail: {
                            message: error,
                            type: 'error',
                        },
                    })
                );
            });
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('desc', desc);
        formData.append('content', content);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            await onSubmit(formData);
        } catch (error) {
            throw error;
        }
    };

    const handleDelete = async () => {
        if (!initialData.id) return;
        try {
            await onDelete();
        } catch (error) {
            throw error;
        }
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-5 mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Form Buku</h2>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="min-w-full sm:min-w-[460px]">
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">Judul Buku</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setTitleError('');
                                }}
                                placeholder="Contoh: Laskar Pelangi"
                                className={`mt-1 block w-full px-3 py-2 border ${titleError ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200 hover:bg-gray-50`}
                                aria-label="Judul buku"
                            />
                            {titleError && (
                                <p className="mt-1 text-sm text-red-600">{titleError}</p>
                            )}
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">Penulis</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => {
                                    setAuthor(e.target.value);
                                    setAuthorError('');
                                }}
                                placeholder="Contoh: Andrea Hirata"
                                className={`mt-1 block w-full px-3 py-2 border ${authorError ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200 hover:bg-gray-50`}
                                aria-label="Penulis buku"
                            />
                            {authorError && (
                                <p className="mt-1 text-sm text-red-600">{authorError}</p>
                            )}
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">Kategori</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setCategoryError('');
                                    }}
                                    className={`mt-1 block w-full px-3 py-2.5 border ${categoryError ? 'border-red-500' : 'border-gray-300'
                                        } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white appearance-none transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50 pr-10`}
                                    aria-invalid={categoryError}
                                    aria-label="Kategori buku"
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </span>
                            </div>
                            {categoryError && (
                                <p className="mt-1 text-sm text-red-600">{categoryError}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sampul Buku</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                aria-label="Unggah sampul buku"
                            />
                            {imageError && (
                                <p className="mt-1 text-sm text-red-600">{imageError}</p>
                            )}
                            {imagePreview && (
                                <div className="mt-4">
                                    <img
                                        src={imagePreview}
                                        alt="Pratinjau sampul buku"
                                        className="max-w-full h-48 object-contain rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex-1">
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">Deskripsi Buku</label>
                            <textarea
                                value={desc}
                                onChange={(e) => {
                                    setDesc(e.target.value);
                                    setDescError('');
                                }}
                                placeholder="Tuliskan ringkasan buku di sini..."
                                rows={6}
                                className={`mt-1 block w-full px-3 py-2 border ${descError ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 resize-none min-h-36 transition-all duration-200 hover:bg-gray-50`}
                                aria-label="Deskripsi buku"
                            ></textarea>
                            {descError && (
                                <p className="mt-1 text-sm text-red-600">{descError}</p>
                            )}
                        </div>

                        <label className="block text-sm font-medium text-gray-700">Isi Buku</label>
                        <textarea
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setContentError('');
                            }}
                            placeholder="Tuliskan isi buku di sini..."
                            rows={6}
                            className={`mt-1 block w-full px-3 py-2 border ${contentError ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 resize-height max-h-128 min-h-[340px] transition-colors duration-200 hover:bg-gray-50`}
                            aria-label="Isi buku"
                        ></textarea>
                        {contentError && (
                            <p className="mt-1 text-sm text-red-600">{contentError}</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 justify-between items-center pt-4 border-t">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-gray-700 bg-gray-100 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-all duration-200"
                        aria-label="Kembali ke halaman sebelumnya"
                    >
                        <ArrowLeft size={20} /> Kembali
                    </button>

                    <div className="flex gap-2">
                        {initialData.id && (
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition-all duration-200"
                                aria-label="Hapus buku"
                            >
                                <Trash2 size={18} /> Hapus
                            </button>
                        )}
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200"
                            aria-label="Simpan buku"
                        >
                            <Save size={18} /> Simpan
                        </button>
                    </div>
                </div>
            </form>

            {isModalOpen && (
                <Modal
                    title="Konfirmasi Hapus"
                    message="Apakah Anda yakin ingin menghapus buku ini?"
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}

            <style jsx>{`
                select {
                    background-image: none;
                }

                select:focus + span svg {
                    transform: rotate(180deg);
                    transition: transform 0.2s ease;
                }

                option {
                    padding: 8px;
                    background: white;
                    color: #1f2937;
                }

                option:hover {
                    background: #f3f4f6;
                }
            `}</style>
        </div>
    );
}