import bookingDao from '../../dao/booking/index.js';

let bookingService = {};

bookingService.getBookingById = (id) => bookingDao.getBookingById(id);

bookingService.getBookingsByUserId = (id) => bookingDao.getBookingsByUserId(id);

bookingService.deleteBookingById = (id) => bookingDao.deleteBookingById(id);

export default bookingService;
