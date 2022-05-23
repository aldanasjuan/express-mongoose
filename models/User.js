/*
    Example of a schema for mongo
*/
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const name = "User"

const options = {
    timestamps: true
}

const fields = {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{ //argon2 hash
        type: String,
        required:true
    },
    resetPasswordToken:{
        type: String,
        default: null
    }

}

const schema = new mongoose.Schema(fields, options)
module.exports = mongoose.model(name, schema)