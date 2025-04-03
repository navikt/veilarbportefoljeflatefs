import {useMemo} from 'react';
import {useLocation} from 'react-router';
import queryString from 'query-string';

export function useQueryParams() {
    const location = useLocation();
    return useMemo(() => queryString.parse(location.search), [location.search]);
}
