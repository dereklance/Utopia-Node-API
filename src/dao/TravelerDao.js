import HttpStatus from '../constants/HttpStatus.js';
import ThrowSqlError from '../Utility/ErrorHandler.js';

let travelerDao = {};

const TABLE_NAME = 'tbl_traveler';
const PRIMARY_KEY = 'travelerId';

travelerDao.findById = async (id, db) => {
    const [rows] = await db.query(`select * from ${TABLE_NAME} where ${PRIMARY_KEY} = ?`, id);
    const traveler = rows[0];
    if (!traveler) {
        throw {
            status: HttpStatus.NOT_FOUND,
            message: `Could not find traveler of id ${id}.`
        };
    }
    return traveler;
};

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

travelerDao.hasTravelerId = async (id, db) => {
    if (!id) return false;
    const travelerList = await travelerDao.findById(id, db)
        .catch(e => false);
    return travelerList.travelerId == id;
};

travelerDao.updateTraveler = async (traveler, db) => {
    const travelerData = [ traveler.name, traveler.address,
    traveler.phone, traveler.email, traveler.dob, traveler.travelerId];
    const [response] = await db.query(`update ${TABLE_NAME} set  name = ?, address = ?
                    , phone = ?, email = ?, dob = ? where travelerId = ?`, travelerData)
        .catch(e => ThrowSqlError(e));
    return traveler;

};

export default travelerDao;
