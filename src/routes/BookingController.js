// Imports --------------------------------------------------------//
import express from 'express';
import bookingService from '../service/BookingService.js';
import HttpStatus from '../constants/HttpStatus.js';

// Variables ------------------------------------------------------//
const router = express.Router();

// Routes ----------------------------------------------------------//
router.get('/user/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    const booking = await bookingService.getBookingsByUserId(userId).catch(next);
    return res.send(booking);
});

router.get('/:bookingId', async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const booking = await bookingService.getBookingById(bookingId).catch(next);
    return res.send(booking);
});

router.post('/flight/:flightId', (req, res, next) => {
    const booking = req.body;
    const travelerIds = booking.travelerIds;
    const flightId = req.params.flightId;
    delete booking.travelerIds;
    bookingService
        .createBooking(booking, flightId, travelerIds)
        .then((booking) => {
            res.setHeader('Location', `/api/booking/${booking.bookingId}`);
            res.status(HttpStatus.CREATED).json(booking);
        })
        .catch(next);
});

router.put('', async (req, res, next) => {
    //let bookingId = req.params.bookingId;
    const booking = req.body;
    bookingService.updateBooking(booking).then(() => {
        return res.json(booking).status(200);
    }).catch(next);
});

router.delete('/:bookingId', async (req, res, next) => {
    const bookingId = req.params.bookingId;

    bookingService
        .deleteBookingById(bookingId)
        .then(() => {
            res.status(HttpStatus.OK).send('Booking successfully deleted.');
        })
        .catch(next);
});


// Exports -------------------------------------------------------//
export default router;
