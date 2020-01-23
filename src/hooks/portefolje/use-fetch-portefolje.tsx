import {useEffect} from "react";
import {hentPortefoljeForEnhet, hentPortefoljeForVeileder} from "../../ducks/portefolje";
import {useDispatch} from "react-redux";
import {useEnhetSelector} from "../redux/use-enhet-selector";
import {usePortefoljeSelector} from "../redux/use-portefolje-selector";
import {ListevisningType} from "../../ducks/ui/listevisning";
import {useSelectGjeldendeVeileder} from "./use-select-gjeldende-veileder";

export function useFetchPortefolje(listevisningType: ListevisningType) {
    const dispatch = useDispatch();
    const enhet = useEnhetSelector();
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const {sorteringsrekkefolge, filtervalg, sorteringsfelt} = usePortefoljeSelector(listevisningType);

    useEffect(()=> {
        if(enhet) {
            if(listevisningType === ListevisningType.enhetensOversikt) {
                dispatch(hentPortefoljeForEnhet(enhet, sorteringsrekkefolge, sorteringsfelt, filtervalg))
            } else if(listevisningType === ListevisningType.minOversikt && gjeldendeVeileder) {
                dispatch(hentPortefoljeForVeileder(enhet, gjeldendeVeileder, sorteringsrekkefolge, sorteringsfelt, filtervalg))
            }
        }
    },[dispatch, enhet, sorteringsfelt, sorteringsrekkefolge, filtervalg, gjeldendeVeileder, listevisningType]);
}