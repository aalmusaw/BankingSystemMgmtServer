const bcrypt = require('bcrypt');
const route = require('express').Router();
const User = require('../models/User');

// create a new user
route.post('/user', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    // ensure the client supplied both email and password
    if (!email || !password) {
        res.status(400).json({
            message: 'Did not receive one of password or email.'
        });
        return;
    }
    // next encrypt password
    bcrypt.hash(password, 10, (err, encrypted) => {
        if (err) {
            res.status(500).json({
                message: 'Failed to encrypt password.'
            });
        }
        else {
            const user = new User({email: email, password: encrypted});
            user.save();
            res.status(201).json({
                message: 'User created successfully.'
            });
        }
    });

});

// delete a user by email
route.delete('/user', (req, res, next) => {
    const email = req.body.email;
    if (!email) {
        res.status(400).json({
            message: 'Did not receive email.'
        });
        return;
    }
    User.deleteOne({email: email}, (err) => {
        if (err) {
            res.status(400).json({
                message: 'No user exists with this email addresss'
            });
        }
        else {
            res.status(204).json({
                message: `User with email address ${email} got deleted successfully.`
            });
        }
    });
});

module.exports = route;

