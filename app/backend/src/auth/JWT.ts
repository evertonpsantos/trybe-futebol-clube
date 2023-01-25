import { sign, SignOptions, Secret, verify } from 'jsonwebtoken';
import { IUserDB } from '../interfaces/IUser';

export default class JWT {
  private _JwtSECRET: Secret = process.env.JWT_SECRET || 'cordiceps';
  private _JwtConfig: SignOptions = { algorithm: 'HS256', expiresIn: '5d' };

  public generateToken({ id, username, role, email }: IUserDB) {
    const token = sign({ id, username, role, email }, this._JwtSECRET, this._JwtConfig);
    return token;
  }

  public validateToken(token: string): IUserDB {
    const verifiedToken = verify(token, this._JwtSECRET);
    return verifiedToken as IUserDB;
  }
}
