import { Router } from 'express';
import userRoutes from './userRoutes';

const router = Router();

// Register all routes
router.use('/users', userRoutes);

// Add more routes here as your app grows
// router.use('/photos', photoRoutes);
// router.use('/comments', commentRoutes);

export default router;
