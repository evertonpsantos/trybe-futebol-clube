import MatchesModel from '../database/models/Match';
import TeamsModel from '../database/models/Team';

export default class MatchesService {
  static async getAll() {
    const result = await MatchesModel.findAll({
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return result;
  }
}
