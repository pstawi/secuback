// Importer les modules et modèles nécessaires
import * as userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Contrôleur pour créer un nouvel utilisateur
export const createUser = async (req, res) => {
    const { login, password } = req.body;

    try {
        // Hasher le mot de passe de l'utilisateur pour plus de sécurité
        const hashPassword = await bcrypt.hash(password, 5);
        // Appeler la fonction du modèle pour créer l'utilisateur dans la base de données
        const createdUser = await userModel.createUser(login, hashPassword);
        res.status(201).json({ createdUser }); // Répondre avec l'utilisateur créé
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' }); // Gérer les erreurs serveur
    }
};

// Contrôleur pour mettre à jour un utilisateur existant
export const updateUser = async (req, res) => {
    const { login, password } = req.body;
    const { id } = req.params;

    try {
        // Hasher le nouveau mot de passe
        const hashPassword = bcrypt.hash(password, 5);
        // Appeler la fonction du modèle pour mettre à jour l'utilisateur dans la base de données
        const updatedUser = await userModel.updateUser(login, hashPassword, id);
        res.status(200).json({ updatedUser }); // Répondre avec l'utilisateur mis à jour
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' }); // Gérer les erreurs serveur
    }
};

// Contrôleur pour récupérer tous les utilisateurs
export const getAllUser = async (req, res) => {
    try {
        // Appeler la fonction du modèle pour obtenir tous les utilisateurs
        const users = await userModel.getAllUser();
        res.status(200).json({ users }); // Répondre avec la liste des utilisateurs
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' }); // Gérer les erreurs serveur
    }
};

// Contrôleur pour supprimer un utilisateur par ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        // Appeler la fonction du modèle pour supprimer l'utilisateur
        const deletedUser = await userModel.deleteUser(id);
        res.status(200).json({ deletedUser }); // Répondre avec l'utilisateur supprimé
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' }); // Gérer les erreurs serveur
    }
};

// Contrôleur pour récupérer un utilisateur par ID
export const getById = async (req, res) => {
    const { id } = req.params;
    try {
        // Appeler la fonction du modèle pour obtenir l'utilisateur par ID
        const user = await userModel.getById(id);
        res.status(200).json({ user }); // Répondre avec les données de l'utilisateur
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' }); // Gérer les erreurs serveur
    }
};

// Contrôleur pour gérer la connexion de l'utilisateur
export const login = async (req, res) => {
    const { login, password } = req.body;

    try {
        // Récupérer l'utilisateur dans la base de données
        const user = await userModel.login(login);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" }); // Gérer l'utilisateur non trouvé
        }

        // Vérifier si le mot de passe fourni correspond au mot de passe haché stocké
        const checkPassword = bcrypt.compareSync(password, user[0].password);

        if (checkPassword) {
            // Générer un token JWT pour l'utilisateur
            const token = jwt.sign(
                {
                    id: user[0].id,
                    isAdmin: user[0].isAdmin
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.status(200).json({ message: "Succès", token }); // Répondre avec le token
        } else {
            res.status(401).json({ message: "Mot de passe invalide" }); // Gérer le mot de passe invalide
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' }); // Gérer les erreurs serveur
    }
};
