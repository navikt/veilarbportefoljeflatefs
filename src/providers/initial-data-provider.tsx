import React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {PropsWithChildren, useEffect} from 'react';
import {hentFeaturesFraUnleash, hentFeatureForVedtaksstotte} from '../ducks/features';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../reducer';
import {hentInnloggetVeileder} from '../ducks/innlogget-veileder';
import {hentSystemmeldinger} from '../ducks/systemmeldinger';
import {hentResterendeSekunder} from '../middleware/api';
import {erGCP} from '../utils/utils';

function InitialDataProvider(props: PropsWithChildren<{}>) {
    const innloggetVeileder = useSelector((state: AppState) => state.innloggetVeileder);
    const valgtEnhet = useSelector((state: AppState) => state.valgtEnhet.data.enhetId);
    const dispatch = useDispatch();

    useEffect(() => {
        setWonderWallTimeout();
        dispatch(hentFeaturesFraUnleash());
        dispatch(hentInnloggetVeileder());
        dispatch(hentSystemmeldinger());
    }, [dispatch]);

    useEffect(() => {
        if (valgtEnhet) {
            dispatch(hentFeatureForVedtaksstotte(valgtEnhet));
        }
    }, [valgtEnhet, dispatch]);

    return <Innholdslaster avhengigheter={[innloggetVeileder]}>{props.children}</Innholdslaster>;
}

function setWonderWallTimeout() {
    hentResterendeSekunder()
        .then(remainingSeconds => {
            window.setTimeout(() => window.location.reload(), remainingSeconds * 1000);

            const timeoutTekst = 'Du vil snart bli logget inn på nytt';
            if (remainingSeconds >= 120) {
                window.setTimeout(() => window.alert(timeoutTekst), (remainingSeconds - 120) * 1000);
            } else {
                // Smart løsning for å unngå å spamme veielder for hvert refresh...
            }
        })
        .catch(e => {
            if (erGCP()) {
                console.error(e);
            }
        });
}

export default InitialDataProvider;
