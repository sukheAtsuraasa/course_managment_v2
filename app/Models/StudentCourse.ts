import { column, belongsTo, BelongsTo, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Course from './Course'
import User from 'App/Models/Course'
import LogFieldsMixin from 'App/helper/LogFieldsMixin'

export default class StudentCourse extends LogFieldsMixin(BaseModel) {
    @column({ isPrimary: true })
    public id: number

    @column()
    public userId: number

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @column()
    public courseId: number

    @belongsTo(() => Course)
    public courses: BelongsTo<typeof Course>
}
