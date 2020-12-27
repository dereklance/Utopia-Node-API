import bookingDao from '../dao/BookingDao.js';
import connection from '../dao/Connection.js';

let bookingService = {};

bookingService.getBookingById = (id) => bookingDao.getBookingById(id);

bookingService.getBookingsByUserId = (id) => bookingDao.getBookingsByUserId(id);

bookingService.deleteBookingById = async (id) => {
    const db = await connection;
    return bookingDao.deleteBookingById(id, db);
};

bookingService.createBooking = (booking) => bookingDao.createBooking(booking);

export default bookingService;
