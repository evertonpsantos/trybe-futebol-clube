import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const message = await MatchesService.getAll();
    return res.status(200).json(message);
  }
}
