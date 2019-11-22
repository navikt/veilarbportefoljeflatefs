import { VeilederModell } from '../model-interfaces';
import {LagretFilter} from "../ducks/lagret-filter";
import {initialState} from "../ducks/filtrering";

export const veilederGrupper = (veiledere: VeilederModell [] ) => {
    const veilederGruppe1 = veiledere.slice(0,4).map((v) => v.ident);
    const veilederGruppe2 = veiledere.slice(5,10).map((v) => v.ident);
    return (
        [
            // {filterNavn: 'Fantastic Four', filterId: 12, filterValg: {...initialState, veiledere: veilederGruppe1}},
            // {filterNavn: 'Prinsess Gruppen', filterId: 13, filterValg: {...initialState, veiledere: veilederGruppe2}}
        ] as LagretFilter []
    );
};
