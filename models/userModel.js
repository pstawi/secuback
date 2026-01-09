// Importer la connexion à la base de données
import connexion from '../config/bdd.js';

// Fonction pour créer un nouvel utilisateur dans la base de données
export const createUser = async (login, password) => {
    const create = 'INSERT INTO user (login, password, isAdmin) VALUES (?,?, FALSE);';
    const [result] = await connexion.query(create, [login, password]);
    return result;
};

// Fonction pour mettre à jour les informations d'un utilisateur existant dans la base de données
export const updateUser = async (login, password, id) => {
    const update = 'UPDATE user SET login = ?, password = ? WHERE id = ?;';
    const [result] = await connexion.query(update, [login, password, id]);
    return result;
};

// Fonction pour récupérer tous les utilisateurs de la base de données
export const getAllUser = async () => {
    const select = 'SELECT id, login, isAdmin FROM user;';
    const [result] = await connexion.query(select);
    return result;
};

// Fonction pour supprimer un utilisateur par ID de la base de données
export const deleteUser = async (id) => {
    const deleteUser = 'DELETE FROM user WHERE id = ?';
    const [result] = await connexion.query(deleteUser, [id]);
    return result;
};

// Fonction pour récupérer un utilisateur par ID de la base de données
export const getById = async (id) => {
    const selectById = 'SELECT id, login FROM user WHERE id = ?;';
    const [result] = await connexion.query(selectById, [id]);
    return result;
};

// Fonction pour récupérer les informations de connexion d'un utilisateur pour l'authentification
export const login = async (login) => {
    const select = 'SELECT login, password, id, isAdmin FROM user WHERE login = ?;';
    const [result] = await connexion.query(select, [login]);
    return result;
};