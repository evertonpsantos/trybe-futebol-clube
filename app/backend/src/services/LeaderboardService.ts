import settingHomeLeaderboard from '../utils/setLeaderboard';
import TeamModel from '../database/models/Team';
import MatchesModel from '../database/models/Match';

export default class LeaderboardService {
  static async leaderboardHome() {
    const result = await TeamModel.findAll({
      include: [{
        model: MatchesModel,
        as: 'homeMatches',
        attributes: { exclude: ['id'] },
        where: { inProgress: false } }],
      attributes: { exclude: ['id'] },
    });

    const mappedResult = settingHomeLeaderboard(result);

    return mappedResult;
  }
}
