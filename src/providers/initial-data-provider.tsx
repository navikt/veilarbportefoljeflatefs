import React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {PropsWithChildren, useEffect } from "react";
import {hentFeaturesFraUnleash} from "../ducks/features";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {hentInloggetVeileder} from "../ducks/inlogget-veileder";
import {hentEnhetTiltak} from "../ducks/enhettiltak";
import {hentVeiledereForEnhet} from "../ducks/veiledere";


function InitialDataProvider(props: PropsWithChildren<{}>) {
    const inloggetVeileder = useSelector((state: AppState) => state.inloggetVeileder);
    const dispatch = useDispatch();
    const nyEnhet = useSelector((state: AppState) => state.valgtEnhet.data.enhetId);

    useEffect(()=> {
        dispatch(hentFeaturesFraUnleash());
        dispatch(hentInloggetVeileder());
        if(nyEnhet) {
            dispatch(hentEnhetTiltak(nyEnhet));
            dispatch(hentVeiledereForEnhet(nyEnhet));
        }
    },[dispatch, nyEnhet]);

    if(!nyEnhet) {
        return null;
    }

    return (
        <Innholdslaster avhengigheter={[inloggetVeileder]}>
            {props.children}
        </Innholdslaster>
    );

}

export default InitialDataProvider;
