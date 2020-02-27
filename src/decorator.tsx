import React, {useCallback} from 'react';
import NAVSPA from "@navikt/navspa";
import {DecoratorProps, EnhetDisplay, FnrDisplay} from "./utils/types/decorator-props";
import {useDispatch} from "react-redux";
import {oppdaterValgtEnhet} from "./ducks/valgt-enhet";
import {useEnhetSelector} from "./hooks/redux/use-enhet-selector";


const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

function getConfig (
    enhet: string | null,
    settValgtEnhet: (enhet) => void,
): DecoratorProps {
    return {
        appname: 'Arbeidsrettet oppfølging',
        fnr: {
            initialValue: "\u0000",
            display: FnrDisplay.SOKEFELT,
            onChange: (value) => {
                if(value) {
                    window.location.pathname = `veilarbpersonflatefs/${value}`;
                }
            }
        },
        toggles: {
            visVeileder: true
        },
        enhet: {
            initialValue: enhet,
            display: EnhetDisplay.ENHET_VALG,
            onChange: (value) => {
                if(value){
                    settValgtEnhet(value);
                }
            }
        }
    }
}

export function Decorator() {
    const dispatch = useDispatch();
    const enhetId = useEnhetSelector();

    function velgEnhet(enhet: string) {
        dispatch(oppdaterValgtEnhet(enhet));
    }

    const config = useCallback(getConfig, [enhetId, velgEnhet])(enhetId, velgEnhet);


    return (
        <InternflateDecorator {...config}/>
    )

}