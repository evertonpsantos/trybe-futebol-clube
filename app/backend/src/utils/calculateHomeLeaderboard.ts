const calculateTotalPoints = (matches: []) => {
  let totalPoints = 0;
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) totalPoints += 3;
    if (homeTeamGoals === awayTeamGoals) totalPoints += 1;
  });
  return totalPoints;
};

const calculateTotalVictories = (matches: []) => {
  let totalVictories = 0;
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) totalVictories += 1;
  });
  return totalVictories;
};

const calculateDraws = (matches: []) => {
  let totalDraws = 0;
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals === awayTeamGoals) totalDraws += 1;
  });
  return totalDraws;
};

const calculateLosses = (matches: []) => {
  let totalLosses = 0;
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals < awayTeamGoals) totalLosses += 1;
  });
  return totalLosses;
};

const calculateGoalsFavor = (matches: []) => {
  let totalGoals = 0;
  matches.forEach(({ homeTeamGoals }) => {
    totalGoals += homeTeamGoals;
  });
  return totalGoals;
};

const calculateGoalsOwn = (matches: []) => {
  let totalGoals = 0;
  matches.forEach(({ awayTeamGoals }) => {
    totalGoals += awayTeamGoals;
  });
  return totalGoals;
};

const calculateGoalsBalance = (matches: []) => {
  const goalsBalance = calculateGoalsFavor(matches) - calculateGoalsOwn(matches);
  return goalsBalance;
};

const calculateEfficiency = (matches: []) => {
  const totalPoints = calculateTotalPoints(matches);
  const matchesPlayed: number = matches.length;
  const efficiency = (totalPoints / (matchesPlayed * 3)) * 100;
  return efficiency.toFixed(2);
};

export { calculateTotalPoints, calculateTotalVictories, calculateDraws,
  calculateLosses, calculateGoalsFavor, calculateGoalsOwn, calculateGoalsBalance,
  calculateEfficiency };
