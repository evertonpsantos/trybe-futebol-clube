import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private _teamsService = new TeamsService()) {}

  public getAll = async (req: Request, res: Response) => {
    const { message } = await this._teamsService.getAll();
    return res.status(200).json(message);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { message } = await this._teamsService.getById(Number(id));
    return res.status(200).json(message);
  };
}
