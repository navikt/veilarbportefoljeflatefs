import React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {PropsWithChildren, useEffect} from 'react';
import {hentFeaturesFraUnleash, hentFeatureForVedtaksstotte} from '../ducks/features';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../reducer';
import {hentInnloggetVeileder} from '../ducks/innlogget-veileder';

function InitialDataProvider(props: PropsWithChildren<{}>) {
    const innloggetVeileder = useSelector((state: AppState) => state.innloggetVeileder);
    const valgtEnhet = useSelector((state: AppState) => state.valgtEnhet.data.enhetId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentFeaturesFraUnleash());
        dispatch(hentInnloggetVeileder());
    }, [dispatch]);

    useEffect(() => {
        if (valgtEnhet) {
            dispatch(hentFeatureForVedtaksstotte(valgtEnhet));
        }
    }, [valgtEnhet, dispatch]);

    return <Innholdslaster avhengigheter={[innloggetVeileder]}>{props.children}</Innholdslaster>;
}

export default InitialDataProvider;
