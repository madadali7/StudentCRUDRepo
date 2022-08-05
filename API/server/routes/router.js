const express = require('express');
const route = express.Router();
const studentController = require('../controller/student-controller');
const userController = require('../controller/user-controller')



//API ROUTE with Public
route.post('/api/students/login',studentController.loginStudent);
route.post('/api/students/email/confirm',studentController.confirmEmail);
route.post('/api/students/password/reset/:id',studentController.resetPassword);

//API ROUTE with AUTHORIZE
route.post('/api/students/register',studentController.studentCreate);
route.get('/api/students',studentController.getStudent);
route.put('/api/students/:id',studentController.updateStudent);
route.delete('/api/students/:id',studentController.deleteStudent);

//API ROUTE FOR Users
route.post('/api/users',userController.userCreate);

module.exports = route;