const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    roles: {
        user: {
            type: Number,
            default: 2003
        },
        admin: Number,
        editor: Number,
    },

    password: {
        type: String,
        required: true
    },

    refreshToken: String
})

module.exports = model('User', userSchema)