// eslint-disable-next-line @typescript-eslint/no-unused-vars

export type UObject = { [key: string]: unknown; }
export type GObject<DocSubType = ''> = DocSubType extends object ? { [key: string]: any; } & DocSubType : { [key: string]: any; };

// export type Dictionary<K extends keyof any, T> = { [P in K]: T; };
export type Dictionary<K extends keyof GObject = any, V = any> = { [P in K]: V; };

export type Primitive = number|boolean|string|Dictionary;
export type ActionType = 'SET_ROOT_FIELD'|'SET_ME_FIELD'|'CREATE_ELEMENT'|'DELETE_ELEMENT';
export type ActionOperator = '='|'+='|'-=';
