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
    const result = await userController.register(body)
    body.img = 'http://localhost:3000/images/profile.png'
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


module.exports = router;