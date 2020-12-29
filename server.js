require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authenticate = require('./middleware/authenticate');

const DB_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

mongoose.connect(process.env.DB_CONNECTION_URI, DB_CONFIG, err => {
    if (err) throw err;
    else {
        console.log('Successfully connected to database.');
    }
});

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`MgmtServer is running on port ${PORT}`);
});

