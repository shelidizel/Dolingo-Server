const {Schema, model } = require('mongoose')

const employeeSchema = new Schema ({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    }
})

module.exports = model('Employee', employeeSchema)