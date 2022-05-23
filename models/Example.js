/*
    Example of a schema for mongo
*/
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const name = "Example"

const options = {
    timestamps: true
}

const fields = {
    text: {
        type: String,
    },
    requiredText: {
        type: String,
        required: true,
    },
    relationToAnotherModel:{
        type: ObjectId,
        ref: "TheOtherModel",
    }

}

const schema = new mongoose.Schema(fields, options)
module.exports = mongoose.model(name, schema)