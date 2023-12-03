import {setupWorker} from 'msw/browser';
import {allHandlers} from './api';

export const worker = setupWorker(...allHandlers);
