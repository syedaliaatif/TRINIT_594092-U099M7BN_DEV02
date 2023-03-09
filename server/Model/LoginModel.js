const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
});

const Login = mongoose.model("login", LoginSchema);

module.exports = Login; 
