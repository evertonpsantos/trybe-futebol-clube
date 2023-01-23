import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const userLogin = req.body;
    const response = await this._userService.login(userLogin);
    return res.status(200).json(response);
  };
}
