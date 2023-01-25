import { Router } from 'express';
import Validations from '../middlewares/validations';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();
const validations = new Validations();

matchesRouter.post('/', validations.validateToken, MatchesController.createNewMatch);
matchesRouter.patch('/:id/finish', MatchesController.finishMatch);
matchesRouter.patch('/:id', MatchesController.updateScore);
matchesRouter.get('/', MatchesController.getAll);

export default matchesRouter;
