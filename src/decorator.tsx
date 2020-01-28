import React, {useCallback, useState} from 'react';
import NAVSPA from "@navikt/navspa";
import { DecoratorProps } from "./utils/types/decorator-props";
import { useDispatch } from "react-redux";
import {OrNothing} from "./utils/types/types";
import {oppdaterValgtEnhet} from "./ducks/valgt-enhet";
import {useEnhetSelector} from "./hooks/redux/use-enhet-selector";
import {useOnMount} from "./hooks/use-on-mount";


const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

function getConfig (
    enhet: OrNothing<string>,
    settValgtEnhet: (enhet) => void,
): DecoratorProps {
    return {
        appname: 'Arbeidsrettet oppfølging',
        fnr: null,
        enhet,
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