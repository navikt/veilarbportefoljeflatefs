import {initialState} from '../ducks/filtrering';
import * as faker from 'faker/locale/nb_NO';
import {LagretFilter} from "../ducks/lagret-filter";

export const lagredeFilter = () => {
    return (
        [
            {
                filterNavn: 'Unge arbeidsledige møter idag',
                filterId: 1,
                filterValg: {...initialState, alder: ["20-24"], ferdigfilterListe: ["MOTER_IDAG"]},
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
            }, {
            filterNavn: 'Spesiell tilpasset innsats',
            filterId: 2,
            filterValg: {...initialState, innsatsgruppe: ["BATT"], formidlingsgruppe: ["ARBS"]},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
        }, {
            filterNavn: 'Test',
            filterId: 3,
            filterValg: {...initialState, kjonn: ["K"], formidlingsgruppe: ["ARBS"]},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
        }, {
            filterNavn: 'Team Voff',
            filterId: 4,
            filterValg: {...initialState, kjonn: ["M"], formidlingsgruppe: ["ARBS"]},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
        }, {
            filterNavn: 'Under 19',
            filterId: 5,
            filterValg: {...initialState, alder:["19-og-under"]},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
        }, {
            filterNavn: 'Kvinner',
            filterId: 6,
            filterValg: {...initialState, kjonn: ["K"]},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
        }, {
            filterNavn: 'Menn',
            filterId: 7,
            filterValg: {...initialState, kjonn: ["M"]},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
        }, {
            filterNavn: '40-49 år',
            filterId: 8,
            filterValg: {...initialState, alder: ["40-49"]},
            opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
        }
        ] as LagretFilter []
    );
};
