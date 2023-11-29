import {SchemaType} from 'mongoose';
import {Dictionary, Primitive} from './types';

class U {
    static getRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
        let index = 0;
        while(index < length) {
            const randomNumber = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomNumber);
            index += 1;
        }
        return randomString;
    }

    static sleep(s: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, s * 1000));
    }

    static clean(e: Dictionary, className?: string): Dictionary {
        delete e['_id']; delete e['__v']; delete e['projectId'];
        if(className) e['className'] = className;
        return e;
    }
    static defaultValue(schema: SchemaType): Primitive|Primitive[] {
        switch (schema.instance) {
            case 'Number': return 0;
            case 'Boolean': return false;
            case 'String': return '';
            case 'Mixed': return {};
            default : return [];
        }
    }
}

export default U;
