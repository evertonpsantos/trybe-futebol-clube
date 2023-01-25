import { Router } from 'express';
// import Validations from '../middlewares/validations';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();
// const validations = new Validations();

matchesRouter.post('/', MatchesController.createNewMatch);
matchesRouter.get('/', MatchesController.getAll);
matchesRouter.patch('/:id/finish', MatchesController.finishMatch);

export default matchesRouter;
