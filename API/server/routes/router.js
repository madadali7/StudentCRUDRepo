const express = require('express');
const route = express.Router();
const studentController = require('../controller/student-controller');
const userController = require('../controller/user-controller')



//API ROUTE
route.post('/api/students/login',studentController.loginStudent);
route.post('/api/students',studentController.studentCreate);
route.get('/api/students',studentController.getStudent);
route.put('/api/students/:id',studentController.updateStudent);
route.delete('/api/students/:id',studentController.deleteStudent);


//API ROUTE FOR Users
route.post('/api/users',userController.userCreate);

module.exports = route;