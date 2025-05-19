import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare nis: string

  @column()
  declare kelas: string

  @column()
  declare email: string

  @column()
  declare phone: string

  @column()
  declare address: string

  @column.date()
  declare dateOfBirth: DateTime

  @column()
  declare profilePicture: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}