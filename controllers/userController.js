import * as userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createUser = async (req, res) => {
    const {login, password} = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 5);
        const createdUser = await userModel.createUser(login, hashPassword);
        res.status(201).json({createdUser})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur serveur'})
    }
};

export const updateUser = async (req, res) => {
    const {login, password} = req.body;
    const {id} = req.params;

    try {
        const hashPassword = bcrypt.hash(password,5);
        const updatedUser = await userModel.updateUser(login, hashPassword, id);
        res.status(200).json({updatedUser})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur serveur'})
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users =  await userModel.getAllUser();
        res.status(200).json({users})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur serveur'})
    }
};

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await userModel.deleteUser(id);
        res.status(200).json({deletedUser})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur serveur'})
    }
};

export const getById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await userModel.getById(id);
        res.status(200).json({user})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur serveur'})
    }
};

export const login = async (req, res) => {
    const {login, password} = req.body;

    try {

        const user = await userModel.login(login);

        if (!user){
            res.status(404).json({message : "user not found"})
        } 

        console.log(user[0].password);
        console.log(password);

        const checkPassword = bcrypt.compareSync(password, user[0].password)

        console.log(checkPassword);

        if (checkPassword == true){

            const token = jwt.sign(
                {
                    id: user[0].id,
                    isAdmin: user[0].isAdmin
                },
                process.env.JWT_SECRET
                ,
                {expiresIn: '1h'}
            );
            res.status(200).json({message: "success", token})
        } else {
            res.status(401).json({message: "invalid password"})
        }


        
    } catch (error) {
      console.error(error);
        res.status(500).json({message: 'Erreur serveur'})
    }
};
