import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import UserModel from '../database/models/User';
import JWT from '../auth/JWT';

export default class UserService {
  private _jwt = new JWT();

  public async login(user: IUser) {
    const { email, password } = user;
    const foundUser = await UserModel.findOne({ where: { email } });
    if (!foundUser) return { error: 'INVALID_EMAIL', message: 'Incorrect email or password' };

    if (!bcrypt.compareSync(password, foundUser.password)) {
      return { error: 'INVALID_PASSWORD', message: 'Incorrect email or password' };
    }

    const userToken = this._jwt.generateToken(foundUser);
    return { error: '', message: userToken };
  }

  public getRole(token: string) {
    const verifiedToken = this._jwt.validateToken(token);
    return { error: '', message: verifiedToken.role };
  }
}
