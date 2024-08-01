import {useHistory, useLocation} from 'react-router';
import {useDispatch} from 'react-redux';
import queryString from 'query-string';
import {useOnMount} from './use-on-mount';
import {settSortering} from '../ducks/portefolje';

export function useRedirectOnMount() {
    const history = useHistory();
    const location = useLocation();
    const lastPath = localStorage.getItem('lastpath');
    const lastSearch = localStorage.getItem('lastsearch') ?? '';
    const pathname = location.pathname;
    const dispatch = useDispatch();

    const parsed = queryString.parse(location.search);

    useOnMount(() => {
        if (Object.keys(parsed).includes('clean')) {
            delete parsed.clean;
            const stringified = queryString.stringify(parsed);
            dispatch(settSortering('ikke_satt', 'ikke_satt'));
            history.replace(`${pathname}?${stringified}`);
        } else if (lastPath && location.pathname === '/tilbake') {
            history.replace({pathname: lastPath, search: lastSearch});
            const sorteringsfelt = queryString.parse(lastSearch).sorteringsfelt;
            const sortDirection = queryString.parse(lastSearch).sorteringsrekkefolge;
            dispatch(settSortering(sortDirection, sorteringsfelt));
        } else if (location.pathname === '/tilbake' || location.pathname === '/') {
            history.push('/enhet');
            dispatch(settSortering('ikke_satt', 'ikke_satt'));
        }
    });
}
