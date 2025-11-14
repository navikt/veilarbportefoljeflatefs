import {faker} from '@faker-js/faker/locale/nb_NO';
import {initialState} from '../../ducks/filtrering';
import {LagretFilter} from '../../ducks/lagret-filter';
import {InnsatsgruppeGjeldendeVedtak14a} from '../../typer/bruker-modell';

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
            filterCleanup: false,
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'TiltaksFilter',
            filterId: 2,
            filterValg: {
                ...initialState,
                innsatsgruppeGjeldendeVedtak14a: [InnsatsgruppeGjeldendeVedtak14a.SPESIELT_TILPASSET_INNSATS],
                formidlingsgruppe: ['ARBS'],
                tiltakstyper: ['TULLETOES', 'UTDYRK']
            },
            opprettetDato: faker.date.between(datointervall),
            filterCleanup: false,
            sortOrder: null,
            aktiv: true,
            note: 'delete filter'
        },
        {
            filterNavn: 'Denne brukes til test la stå',
            filterId: 3,
            filterValg: {...initialState, kjonn: 'K', formidlingsgruppe: ['ARBS']},
            opprettetDato: faker.date.between(datointervall),
            filterCleanup: false,
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'Kvinner',
            filterId: 6,
            filterValg: {...initialState, kjonn: 'K'},
            opprettetDato: faker.date.between(datointervall),
            filterCleanup: false,
            sortOrder: null,
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
            filterCleanup: false,
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
            filterCleanup: false,
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
            opprettetDato: faker.date.between(datointervall),
            filterCleanup: false,
            sortOrder: null,
            aktiv: false,
            note: 'Alle utenom permitterte etter 09.03.2020'
        }
    ];
};
