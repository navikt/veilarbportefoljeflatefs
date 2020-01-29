import { useEnhetSelector } from '../redux/use-enhet-selector';
import {useEffect, useState} from 'react';
import { useIdentSelector } from '../redux/use-inlogget-ident';
import {hentStatusTallForVeileder} from "../../middleware/api";
import {Statustall} from "../../ducks/statustall";
import {useLocation, useParams} from "react-router";

export function useVeilederHarPortefolje() {

    const innloggetVeileder = useIdentSelector();

    const { ident } = useParams();
    const location = useLocation();
    const pathname = location.pathname;

    const identId = innloggetVeileder && innloggetVeileder.ident;
    const valgtEnhet = useEnhetSelector();

    const [harPortefolje, setHarPortefolje] = useState(false);
    const [laster, setLaster] = useState(true);

    useEffect(() => {
        if (valgtEnhet && identId) {
            hentStatusTallForVeileder(valgtEnhet, identId)
                .then((statustall: Statustall) => {
                    const harPortefolje = statustall.totalt > 0;
                    setHarPortefolje(harPortefolje || pathname === "/portefolje" || (!!ident && ident === identId));
                    setLaster(false)
                })
                .catch(_=> setLaster(false))
        }
    }, [valgtEnhet, pathname, identId, ident]);


    return {laster, harPortefolje}
}
