import connection from '../db.js';

let bookingDao = {};

bookingDao.getBookingById = async (id) => {
    const db = await connection;
    const [ rows ] = await db.query(`select * from tbl_booking where bookingId = ${id}`);
    if (!rows[0]) {
        throw {
            status  : 404,
            message : `Booking of id ${id} not found.`
        };
    }
    return rows[0];
};

bookingDao.getBookingByUserId = async (id) => {
    const db = await connection;
    const [ rows ] = await db.query(`select * from tbl_booking where bookerId = ${id}`);
    if(!rows[0]) {
        throw {
            status : 404,
            message : `Booking of user id ${id} not found.`
        }
    }
}

export default bookingDao;
