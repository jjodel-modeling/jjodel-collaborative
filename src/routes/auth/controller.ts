import {Request, Response} from 'express';
import {Users} from '../../db';
import U from '../../common/u';

export class AuthController {
    static register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {username, email, password} = req.body;
            if (!username || !email || !password) return res.status(400).send('Missing required parameters.');
            const existingEmail = await Users.getByEmail(email);
            if (existingEmail) return res.status(400).send('Email already taken.');
            const user = await Users.create({username, email,
                id: `Pointer${Date.now()}_USER_${username}`,
                password: U.encrypt(password),
                token: U.token()
            });
            return res.status(200).send(user);
        } catch (error) {return res.status(400).send(error);}
    }

    static login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {email, password} = req.body;
            if (!email || !password) return res.status(400).send('Missing required parameters.');
            const user = await Users.getByEmail(email);
            if (!user) return res.status(403).send('Bad Credentials.');
            if(user.password !== U.encrypt(password)) return res.status(403).send('Bad Credentials.');
            user.token = U.token();
            await user.save();
            return res.status(200).send(user);
        } catch (error) {return res.status(400).send(error);}
    }

    static logout = async (req: Request, res: Response): Promise<Response> => {
        try {
            const token = String(req.headers['auth-token']);
            const user = await Users.getByToken(token);
            user.token = ''; await user.save();
            return res.status(200).send(user);
        } catch (error) {return res.status(400).send(error);}
    }
}
