const mongoose = require('../helpers/mongoose');
mongoose.Promise = global.Promise; // native promises
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// schema
const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    name: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', userSchema);