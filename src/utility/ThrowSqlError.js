import { HttpStatus } from "../constants/HttpStatus.js";

export default e => {
    throw {
        status: HttpStatus.INTERNAL_ERROR,
        message: process.env.MODE == 'dev' ? `sql query error\n ${e}` : ''
    }
}
