import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderboardController.leaderboardHome);
leaderboardRouter.get('/away', LeaderboardController.leaderboardAway);

export default leaderboardRouter;
