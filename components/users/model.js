const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const userSchema = new Schema({
    id: { type: ObjectId },
    uid: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String },
    elo: { type: Number, default: 1000 },
    win: { type: Number, default: 0 },
    draw: { type: Number, default: 0 },
    lose: { type: Number, default: 0 },
    img: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)