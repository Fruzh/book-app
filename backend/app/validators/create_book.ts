import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
    vine.object({
        category: vine.string().trim().minLength(2).maxLength(100),
        title: vine.string().trim().minLength(5).maxLength(255),
        author: vine.string().trim().minLength(5).maxLength(255),
        desc: vine.string().trim().minLength(5).maxLength(500),
        content: vine.string().minLength(5).trim(),
        image: vine.string().trim().minLength(5).maxLength(255),
    })
)

export const updateBookValidator = vine.compile(
    vine.object({
        category: vine.string().trim().minLength(2).maxLength(100).optional(),
        title: vine.string().trim().minLength(5).maxLength(255).optional(),
        author: vine.string().trim().minLength(5).maxLength(255).optional(),
        desc: vine.string().trim().minLength(5).maxLength(500).optional(),
        content: vine.string().trim().minLength(5).optional(),
        image: vine.string().trim().minLength(5).maxLength(255).optional(),
    })
)

export const deleteBookValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number().positive(),
        }),
    })
)