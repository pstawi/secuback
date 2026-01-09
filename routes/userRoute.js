// Importer les modules et contrôleurs nécessaires
import * as userController from '../controllers/userController.js';
import express from 'express';
import { checkToken } from '../middleware/checkToken.js';

const router = express.Router();

// Route pour créer un nouvel utilisateur
router.post('/createUser', userController.createUser);

// Route pour mettre à jour un utilisateur existant, protégée par le middleware de vérification du token
router.put('/updateUser/:id', checkToken, userController.updateUser);

// Route pour récupérer tous les utilisateurs, protégée par le middleware de vérification du token
router.get('/getAllUser', checkToken, userController.getAllUser);

// Route pour supprimer un utilisateur par ID, protégée par le middleware de vérification du token
router.delete('/deleteUser/:id', checkToken, userController.deleteUser);

// Route pour récupérer un utilisateur par ID, protégée par le middleware de vérification du token
router.get('/getById/:id', checkToken, userController.getById);

// Route pour gérer la connexion des utilisateurs
router.post('/login', userController.login);

export default router;