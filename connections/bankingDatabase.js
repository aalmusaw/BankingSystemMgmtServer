require('dotenv').config();
const mongoose = require('mongoose');

const DB_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

let bankingDbConn;
mongoose.createConnection(process.env.BANKING_DB_CONNECTION_URI, DB_CONFIG, (err, conn) => {
    if (err) throw err;
    else {
        bankingDbConn = conn;
        console.log('Successfully connected to banking database.');
    }
});
module.exports = bankingDbConn;