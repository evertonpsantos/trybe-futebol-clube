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

  static createNewMatch = async (req: Request, res: Response) => {
    const newMatch = req.body;

    const { error, message } = await MatchesService.createNewMatch(newMatch);
    if (error) return res.status(401).json(message);
    return res.status(201).json(message);
  };
}
