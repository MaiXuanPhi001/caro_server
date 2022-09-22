const express = require('express');
const router = express.Router();

const otpController = require('../../components/otps/controller')

router.post('/sendMail', async function (req, res, next) {
    const { email } = req.body
    const result = await otpController.sendOTP(email)
    console.log('result: ', result)
    res.status(result.status).json(result)
})

router.post('/very', async function (req, res, next) {
    const { email, codeOTP } = req.body
    const result = await otpController.veryOtp(email, codeOTP)
    res.status(result.status).json(result)
})

module.exports = router;