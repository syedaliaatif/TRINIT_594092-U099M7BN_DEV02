const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URI;

const connectDb = () => {

    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


    } catch (er) {

        console.log(er);

    }

}

module.exports = connectDb; 