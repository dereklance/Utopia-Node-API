import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
    host     : 'smoothstack-project.cqxybfmjssty.us-east-2.rds.amazonaws.com',
    user     : process.env.SPRING_DB_UNAME,
    password : process.env.SPRING_DB_PASS,
    database : 'utopia'
});

export default connection;
