interface IScore {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface IMatch extends IScore {
  homeTeamId: number,
  awayTeamId: number,
}

interface TeamHomeMatches {
  teamName: string,
  homeMatches: []
}

interface LeaderboardResults {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

export default IMatch;
export { IScore, TeamHomeMatches, LeaderboardResults };
