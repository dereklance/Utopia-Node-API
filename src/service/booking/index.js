import bookingDao from '../../dao/booking/index.js';

let bookingService = {};

bookingService.getBookingById = (id) => bookingDao.getBookingById(id);

bookingService.getBookingsByUserId = (id) => bookingService.getBookingsByUserId(id);

export default bookingService;
