require('dotenv').config();
const mongoose = require('mongoose');

const DB_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

let authDbConn;
mongoose.createConnection(process.env.AUTH_DB_CONNECTION_URI, DB_CONFIG, (err, conn) => {
    if (err) throw err;
    else {
        authDbConn = conn;
        console.log('Successfully connected to authentication database.');
    }
});
module.exports = authDbConn;
