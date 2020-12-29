require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authDb = require('./connections/authDatabase');
const bankingDb = require('./connections/bankingDatabase');
const authenticate = require('./middleware/authenticate');

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`MgmtServer is running on port ${PORT}`);
});

