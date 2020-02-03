import {useEffect, useState} from "react";
import {useQueryParams} from "../use-query-params";
import {velgEnhetForVeileder} from "../../ducks/valgt-enhet";
import {useDispatch} from "react-redux";
import {pagineringSetup} from "../../ducks/paginering";
import {settSortering} from "../../ducks/portefolje";


interface Enheter {
    ident: string;
    enhetliste: {enhetId: string, navn: string}[]
}

export function useFetchEnheter() {
    const [isLoading, setLoading] = useState(true);
    const [manglerEnheter, setManglerEnheter ]= useState(false);

    const dispatch = useDispatch();

    const enhetId = useQueryParams().enhet;
    const side = useQueryParams().side;
    const seAlle = useQueryParams().seAlle;
    const rekkefolge = useQueryParams().sorteringsrekkefolge;
    const felt = useQueryParams().sorteringsfelt;

    useEffect(() => {
        fetch("/veilarbveileder/api/veileder/enheter")
            .then(resp => resp.json())
            .then((resp: Enheter) => {
                if(enhetId) {
                    if (resp.enhetliste.findIndex(enhet => enhet.enhetId === enhetId) >= 0) {
                        dispatch(velgEnhetForVeileder(enhetId));
                        dispatch(pagineringSetup({side, seAlle}));
                        dispatch(settSortering(rekkefolge, felt));
                    }
                }
                else {
                    if(resp.enhetliste.length === 0 ) {
                        setManglerEnheter(true);
                    }
                }
                setLoading(false)
            })
            .catch(_ => setLoading(false));
    },[dispatch, enhetId, felt, rekkefolge, seAlle, side]);

    return {isLoading, manglerEnheter}
}