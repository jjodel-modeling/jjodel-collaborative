import {Projects, Users} from '../../db';
import {Request, Response} from 'express';
import U from '../../common/u';

export class ProjectsController {
    static getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const token = String(req.headers['auth-token']);
            const author = await Users.getByToken(token);
            const projects = await Projects.getByAuthor(author.id);
            return res.status(200).send(projects);
        } catch (error) {return res.status(400).send(error);}
    }
    static getOne = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const project = await Projects.getById(id);
            if(!project) return res.status(400).send('Project Not Found.');
            return res.status(200).send(project);
        } catch (error) {return res.status(400).send(error);}
    }
    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id, name, type} = req.body;
            if (!id || !name || !type) return res.status(400).send('Missing required parameters.');
            const token = String(req.headers['auth-token']);
            const author = await Users.getByToken(token);
            await Projects.create({id, name, type, state: '', author: author.id, collaborators: []});
            return res.status(200).send('Project Created.');
        } catch (error) {return res.status(400).send(error);}
    }
    static delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const project = await Projects.getById(id);
            if(!project) return res.status(400).send('Project Not Found.');
            await Projects.delete(id);
            return res.status(200).send('Project Deleted.');
        } catch (error) {return res.status(400).send(error);}
    }
    static edit = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {id} = req.params;
            const project = await Projects.getById(id);
            if(!project) return res.status(400).send('Project Not Found.');
            const body = U.keepKeys(req.body, ['name', 'state', 'collaborators']);
            await Projects.update(id, body);
            return res.status(200).send('Project Edited.');
        } catch (error) {return res.status(400).send(error);}
    }
}
