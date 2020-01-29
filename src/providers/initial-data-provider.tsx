import React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {PropsWithChildren, useEffect } from "react";
import {hentFeaturesFraUnleash} from "../ducks/features";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {hentInloggetVeileder} from "../ducks/inlogget-veileder";
import NavFrontendSpinner from "nav-frontend-spinner";
import {useRedirectOnMount} from "../hooks/use-redirect-on-mount";
import {useFetchEnheter} from "../hooks/portefolje/use-fetch-enheter-hvis-enhet-i-url";


function InitialDataProvider(props: PropsWithChildren<{}>) {
    const inloggetVeileder = useSelector((state: AppState) => state.inloggetVeileder);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(hentFeaturesFraUnleash());
        dispatch(hentInloggetVeileder());
    },[dispatch]);


    useRedirectOnMount();

    const {isLoading } = useFetchEnheter();

    if(isLoading) {
        return <NavFrontendSpinner type="L"/>
    }

    return (
        <Innholdslaster avhengigheter={[inloggetVeileder]}>
            {props.children}
        </Innholdslaster>
    );

}

export default InitialDataProvider;
