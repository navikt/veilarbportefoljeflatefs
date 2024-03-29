import React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {PropsWithChildren, useEffect} from 'react';
import {hentFeaturesFraUnleash, hentFeatureForVedtaksstotte} from '../ducks/features';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../reducer';
import {hentInnloggetVeileder} from '../ducks/innlogget-veileder';
import {hentSystemmeldinger} from '../ducks/systemmeldinger';
import {hentBrukerIKontekst} from '../ducks/bruker-i-kontekst';

function InitialDataProvider({children}: PropsWithChildren<{}>) {
    const innloggetVeilederState = useSelector((state: AppState) => state.innloggetVeileder);
    const brukerIKontekstState = useSelector((state: AppState) => state.brukerIKontekst);
    const valgtEnhetId = useSelector((state: AppState) => state.valgtEnhet.data.enhetId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentFeaturesFraUnleash());
        dispatch(hentInnloggetVeileder());
        dispatch(hentSystemmeldinger());
        dispatch(hentBrukerIKontekst());
    }, [dispatch]);

    useEffect(() => {
        if (valgtEnhetId) {
            dispatch(hentFeatureForVedtaksstotte(valgtEnhetId));
        }
    }, [valgtEnhetId, dispatch]);

    return <Innholdslaster avhengigheter={[innloggetVeilederState, brukerIKontekstState]}>{children}</Innholdslaster>;
}

export default InitialDataProvider;
