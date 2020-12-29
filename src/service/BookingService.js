import bookingDao from '../dao/BookingDao.js';
import bookingsTravelersDao from '../dao/BookingsTravelersDao.js';
import flightBookingsDao from '../dao/FlightBookingsDao.js';
import connection from '../dao/Connection.js';
import HttpStatus from '../constants/HttpStatus.js';

let bookingService = {};

bookingService.getBookingById = async (id) => bookingDao.findById(id, await connection);

bookingService.getBookingsByUserId = async (id) => bookingDao.getBookingsByUserId(id);

bookingService.deleteBookingById = async (id) => {
    const db = await connection;

    await db.beginTransaction();
    await bookingDao.findById(id, db);
    await Promise.all([
        bookingsTravelersDao.deleteByBookingId(id, db),
        flightBookingsDao.deleteByBookingId(id, db)
    ]);
    await bookingDao.delete(id, db);
    return db.commit();
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
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : 'TODO: implement more specific message. 404 Bad Request.'
        };
    }
};

bookingService.updateBooking = async (booking) => {
    const db = await connection;
    const hasBookingId = await bookingDao.hasBookingId(booking.bookingId, db);
    if(!booking.bookingId || booking.isActive === undefined || !booking.stripeId || !booking.bookerId) {
        throw {
            status : HttpStatus.BAD_REQUEST,
            message : 'Invalid JSON in request body'
        }
    }
    if (!hasBookingId) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of booking id ${booking.bookingId} not found. Attempt to update non-existing booking`
        };
    }
    await bookingDao.updateBooking(booking, db);
}

export default bookingService;
