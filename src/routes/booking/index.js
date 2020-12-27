// Imports --------------------------------------------------------//
import express from 'express';
import * as service from '../../service/booking/index.js';

// Variables ------------------------------------------------------//
const router = express.Router();

//Routes ----------------------------------------------------------//
router.get('/user/:userId', (req, res) => {
    let userId = req.params.userId;
    //todo
    return res.send('Endpoint GET /api/booking/:userId works\n User ID: ' + userId);
});

router.get('/:bookingId', async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const booking = await service.getBookingById(bookingId).catch(next);

    return res.send(booking);
});

router.get('/search/:query', (req, res) => {
    let searchQuery = req.params.query;
    //todo
    return res.send('Endpoint GET /api/booking/search/:query works\n Search query: ' + searchQuery);
});

router.delete('/:bookingId', async (req, res, next) => {
    const bookingId = req.params.bookingId;

    service
        .deleteBookingById(bookingId)
        .then(() => {
            res.status(200).end();
        })
        .catch(next);
});

// Exports -------------------------------------------------------//
export default router;
