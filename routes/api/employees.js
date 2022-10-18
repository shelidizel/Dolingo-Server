const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyroles')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.editor, ROLES_LIST.admin), employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.editor, ROLES_LIST.admin),employeesController.updateEmployee)
    .delete( verifyRoles(ROLES_LIST.admin), employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;