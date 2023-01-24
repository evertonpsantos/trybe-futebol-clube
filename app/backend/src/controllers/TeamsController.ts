import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private _teamsService = new TeamsService()) {}

  public getAll = async (req: Request, res: Response) => {
    const { error, message } = await this._teamsService.getAll();
    if (error) return res.status(400).json(error);
    return res.status(200).json(message);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { error, message } = await this._teamsService.getById(Number(id));
    if (error) return res.status(404).json(error);
    return res.status(200).json(message);
  };
}
