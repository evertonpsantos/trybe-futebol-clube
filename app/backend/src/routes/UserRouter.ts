import { Router } from 'express';
import Validations from '../middlewares/validations';
import UserController from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', Validations.validateLoginRequest, userController.login);

export default userRouter;
