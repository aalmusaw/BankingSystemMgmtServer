const route = require('express').Router();
const Merchant = require('../models/Merchant');

// create a new merchant
route.post('/merchant', (req, res, next) => {
    const name = req.body.name
    // ensure the client supplied the merchant's name
    if (!name) {
        res.status(400).json({
            message: 'Did not receive the merchant\'s name.'
        });
    }
    else {
        const merchant = new Merchant({name: name});
        merchant.save()
        .then((value) => {
            res.status(201).json({
                message: `Successfully added the merchant: ${name}.`
            });
        })
        .catch((reason) => {
            res.status(400).json({
                message: `Merchant ${name} already exists.`
            });
        });

    }

});

module.exports = route;

