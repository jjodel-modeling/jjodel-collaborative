import {Request, Response, NextFunction} from 'express';
import {Users} from '../db';

class AuthMiddleware {
    static isAuthenticated = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const token = String(req.headers['auth-token']);
            if(!token) return res.status(401).send('Token not provide.');
            const user = await Users.getByToken(token);
            if(!user) return res.status(401).send('Invalid Token.');
            return next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default AuthMiddleware;
