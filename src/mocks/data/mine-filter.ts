import {initialState} from '../../ducks/filtrering';
import {faker} from '@faker-js/faker/locale/nb_NO';
import {LagretFilter} from '../../ducks/lagret-filter';

export const mineFilter = (): LagretFilter[] => {
    const datointervall = {
        from: new Date('2015-01-01'),
        to: new Date()
    };

    return [
        {
            filterNavn: '1. Unge arbeidsledige møter idag',
            filterId: 1,
            filterValg: {
                ...initialState,
                alder: ['20-24'],
                ferdigfilterListe: ['MOTER_IDAG'],
                tiltakstyper: ['UTDYRK']
            },
            opprettetDato: faker.date.between(datointervall),
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'TiltaksFilter',
            filterId: 2,
            filterValg: {
                ...initialState,
                innsatsgruppe: ['BATT'],
                formidlingsgruppe: ['ARBS'],
                tiltakstyper: ['TULLETOES', 'UTDYRK']
            },
            opprettetDato: faker.date.between(datointervall),
            sortOrder: null,
            aktiv: true,
            note: 'delete filter'
        },
        {
            filterNavn: 'Denne brukes til test la stå',
            filterId: 3,
            filterValg: {...initialState, kjonn: 'K', formidlingsgruppe: ['ARBS']},
            opprettetDato: faker.date.between(datointervall),
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: '15. arbeidsliste',
            filterId: 4,
            filterValg: {...initialState, ferdigfilterListe: ['MIN_ARBEIDSLISTE']},
            opprettetDato: faker.date.between(datointervall),
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'GUL',
            filterId: 5,
            filterValg: {...initialState, arbeidslisteKategori: ['GUL']},
            opprettetDato: faker.date.between(datointervall),
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'Kvinner',
            filterId: 6,
            filterValg: {...initialState, kjonn: 'K'},
            opprettetDato: faker.date.between(datointervall),
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'LILLA',
            filterId: 7,
            filterValg: {...initialState, arbeidslisteKategori: ['LILLA']},
            opprettetDato: faker.date.between(datointervall),
            sortOrder: 3,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'GRØNN',
            filterId: 8,
            filterValg: {...initialState, arbeidslisteKategori: ['GRONN']},
            opprettetDato: faker.date.between(datointervall),
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'BLÅ',
            filterId: 9,
            filterValg: {
                ...initialState,
                arbeidslisteKategori: ['BLA'],
                alder: ['20-24']
            },
            opprettetDato: faker.date.between(datointervall),
            sortOrder: 2,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'Nye brukere',
            filterId: 10,
            filterValg: {
                ...initialState,
                ferdigfilterListe: ['NYE_BRUKERE_FOR_VEILEDER']
            },
            opprettetDato: faker.date.between(datointervall),
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'UfordelteBrukere',
            filterId: 11,
            filterValg: {...initialState, ferdigfilterListe: ['UFORDELTE_BRUKERE']},
            opprettetDato: faker.date.between(datointervall),
            sortOrder: 1,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'Permitterte filter',
            filterId: 12,
            filterValg: {
                ...initialState,
                ferdigfilterListe: ['ER_SYKMELDT_MED_ARBEIDSGIVER', 'NYE_BRUKERE_FOR_VEILEDER']
            },
            aktiv: false,
            note: 'Alle utenom permitterte etter 09.03.2020'
        }
    ] as LagretFilter[];
};
