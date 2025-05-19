/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import BooksController from '#controllers/books_controller'
import StudentsController from '#controllers/students_controller'

router.get('/', async () => {
  return {
    status: 'Berhasil',
    message: 'Selamat datang',
    description: 'API ini menyediakan data buku dan siswa',
    endpoint: {
      books: {
        list: '/books',
        detail: '/books/:id',
        create: '/books',
        update: '/books/:id',
        delete: '/books/:id',
        description: 'Mengelola data buku',
        fields: {
          id: 'integer, auto increment',
          category: 'string, kategori buku (contoh: Fiksi, Non-Fiksi)',
          title: 'string, judul buku',
          author: 'string, nama penulis',
          desc: 'text, deskripsi singkat',
          content: 'longtext, isi lengkap buku',
          image: 'string, path gambar sampul',
          created_at: 'timestamp, waktu dibuat',
          updated_at: 'timestamp, waktu diperbarui'
        }
      },
      students: {
        list: '/students',
        detail: '/students/:id',
        create: '/students',
        update: '/students/:id',
        delete: '/students/:id',
        description: 'Mengelola data siswa',
        fields: {
          id: 'integer, auto increment',
          name: 'string, nama lengkap siswa',
          nis: 'string, Nomor Induk Siswa (unik)',
          kelas: 'string, kelas siswa (contoh: XI SIJA 2)',
          email: 'string, email siswa (unik)',
          phone: 'string, nomor telepon',
          address: 'text, alamat lengkap',
          date_of_birth: 'date, tanggal lahir',
          profile_picture: 'string, path foto profil',
          created_at: 'timestamp, waktu dibuat',
          updated_at: 'timestamp, waktu diperbarui'
        }
      }
    }
  }
})



router.resource('/books', BooksController).apiOnly()
router.resource('/students', StudentsController).apiOnly()