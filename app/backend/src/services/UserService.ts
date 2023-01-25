import * as bcrypt from 'bcryptjs';
import IUser, { IUserDB } from '../interfaces/IUser';
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

  static async getRole(user: IUserDB) {
    const userFound = await UserModel.findOne({ where: { email: user.email } });
    if (!userFound) return { error: 'USER_NOT_FOUND', message: 'User doesn\'t exists' };
    return { error: '', message: userFound.role };
  }
}
