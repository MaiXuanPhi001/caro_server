const express = require('express');
const router = express.Router();
const matchController = require('../../components/macths/controller')

router.post('/doneMatch', async (req, res, next) => {
    const { body } = req
    const result = await matchController.create(body)
    res.status(result.status).json(result)
})

router.get('/getById/:id', async (req, res, next) => {
    const { id } = req.params
    const result = await matchController.getById(id)
    res.status(result.status).json(result)
})

module.exports = router;