import React, { useCallback } from 'react';
import NAVSPA from "@navikt/navspa";
import { DecoratorProps } from "./utils/types/decorator-props";
import { useDispatch } from "react-redux";
import {OrNothing} from "./utils/types/types";
import {oppdaterValgtEnhet} from "./ducks/valgt-enhet";
import {useEnhetSelector} from "./hooks/redux/use-enhet-selector";


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
    const enhetId = useEnhetSelector();

    function velgEnhet(enhet) {
        dispatch(oppdaterValgtEnhet(enhet));
    }

    const config = useCallback(getConfig, [enhetId, velgEnhet])(enhetId, velgEnhet);

    return (
        <InternflateDecorator {...config}/>
    )

}