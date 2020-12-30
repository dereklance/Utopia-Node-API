import connection from '../dao/Connection.js';
import travelerDao from '../dao/TravelerDao.js';
import bookingsTravelersDao from '../dao/BookingsTravelersDao.js';
import HttpStatus from '../constants/HttpStatus.js';

let travelerService = {};

travelerService.getTravelerById = async (id) => {
    const db = await connection;
    const traveler = await travelerDao.findById(id, db);
    return traveler;
};

travelerService.deleteById = async (id) => {
    const db = await connection;
    await bookingsTravelersDao.deleteByTravelerId(id, db);
    return travelerDao.delete(id, db);
};

travelerService.updateTraveler = async (traveler) => {
    const db = await connection;
    const hasTravelerId = await travelerDao.hasTravelerId(traveler.travelerId, db);
    if (!traveler.travelerId || !traveler.name || !traveler.address
            || !traveler.phone || !traveler.email || !traveler.dob) {
        throw {
            status: HttpStatus.NOT_FOUND,
            message: `Invalid JSON in request body`
        };
    }
    if (!hasTravelerId) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Traveler id ${traveler.travelerId} not found.  Attempt to update non-existing Traveler`
        };
    }
    await travelerDao.updateTraveler(traveler, db);
};

export default travelerService;
