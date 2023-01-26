const calculateTotalPoints = (type: string, matches: []) => {
  let totalPoints = 0;
  if (type === 'home') {
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) totalPoints += 3;
      if (homeTeamGoals === awayTeamGoals) totalPoints += 1;
    });
    return totalPoints;
  }

  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals < awayTeamGoals) totalPoints += 3;
    if (homeTeamGoals === awayTeamGoals) totalPoints += 1;
  });

  return totalPoints;
};

const calculateTotalVictories = (type: string, matches: []) => {
  let totalVictories = 0;
  if (type === 'home') {
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) totalVictories += 1;
    });
    return totalVictories;
  }

  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals < awayTeamGoals) totalVictories += 1;
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

const calculateLosses = (type: string, matches: []) => {
  let totalLosses = 0;
  if (type === 'home') {
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) totalLosses += 1;
    });
    return totalLosses;
  }

  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) totalLosses += 1;
  });
  return totalLosses;
};

const calculateGoalsFavor = (type: string, matches: []) => {
  let totalGoals = 0;
  if (type === 'home') {
    matches.forEach(({ homeTeamGoals }) => {
      totalGoals += homeTeamGoals;
    });
    return totalGoals;
  }

  matches.forEach(({ awayTeamGoals }) => {
    totalGoals += awayTeamGoals;
  });
  return totalGoals;
};

const calculateGoalsOwn = (type: string, matches: []) => {
  let totalGoals = 0;
  if (type === 'home') {
    matches.forEach(({ awayTeamGoals }) => {
      totalGoals += awayTeamGoals;
    });
    return totalGoals;
  }

  matches.forEach(({ homeTeamGoals }) => {
    totalGoals += homeTeamGoals;
  });
  return totalGoals;
};

const calculateGoalsBalance = (type: string, matches: []) => {
  const goalsBalance = calculateGoalsFavor(type, matches) - calculateGoalsOwn(type, matches);
  return goalsBalance;
};

const calculateEfficiency = (type: string, matches: []) => {
  const totalPoints = calculateTotalPoints(type, matches);
  const matchesPlayed: number = matches.length;
  const efficiency = (totalPoints / (matchesPlayed * 3)) * 100;
  return efficiency.toFixed(2);
};

export { calculateTotalPoints, calculateTotalVictories, calculateDraws,
  calculateLosses, calculateGoalsFavor, calculateGoalsOwn, calculateGoalsBalance,
  calculateEfficiency };
