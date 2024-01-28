import {Schema, model} from 'mongoose';

export class Projects {
    protected static Schema = new Schema({
        id: {type: String},
        name: {type: String},
        type: {type: String},
        state: {type: String},
        author: {type: String},
        collaborators: {type: [String]}
    });

    protected static Model = model(this.name.slice(0, -1), this.Schema);
    static keys = this.Schema.paths;

    static getAll = () => this.Model.find();
    static getById = (id: string) => this.Model.findOne({id});
    static getByAuthor = (author: string) => this.Model.find({author});
    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static delete = (id: string) => this.Model.findOneAndDelete({id});
    static update = (id: string, values: Record<string, unknown>) => this.Model.findOneAndUpdate({id}, values);
}
