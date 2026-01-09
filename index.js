// Importer les modules nécessaires
import express from 'express';
import connexion from './config/bdd.js';
import userRoute from './routes/userRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Utiliser les routes utilisateur pour les points d'accès API
app.use('/api', userRoute);

// Route de test pour vérifier si l'API fonctionne
app.get('/testApi', (request, response) => {
    response.json({ message: 'api ok' });
});

// Démarrer le serveur et écouter sur le port spécifié
app.listen(process.env.PORT, () => {
    console.log("serveur : 🟢​")
})