import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Student from '#models/student'
import { createStudentValidator, updateStudentValidator, showStudentValidator, deleteStudentValidator } from '#validators/student'

export default class StudentsController {
    public async index({ response }: HttpContext) {
        const students = await Student.all()
        return response.ok({
            message: 'Berhasil mengambil data siswa',
            data: students,
        })
    }

    public async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createStudentValidator)

        const existingNis = await Student.query().where('nis', payload.nis).first()
        if (existingNis) {
            return response.conflict({ message: 'NIS sudah digunakan' })
        }

        const existingEmail = await Student.query().where('email', payload.email).first()
        if (existingEmail) {
            return response.conflict({ message: 'Email sudah digunakan' })
        }

        const transformedPayload = {
            ...payload,
            dateOfBirth: DateTime.fromJSDate(payload.dateOfBirth),
        }

        const student = await Student.create(transformedPayload)

        return response.created({
            message: 'Siswa berhasil ditambahkan',
            data: student,
        })
    }

    public async show({ params, response }: HttpContext) {
        const { params: { id } } = await params.validateUsing(showStudentValidator)

        const student = await Student.find(id)
        if (!student) {
            return response.notFound({ message: 'Siswa tidak ditemukan' })
        }

        return response.ok({
            message: 'Berhasil mengambil data siswa',
            data: student,
        })
    }

    public async update({ params, request, response }: HttpContext) {
        const { params: { id } } = await params.validateUsing(showStudentValidator)
        const payload = await request.validateUsing(updateStudentValidator)

        const student = await Student.find(id)
        if (!student) {
            return response.notFound({ message: 'Siswa tidak ditemukan' })
        }

        if (payload.nis) {
            const existingNis = await Student.query()
                .where('nis', payload.nis)
                .whereNot('id', id)
                .first()
            if (existingNis) {
                return response.conflict({ message: 'NIS sudah digunakan' })
            }
        }

        if (payload.email) {
            const existingEmail = await Student.query()
                .where('email', payload.email)
                .whereNot('id', id)
                .first()
            if (existingEmail) {
                return response.conflict({ message: 'Email sudah digunakan' })
            }
        }

        const transformedPayload = {
            ...payload,
            dateOfBirth: payload.dateOfBirth ? DateTime.fromJSDate(payload.dateOfBirth) : undefined,
        }

        student.merge(transformedPayload)
        await student.save()

        return response.ok({
            message: 'Siswa berhasil diperbarui',
            data: student,
        })
    }

    public async destroy({ params, response }: HttpContext) {
        const { params: { id } } = await params.validateUsing(deleteStudentValidator)

        const student = await Student.find(id)
        if (!student) {
            return response.notFound({ message: 'Siswa tidak ditemukan' })
        }

        await student.delete()
        return response.ok({
            message: 'Siswa berhasil dihapus',
        })
    }
}