import {TAction, Actions} from '../db/actions';
import U from '../common/u';

export class ActionsController {
    static get = async(project: string): Promise<TAction[]> => {
        try {
            const DBActions = await Actions.getByProject(project);
            return DBActions.map(a=>U.clean(a));
            /*const actions: TAction[] = [];
            for (const DBAction of DBActions) {
                const action: TAction = {} as any;
                for (const key in Actions.keys) action[key] = DBAction[key] || U.defaultValue(Actions.keys[key]);
                actions.push(U.clean(action));
            }
            return actions;*/
        } catch (error) { return []; }
    }

    static create = async (action: TAction, project: string): Promise<void> => {
        return Actions.create({...action, projectId: project});
    }

    static delete = async(project: string): Promise<void> => {
        return Actions.deleteByProject(project);
    }
}
