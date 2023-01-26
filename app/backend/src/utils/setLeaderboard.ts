import Team from '../database/models/Team';
import { calculateDraws, calculateEfficiency, calculateGoalsBalance, calculateGoalsFavor,
  calculateGoalsOwn, calculateLosses, calculateTotalPoints,
  calculateTotalVictories } from './calculateLeaderboard';

const leaderboardSorting = (a: any, b: any) =>
  b.totalPoints - a.totalPoints
|| b.totalVictories - a.totalVictories
|| b.goalsBalance - a.goalsBalance
|| b.goalsFavor - a.goalsFavor
|| b.goalsOwn - a.goalsOwn;

const settingHomeLeaderboard = (type: string, teamsList: Team[]) => teamsList
  .map(({ teamName, homeMatches }: any) => ({
    name: teamName,
    totalPoints: calculateTotalPoints(type, homeMatches),
    totalGames: homeMatches.length,
    totalVictories: calculateTotalVictories(type, homeMatches),
    totalDraws: calculateDraws(homeMatches),
    totalLosses: calculateLosses(type, homeMatches),
    goalsFavor: calculateGoalsFavor(type, homeMatches),
    goalsOwn: calculateGoalsOwn(type, homeMatches),
    goalsBalance: calculateGoalsBalance(type, homeMatches),
    efficiency: calculateEfficiency(type, homeMatches),
  })).sort(leaderboardSorting);

const settingAwayLeaderboard = (type: string, teamsList: Team[]) => teamsList
  .map(({ teamName, awayMatches }: any) => ({
    name: teamName,
    totalPoints: calculateTotalPoints(type, awayMatches),
    totalGames: awayMatches.length,
    totalVictories: calculateTotalVictories(type, awayMatches),
    totalDraws: calculateDraws(awayMatches),
    totalLosses: calculateLosses(type, awayMatches),
    goalsFavor: calculateGoalsFavor(type, awayMatches),
    goalsOwn: calculateGoalsOwn(type, awayMatches),
    goalsBalance: calculateGoalsBalance(type, awayMatches),
    efficiency: calculateEfficiency(type, awayMatches),
  })).sort(leaderboardSorting);

export { settingHomeLeaderboard, settingAwayLeaderboard };
