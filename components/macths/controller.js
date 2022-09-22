const matchService = require('./service')
const userService = require('../../components/users/service')

exports.create = async (body) => {
    try {
        await userService.update(body)
        await matchService.create(body)
        return { error: false, status: 200 }
    } catch (error) {
        return { error: true, status: 200 }
    }
}

exports.getById = async (_id) => {
    try {
        const matches = await matchService.getById(_id)
        return { error: false, status: 200, data: matches }
    } catch (error) {
        return { error: false, status: 200, data: [] }
    }
}