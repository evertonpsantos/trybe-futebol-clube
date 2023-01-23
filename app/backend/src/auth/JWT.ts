// import { NextFunction, Request, Response } from 'express';
import { sign, SignOptions, Secret } from 'jsonwebtoken';
import { IUserDB } from '../interfaces/IUser';
// import UserModel from '../database/models/User';

export default class JWT {
  private _JwtSECRET: Secret = process.env.JWT_SECRET || 'cordiceps';
  private _JwtConfig: SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

  public generateToken({ id, username, role, email }: IUserDB) {
    const token = sign({ id, username, role, email }, this._JwtSECRET, this._JwtConfig);
    return token;
  }

  // public async validateToken(req: Request, res: Response, next: NextFunction) {
  //   const token = req.header('Authorization');
  //   if (!token) return res.status(401).json({ message: 'Token not found' });

  //   try {
  //     const verifiedToken = verify(token, this._JwtSECRET);
  //     const tokenUser = await UserModel.findByPk(verifiedToken.id);
  //     if (!tokenUser) {
  //       return res.status(401).json({ message: 'Expired or invalid token' });
  //     }
  //     req.user = tokenUser;
  //     next();
  //   } catch (error) {
  //     return res.status(401).json({ message: 'Expired or invalid token' });
  //   }
  // }
}
