import Team from '../database/models/Team';
import { calculateDraws, calculateEfficiency, calculateGoalsBalance, calculateGoalsFavor,
  calculateGoalsOwn, calculateLosses, calculateTotalPoints,
  calculateTotalVictories } from './calculateHomeLeaderboard';

const settingHomeLeaderboard = (teamsList: Team[]) => teamsList
  .map(({ teamName, homeMatches }: any) => ({
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
  })).sort((a, b) =>
    b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn);

export default settingHomeLeaderboard;
