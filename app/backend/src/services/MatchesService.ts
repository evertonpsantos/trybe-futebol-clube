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

  static async createNewMatch({ homeTeamId, awayTeamGoals, awayTeamId, homeTeamGoals }: IMatch) {
    if (homeTeamId === awayTeamId) {
      return {
        error: 'SAME_TEAM_ID',
        message: 'It is not possible to create a match with two equal teams' };
    }

    const teamsList = await MatchesModel.findAll();
    const mappedList = teamsList.map(({ id }) => id);
    const notFoundCategory = [homeTeamId, awayTeamId]
      .every((teamId) => mappedList.includes(teamId));
    if (!notFoundCategory) {
      return { error: 'TEAM_NOT_FOUND',
        message: 'There is no team with such id!' };
    }

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
