import { NextFunction, Request, Response } from 'express';
import JWT from '../auth/JWT';

export default class Validations {
  constructor(private _jwt = new JWT()) {}

  static validateLoginRequest = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
    next();
  };

  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const errorMsg = 'Token must be a valid token';

    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ message: 'Token not found' });

    if (token.split('.').length !== 3) {
      return res.status(401).json({ message: errorMsg });
    }

    try {
      const userRole = this._jwt.validateToken(token);
      if (userRole.role !== 'admin' || !userRole) {
        return res.status(401).json({ message: errorMsg });
      }
      return next();
    } catch (error) {
      return res.status(401).json({ message: errorMsg });
    }
  };
}
