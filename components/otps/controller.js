const otpService = require('./service')
const nodemailer = require("nodemailer")

exports.sendOTP = async (email) => {
    try {
        let codeOTP
        while (true) {
            codeOTP = Math.floor(1000 + Math.random() * 9000)
            const code = await otpService.findByCode(codeOTP)
            if (!code) break
        }
        const emailer = await otpService.findByEmail(email)
        if (emailer) {
            await otpService.updateCode(email, codeOTP)
        } else {
            await otpService.createOTP({ email, code: codeOTP })
        }

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'top59477@gmail.com',
                pass: 'nnxbbrtbsnidizci',
            },
        });

        await transporter.sendMail(
            {
                from: "top59477@gmail.com", // sender address
                to: `${email}`, // list of receivers
                subject: "Very Otp Of Caro Online", // Subject line

                // html: "    <p style='text-align:center;''><img src='https://i.imgur.com/FMB0C6J.jpg' width='400px' height='400px'alt='Logo'></p>        <p style='font-size: 20px; font-weight: bolder;text-align:center; '>Mã của bạn là:   <p>${chuoi_string}</p> </p>        <p style='text-align:center;'>Xin chào, vui lòng nhập mã `{$code}`trong vòng 10 phút tới để hoàn tất </p>        <p style='text-align:center;'>xác nhận email của bạn. </p>" , // html body
                html: `<p>Verification code: ${codeOTP}</p>`
            },
            (err) => {
                if (err) return { error: true, status: 200, message: err }
                return { error: false, status: 200, message: 'Send mail success' }
            }
        );
        return { error: false, status: 200, message: 'Send mail success' }
    } catch (err) {
        console.log('err: ', err)
        return { error: true, status: 200, message: err }
    }
}


exports.veryOtp = async (email, codeOTP) => {
    try {
        const emailer = await otpService.findByEmail(email)
        if (emailer) {
            if (emailer.code == codeOTP) return { error: false, status: 200, result_code: 1, message: 'Code correct' }
            return { error: false, status: 200, result_code: 0, message: 'Code incorrect' }
        }
        return { error: false, status: 200, result_code: 0, message: 'Code incorrect' }
    } catch (error) {
        return { error: true, status: 200, message: 'err: ' + error }
    }
}
