import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { createBookValidator, updateBookValidator, deleteBookValidator } from '#validators/book'

export default class BooksController {
    public async index({ response }: HttpContext) {
        const books = await Book.all()
        return response.ok({
            message: 'Berhasil mengambil data buku',
            data: books,
        })
    }

    public async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createBookValidator)
        const book = await Book.create(payload)

        return response.created({
            message: 'Buku berhasil ditambahkan',
            data: book,
        })
    }

    public async show({ params, response }: HttpContext) {
        const book = await Book.find(params.id)
        if (!book) {
            return response.notFound({
                message: 'Buku tidak ditemukan',
            })
        }

        return response.ok({
            message: 'Berhasil mengambil data buku',
            data: book,
        })
    }

    public async update({ params, request, response }: HttpContext) {
        const book = await Book.find(params.id)
        if (!book) {
            return response.notFound({ message: 'Buku tidak ditemukan' })
        }

        const payload = await request.validateUsing(updateBookValidator)
        book.merge(payload)
        await book.save()

        return response.ok({
            message: 'Buku berhasil diperbarui',
            data: book,
        })
    }

    public async destroy({ request, response }: HttpContext) {
        const { params: { id } } = await request.validateUsing(deleteBookValidator)

        const book = await Book.find(id)
        if (!book) {
            return response.notFound({ message: 'Buku tidak ditemukan' })
        }

        await book.delete()
        return response.ok({
            message: 'Buku berhasil dihapus',
        })
    }
}