import { Router, Request, Response } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

// Define controller types
type ControllerFn = (req: Request, res: Response) => Promise<void> | void;

router.get('/', userController.getUsers as ControllerFn);
router.get('/:id', userController.getUser as ControllerFn);
router.post('/', userController.createUser as ControllerFn);

export default router;
