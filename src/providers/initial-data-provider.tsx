import {PropsWithChildren, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Innholdslaster} from '../innholdslaster/innholdslaster';
import {hentFeaturesFraUnleash} from '../ducks/features';
import {AppState} from '../reducer';
import {hentInnloggetVeileder} from '../ducks/innlogget-veileder';
import {hentSystemmeldinger} from '../ducks/systemmeldinger';
import {hentBrukerIKontekst} from '../ducks/bruker-i-kontekst';
import {hentEnhetIKontekst} from '../ducks/valgt-enhet';

import {useAppDispatch} from '../hooks/redux/use-app-dispatch';

export function InitialDataProvider({children}: PropsWithChildren<{}>) {
    const innloggetVeilederState = useSelector((state: AppState) => state.innloggetVeileder);
    const brukerIKontekstState = useSelector((state: AppState) => state.brukerIKontekst);
    const enhetIKontekstState = useSelector((state: AppState) => state.valgtEnhet);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hentInnloggetVeileder());
        dispatch(hentSystemmeldinger());
        dispatch(hentBrukerIKontekst());
        dispatch(hentEnhetIKontekst());
    }, [dispatch]);

    // Hent features fra Unleash ved mount og deretter hvert 5. minutt - rerender kun ved endringer og man ikke er i redigerings-modus
    useEffect(() => {
        dispatch(hentFeaturesFraUnleash());
        const id = setInterval(() => dispatch(hentFeaturesFraUnleash()), 5 * 60 * 1000);
        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <Innholdslaster avhengigheter={[innloggetVeilederState, brukerIKontekstState, enhetIKontekstState]}>
            {children}
        </Innholdslaster>
    );
}
