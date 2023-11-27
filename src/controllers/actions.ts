import {Actions} from '../db/actions';
import U from '../common/u';

export class ActionsController {
    static get = async(project: string): Promise<Record<string, unknown>[]> => {
        try {
            const DBActions = await Actions.getByProject(project);
            const actions = [];
            for(const DBAction of DBActions) {
                const action = {};
                for(const key in Actions.keys)
                    action[key] = DBAction[key] || U.defaultValue(Actions.keys[key]);
                actions.push(U.clean(action));
            }
            return actions;
        } catch(error) {return [];}
    }

    static create = async (action: Record<string, unknown>, project: string): Promise<void> => {
        await Actions.create({...action, projectId: project});
    }

    static delete = async(project: string): Promise<void> => {
        await Actions.deleteByProject(project);
    }
}
