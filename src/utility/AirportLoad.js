import express from "express";
import connection from "../dao/Connection.js";
import airportCsv from "neat-csv";
import fs from "fs";
 
// Dao

let airportDao = {};

const TABLE_NAME = 'tbl_airport';
const PRIMARY_KEY = 'airportId';

fs.readFile("../../Files/L_AIRPORT.csv", async (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(await airportCsv(data));
});





