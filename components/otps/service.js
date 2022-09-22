const otpModel = require('./model')

exports.findByEmail = async (email) => {
    return await otpModel.findOne({ email })
}

exports.findByCode = async (code) => {
    return await otpModel.findOne({ code })
}

exports.createOTP = async (data) => {
    await otpModel.create(data)
}

exports.updateCode = async (email, code) => {
    await otpModel.updateOne(
        { email },
        {
            $set:
            {
                code
            }
        }
    )
}