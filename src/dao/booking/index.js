import connection from '../db.js';
import { HttpStatus } from '../../constants/index.js';

export const getBookingById = async (id) => {
    const db = await connection;

    const [ rows ] = await db.query(`select * from tbl_booking where bookingId = ${id}`);
    if (!rows[0]) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of id ${id} not found.`
        };
    }
    return rows[0];
};

const deleteBooking = async (id, db) => {
    const [ response ] = await db.query(`delete from tbl_booking where bookingId = ${id}`);
    return response;
};

const deleteBookingTraveler = async (id, db) => {
    const [ response ] = await db.query(
        `delete from tbl_bookings_has_travelers where bookingId = ${id}`
    );
    return response;
};

const deleteFlightBooking = async (id, db) => {
    const [ response ] = await db.query(
        `delete from tbl_flight_has_bookings where bookingId = ${id}`
    );
    if (response.affectedRows === 0) {
        throw {
            status  : HttpStatus.INTERNAL_ERROR,
            message : `Data Integrity Error: No flight booking to delete.`
        };
    }
    return response;
};

export const deleteBookingById = async (id) => {
    const db = await connection;

    await db.beginTransaction();
    const booking = await getBookingById(id);
    if (!booking) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of id ${id} not found.`
        };
    }
    await Promise.all([ deleteBookingTraveler(id, db), deleteFlightBooking(id, db) ]);
    await deleteBooking(id, db);
    return db.commit();
};
