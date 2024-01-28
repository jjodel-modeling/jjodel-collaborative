import {Router} from 'express';
import {ProjectsController} from './controller';
import AuthMiddleware from '../../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(AuthMiddleware.isAuthenticated, ProjectsController.getAll)
    .post(AuthMiddleware.isAuthenticated, ProjectsController.create)

router
    .route('/:id')
    .get(AuthMiddleware.isAuthenticated, ProjectsController.getOne)
    .patch(AuthMiddleware.isAuthenticated, ProjectsController.edit)
    .delete(AuthMiddleware.isAuthenticated, ProjectsController.delete)


export {router as ProjectsRouter};

