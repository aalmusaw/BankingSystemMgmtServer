const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: {type: String, unique: true},
        password: {type: String, required: true}
    },
    {
        collection: 'user'
    }
);

const UserModel = mongoose.model('User', User);
module.exports = UserModel;