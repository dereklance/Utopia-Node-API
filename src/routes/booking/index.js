// Imports --------------------------------------------------------//
import express from 'express';
import bookingService from '../../service/booking/index.js';

// Variables ------------------------------------------------------//
const router = express.Router();

// Routes ----------------------------------------------------------//
router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const booking = await bookingService.getBookingByUserId(userId).catch(next);
    return res.send(booking);
});

router.get('/:bookingId', async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const booking = await bookingService.getBookingById(bookingId).catch(next);
    return res.send(booking);
});

router.get('/search/:query', (req, res) => {
    let searchQuery = req.params.query;
    //todo
    return res.send('Endpoint GET /api/booking/search/:query works\n Search query: ' + searchQuery);
});

// Exports -------------------------------------------------------//
export default router;
