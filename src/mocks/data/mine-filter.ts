import {initialState} from '../../ducks/filtrering';
import {LagretFilter} from '../../ducks/lagret-filter';
import {InnsatsgruppeGjeldendeVedtak14a} from '../../typer/bruker-modell';

export const mineFilter = (): LagretFilter[] => {
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
            filterCleanup: false,
            sortOrder: null,
            aktiv: true,
            note: 'delete filter'
        },
        {
            filterNavn: 'Denne brukes til test la stå',
            filterId: 3,
            filterValg: {...initialState, kjonn: 'K', formidlingsgruppe: ['ARBS']},
            filterCleanup: false,
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'Kvinner',
            filterId: 6,
            filterValg: {...initialState, kjonn: 'K'},
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
            sortOrder: null,
            aktiv: true,
            note: ''
        },
        {
            filterNavn: 'UfordelteBrukere',
            filterId: 11,
            filterValg: {...initialState, ferdigfilterListe: ['UFORDELTE_BRUKERE']},
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
            filterCleanup: false,
            sortOrder: null,
            aktiv: false,
            note: 'Alle utenom permitterte etter 09.03.2020'
        }
    ];
};
