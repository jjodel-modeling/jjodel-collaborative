import {ActionOperator, Dictionary, Primitive} from '../common/types';
import U from '../common/u';

class Action {
    static toString(action: Dictionary): string {
        if(action['className'] !== 'CompositeAction')
            return `${action['className']} -> ${action['path']} = ${action['value']}`;
        const actions = action['actions'];
        let str = 'CompositeAction (' + actions?.length+')' + '\n' + '**********BEGIN**********';
        if (Array.isArray(actions))
            for (const action of actions) str += '\n' + Action.toString(action);
        str += '\n' + '***********END***********';
        return str;
    }

    static SET_FIELD(data: string, field: string, op: ActionOperator, value: Primitive, isPointer: boolean): Dictionary {
        const timestamp = Date.now();
        const operator = (op == '=') ? '' : op;
        const path = `idlookup.${data}.${field}${operator}`;
        return {
            className: 'SetFieldAction',
            type: 'SET_ME_FIELD',
            id: `Action_${timestamp}_${U.getRandomString(5)}`,
            timestamp: timestamp,
            sender: 'Collaborative Server',
            hasFired: 0,
            field: path,
            value: value,
            isPointer: isPointer
        };
    }
}

export default Action;
