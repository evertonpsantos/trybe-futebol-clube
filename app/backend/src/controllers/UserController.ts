import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const userLogin = req.body;
    const { error, message } = await this._userService.login(userLogin);
    if (error) return res.status(401).json({ message });
    return res.status(200).json({ token: message });
  };

  public getRole = async (req: Request, res: Response) => {
    const { user } = req.body;
    const { message } = await UserService.getRole(user);
    return res.status(200).json({ role: message });
  };
}
