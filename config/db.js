//require mongoose for model implementation
const mongoose = require('mongoose');

//connect db Connection string staat in .env document, daarmee connect je met de mongodb database
//de waarde usenew.. en useuni.. zijn waarde die je vanuit mongoose mee moet geven
const connectDB = () => {
    try{
        mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB-connected')
    } catch (err) {
        console.log('error tijdens het connecten met de database', err);
        throw err;
    }
}
//module.exports staat gelijk aan. Je plakt connect db aan de module waardoor ik 'm aan kan roepen in mijn server.js bestand
module.exports = connectDB