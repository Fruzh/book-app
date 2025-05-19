import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('nis').unique().notNullable()
      table.string('kelas').notNullable()
      table.string('email').unique().notNullable()
      table.string('phone').notNullable()
      table.text('address').notNullable()
      table.date('date_of_birth').notNullable()
      table.string('profile_picture').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}