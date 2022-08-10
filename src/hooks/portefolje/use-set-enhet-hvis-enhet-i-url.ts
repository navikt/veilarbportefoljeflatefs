import {useQueryParams} from '../use-query-params';
import {velgEnhetForVeileder} from '../../ducks/valgt-enhet';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {useEffect, useState} from 'react';

export function useSetInitalEnhet() {
    const innloggetVeilederInfo = useSelector((state: AppState) => state.innloggetVeileder.data);

    const dispatch = useDispatch();
    const enhetId = useQueryParams().enhet;
    const enheter = innloggetVeilederInfo?.enheter;

    const [isTriggered, setTriggered] = useState<boolean>(false);

    useEffect(() => {
        if (!isTriggered && enhetId && innloggetVeilederInfo && enheter && enheter.length !== 0) {
            if (enheter.findIndex(enhet => enhet.enhetId === enhetId) >= 0) {
                setTriggered(true);
                dispatch(velgEnhetForVeileder(enhetId));
            }
        }
    }, [dispatch, enhetId, enheter, innloggetVeilederInfo, isTriggered]);

    if (!innloggetVeilederInfo) {
        return {hasError: true};
    }

    if (enheter?.length === 0) {
        return {hasError: true};
    }

    return {hasError: false};
}
