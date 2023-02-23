const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    emmission: {
        type: mongoose.Types.Decimal128,
        default: 0
    },
    hits: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model("users", UserSchema);

module.exports = User; 
