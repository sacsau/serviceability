const express = require('express');
const util = require('util')
const router = express.Router();
const serviceabilityService = require('./serviceability.service');

// routes
router.get('/isSupported', isSupported);
router.post('/add', add);

module.exports = router;

function isSupported(req, res, next) {

	console.log(util.inspect(req.query))

    serviceabilityService.isSupported(req.query)
        .then(isSupported => res.json(isSupported))
        .catch(next);
}

function add(req, res, next) {
    serviceabilityService.create(req.body)
    .then(() => res.json({ message: 'SKU / Pincode map creation successful' }))
    .catch(next);
}