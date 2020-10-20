import {initialState} from '../ducks/filtrering';
import * as faker from 'faker/locale/nb_NO';
import {LagretFilter} from "../ducks/lagretFilter";

export const mineFilter = () => {
    return (
        [
            {
                filterNavn: '1. Unge arbeidsledige møter idag',
                filterId: 1,
                filterValg: { ...initialState, alder: ["20-24"], ferdigfilterListe: ["MOTER_IDAG"] },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: null,
            }, {
                filterNavn: '10. Spesiell tilpasset innsats',
                filterId: 2,
                filterValg: { ...initialState, innsatsgruppe: ["BATT"], formidlingsgruppe: ["ARBS"] },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: null,
            }, {
                filterNavn: '2. Test',
                filterId: 3,
                filterValg: { ...initialState, kjonn: "K", formidlingsgruppe: ["ARBS"] },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: null,
            }, {
                filterNavn: '15. arbeidsliste',
                filterId: 4,
                filterValg: { ...initialState, ferdigfilterListe: ["MIN_ARBEIDSLISTE"] },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: null,
            }, {
                filterNavn: 'GUL',
                filterId: 5,
                filterValg: { ...initialState, arbeidslisteKategori: ["GUL"] },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: null,
            }, {
                filterNavn: 'Kvinner',
                filterId: 6,
                filterValg: { ...initialState, kjonn: "K" },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: null,
            }, {
                filterNavn: 'LILLA',
                filterId: 7,
                filterValg: { ...initialState, arbeidslisteKategori: ["LILLA"] },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: 3,
            }, {
                filterNavn: 'GRØNN',
                filterId: 8,
                filterValg: { ...initialState, arbeidslisteKategori: ["GRONN"] },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: null,
            }, {
                filterNavn: 'BLÅ',
                filterId: 9,
                filterValg: { ...initialState, arbeidslisteKategori: ["BLA"], alder: ["20-24"] },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: 2,
            }, {
                filterNavn: 'Nye brukere',
                filterId: 10,
                filterValg: { ...initialState, ferdigfilterListe: ["NYE_BRUKERE_FOR_VEILEDER"] },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: null,
            }, {
                filterNavn: 'UfordelteBrukere',
                filterId: 11,
                filterValg: { ...initialState, ferdigfilterListe: ["UFORDELTE_BRUKERE"] },
                opprettetDato: faker.date.between(new Date('2015-01-01'), new Date()),
                sortOrder: 1,
            }
        ]  as LagretFilter []
    );
};
