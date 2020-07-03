import { initialState } from '../ducks/filtrering';
import { LagretFilter } from '../ducks/lagret-filter';
import { JSONArray } from 'yet-another-fetch-mock';
import * as faker from 'faker/locale/nb_NO';

export const lagredeFilter = () => {
    return (
        [
            {
                filterNavn: 'Unge kvinner',
                filterId: 1,
                filterValg: {...initialState, kjonn:"K", alder:"20-24"},
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
            },
            {
                filterNavn: 'Mine favoritter',
                filterId: 2,
                filterValg: {...initialState, innsatsgruppe:["BATT"], formidlingsgruppe:["ARBS"]},
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
            },
        ] as LagretFilter [] & JSONArray
    );
};
