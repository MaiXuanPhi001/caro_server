const matchModel = require('./model')

exports.create = async (body) => {
    await matchModel.create(body)
}

exports.getById = async (_id) => {
    return await (await matchModel.find({ $or: [{ user1: _id }, { user2: _id }] }).populate('user1 user2')).reverse()
}
