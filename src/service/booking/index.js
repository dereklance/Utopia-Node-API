import * as dao from '../../dao/booking/index.js';

export const getBookingById = (id) => dao.getBookingById(id);

export const deleteBookingById = (id) => dao.deleteBookingById(id);
