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

    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password, salt);

    if (!bcrypt.compareSync(password, foundUser.password)) {
      return { error: 'INVALID_PASSWORD', message: 'Incorrect email or password' };
    }

    const userToken = this._jwt.generateToken({ ...foundUser });
    return { error: '', message: userToken };
  }
}
