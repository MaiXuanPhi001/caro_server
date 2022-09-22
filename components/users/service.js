const userModel = require('./model')

exports.login = async (email) => {
    return userModel.findOne({ email })
}

exports.getByEmail = async (email) => {
    return await userModel.findOne({ email })
}

exports.register = async (user) => {
    await userModel.create(user)
}

exports.getById = async (_id) => {
    return await userModel.findById({ _id })
}

exports.getByUid = async (uid) => {
    return await userModel.findOne({ uid })
}

exports.getAll = async () => {
    return await userModel.find({}, { password: 0 })
}

exports.update = async (body) => {
    const arr =
        [
            {
                updateOne: {
                    filter: { _id: body.user1 },
                    update: {
                        $set: {
                            elo: body.eloUser1,
                            win: body.winUser1,
                            draw: body.drawUser1,
                            lose: body.loseUser1
                        }
                    }
                }
            },
            {
                updateOne: {
                    filter: { _id: body.user2 },
                    update: {
                        $set: {
                            elo: body.eloUser2,
                            win: body.winUser2,
                            draw: body.drawUser2,
                            lose: body.loseUser2
                        }
                    }
                }
            },
        ]

    await userModel.bulkWrite(arr)
}