import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
// import Course from 'App/Models/Course'
// import StudentCourse from '../app/Models/StudentCourse'
import User from 'App/Models/User'

export default class UsersController {
    public async store({ request, response }: HttpContextContract) {
        const newUserSchema = schema.create({
            name: schema.string(),
            email: schema.string({}, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email' }),
            ]),
            password: schema.string({}, [
                rules.confirmed(),
                rules.minLength(6),
            ]),
            phone: schema.string([
                rules.unique({ table: 'users', column: 'phone' }),
                rules.mobile(),
            ]),
            role: schema.enum(['teacher', 'student'] as const),
            gender: schema.string(),
        })

        const customMessages = {
            'required': 'The {{ field }} is required to create a new account',
            'enum': 'The value of {{ field }} must be in {{ options.choices }}',
            'name.required': 'Name is required to signup',
        }

        try {
            const payload = await request.validate({
                schema: newUserSchema,
                messages: customMessages,
            })

            const data = {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                phone: payload.phone,
                role: payload.role,
                gender: payload.gender,
            }

            // const user = new User(data)

            const user = await User.create(data)

            const _response: Record<string, Record<string, string | null>> = {
                data: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    gender: user.gender ? user.gender : null,
                },
            }

            return _response
        } catch (error) {
            /**
             * Step 3 - Handle errors
             */
            console.log(error)
            response.badRequest(error.messages)
        }
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const id = params.id
            const user = await User.findOrFail(id)
            const _response = {
                data: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    gender: user.gender,
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
        const newUserSchema = schema.create({
            name: schema.string.optional(),
            phone: schema.string.optional([
                rules.unique({
                    table: 'users',
                    column: 'phone',
                    whereNot: {
                        id: params.id,
                    },
                }),
                rules.mobile(),
            ]),
            role: schema.enum.optional(['teacher', 'student'] as const),
            gender: schema.string.optional(),
        })

        const customMessages = {
            'required': 'The {{ field }} is required to create a new account',
            'enum': 'The value of {{ field }} must be in {{ options.choices }}',
            'name.required': 'Name is required to signup',
        }

        try {
            const id = params.id
            const payload = await request.validate({
                schema: newUserSchema,
                messages: customMessages,
            })

            await User.query().where('id', id).update(payload)
            return {
                message: 'Profile Updated Successfully',
            }
        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    public async destroy({ response, params }: HttpContextContract) {
        try {
            const id = params.id
            const user = await User.findOrFail(id)
            response.status(202)
            return user.delete()
        } catch (error) {
            response.badRequest({
                message: 'User not found',
            })
        }
    }
}
