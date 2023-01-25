import IMatch from '../interfaces/IMatches';
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

  static async getByQuery(query: boolean) {
    const result = await MatchesModel.findAll({
      where: { inProgress: query },
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return result;
  }

  static async createNewMatch(newMatch: IMatch) {
    const { homeTeamId, awayTeamGoals, awayTeamId, homeTeamGoals } = newMatch;
    const result = await MatchesModel
      .create({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true });
    return { error: '', message: result };
  }

  static async finishMatch(matchId: number) {
    const postToUpdate = await MatchesModel.findByPk(matchId);
    if (!postToUpdate) return { error: 'NOT_FOUND', message: 'Match doesn\'t exist' };

    await MatchesModel.update({ inProgress: false }, { where: { id: matchId } });

    return { error: '', message: 'Finished' };
  }
}
