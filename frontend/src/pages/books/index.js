import { useEffect, useState, useRef, useMemo } from 'react';
import { BookText, Pencil, Trash, Plus, Search, X } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Loader from '@/components/loader';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Modal from '@/components/modal';
import { getCategoryStyles } from '@/utils/categoryStyles';

function levenshteinDistance(a, b) {
    const matrix = Array(b.length + 1)
        .fill(null)
        .map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,
                matrix[j - 1][i] + 1,
                matrix[j - 1][i - 1] + indicator
            );
        }
    }

    return matrix[b.length][a.length];
}

function isRepetitiveWord(word) {
    return /^(.)\1*$/.test(word) && word.length < 3;
}

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [visible, setVisible] = useState(8);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookIdToDelete, setBookIdToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { ref: loaderRef, inView: loaderInView } = useInView({ threshold: 1 });
    const cardRefs = useRef([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const inputRef = useRef(null);

    const categories = [
        'Semua Kategori',
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
        'Horor'
    ];

    function normalizeString(str) {
        return (str || '').toLowerCase().trim().replace(/[^\w\s]/gi, '');
    }

    function getMatchScore(query, text) {
        const normalizedQuery = normalizeString(query);
        const normalizedText = normalizeString(text);

        if (!normalizedText || !normalizedQuery) return 0;

        if (normalizedText === normalizedQuery) return 100;
        if (normalizedText.includes(normalizedQuery)) return 60;
        if (normalizedText.startsWith(normalizedQuery)) return 50;

        const words = normalizedText.split(/\s+/);
        if (words.some(word => word.startsWith(normalizedQuery))) return 40;

        const distances = words.map(word => levenshteinDistance(normalizedQuery, word));
        const minDistance = Math.min(...distances);
        if (minDistance <= 1) return 30;
        if (minDistance === 2) return 20;

        return 0;
    }

    const filteredBooks = useMemo(() => {
        if (!books.length) return [];

        let result = selectedCategory !== 'Semua Kategori'
            ? books.filter(book => book.category === selectedCategory)
            : [...books];

        const keywords = normalizeString(searchQuery).split(/\s+/).filter(k => k.length >= 3);

        if (!keywords.length || keywords.every(isRepetitiveWord)) return result;

        const scored = result.map(book => {
            const fields = [book.title, book.author, book.category];
            let score = 0;

            keywords.forEach(keyword => {
                fields.forEach(field => {
                    score += getMatchScore(keyword, field);
                });
            });

            return { book, score };
        });

        return scored
            .filter(s => s.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(s => s.book);
    }, [books, selectedCategory, searchQuery]);

    const liveSuggestions = useMemo(() => {
        return searchQuery.length >= 3
            ? filteredBooks.slice(0, 7)
            : [];
    }, [filteredBooks, searchQuery]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!dropdownOpen) return;

            const currentIndex = categories.indexOf(selectedCategory);
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    setSelectedCategory(categories[(currentIndex + 1) % categories.length]);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    setSelectedCategory(categories[(currentIndex - 1 + categories.length) % categories.length]);
                    break;
                case 'Enter':
                case 'Escape':
                    event.preventDefault();
                    setDropdownOpen(false);
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [dropdownOpen, selectedCategory]);

    useEffect(() => {
        fetch('/api/books')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch books');
                return res.json();
            })
            .then((data) => {
                setBooks(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch books:', error);
                setError('Gagal memuat buku');
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
    }, []);

    useEffect(() => {
        if (loaderInView && visible < filteredBooks.length) {
            setVisible((prev) => Math.min(prev + 8, filteredBooks.length));
        }
    }, [loaderInView, filteredBooks.length]);

    useEffect(() => {
        const updateCardHeights = () => {
            const cards = cardRefs.current.filter((ref) => ref);
            const rows = {};

            cards.forEach((card) => {
                const top = card.getBoundingClientRect().top;
                const roundedTop = Math.round(top);
                if (!rows[roundedTop]) rows[roundedTop] = [];
                rows[roundedTop].push(card);
            });

            cards.forEach((card) => {
                card.style.minHeight = 'auto';
            });

            Object.values(rows).forEach((rowCards) => {
                const maxHeight = Math.max(...rowCards.map((card) => card.getBoundingClientRect().height));
                rowCards.forEach((card) => {
                    card.style.minHeight = `${maxHeight}px`;
                });
            });
        };

        let allImages = Array.from(document.querySelectorAll('img'));
        let loadedCount = 0;

        const checkAndUpdate = () => {
            loadedCount++;
            if (loadedCount === allImages.length) {
                updateCardHeights();
            }
        };

        if (filteredBooks.length > 0) {
            if (allImages.length === 0) {
                updateCardHeights();
            } else {
                allImages.forEach((img) => {
                    if (img.complete) {
                        checkAndUpdate();
                    } else {
                        img.addEventListener('load', checkAndUpdate);
                        img.addEventListener('error', checkAndUpdate);
                    }
                });
            }

            window.addEventListener('resize', updateCardHeights);
            return () => window.removeEventListener('resize', updateCardHeights);
        }
    }, [filteredBooks, visible]);

    const deleteBook = async (id) => {
        try {
            const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete book');
            setBooks(books.filter((b) => b.id !== id));
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Buku berhasil dihapus',
                        type: 'success',
                    },
                })
            );
        } catch (error) {
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Gagal menghapus buku',
                        type: 'error',
                    },
                })
            );
            throw error;
        }
    };

    const handleDeleteClick = (id) => {
        setBookIdToDelete(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (bookIdToDelete) {
            await deleteBook(bookIdToDelete);
            setIsModalOpen(false);
            setBookIdToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setBookIdToDelete(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setVisible(8);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setVisible(8);
        inputRef.current.focus();
    };

    if (error) {
        return (
            <>
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Koleksi Buku</h1>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Coba Lagi
                    </button>
                </div>
                <Footer />
            </>
        );
    }

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

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10 min-h-[80vh]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Koleksi Buku</h1>

                    <div className="flex flex-col lg:flex-row gap-2 w-full sm:w-auto">
                        {/* Search Input */}
                        <div className="relative w-full lg:w-80">
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => {
                                    if (searchQuery.length >= 3 && !isRepetitiveWord(searchQuery)) {
                                        setShowSuggestions(true);
                                    }
                                }}
                                onBlur={() => {
                                    setTimeout(() => setShowSuggestions(false), 150);
                                }}
                                placeholder="Cari judul, penulis, atau kategori..."
                                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 shadow-sm text-gray-800 bg-white hover:bg-gray-50 outline-none transition"
                            />

                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            {searchQuery && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 outline-none"
                                    aria-label="Hapus pencarian"
                                >
                                    <X size={20} />
                                </button>
                            )}

                            {/* Live Suggestions */}
                            {showSuggestions && liveSuggestions.length > 0 && (
                                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                                    {liveSuggestions.map((book, idx) => (
                                        <li
                                            key={idx}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                                            onClick={() => {
                                                setSearchQuery(book.title);
                                                setShowSuggestions(false);
                                                inputRef.current?.blur();
                                            }}
                                        >
                                            {book.title} <span className="text-gray-400">– {book.author}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Dropdown dan Tambah Buku */}
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            {/* Dropdown Kategori */}
                            <div className="relative w-full sm:w-48" ref={dropdownRef}>
                                <button
                                    ref={buttonRef}
                                    type="button"
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm bg-white text-gray-800 hover:bg-gray-50 transition"
                                    aria-haspopup="listbox"
                                    aria-expanded={dropdownOpen}
                                    aria-label="Pilih kategori buku"
                                >
                                    <span className="truncate">{selectedCategory}</span>
                                    <svg
                                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {dropdownOpen && (
                                    <ul
                                        className="absolute mt-1 z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                                        role="listbox"
                                        aria-activedescendant={selectedCategory}
                                    >
                                        {categories.map((cat) => (
                                            <li
                                                key={cat}
                                                onClick={() => {
                                                    setSelectedCategory(cat);
                                                    setDropdownOpen(false);
                                                    setVisible(8);
                                                }}
                                                className={`px-4 py-2 text-sm text-black cursor-pointer hover:bg-blue-100 transition ${selectedCategory === cat ? 'bg-blue-200 font-semibold' : ''
                                                    }`}
                                                role="option"
                                                aria-selected={selectedCategory === cat}
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        setSelectedCategory(cat);
                                                        setDropdownOpen(false);
                                                        setVisible(8);
                                                    }
                                                }}
                                            >
                                                {cat}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Tombol Tambah Buku */}
                            <Link
                                href="/books/add"
                                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700  transition shadow-sm"
                                aria-label="Tambah buku baru"
                            >
                                <Plus size={20} /> Tambah Buku
                            </Link>
                        </div>
                    </div>
                </div>


                {filteredBooks.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg min-h-screen flex items-center justify-center">
                        Tidak ada buku tersedia untuk kriteria ini.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {filteredBooks.slice(0, visible).map((b, i) => {
                            const batchIndex = i % 16;
                            const delay = batchIndex * 100;

                            return (
                                <Link
                                    key={b.id}
                                    href={`/books/${b.id}/views`}
                                    aria-label={`Lihat detail buku ${b.title}`}
                                >
                                    <div
                                        ref={(el) => (cardRefs.current[i] = el)}
                                        className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl pb-6 flex flex-col text-center items-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-102 animate-fadeIn min-w-[200px]"
                                        style={{
                                            animationDelay: `${delay}ms`,
                                            animationFillMode: 'both',
                                        }}
                                    >
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`text-sm font-medium px-3 py-0.5 rounded-full shadow-lg ${getCategoryStyles(
                                                    b.category
                                                )}`}
                                            >
                                                {b.category || 'Tidak ada kategori'}
                                            </span>
                                        </div>
                                        <img
                                            src={b.image || "/default-book.png"}
                                            alt={b.title}
                                            className="w-full aspect-[7/8] object-cover rounded-t-xl mb-4 shadow"
                                        />

                                        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 px-3">
                                            {b.title}
                                        </h2>
                                        <p className="text-sm text-gray-600 mb-4 italic line-clamp-1 px-3">
                                            oleh {b.author}
                                        </p>
                                        <div className="flex gap-3 mt-auto">
                                            <Link
                                                href={`/books/${b.id}`}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1 transition-colors duration-200"
                                                onClick={(e) => e.stopPropagation()}
                                                aria-label={`Edit buku ${b.title}`}
                                            >
                                                <Pencil size={18} />
                                                <span className="hidden sm:inline">Edit</span>
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleDeleteClick(b.id);
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1 transition-colors duration-200"
                                                aria-label={`Hapus buku ${b.title}`}
                                            >
                                                <Trash size={18} />
                                                <span className="hidden sm:inline">Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {visible < filteredBooks.length && (
                    <div ref={loaderRef} className="mt-10">
                        <Loader message="Memuat lebih banyak buku..." size="medium" color="blue" />
                    </div>
                )}

                {isModalOpen && (
                    <Modal
                        title="Konfirmasi Hapus"
                        message="Apakah Anda yakin ingin menghapus buku ini?"
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                    />
                )}

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
            <Footer />
        </>
    );
}