const Employee = require('../model/Employee')



const getAllEmployees = async (req, res) => {
    const employees = await Employee.find()
    if (!employees) return res.status(204).json({ "message": "no employees found" })
    return res.json(employees)
}

const createNewEmployee = async (req, res) => {

    if (!req?.body?.firstname || !req?.body?.lastname) return res.status(400).json({ 'message': 'firstname and lastname required' })


    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })

        console.log(result);
        res.status(201).json(result)
    } catch (error) {
        console.error(error);
    }
}

const updateEmployee = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({ 'message' : 'id parameter is required'})


    const employee = await Employee.findOne({ _id: req.body.id }).exec()
    if (!employee) return res.status(400).json({ "message": `Employee not found` });
    


    if (req.body?.firstname) employee.firstname = req.body.firstname
    if (req.body?.lastname) employee.lastname = req.body.lastname

    try {
        const result = await employee.save()
        console.log(result);
        res.status(201).json(result)
    } catch (error) {
        console.error(error);
    }
}

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({ 'message' : 'id parameter is required'})

    const employee =  Employee.findOne({ _id: req.body.id }).exec()
    if (!employee) return res.status(400).json({ "message": `Employee  not found` });
    
    try {
        const result = await Employee.deleteOne({ _id: req.body.id })
        res.json(result)
    } catch (error) {
        console.error(error);
    }
}

const getEmployee = async (req, res) => {
    if(!req?.params.id) return res.status(400).json({ 'message' : 'id parameter is required'})

    const employee = await Employee.findOne({ _id: req.params.id }).exec()

    if (!employee) {
        return res.status(400).json({ "message": `Employee not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}