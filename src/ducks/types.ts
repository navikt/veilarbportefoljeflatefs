import {Action} from 'redux';

export type DataAction<ACTION_TYPE extends string, DATA_TYPE> = Action<ACTION_TYPE> & {data?: DATA_TYPE};
