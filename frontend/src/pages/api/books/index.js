import formidable from 'formidable';
import path from 'path';
import { nanoid } from 'nanoid';
import API_BASE_URL from '@/config/api';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    console.log('API /books - Request method:', req.method);

    if (req.method === 'GET') {
        try {
            const response = await fetch(`${API_BASE_URL}/books`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Failed to fetch books:', response.status, errorData);
                return res.status(response.status).json({
                    error: errorData.message || `Gagal mengambil data buku: ${response.statusText}`,
                });
            }

            const data = await response.json();
            console.log('Fetched books:', data.data?.length || 0);
            res.status(200).json(data.data || []);
        } catch (error) {
            console.error('Error fetching books:', error.message, error.stack);
            res.status(500).json({ error: `Gagal mengambil data buku: ${error.message}` });
        }
    } else if (req.method === 'POST') {
        const form = formidable({
            uploadDir: path.join(process.cwd(), 'public/uploads'),
            keepExtensions: true,
            filename: (name, ext) => `book-${nanoid(10)}${ext}`,
            multiples: false,
        });

        try {
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

            let imagePath = null;
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const filePath = imageFile.filepath || imageFile.path;
                if (!filePath) {
                    console.error('No valid filepath found in files.image:', imageFile);
                    return res.status(400).json({ error: 'Gagal memproses gambar: Tidak ada filepath' });
                }
                imagePath = `/uploads/${path.basename(filePath)}`;
                console.log('Image saved:', { filePath, imagePath });
            } else {
                console.log('No image uploaded');
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

            const response = await fetch('http://localhost:3333/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Failed to create book:', response.status, errorData);
                return res.status(response.status).json({
                    error: errorData.message || 'Gagal menambahkan buku',
                });
            }

            const newBook = await response.json();
            console.log('Book created successfully:', newBook);
            res.status(201).json(newBook.data);
        } catch (error) {
            console.error('Error creating book:', error.message, error.stack);
            return res.status(500).json({ error: `Gagal menambahkan buku: ${error.message}` });
        }
    } else {
        console.log('Method not allowed:', req.method);
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}