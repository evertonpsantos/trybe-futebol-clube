import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const inProgressFilter = (inProgress === 'true');

    if (!inProgress) {
      const message = await MatchesService.getAll();
      return res.status(200).json(message);
    }

    const message = await MatchesService.getByQuery(inProgressFilter);
    return res.status(200).json(message);
  }
}
