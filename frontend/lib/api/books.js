export async function getBooks() {
    const res = await fetch('/api/books')
    if (!res.ok) throw new Error('Gagal mengambil buku')
    return res.json()
}

export async function getBook(id) {
    const res = await fetch(`/api/books/${id}`)
    if (!res.ok) throw new Error('Buku tidak ditemukan')
    return res.json()
}

export async function createBook(title, author) {
    const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author }),
    })
    if (!res.ok) throw new Error('Gagal Menambahkan buku')
    return res.json()
}

export async function updateBook(id, title, author) {
    const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author }),
    })
    if (!res.ok) throw new Error('Gagal Mengupdate buku')
    return res.json()
}

export async function deleteBook(id) {
    const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error('Gagal menghapus buku')
    return res.json()
}