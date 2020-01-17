import { useDispatch } from 'react-redux';
import { useEnhetSelector } from './use-enhet-selector';
import { useEffect } from 'react';
import { useIdentSelector } from './use-inlogget-ident';
import { hentStatusTallForInnloggetVeileder } from '../../ducks/statustall-innloggetveileder';

export function useDispatchStatustallInnloggetveileder() {
    const dispatch = useDispatch();
    const innloggetVeileder = useIdentSelector();
    const ident = innloggetVeileder && innloggetVeileder.ident;
    const valgtEnhet = useEnhetSelector();


    useEffect(() => {
        if (valgtEnhet) {
            dispatch(hentStatusTallForInnloggetVeileder(valgtEnhet, ident));
        }
    }, [dispatch, valgtEnhet, ident]);

}
