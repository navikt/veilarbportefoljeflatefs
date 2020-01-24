import { useEnhetSelector } from '../redux/use-enhet-selector';
import {useEffect, useState} from 'react';
import { useIdentSelector } from '../redux/use-inlogget-ident';
import {hentStatusTallForVeileder} from "../../middleware/api";
import {Statustall} from "../../ducks/statustall";

export function useVeilederHarPortefolje() {
    const innloggetVeileder = useIdentSelector();
    const ident = innloggetVeileder && innloggetVeileder.ident;
    const valgtEnhet = useEnhetSelector();

    const [harPortefolje, setHarPortefolje] = useState(false);
    const [laster, setLaster] = useState(true);

    useEffect(() => {
        if (valgtEnhet && ident) {
            console.log("KJØRER VEILEDER HAR PORTEFOLJE!!!");
            hentStatusTallForVeileder(valgtEnhet, ident)
                .then((statustall: Statustall) => {
                    const harPortefolje = statustall.totalt > 0;
                    setHarPortefolje(harPortefolje);
                    setLaster(false)
                })
                .catch(_=> setLaster(false))
        }
    }, [valgtEnhet, ident]);


    return {laster, harPortefolje}
}
