import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private _teamsService = new TeamsService()) {}

  public getAll = async (req: Request, res: Response) => {
    const { error, message } = await this._teamsService.getAll();
    if (error) return res.status(400).json(error);
    return res.status(200).json(message);
  };
}
