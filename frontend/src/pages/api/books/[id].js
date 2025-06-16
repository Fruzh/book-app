import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import { nanoid } from 'nanoid';
import API_BASE_URL from '@/config/api';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const { id } = req.query;

    console.log('API /books/[id] - Request method:', req.method, 'ID:', id);

    if (req.method === 'GET') {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Failed to fetch book:', response.status, errorData);
                return res.status(response.status).json({ error: errorData.message || 'Buku tidak ditemukan' });
            }

            const data = await response.json();
            console.log('Fetched book:', data.data);
            return res.status(200).json(data.data);
        } catch (error) {
            console.error('Error fetching book:', error.message, error.stack);
            return res.status(500).json({ error: `Gagal mengambil buku: ${error.message}` });
        }
    }

    if (req.method === 'PUT') {
        const form = formidable({
            uploadDir: path.join(process.cwd(), 'public/uploads'),
            keepExtensions: true,
            filename: (name, ext) => `book-${nanoid(10)}${ext}`,
            multiples: false,
        });

        try {
            // Fetch the current book to get the existing image path
            const bookResponse = await fetch(`http://localhost:3333/books/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            let currentImagePath = null;
            if (bookResponse.ok) {
                const bookData = await bookResponse.json();
                currentImagePath = bookData.data?.image;
                console.log('Current book image path:', currentImagePath);
            } else {
                console.warn('Failed to fetch current book data:', bookResponse.status);
            }

            // Parse the incoming FormData
            const { fields, files } = await new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    resolve({ fields, files });
                });
            });

            console.log('Parsed FormData fields:', fields);
            console.log('Parsed FormData files:', files);

            const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
            const author = Array.isArray(fields.author) ? fields.author[0] : fields.author;
            const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
            const desc = Array.isArray(fields.desc) ? fields.desc[0] : fields.desc;
            const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;

            if (!title || !author || !category || !desc || !content) {
                console.log('Missing required fields:', { title, author, category, desc, content });
                return res.status(400).json({ error: 'Semua field wajib diisi' });
            }

            let imagePath = currentImagePath; // Keep existing image path by default
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const filePath = imageFile.filepath || imageFile.path;
                if (!filePath) {
                    console.error('No valid filepath found in files.image:', imageFile);
                    return res.status(400).json({ error: 'Gagal memproses gambar: Tidak ada filepath' });
                }

                // Delete the old image if it exists
                if (currentImagePath) {
                    const oldImageFullPath = path.join(process.cwd(), 'public', currentImagePath);
                    try {
                        await fs.promises.unlink(oldImageFullPath);
                        console.log('Deleted old image:', oldImageFullPath);
                    } catch (err) {
                        console.warn('Failed to delete old image:', oldImageFullPath, err.message);
                        // Continue even if deletion fails (e.g., file doesn't exist)
                    }
                }

                imagePath = `/uploads/${path.basename(filePath)}`;
                console.log('New image saved:', { filePath, imagePath });
            } else {
                console.log('No new image uploaded, keeping existing image:', imagePath);
            }

            const jsonData = {
                title,
                author,
                category,
                desc,
                content,
                image: imagePath,
            };
            console.log('Sending JSON to backend:', jsonData);

            const response = await fetch(`http://localhost:3333/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Failed to update book:', response.status, errorData);
                return res.status(response.status).json({
                    error: errorData.message || 'Gagal memperbarui buku',
                });
            }

            const updatedBook = await response.json();
            console.log('Book updated successfully:', updatedBook);
            return res.status(200).json(updatedBook.data);
        } catch (error) {
            console.error('Error updating book:', error.message, error.stack);
            return res.status(500).json({ error: `Gagal memperbarui buku: ${error.message}` });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const response = await fetch(`http://localhost:3333/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Failed to delete book:', response.status, errorData);
                return res.status(response.status).json({ error: errorData.message || 'Buku tidak ditemukan' });
            }

            const data = await response.json();
            console.log('Book deleted successfully:', data);
            return res.status(200).json({ message: data.message || 'Buku berhasil dihapus' });
        } catch (error) {
            console.error('Error deleting book:', error.message, error.stack);
            return res.status(500).json({ error: `Gagal menghapus buku: ${error.message}` });
        }
    }

    console.log('Method not allowed:', req.method);
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}