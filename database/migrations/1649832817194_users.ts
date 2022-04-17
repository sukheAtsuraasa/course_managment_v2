import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
    protected tableName = 'users'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('name').notNullable()
            table.string('email').unique().notNullable()
            table.string('password').notNullable()
            table.string('phone', 13).unique().notNullable()
            table.string('role').notNullable().checkIn(['teacher', 'student'])
            table.string('gender')
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
