import HttpStatus from '../constants/HttpStatus.js';
import ThrowSqlError from "../utility/ThrowSqlError.js";

let travelerDao = {};

const TABLE_NAME = 'tbl_traveler';
const PRIMARY_KEY = 'travelerId';

travelerDao.delete = async (id, db) => {
    const [ response ] = await db.query(`delete from ${TABLE_NAME} where ${PRIMARY_KEY} = ?`, id);
    if (response.affectedRows === 0) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Could not find traveler of id ${id}.`
        };
    }
    return response;
};

travelerDao.create = async (traveler, db) => {
    const travelerData = [traveler.name, traveler.address, traveler.phone, traveler.email, new Date(traveler.dob)];
    const [result] = await db.query(`insert into ${TABLE_NAME} (name, address, phone, email, dob) values (?, ?, ?, ?, ?)`, travelerData).catch(e => ThrowSqlError(e, db));
    const { insertId } = result;
    return insertId;
}

export default travelerDao;
