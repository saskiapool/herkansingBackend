const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    gebruikersnaam: {
        type: String,
        required: true,
        unique: true
    },
    wachtwoord: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('login', userSchema)

