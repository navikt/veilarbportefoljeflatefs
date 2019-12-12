import { initialState } from '../ducks/filtrering';
import {veiledere} from "./veiledere";
import {LagretFilter} from "../ducks/lagret-filter";
import { JSONArray } from "yet-another-fetch-mock";
import * as faker from "faker/locale/nb_NO";


export const veilederGrupper = () => {
    const veilederGruppe1 = veiledere.slice(0, 4).map((v) => v.ident);
    const veilederGruppe2 = veiledere.slice(5, 10).map((v) => v.ident);
    const veilederGruppe3 = veiledere.slice(11, 15).map((v) => v.ident);
    const veilederGruppe4 = veiledere.slice(16, 22).map((v) => v.ident);
    const veilederGruppe5 = veiledere.slice(23, 27).map((v) => v.ident);
    return (
        [
            {filterNavn: 'Fantastic Four', filterId: 12, filterValg: {...initialState, veiledere: veilederGruppe1}, opprettetDato: faker.date.between(new Date('2015-01-01'), new Date())},
            {filterNavn: 'Prinsess Gruppen', filterId: 13, filterValg: {...initialState, veiledere: veilederGruppe2}, opprettetDato: faker.date.between(new Date('2015-01-01'), new Date())},
            {filterNavn: 'Hallo', filterId: 14, filterValg: {...initialState, veiledere: veilederGruppe3}, opprettetDato: faker.date.between(new Date('2015-01-01'), new Date())},
            {filterNavn: 'På do', filterId: 15, filterValg: {...initialState, veiledere: veilederGruppe4}, opprettetDato: faker.date.between(new Date('2015-01-01'), new Date())},
            {filterNavn: 'Et team som har et veldig, veldig, veldig', filterId: 16, filterValg: {...initialState, veiledere: veilederGruppe5}, opprettetDato: faker.date.between(new Date('2015-01-01'), new Date())},

        ] as LagretFilter [] & JSONArray
    );
};
