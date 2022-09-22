const mongoose = require('mongoose')

const connect = async() => {
    try {
        await mongoose.connect('mongodb+srv://phi:XghrFBOU9nR17njE@cluster0.d9k4o.mongodb.net/carro', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected db')
    } catch (e) {
        console.log('connect failed', e)
    }
}
module.exports = { connect }