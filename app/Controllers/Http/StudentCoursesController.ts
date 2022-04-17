import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StudentCourse from 'App/Models/StudentCourse'

export default class StudentCoursesController {
    public async select({ params, response }: HttpContextContract) {
        try {
            const data = {
                userId: 4,
                courseId: params.id,
                createdById: 4,
                updatedById: 4,
            }

            await StudentCourse.create(data)

            return {
                message: 'Course selected successfully',
            }
        } catch (error) {
            if (
                error.message.includes(
                    'duplicate key value violates unique constraint'
                )
            ) {
                return response.badRequest({
                    message: 'Course already slected',
                })
            }
            return response.badRequest(error)
        }
    }

    public async destroy({ response, params }: HttpContextContract) {
        const id = params.id
        console.log(id)
        const studentCourse = await StudentCourse.query()
            .where({
                user_id: 4,
                course_id: id,
            })
            .firstOrFail()

        // if (!studentCourse) {
        //     throw Exception
        // }
        response.status(202)
        return studentCourse.delete()
    }
}
