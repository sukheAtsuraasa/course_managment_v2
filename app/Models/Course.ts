import {
    column,
    hasMany,
    HasMany,
    belongsTo,
    BelongsTo,
    BaseModel,
} from '@ioc:Adonis/Lucid/Orm'
import StudentCourse from 'App/Models/StudentCourse'
import User from 'App/Models/User'
import LogFieldsMixin from 'App/helper/LogFieldsMixin'

export default class Course extends LogFieldsMixin(BaseModel) {
    @hasMany(() => StudentCourse)
    public student_courses: HasMany<typeof StudentCourse>

    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public type: string

    @column()
    public level: string

    @column()
    public timeDuration: number

    @column()
    public language: string

    @column()
    public userId: number

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>
}
