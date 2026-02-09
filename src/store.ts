import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';
import {metricsMiddleWare} from './middleware/metrics-middleware';

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(metricsMiddleWare),
    devTools: import.meta.env.MODE !== 'production'
});

export type AppDispatch = typeof store.dispatch;
