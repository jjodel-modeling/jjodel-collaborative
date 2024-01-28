import {Router} from 'express';
import {AuthController} from './controller';
import AuthMiddleware from '../../middlewares/auth';

const router = Router();

router
    .route('/register')
    .post(AuthController.register)

router
    .route('/login')
    .post(AuthController.login)

router
    .route('/logout')
    .delete(AuthMiddleware.isAuthenticated, AuthController.logout)

export {router as AuthRouter};

