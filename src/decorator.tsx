import React, {useCallback, useState} from 'react';
import NAVSPA from "@navikt/navspa";
import {DecoratorProps, EnhetDisplay, FnrDisplay} from "./utils/types/decorator-props";
import {useDispatch} from "react-redux";
import {oppdaterValgtEnhet} from "./ducks/valgt-enhet";
import {useEnhetSelector} from "./hooks/redux/use-enhet-selector";
import {useOnMount} from "./hooks/use-on-mount";


const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

function getConfig (
    enhet: string | null,
    settValgtEnhet: (enhet) => void,
): DecoratorProps {
    return {
        appname: 'Arbeidsrettet oppfølging',
        fnr: {
            initialValue: null,
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

function useNullStillContextholder() {
    const [klar, setKlar] = useState(false);
    useOnMount(() => {
        // Manuell nullstilling av bruker i context
        fetch('/modiacontextholder/api/context/aktivbruker', {
            method: 'DELETE',
            credentials: 'include'
        }).then(() => setKlar(true));
    });

    return klar;
}

export function Decorator() {
    const dispatch = useDispatch();
    const enhetId = useEnhetSelector();
    const klar = useNullStillContextholder();

    function velgEnhet(enhet: string) {
        dispatch(oppdaterValgtEnhet(enhet));
    }

    const config = useCallback(getConfig, [enhetId, velgEnhet])(enhetId, velgEnhet);

    if(!klar) {
        return null;
    }

    return (
        <InternflateDecorator {...config}/>
    )

}