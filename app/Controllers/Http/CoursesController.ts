import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import CourseValidator from 'App/Validators/CourseValidator'

export default class CoursesController {
    public async index({ response }: HttpContextContract) {
        try {
            const user = await Course.query().select(
                'id',
                'name',
                'type',
                'level',
                'time_duration',
                'language',
                'created_by_id'
            )
            return user
        } catch (error) {
            response.badRequest(error)
        }
    }

    public async store({ request }: HttpContextContract) {
        const payload = await request.validate(CourseValidator)

        const data = {
            name: payload.name,
            type: payload.type,
            level: payload.level,
            timeDuration: payload.time_duration,
            language: payload.language,
            userId: 4,
            createdById: 4,
            updatedById: 4,
        }

        const course = await Course.create(data)

        const _response: Record<string, Record<string, string | number>> = {
            data: {
                name: course.name,
                type: course.type,
                level: course.level,
                time_duration: course.timeDuration,
                language: course.language,
            },
        }

        return _response
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const id = params.id
            const course = await Course.findOrFail(id)
            const _response = {
                data: {
                    id: course.id,
                    name: course.name,
                    type: course.type,
                    level: course.level,
                    time_duration: course.timeDuration,
                    language: course.language,
                    created_by_id: course.createdById,
                },
            }
            return _response
        } catch (error) {
            // console.log(error)
            response.badRequest({
                message: 'User not found',
            })
        }
    }

    public async update({ request, response, params }: HttpContextContract) {
        try {
            const id = params.id
            const payload = await request.validate(CourseValidator)

            const data = {
                name: payload.name,
                type: payload.type,
                level: payload.level,
                timeDuration: payload.time_duration,
                language: payload.language,
                updatedById: 4,
            }

            await Course.query().where('id', id).update(data)
            return {
                message: 'Course Updated Successfully',
            }
        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    public async destroy({ response, params }: HttpContextContract) {
        try {
            const id = params.id
            const course = await Course.findOrFail(id)
            response.status(202)
            return course.delete()
        } catch (error) {
            response.badRequest({
                message: 'Course not found',
            })
        }
    }
}
