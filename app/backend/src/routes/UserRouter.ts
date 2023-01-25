import { Router } from 'express';
import Validations from '../middlewares/validations';
import UserController from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();
const validations = new Validations();

userRouter.post('/', Validations.validateLoginRequest, userController.login);
userRouter.get('/validate', validations.validateToken, userController.getRole);

export default userRouter;
