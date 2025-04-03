import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEnhetSelector} from '../redux/use-enhet-selector';
import {AppState} from '../../reducer';
import {hentStatustallForVeileder} from '../../ducks/statustall/statustall-veileder';
import {hentStatustallForEnhet} from '../../ducks/statustall/statustall-enhet';
import {OrNothing} from '../../utils/types/types';

export function useFetchStatustallForVeileder(veilederId: string) {
    const dispatch = useDispatch();
    const enhet = useEnhetSelector();

    const statustall = useSelector((state: AppState) => state.statustallVeileder);

    useEffect(() => {
        if (enhet) {
            dispatch(hentStatustallForVeileder(enhet, veilederId));
        }
    }, [enhet, dispatch, veilederId]);

    return statustall;
}

export function useFetchStatustallForEnhet(enhetId: OrNothing<string>) {
    const dispatch = useDispatch();

    const statustall = useSelector((state: AppState) => state.statustallEnhet);

    useEffect(() => {
        if (enhetId) {
            dispatch(hentStatustallForEnhet(enhetId));
        }
    }, [enhetId, dispatch]);

    return statustall;
}
