import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Course from 'App/Models/Course'
import StudentCourse from 'App/Models/StudentCourse'

export default class User extends BaseModel {
    @hasMany(() => Course)
    public courses: HasMany<typeof Course>

    @hasMany(() => StudentCourse)
    public student_courses: HasMany<typeof StudentCourse>

    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public email: string

    @column()
    public password: string

    @column()
    public phone: string

    @column()
    public role: string

    @column()
    public gender: string | null

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
