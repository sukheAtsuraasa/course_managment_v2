import Route from '@ioc:Adonis/Core/Route'
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import User from '../app/Models/User'
// import Course from '../app/Models/Course'
// import StudentCourse from '../app/Models/StudentCourse'

Route.resource('/users', 'UsersController').apiOnly()
Route.resource('/courses', 'CoursesController').apiOnly()

Route.get('/select-courses/:id', 'StudentCoursesController.select')
Route.delete('/select-courses/:id', 'StudentCoursesController.destroy')

// Route.post('/user/change-password', 'UsersController')
