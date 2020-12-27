// Imports --------------------------------------------------------//
import express from 'express';

// Variables ------------------------------------------------------//
const router = express.Router();

// Routes ----------------------------------------------------------//
router.get('/:bookingId', (req, res) => {
    let bookingId = req.params.bookingId;
    //todo
    return res.send('Endpoint GET /api/traveler/:bookingId works\n Booking Id: ' + bookingId);
});

// Exports -------------------------------------------------------//
export default router;
