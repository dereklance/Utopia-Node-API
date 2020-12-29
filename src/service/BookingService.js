import bookingDao from '../dao/BookingDao.js';
import bookingsTravelersDao from '../dao/BookingsTravelersDao.js';
import flightBookingsDao from '../dao/FlightBookingsDao.js';
import connection from '../dao/Connection.js';
import HttpStatus from '../constants/HttpStatus.js';

let bookingService = {};

bookingService.getBookingById = async (id) => bookingDao.findById(id, await connection);

bookingService.getBookingsByUserId = (id) => bookingDao.getBookingsByUserId(id);

bookingService.deleteBookingById = async (id) => {
    const db = await connection;

    try {
        await db.beginTransaction();
        await bookingDao.findById(id, db);
        await Promise.all([
            bookingsTravelersDao.deleteByBookingId(id, db),
            flightBookingsDao.deleteByBookingId(id, db)
        ]);
        await bookingDao.delete(id, db);
        return db.commit();
    } catch (err) {
        await db.rollback();
        throw err;
    }
};

bookingService.createBooking = async (booking, flightId, travelerIds = []) => {
    const db = await connection;
    let promises = [];

    try {
        await db.beginTransaction();
        const bookingId = await bookingDao.create(booking, db);
        promises = travelerIds.map((travelerId) =>
            bookingsTravelersDao.create({ bookingId, travelerId }, db)
        );
        const promise = flightBookingsDao.create({ bookingId, flightId }, db);
        promises.push(promise);
        await Promise.all(promises);
        await db.commit();
        return { bookingId, ...booking };
    } catch (err) {
        await db.rollback();
        throw err;
    }
};

export default bookingService;
