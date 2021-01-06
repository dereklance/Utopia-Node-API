import bookingDao from '../dao/BookingDao.js';
import bookingsTravelersDao from '../dao/BookingsTravelersDao.js';
import flightBookingsDao from '../dao/FlightBookingsDao.js';
import flightDao from '../dao/FlightDao.js';
import connection from '../dao/Connection.js';
import HttpStatus from '../constants/HttpStatus.js';

let bookingService = {};

bookingService.getBookingById = async (id) => bookingDao.findById(id, await connection);

bookingService.getBookingsByUserId = async (id) => bookingDao.getBookingsByUserId(id);

bookingService.deleteBookingById = async (id) => {
    const db = await connection;

    try {
        await db.beginTransaction();
        await bookingDao.findById(id, db);
        const [ travelersInDeletedBooking, flightId ] = await Promise.all([
            bookingsTravelersDao.deleteByBookingId(id, db),
            flightBookingsDao.findFlightIdByBookingId(id, db),
            flightBookingsDao.deleteByBookingId(id, db)
        ]);
        await Promise.all([
            bookingDao.delete(id, db),
            flightDao.updateSeatsAvailableById(flightId, db, travelersInDeletedBooking)
        ]);
        return db.commit();
    } catch (err) {
        await db.rollback();
        throw err;
    }
};

bookingService.createBooking = async (booking, flightId, travelerIds = []) => {
    const db = await connection;

    try {
        await db.beginTransaction();
        const bookingId = await bookingDao.create(booking, db);

        // TODO: use one sql query for this
        let promises = travelerIds.map((travelerId) =>
            bookingsTravelersDao.create({ bookingId, travelerId }, db)
        );
        promises = [
            ...promises,
            flightBookingsDao.create({ bookingId, flightId }, db),
            flightDao.updateSeatsAvailableById(flightId, db, -1 * travelerIds.length)
        ];

        await Promise.all(promises);
        await db.commit();
        return { bookingId, ...booking };
    } catch (err) {
        await db.rollback();
        throw err;
    }
};

bookingService.updateBooking = async (booking) => {
    const db = await connection;
    const hasBookingId = await bookingDao.hasBookingId(booking.bookingId, db);
    if (
        !booking.bookingId ||
        booking.isActive === undefined ||
        !booking.stripeId ||
        !booking.bookerId
    ) {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : 'Invalid JSON in request body'
        };
    }
    if (!hasBookingId) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of booking id ${booking.bookingId} not found. Attempt to update non-existing booking`
        };
    }
    await bookingDao.updateBooking(booking, db);
};

export default bookingService;
