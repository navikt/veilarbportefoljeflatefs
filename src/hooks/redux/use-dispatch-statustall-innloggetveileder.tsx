import { useDispatch } from 'react-redux';
import { useEnhetSelector } from './use-enhet-selector';
import { useEffect } from 'react';
import { useIdentSelector } from './use-enheter-ident';
import { hentStatusTallForInnloggetVeileder } from '../../ducks/statustall-innloggetveileder';

export function useDispatchStatustallInnloggetveileder() {
    const dispatch = useDispatch();
    const innloggetVeileder = useIdentSelector();
    const valgtEnhet = useEnhetSelector();

    useEffect(() => {
        if (valgtEnhet) {
            dispatch(hentStatusTallForInnloggetVeileder(valgtEnhet.enhetId, innloggetVeileder));
        }
    }, [dispatch, valgtEnhet, innloggetVeileder]);
}
