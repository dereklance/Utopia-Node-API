import connection from '../dao/Connection.js';
import travelerDao from '../dao/TravelerDao.js';
import bookingsTravelersDao from '../dao/BookingsTravelersDao.js';

let travelerService = {};

travelerService.deleteById = async (id) => {
    const db = await connection;
    await bookingsTravelersDao.deleteByTravelerId(id, db);
    return travelerDao.delete(id, db);
};

export default travelerService;
