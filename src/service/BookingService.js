import bookingDao from '../dao/BookingDao.js';

let bookingService = {};

bookingService.getBookingById = (id) => bookingDao.getBookingById(id);

bookingService.getBookingsByUserId = (id) => bookingDao.getBookingsByUserId(id);

bookingService.deleteBookingById = (id) => bookingDao.deleteBookingById(id);

bookingService.updateBooking = (booking) => bookingDao.updateBooking(booking);

export default bookingService;
