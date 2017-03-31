import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';

export const basename = '/veilarbportefoljeflatefs';
export default useRouterHistory(createHistory)({ basename });
