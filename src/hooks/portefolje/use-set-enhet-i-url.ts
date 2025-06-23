import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router';
import queryString from 'query-string';
import {useEnhetSelector} from '../redux/use-enhet-selector';

export function useSetEnhetIUrl() {
    const enhet = useEnhetSelector();
    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.pathname;

    useEffect(() => {
        if (enhet) {
            const parsed = queryString.parse(window.location.search);
            parsed.enhet = enhet;
            const stringified = queryString.stringify(parsed);
            navigate({pathname: pathname, search: stringified}, {replace: true});
        }
    }, [navigate, enhet, pathname]);
}
