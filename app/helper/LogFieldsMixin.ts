import { DateTime } from 'luxon'
import { column, belongsTo, BelongsTo, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import { NormalizeConstructor } from '@ioc:Adonis/Core/Helpers'

function LogFieldsMixin<TBase extends NormalizeConstructor<typeof BaseModel>>(
    Model: TBase
) {
    class LogFields extends Model {
        @column()
        public createdById: number

        @belongsTo(() => User, {
            foreignKey: 'createdById',
        })
        public createdBy: BelongsTo<typeof User>

        @column.dateTime({ autoCreate: true })
        public createdAt: DateTime

        @column()
        public deleteById: number

        @belongsTo(() => User, {
            foreignKey: 'deleteById',
        })
        public deletedBy: BelongsTo<typeof User>

        @column.dateTime()
        public deletedAt: DateTime

        @column()
        public updatedById: number

        @belongsTo(() => User, {
            foreignKey: 'updatedById',
        })
        public updatedBy: BelongsTo<typeof User>

        @column.dateTime({ autoCreate: true, autoUpdate: true })
        public updatedAt: DateTime
    }
    return LogFields
}

export default LogFieldsMixin
