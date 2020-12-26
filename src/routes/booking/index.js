// Imports --------------------------------------------------------//
const express = require('express');

// Variables ------------------------------------------------------//
const router = express.Router();

//Routes ----------------------------------------------------------//
router.get('/:userId', (req,res) => {
    let userId = req.params.userId;
    //todo
    return res.send('Endpoint GET /api/booking/:userId works\n User ID: ' + userId);
});

router.put('/:bookingId', (req,res) => {
    let bookingId = req.params.bookingId;
    //todo
    return res.send('Endpoint PUT /api/booking/:bookingId works\n Booking Id: ' + bookingId);
});

router.get('/search/:query', (req, res) => {
    let searchQuery = req.params.query;
    //todo
    return res.send('Endpoint GET /api/booking/search/:query works\n Search query: ' + searchQuery);
});

// Exports -------------------------------------------------------//
module.exports = router;
