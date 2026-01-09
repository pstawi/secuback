import mysql from "mysql2/promise"
import dotenv from "dotenv";
dotenv.config();

const connexion = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});

connexion.getConnection()
try {
    console.log("database : 🟢" )
} catch (error) {
    console.error("database : 🔴​", error)
}

export default connexion;