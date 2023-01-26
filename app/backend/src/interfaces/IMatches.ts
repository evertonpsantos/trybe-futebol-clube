interface IScore {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface IMatch extends IScore {
  homeTeamId: number,
  awayTeamId: number,
}

interface teamHomeMatches {
  teamName: string,
  homeMatches: []
}

export default IMatch;
export { IScore, teamHomeMatches };
