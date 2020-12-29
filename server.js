require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

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
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', userRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`MgmtServer is running on port ${PORT}`);
});

