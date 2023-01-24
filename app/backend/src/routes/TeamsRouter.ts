import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/', teamsController.getAll);
teamsRouter.get('/:id', teamsController.getById);

export default teamsRouter;
