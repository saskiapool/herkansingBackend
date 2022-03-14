const mongoose = require('mongoose')

const mongoose = require("../db");
 
// create an schema
var userSchema = new mongoose.Schema({
            gebruikersnaam: String,
            wachtwoord: String,
        });
 
var loginModel=mongoose.model('users',userSchema);
 
module.exports = mongoose.model("Users", loginModel);
