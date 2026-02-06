import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import reducer from './reducer';
import {metricsMiddleWare} from './middleware/metrics-middleware';

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(metricsMiddleWare),
    devTools: import.meta.env.MODE !== 'production'
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
