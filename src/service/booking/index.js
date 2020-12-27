import bookingDao from '../../dao/booking/index.js';

let bookingService = {};

bookingService.getBookingById = (id) => bookingDao.getBookingById(id);

bookingService.getBookingByUserId = (id) => bookingService.getBookingByUserId(id);

export default bookingService;