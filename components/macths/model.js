const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const matchSchema = new Schema({
    id: { type: ObjectId },
    user1: { type: Schema.Types.ObjectId, ref: 'user', default: null },
    user2: { type: Schema.Types.ObjectId, ref: 'user', default: null },
    win: { type: String, default: null },
}, { timestamps: true })

module.exports = mongoose.model('matche', matchSchema)