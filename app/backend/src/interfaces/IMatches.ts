interface IScore {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface IMatch extends IScore {
  homeTeamId: number, // O valor deve ser o id do time
  awayTeamId: number, // O valor deve ser o id do time

}

export default IMatch;
export { IScore };
