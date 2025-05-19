import vine from '@vinejs/vine'

export const createStudentValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255),
    nis: vine.string().trim().maxLength(20),
    kelas: vine.string().trim().maxLength(10),
    email: vine.string().trim().email().maxLength(255),
    phone: vine.string().trim().maxLength(20),
    address: vine.string().trim().maxLength(500),
    dateOfBirth: vine.date(),
    profilePicture: vine.string().trim().maxLength(255),
  })
)

export const updateStudentValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255).optional(),
    nis: vine.string().trim().maxLength(20).optional(),
    kelas: vine.string().trim().maxLength(10).optional(),
    email: vine.string().trim().email().maxLength(255).optional(),
    phone: vine.string().trim().maxLength(20).optional(),
    address: vine.string().trim().maxLength(500).optional(),
    dateOfBirth: vine.date().optional(),
    profilePicture: vine.string().trim().maxLength(255).optional(),
  })
)

export const showStudentValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const deleteStudentValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)