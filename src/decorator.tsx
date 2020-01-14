import React, {PropsWithChildren, useCallback, useState} from 'react';
import NAVSPA from "@navikt/navspa";
import {DecoratorProps} from "./utils/types/decorator-props";
import {useDispatch, useSelector} from "react-redux";
import { oppdaterValgtEnhet } from "./ducks/valgt-enhet";
import * as queryString from "query-string";
import {OrNothing} from "./utils/types/types";
import {AppState} from "./reducer";
import {useHistory, useLocation} from "react-router";
import InitialDataProvider from "./providers/initial-data-provider";
import Routes from "./routes";
import {CustomRedirect} from "./components/redirect/veilarbportefolje-redirect";


const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

function getConfig (
    initielEnhet: OrNothing<string>,
    settValgtEnhet: (enhet) => void
): DecoratorProps {
    return {
        appname: 'Arbeidsrettet oppfølging',
        fnr: null,
        enhet: initielEnhet,
        toggles: {
            visEnhet: false,
            visEnhetVelger: true,
            visSokefelt: true,
            visVeilder: true
        },
        onSok: (fnr) => {
            window.location.pathname = `veilarbpersonflatefs/${fnr}`
        },
        onEnhetChange: (enhet: string) => {
            settValgtEnhet(enhet)
        }
    }
}

export function Decorator() {
    const dispatch = useDispatch();

    const searchQuery = useLocation().search;
    const enhetId = queryString.parse(searchQuery).enhet;
    const history = useHistory();

    function velgEnhet(enhet) {
        dispatch(oppdaterValgtEnhet(enhet, history));
    }

    const config = useCallback(getConfig, [enhetId, velgEnhet])(enhetId, velgEnhet);

    return (
        <InternflateDecorator {...config}/>
    )

}