export type Dictionary = {[key: string] : unknown};
export type Primitive = number|boolean|string|Dictionary;
export type ActionType = 'SET_ROOT_FIELD'|'SET_ME_FIELD'|'CREATE_ELEMENT'|'DELETE_ELEMENT';
export type ActionOperator = '='|'+='|'-=';
