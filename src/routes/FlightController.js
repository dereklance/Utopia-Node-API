import express from 'express';
import flightService from '../service/FlightService.js';
import HttpStatus from '../constants/HttpStatus.js';

const router = express.Router();

router.get('/:flightId', async (req, res, next) => {
    const flightId = req.params.flightId;

    flightService
        .getFlightById(flightId)
        .then((flight) => {
            res.status(HttpStatus.OK).json(flight);
        })
        .catch(next);
});

export default router;
