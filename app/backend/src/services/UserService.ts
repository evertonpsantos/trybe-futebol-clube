import IUser from '../interfaces/IUser';
import UserModel from '../database/models/User';
import JWT from '../auth/JWT';

export default class UserService {
  private _jwt = new JWT();

  public async login(user: IUser) {
    const { email } = user;
    const foundUser = await UserModel.findOne({ where: { email } });
    if (!foundUser) return { message: 'Incorrect email or password' };
    const userToken = this._jwt.generateToken({ ...foundUser });
    return { message: userToken };
  }
}
