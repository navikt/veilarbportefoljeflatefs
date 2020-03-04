import {usePortefoljeSelector} from "../redux/use-portefolje-selector";
import {ListevisningType} from "../../ducks/ui/listevisning";
import {useDispatch} from "react-redux";
import {ASCENDING, DESCENDING} from "../../konstanter";
import {settSortering} from "../../ducks/portefolje";

export function useSetPortefoljeSortering (listevisningType: ListevisningType) {

    const {sorteringsfelt, sorteringsrekkefolge} = usePortefoljeSelector(listevisningType);
    const dispatch = useDispatch();

    function settSorteringogHentPortefolje(felt) {
        let valgtRekkefolge = '';

        if (felt !== sorteringsfelt) {
            valgtRekkefolge = ASCENDING;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === ASCENDING ? DESCENDING : ASCENDING;
        }

        dispatch(settSortering(valgtRekkefolge, felt));
    }

    return settSorteringogHentPortefolje;
}