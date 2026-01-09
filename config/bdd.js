// Importer les modules nécessaires
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Créer un pool de connexions à la base de données MySQL
const connexion = mysql.createPool({
    host: process.env.HOST, // Hôte de la base de données
    user: process.env.USER, // Utilisateur de la base de données
    password: process.env.PASSWORD, // Mot de passe de la base de données
    database: process.env.DB_NAME // Nom de la base de données
});

// Tester la connexion à la base de données
connexion.getConnection();
try {
    console.log("database : 🟢" )
} catch (error) {
    console.error("database : 🔴​", error)
}

export default connexion;