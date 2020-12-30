const route = require('express').Router();
const Customer = require('../models/Customer');

// create a new user
route.post('/customer', (req, res, next) => {
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    // ensure the client supplied all required fields
    if (!email || !fname || !lname) {
        res.status(400).json({
            message: 'Did not receive one of email, fname, or lname.'
        });
        return;
    }
    // next create the customer
    const customer = new Customer({email: email, fname: fname, lname: lname, accounts: []});
    customer.save().then((value) => {
        res.status(201).json({
            message: 'Customer created successfully.'
        });
    })
    .catch((reason)=> {
        res.status(400).json({
            message: 'Customer could not be created. Make sure no customer with the same email is registered.'
        });
    });
});

module.exports = route;

