import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderboardController.leaderboardHome);

export default leaderboardRouter;
