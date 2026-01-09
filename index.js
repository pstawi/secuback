import express from 'express';
import connexion from './config/bdd.js'
import userRoute from './routes/userRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// middleware

app.use(express.json());

// utilisateion des routes
app.use('/api', userRoute);
app.get('/testApi', (request, response) => {
 response.json({message:'api ok'})
});

// démmarage du serveur
app.listen(process.env.PORT, () => {
    console.log("serveur : 🟢​")
})