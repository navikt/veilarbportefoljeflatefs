import {Action} from 'redux';

export type DataAction<T, D> = Action<T> & {data?: D};
