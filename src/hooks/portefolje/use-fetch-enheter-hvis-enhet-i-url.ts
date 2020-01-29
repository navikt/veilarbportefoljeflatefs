import {useEffect, useState} from "react";
import {useQueryParams} from "../use-query-params";
import {velgEnhetForVeileder} from "../../ducks/valgt-enhet";
import {useDispatch} from "react-redux";


interface Enheter {
    ident: string;
    enhetliste: {enhetId: string, navn: string}[]
}

export function useFetchEnheter() {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const enhetId = useQueryParams().enhet;
    useEffect(() => {
        if(enhetId) {
            fetch("/veilarbveileder/api/veileder/enheter")
                .then(resp => resp.json())
                .then((resp: Enheter) => {
                    if (resp.enhetliste.findIndex(enhet => enhet.enhetId === enhetId) >= 0) {
                        dispatch(velgEnhetForVeileder(enhetId))
                    }
                    setLoading(false)
                }).catch(_ => setLoading(false));
        } else {
            setLoading(false)
        }
    },[enhetId, dispatch]);

    return {isLoading}
}