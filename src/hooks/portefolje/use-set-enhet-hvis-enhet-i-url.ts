import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useQueryParams} from '../use-query-params';
import {velgEnhetForVeileder} from '../../ducks/valgt-enhet';
import {AppState} from '../../reducer';
import {useAppDispatch} from '../../store';

export function useSetInitalEnhet() {
    const innloggetVeilederInfo = useSelector((state: AppState) => state.innloggetVeileder.data);

    const dispatch = useAppDispatch();
    const enhetId = useQueryParams().enhet;
    const enheter = innloggetVeilederInfo?.enheter;

    const [isTriggered, setIsTriggered] = useState<boolean>(false);

    useEffect(() => {
        if (!isTriggered && enhetId && innloggetVeilederInfo && enheter && enheter.length !== 0) {
            if (enheter.findIndex(enhet => enhet.enhetId === enhetId) >= 0) {
                setIsTriggered(true);
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
