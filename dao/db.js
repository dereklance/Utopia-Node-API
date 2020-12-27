import mysql from 'mysql2';

const connection = mysql.createConnection({
   host: 'localhost',
   user: process.env.user,
   password: process.env.password,
   database: 'utopia'
})



