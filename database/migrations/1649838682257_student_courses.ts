import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StudentCourses extends BaseSchema {
    protected tableName = 'student_courses'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()

            table
                .integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users')

            table
                .integer('course_id')
                .notNullable()
                .references('id')
                .inTable('courses')

            table.unique(['user_id', 'course_id'])

            table
                .integer('created_by_id')
                .notNullable()
                .references('id')
                .inTable('users')

            table.timestamp('created_at', { useTz: true }).notNullable()

            table.integer('deleted_by_id').references('id').inTable('users')

            table.timestamp('deleted_at')

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
