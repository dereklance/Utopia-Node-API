import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
    host     : 'smoothstack-project.cqxybfmjssty.us-east-2.rds.amazonaws.com',
    user     : process.env.user,
    password : process.env.password,
    database : 'utopia'
});

export default connection;
