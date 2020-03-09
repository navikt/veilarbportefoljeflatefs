import { useEnhetSelector } from '../redux/use-enhet-selector';
import {useEffect, useState} from 'react';
import { useIdentSelector } from '../redux/use-inlogget-ident';
import {hentStatusTallForVeileder} from "../../middleware/api";
import {Statustall} from "../../ducks/statustall";
import {STATUS} from "../../ducks/utils";

export function useVeilederHarPortefolje() {

    const innloggetVeileder = useIdentSelector();
    const identId = innloggetVeileder && innloggetVeileder.ident;

    const valgtEnhet = useEnhetSelector();
    const [harPortefolje, setHarPortefolje] = useState({
        status: STATUS.NOT_STARTED,
        data: { harPortefolje: false }
    });


    useEffect(() => {
        setHarPortefolje(prevState => ({ ...prevState, status: STATUS.PENDING}));
        if (valgtEnhet) {
            hentStatusTallForVeileder(valgtEnhet, identId)
                .then((statustall: Statustall) => {
                    const harPortefolje = statustall.totalt > 0;
                    setHarPortefolje({status: STATUS.OK , data: {harPortefolje}});
                })
                .catch(_=> setHarPortefolje(prevState => ({ ...prevState, status: STATUS.ERROR})))
        }
    }, [valgtEnhet, identId]);


    return harPortefolje;
}
