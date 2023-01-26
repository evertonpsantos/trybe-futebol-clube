import { LeaderboardResults } from '../interfaces/IMatches';
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

const settingGeneralLeaderboard = (homeMatches: any, awayMatches: any) => {
  const findSameTeam = (teamName: string, property: string) => {
    const found = awayMatches.find((team1: any) => team1.name === teamName) as any;
    return found[property];
  };
  return homeMatches.map((team: LeaderboardResults) => ({
    name: team.name,
    totalPoints: team.totalPoints + findSameTeam(team.name, 'totalPoints'),
    totalGames: team.totalGames + findSameTeam(team.name, 'totalGames'),
    totalVictories: team.totalVictories + findSameTeam(team.name, 'totalVictories'),
    totalDraws: team.totalDraws + findSameTeam(team.name, 'totalDraws'),
    totalLosses: team.totalLosses + findSameTeam(team.name, 'totalLosses'),
    goalsFavor: team.goalsFavor + findSameTeam(team.name, 'goalsFavor'),
    goalsOwn: team.goalsOwn + findSameTeam(team.name, 'goalsOwn'),
    goalsBalance: team.goalsBalance + findSameTeam(team.name, 'goalsBalance'),
    efficiency: (((team.totalPoints
        + findSameTeam(team.name, 'totalPoints')) / ((team.totalGames
          + findSameTeam(team.name, 'totalGames')) * 3)) * 100).toFixed(2),
  })).sort(leaderboardSorting);
};

export { settingHomeLeaderboard, settingAwayLeaderboard, settingGeneralLeaderboard };
