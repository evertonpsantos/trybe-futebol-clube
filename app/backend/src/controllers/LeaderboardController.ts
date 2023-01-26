import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async leaderboardHome(req: Request, res: Response) {
    const message = await LeaderboardService.leaderboardHome();
    return res.status(200).json(message);
  }
}
