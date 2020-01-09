import React, {useCallback } from 'react';
import NAVSPA from "@navikt/navspa";
import {DecoratorProps} from "./utils/types/decorator-props";
import {useDispatch } from "react-redux";
import { oppdaterValgtEnhet } from "./ducks/valgt-enhet";


const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

function getConfig (
    settValgtEnhet: (enhet) => void
): DecoratorProps {
    return {
        appname: 'Arbeidsrettet oppfølging',
        fnr: null,
        enhet: undefined,
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

    function velgEnhet(enhet) {
        dispatch(oppdaterValgtEnhet(enhet));
    }

    const config = useCallback(getConfig, [velgEnhet])(velgEnhet);

    return (
        <InternflateDecorator {...config}/>
    )

}