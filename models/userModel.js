import connexion from '../config/bdd.js'

export const createUser = async (login, password) => {
    const create = 'INSERT INTO user (login, password, isAdmin) VALUES (?,?, FALSE);';
    const [result] = await connexion.query(create, [login, password])
    return result;
}

export const updateUser = async(login, password, id) => {
    const update = 'UPDATE user SET login = ?, password = ? WHERE id = ?;';
    const [result] = await connexion.query(update, [login, password, id]);
    return result;
}

export const getAllUser = async() => {
    const select = 'SELECT id, login, isAdmin FROM user;'
    const [result] = await connexion.query(select);
    return result;
}

export const deleteUser = async(id) => {
    const deleteUser = 'DELETE FROM user WHERE id = ?';
    const [result] = await connexion.query(deleteUser, [id]);
    return result;
}

export const getById = async(id) => {
    const selectById = 'SELECT id, login FROM user WHERE id = ?;';
    const [result] = await connexion.query(selectById, [id]);
    return result;
}

export const login = async (login) => {
    const select = 'SELECT login, password, id, isAdmin FROM user WHERE login = ?;';
    const [result] = await connexion.query(select, [login]);
    return result;
}