import { initialState } from '../ducks/filtrering';
import {veiledere} from "./veiledere";
import {LagretFilter} from "../ducks/lagret-filter";
import { JSONArray } from "yet-another-fetch-mock";


export const veilederGrupper = () => {
    const veilederGruppe1 = veiledere.slice(0, 4).map((v) => v.ident);
    const veilederGruppe2 = veiledere.slice(5, 10).map((v) => v.ident);
    const veilederGruppe3 = veiledere.slice(11, 15).map((v) => v.ident);
    const veilederGruppe4 = veiledere.slice(16, 22).map((v) => v.ident);
    return (
        [
            {filterNavn: 'Fantastic Four', filterId: 12, filterValg: {...initialState, veiledere: veilederGruppe1}},
            {filterNavn: 'Prinsess Gruppen', filterId: 13, filterValg: {...initialState, veiledere: veilederGruppe2}},
            {filterNavn: 'Hallo', filterId: 14, filterValg: {...initialState, veiledere: veilederGruppe3}},
            {filterNavn: 'På do', filterId: 15, filterValg: {...initialState, veiledere: veilederGruppe4}},

        ] as LagretFilter [] & JSONArray
    );
};
