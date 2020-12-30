const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountNum = new Schema(
    {
        number: {type: String, unique: true, validate: /^\d{16}$/}
    },
    {
        collection: 'account_num'
    }
);

const AcctNumModel = mongoose.model('AccountNum', AccountNum);
module.exports =AcctNumModel;