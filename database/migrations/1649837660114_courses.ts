import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Courses extends BaseSchema {
    protected tableName = 'courses'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('name').unique().notNullable()

            table.string('type', 100).nullable()
            table.string('level').notNullable()
            table.integer('time_duration').notNullable()
            table.string('language').notNullable()

            table
                .integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users')

            table
                .integer('created_by_id')
                .notNullable()
                .references('id')
                .inTable('users')

            table.timestamp('created_at', { useTz: true })

            table
                .integer('deleted_by_id')
                .references('id')
                .inTable('users')
                .nullable()

            table.timestamp('deleted_at').nullable()

            table
                .integer('updated_by_id')
                .notNullable()
                .references('id')
                .inTable('users')

            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
