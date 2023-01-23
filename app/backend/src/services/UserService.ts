import IUser from '../interfaces/IUser';
import UserModel from '../database/models/User';

export default class UserService {
  private _token = 'xaxxa88098s80maokmWWW';

  public async login(user: IUser) {
    const { email } = user;
    const foundUser = await UserModel.findOne({ where: { email } });
    return { foundUser, token: this._token };
  }
}
