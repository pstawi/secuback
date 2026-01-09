import * as userController from '../controllers/userController.js';
import express from 'express';
import { checkToken } from '../middleware/checkToken.js';

const router = express.Router();

router.post('/createUser', userController.createUser);
router.put('/updateUser/:id', checkToken, userController.updateUser);
router.get('/getAllUser', checkToken, userController.getAllUser);
router.delete('/deleteUser/:id', checkToken, userController.deleteUser);
router.get('/getById/:id', checkToken, userController.getById);
router.post('/login', userController.login);

export default router;