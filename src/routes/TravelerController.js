// Imports --------------------------------------------------------//
import express from 'express';
import travelerService from '../service/TravelerService.js';
import HttpStatus from '../constants/HttpStatus.js';

// Variables ------------------------------------------------------//
const router = express.Router();

// Routes ----------------------------------------------------------//
router.get('/:bookingId', (req, res) => {
    let bookingId = req.params.bookingId;
    //todo
    return res.send('Endpoint GET /api/traveler/:bookingId works\n Booking Id: ' + bookingId);
});

router.delete('/:travelerId', (req, res, next) => {
    const travelerId = req.params.travelerId;
    travelerService
        .deleteById(travelerId)
        .then(() => {
            res.status(HttpStatus.OK).send('Traveler successfully deleted.');
        })
        .catch(next);
});

router.post('/:bookingId', (req, res, next) => {
    const bookingId = req.params.bookingId;
    travelerService.addBooking(req.body, bookingId)
        .then(() => {
            res.status(HttpStatus.CREATED).send("Traveler successfully added to bookingId: " + bookingId);
        })
        .catch(next);
});

// Exports -------------------------------------------------------//
export default router;
