import Team from '../database/models/Team';

export default class TeamsService {
  private _errorMsg = '';

  public async getAll() {
    const result = await Team.findAll();
    return { error: this._errorMsg, message: result };
  }

  public async getById(id: number) {
    const result = await Team.findOne({ where: { id } });
    return { error: this._errorMsg, message: result };
  }
}
