import Toolbar from "../components/toolbar/toolbar";
import {ListevisningType} from "../ducks/ui/listevisning";
import {hentPortefoljeForEnhet} from "../ducks/portefolje";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {usePortefoljeSelector} from "../hooks/redux/use-portefolje-selector";
import {AppState} from "../reducer";

export function EnhetsPortefoljeToolbar() {
    const dispatch = useDispatch();
    const {sorteringsfelt, filtervalg, enhetId, sorteringsrekkefolge} = usePortefoljeSelector(ListevisningType.enhetensOversikt);
    const antallTotalt = useSelector((state: AppState)=> state.portefolje.data.antallTotalt);

    return (
        <Toolbar
            filtergruppe={ListevisningType.enhetensOversikt}
            onPaginering={() => dispatch(hentPortefoljeForEnhet(
                enhetId,
                sorteringsrekkefolge,
                sorteringsfelt,
                filtervalg
            ))}
            sokVeilederSkalVises
            antallTotalt={antallTotalt}
        />
    );
}