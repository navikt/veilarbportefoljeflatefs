import React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {PropsWithChildren, useEffect } from "react";
import {hentFeaturesFraUnleash} from "../ducks/features";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {hentInloggetVeileder} from "../ducks/inlogget-veileder";


function InitialDataProvider(props: PropsWithChildren<{}>) {
    const inloggetVeileder = useSelector((state: AppState) => state.inloggetVeileder);
    const valgtEnhet = useSelector((state: AppState) => state.valgtEnhet);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(hentFeaturesFraUnleash());
        dispatch(hentInloggetVeileder());
    },[dispatch]);


    return (
        <Innholdslaster avhengigheter={[inloggetVeileder, valgtEnhet]}>
            {props.children}
        </Innholdslaster>
    );

}

export default InitialDataProvider;
