const express = require('express');
const router = express.Router();
const userController = require('../../components/users/controller')

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    const result = await userController.login(email, password)
    res.status(result.status).json(result)
})

router.post('/register', async (req, res, next) => {
    const { body } = req
    body.img = 'https://caroserverxuanphi.herokuapp.com/images/user' + Math.floor((Math.random() * 5) + 1) + '.png'
    const result = await userController.register(body)
    res.status(result.status).json(result)
});

router.get('/getById/:id', async (req, res, next) => {
    const { id } = req.params
    const result = await userController.getById(id)
    res.status(result.status).json(result)
})

router.post('/loginFacebook', async (req, res, next) => {
    const { body } = req
    const result = await userController.loginFacebook(body)
    res.status(result.status).json(result)
})

router.get('/getAll', async function (req, res, next) {
    const result = await userController.getAll()
    res.status(result.status).json(result)
})

router.post('/changePassword', async function (req, res, next) {
    const { email, newPassword } = req.body
    const result = await userController.changePassword(email, newPassword)
    res.status(result.status).json(result)
})

module.exports = router;