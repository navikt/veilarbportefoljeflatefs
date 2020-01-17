import React, {useMemo, useState} from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {PropsWithChildren, useEffect } from "react";
import {hentFeaturesFraUnleash} from "../ducks/features";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {hentInloggetVeileder} from "../ducks/inlogget-veileder";
import {hentEnhetTiltak} from "../ducks/enhettiltak";
import {hentVeiledereForEnhet} from "../ducks/veiledere";
import {fetchData, velgEnhetForVeileder} from "../ducks/valgt-enhet";
import {useHistory, useLocation} from "react-router";
import {useQueryParams} from "../hooks/use-query-params";
import {useEnhetSelector} from "../hooks/redux/use-enhet-selector";
import {useOnMount} from "../hooks/use-on-mount";
import NavFrontendSpinner from "nav-frontend-spinner";

interface Enheter {
    ident: string;
    enhetliste: {enhetId: string, navn: string}[]
}


function InitialDataProvider(props: PropsWithChildren<{}>) {
    const inloggetVeileder = useSelector((state: AppState) => state.inloggetVeileder);
    const dispatch = useDispatch();

    const history = useHistory();
    const location = useLocation();

    const enhetId = useQueryParams().enhet;

    const enhet = useEnhetSelector();


    const [loading, setLoading] = useState(true);
    const lastPath = localStorage.getItem('lastpath');
    const lastSearch = localStorage.getItem('lastsearch') || '';


    useEffect(()=> {
        dispatch(hentFeaturesFraUnleash());
        dispatch(hentInloggetVeileder());
    },[dispatch]);

    useOnMount(()=> {
        if (lastPath && location.pathname == "/tilbake") {
            history.replace({pathname: lastPath, search: lastSearch});
        }
        else if (location.pathname == "/") {
            history.push("/enhet")
        }
    });

    useEffect(() => {
        fetch("/veilarbveileder/api/veileder/enheter")
            .then(resp => resp.json())
            .then((resp: Enheter) => {
                if (resp.enhetliste.findIndex(enhet => enhet.enhetId == enhetId) >= 0) {
                    dispatch(velgEnhetForVeileder(enhetId))
                }
                setLoading(false)
            }).catch(_ => setLoading(false));
    },[enhetId]);


    if(loading) {
        return <NavFrontendSpinner type="L"/>
    }


    return (
        <Innholdslaster avhengigheter={[inloggetVeileder]}>
            {props.children}
        </Innholdslaster>
    );

}

export default InitialDataProvider;
