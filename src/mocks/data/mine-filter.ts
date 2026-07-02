import {initialState} from '../../ducks/filtrering';
import {LagretFilterDTO} from '../../ducks/lagret-filter';
import {InnsatsgruppeGjeldendeVedtak14a} from '../../typer/bruker-modell';

export const mineFilter = (): LagretFilterDTO[] => {
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
            aktiveFilterValg: '{"alder": ["40-49"], "kjonn": "K"}',
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
            aktiveFilterValg: '{"alder": ["40-49"], "kjonn": "M"}',
            filterCleanup: false,
            sortOrder: null,
            aktiv: true,
            note: 'delete filter'
        },
        {
            filterNavn: 'Denne brukes til test la stå',
            filterId: 3,
            filterValg: {...initialState, kjonn: 'K', formidlingsgruppe: ['ARBS']},
            aktiveFilterValg: '{"alder": ["40-49"], "kjonn": "K"}',
            filterCleanup: false,
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'Kvinner',
            filterId: 6,
            filterValg: {...initialState, kjonn: 'K'},
            aktiveFilterValg: '{"alder": ["40-49"], "kjonn": "K"}',
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
            aktiveFilterValg: '{"alder": ["40-49"], "kjonn": "K"}',
            filterCleanup: false,
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'UfordelteBrukere',
            filterId: 11,
            filterValg: {...initialState, ferdigfilterListe: ['UFORDELTE_BRUKERE']},
            aktiveFilterValg: '{"alder": ["40-49"], "kjonn": "K"}',
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
            aktiveFilterValg: '{"alder": ["40-49"], "kjonn": "K"}',
            filterCleanup: false,
            sortOrder: null,
            aktiv: false,
            note: 'Alle utenom permitterte etter 09.03.2020'
        }
    ];
};
