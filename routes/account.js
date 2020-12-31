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

route.post('/account/changeBalance', (req, res, next) => {
    // check if required body params have been sent
    if (!req.body.accountNumber || !req.body.amount) {
        res.status(400).json({
            message: 'At least one of accountNumber or amount fields is missing.'
        });
        return;
    }
    const accountNumber = req.body.accountNumber;
    const amount = parseFloat(req.body.amount);
    // check to see if amount is non-zero
    if (amount == 0) {
    }
    const detail = req.body.detail;
    if (amount == 0) {
        res.status(400).json({
            message: 'amount field must be non-zero.'
        });
        return;
    }
    // create a transaction
    const transaction = {
        amount, detail 
    };
    const filter = {'accounts.number': accountNumber};
    // check to see if an account with the supplied number exists
    Customer.findOne(filter, (err, doc) => {
        if (err) {
            res.status(400).json({
                message: 'No such account exists'
            });
            return;
        }
        // check if the customer is about to go below zero
        else {
            // retrieve the account
            const account = doc.accounts.filter(acc => acc.number == accountNumber)[0];
            // if this is a charge and the account has less than the charge
            if (amount < 0 && account.balance < -1*amount) {
                res.status(400).json({
                    message: 'Insufficient Balance'
                });
            } 
            else {
                account.balance += amount;
                account.transactions.push(transaction);
                doc.save();
                res.sendStatus(201);
            }
        }
    });
});

module.exports = route;