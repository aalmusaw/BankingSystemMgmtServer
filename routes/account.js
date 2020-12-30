const route = require('express').Router();
const Customer = require('../models/Customer');
const AccountNum = require('../models/AccountNum');

// create a new account
route.post('/account', (req, res, next) => {
    const email = req.body.email;
    const number = req.body.number;
    if (!email || !number) {
        res.status(400).json({
            message: 'One of customer email (email) or account number (number) is missing.'
        });
        return;
    }
    // check if the provided account number is unique
    const accNum = new AccountNum({number: number});
    const account = {
        number: number,
        transaction: []
    }
    accNum.save()
    .then((value) => {
        Customer.findOneAndUpdate({email: email}, {$push: {accounts: account}}, (err, doc, result) => {
            if (err) {
                res.status(500).json({
                    message: 'Account could not be created'
                });
            }
            else {
                res.status(201).json({
                    message: 'Account created successfully.'
                })
            }
        });
    })
    .catch((reason) => {
        res.status(400).json({
            message: reason
        });
    });
    
});

module.exports = route;