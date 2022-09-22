const userService = require('./service')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async (email, password) => {
    try {
        const user = await userService.login(email)
        if (!user) return { error: false, status: 200, result_code: 0, message: 'Email or password is incorrect' }
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return { error: false, status: 200, result_code: 0, message: 'Email or password is incorrect' }
        const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, 'mykey')
        return {
            error: false,
            status: 200,
            result_code: 1,
            message: 'Login success',
            data: {
                ...user._doc,
                token
            }
        }
    } catch (error) {
        console.log('err: ', error)
        return { error: true, status: 200, result_code: 0, message: 'Login Fail' }
    }
}

exports.register = async (user) => {
    try {
        const email = await userService.getByEmail(user.email)
        if (email) return { error: false, status: 200, result_code: 0, message: 'Email already exist' }
        const newPassword = await bcrypt.hash(user.password, await bcrypt.genSalt(10))
        await userService.register({ ...user, password: newPassword })
        return { error: false, status: 200, result_code: 1, message: 'Register success' }
    } catch (error) {
        return { error: true, status: 200, message: 'Register success' }
    }
}

exports.getById = async (_id) => {
    try {
        const user = await userService.getById(_id)
        return { error: false, status: 200, data: user }
    } catch (error) {
        return { error: true, status: 200 }
    }
}

exports.loginFacebook = async (body) => {
    try {
        const user = await userService.getByUid(body.uid)
        if (user) {
            const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, 'mykey')
            return { error: false, status: 200, data: { ...user._doc, token } }
        } else {
            await userService.register(body)
            const user = await userService.getByUid(body.uid)
            const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, 'mykey')
            return { error: false, status: 200, data: { ...user._doc, token } }
        }
    } catch (error) {
        return { error: true, status: 200 }
    }
}

exports.getAll = async () => {
    try {
        const users = await userService.getAll()
        return { error: false, status: 200, data: users }
    } catch (error) {
        return { error: true, status: 200, data: [] }
    }
}

exports.changePassword = async (email, password) => {
    try {
        const newPassword = await bcrypt.hash(password + '', await bcrypt.genSalt(10))
        await userService.changePassword(email, newPassword)
        return { error: false, status: 200 }
    } catch (error) {
        console.log('err: ', error)
        return { error: true, status: 200 }
    }
}