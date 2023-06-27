const express = require('express');
const router = express.Router();
const { empRegistration, listEmployees, updateEmployee,deleteEmployee,getEmployeeById } = require("../controllers/employee.controller");

// to create new employee
router.post('/registration', empRegistration);

//list employees
router.get('/listEmployees', listEmployees);

//update employee
router.put('/updateEmployee/:id', updateEmployee);

//delete employee
router.delete('/deleteEmployee/:id', deleteEmployee);

//get employee
router.get('/getEmployee/:id', getEmployeeById);

module.exports = router;