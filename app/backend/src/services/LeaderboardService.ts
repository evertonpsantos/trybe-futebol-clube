import TeamModel from '../database/models/Team';
import MatchesModel from '../database/models/Match';
import { calculateDraws, calculateEfficiency, calculateGoalsBalance, calculateGoalsFavor,
  calculateGoalsOwn, calculateLosses,
  calculateTotalPoints, calculateTotalVictories } from '../utils/calculateLeaderboard';
// import { teamHomeMatches } from '../interfaces/IMatches';

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

    const mappedResult = result.map(({ teamName, homeMatches }: any) => ({
      name: teamName,
      totalPoints: calculateTotalPoints(homeMatches),
      totalGames: homeMatches.length,
      totalVictories: calculateTotalVictories(homeMatches),
      totalDraws: calculateDraws(homeMatches),
      totalLosses: calculateLosses(homeMatches),
      goalsFavor: calculateGoalsFavor(homeMatches),
      goalsOwn: calculateGoalsOwn(homeMatches),
      goalsBalance: calculateGoalsBalance(homeMatches),
      efficiency: calculateEfficiency(homeMatches),
    }));

    return mappedResult;
  }
}
