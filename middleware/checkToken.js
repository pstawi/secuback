// Importer les modules nécessaires
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware pour vérifier la validité du token
export const checkToken = (req, res, next) => {

    // Extraire le token de l'en-tête Authorization
    const token = req.headers['authorization'].split(" ")[1];

    // Si aucun token n'est fourni, retourner une erreur non autorisée
    if (!token) {
        return res.status(401).json({ message: "token manquant" });
    }

    try {
        // Vérifier le token en utilisant la clé secrète
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodeToken; // Attacher le token décodé à l'objet de requête
        next(); // Passer au middleware ou au gestionnaire de route suivant

    } catch (error) {
        // Si la vérification du token échoue, retourner une erreur interdite
        return res.status(403).json({ message: "token invalide" });
    }
};