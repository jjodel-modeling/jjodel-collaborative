// import {Schema, model} from 'mongoose';
import {Dictionary} from "../common/types";

/*
export class ActionsDB {
    protected static Schema = new Schema({
        className: {type: String},
        id: {type: String},
        timestamp: {type: String},
        sender: {type: String},
        hasFired: {type: Boolean},
        consoleTargetSelector: {type: String},
        type: {type: String},
        field: {type: String},
        value: {type: Schema.Types.Mixed},
        actions: {type: [Schema.Types.Mixed]},
        isPointer: {type: Boolean},
        path: {type: String},
        pathArray: {type: [String]},
        executionCount: {type: Number},
        projectId: {type: String}
    });
    protected static Model = model(this.name.slice(0, -1), this.Schema);
    static keys = this.Schema.paths;

    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static getByProject = (projectId: string) => this.Model.find({projectId}).sort({timestamp: 'asc'});
    static deleteByProject = (projectId: string) => this.Model.deleteMany({projectId});
}
*/

export class TAction {
    actions?: TAction[];
    pathArray: string[];
    id?: string;
    className?: string;
    type?: string;
    timestamp?: string;
    sender?: string;
    hasFired?: boolean;
    consoleTargetSelector?: string;
    field?: string;
    value?: any;
    isPointer?: boolean;
    path?: string;
    executionCount?: number;
    projectId: string;
}

// definitely not scalable, but expected size is small enough to be kept in ram, even for many users.

export const actions: Dictionary<string, TAction[]> = {};
export class Actions {
    //protected static Schema = new TAction();
    //static keys = this.Schema.paths;

    static create = (action: TAction) => {
        actions[action.projectId].push(action);
        return Promise.resolve();
        // new this.Model(values).save().then(entity => entity.toObject());
    }
    static getByProject = (projectId: string) => {
        if (actions[projectId]) return Promise.resolve(actions[projectId]);
        else return Promise.resolve(actions[projectId] = [] as TAction[]);
    } // this.Model.find({projectId}).sort({timestamp: 'asc'});
    static deleteByProject = (projectId: string) => {
        delete actions[projectId];
        return Promise.resolve();
        //this.Model.deleteMany({projectId});
    }
}
