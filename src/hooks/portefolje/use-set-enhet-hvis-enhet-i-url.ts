import {useQueryParams} from '../use-query-params';
import {velgEnhetForVeileder} from '../../ducks/valgt-enhet';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {useEffect} from 'react';

export function useSetInitalEnhet() {
    const innloggetVeilederInfo = useSelector((state: AppState) => state.innloggetVeileder.data);

    const dispatch = useDispatch();
    const enhetId = useQueryParams().enhet;

    useEffect(() => {
        if (enhetId && innloggetVeilederInfo && enheter.length !== 0) {
            if (enheter.findIndex(enhet => enhet.enhetId === enhetId) >= 0) {
                dispatch(velgEnhetForVeileder(enhetId));
            }
        }
    }, []);

    if (!innloggetVeilederInfo) {
        return {hasError: true};
    }

    const enheter = innloggetVeilederInfo.enheter;

    if (enheter.length === 0) {
        return {hasError: true};
    }

    return {hasError: false};
}
