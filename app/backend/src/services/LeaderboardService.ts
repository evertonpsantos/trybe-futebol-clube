import TeamModel from '../database/models/Team';
import MatchesModel from '../database/models/Match';
import { settingHomeLeaderboard, settingAwayLeaderboard } from '../utils/setLeaderboard';

export default class LeaderboardService {
  static async leaderboardHome() {
    const homeResults = await TeamModel.findAll({
      include: [{
        model: MatchesModel,
        as: 'homeMatches',
        attributes: { exclude: ['id'] },
        where: { inProgress: false } }],
      attributes: { exclude: ['id'] },
    });

    const mappedResult = settingHomeLeaderboard('home', homeResults);

    return mappedResult;
  }

  static async leaderboardAway() {
    const awayResults = await TeamModel.findAll({
      include: [{
        model: MatchesModel,
        as: 'awayMatches',
        attributes: { exclude: ['id'] },
        where: { inProgress: false } }],
      attributes: { exclude: ['id'] },
    });

    const mappedResult = settingAwayLeaderboard('away', awayResults);

    return mappedResult;
  }
}
