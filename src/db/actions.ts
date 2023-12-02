import {Schema, model} from 'mongoose';

export class Actions {
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
