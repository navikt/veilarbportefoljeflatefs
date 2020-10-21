import {initialState} from '../ducks/filtrering';
import {veiledere} from './veiledere';
import * as faker from 'faker/locale/nb_NO';
import {LagretFilter} from '../ducks/lagretFilter';

export const veilederGrupper = () => {
    const veilederGruppe1 = veiledere.slice(0, 4).map(v => v.ident);
    const veilederGruppe2 = veiledere.slice(5, 10).map(v => v.ident);
    const veilederGruppe3 = veiledere.slice(11, 15).map(v => v.ident);
    const veilederGruppe4 = veiledere.slice(16, 22).map(v => v.ident);
    const veilederGruppe5 = veiledere.slice(23, 27).map(v => v.ident);
    return [
        {
            filterNavn: 'Fantastic 4',
            filterId: 12,
            filterValg: {...initialState, veiledere: veilederGruppe1},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
            filterCleanup: false
        },
        {
            filterNavn: 'Prinsessegruppen',
            filterId: 13,
            filterValg: {...initialState, veiledere: veilederGruppe2},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
            filterCleanup: false
        },
        {
            filterNavn: 'Team Awesome',
            filterId: 14,
            filterValg: {...initialState, veiledere: veilederGruppe3},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
            filterCleanup: false
        },
        {
            filterNavn: 'Team VOFF',
            filterId: 15,
            filterValg: {...initialState, veiledere: veilederGruppe4},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
            filterCleanup: false
        },
        {
            filterNavn: 'Ungdomsavdelingen',
            filterId: 16,
            filterValg: {...initialState, veiledere: veilederGruppe5},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
            filterCleanup: false
        },
        {
            filterNavn: 'Gruppen brukes til test, la stå',
            filterId: 17,
            filterValg: {...initialState, veiledere: veilederGruppe5},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
            filterCleanup: true
        }
    ] as LagretFilter[];
};
