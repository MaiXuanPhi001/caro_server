const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const otpSchema = new Schema({
    id: { type: ObjectId },
    email: { type: String, required: true },
    code: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('otp', otpSchema)