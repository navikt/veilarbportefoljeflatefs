import {initialState} from '../../ducks/filtrering';
import {LagretFilterPortefolje} from '../../ducks/lagret-filter';
import {InnsatsgruppeGjeldendeVedtak14a} from '../../typer/bruker-modell';

export const mineFilterPortefolje = (): LagretFilterPortefolje[] => {
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
            sortOrder: 0
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
            sortOrder: 0
        },
        {
            filterNavn: 'Denne brukes til test la stå',
            filterId: 3,
            filterValg: {...initialState, kjonn: 'K', formidlingsgruppe: ['ARBS']},
            sortOrder: 0
        },
        {
            filterNavn: 'Kvinner',
            filterId: 6,
            filterValg: {...initialState, kjonn: 'K'},
            sortOrder: 0
        },
        {
            filterNavn: 'Nye brukere',
            filterId: 10,
            filterValg: {
                ...initialState,
                ferdigfilterListe: ['NYE_BRUKERE_FOR_VEILEDER']
            },
            sortOrder: 0
        },
        {
            filterNavn: 'UfordelteBrukere',
            filterId: 11,
            filterValg: {...initialState, ferdigfilterListe: ['UFORDELTE_BRUKERE']},
            sortOrder: 1
        },
        {
            filterNavn: 'Permitterte filter',
            filterId: 12,
            filterValg: {
                ...initialState,
                ferdigfilterListe: ['ER_SYKMELDT_MED_ARBEIDSGIVER', 'NYE_BRUKERE_FOR_VEILEDER']
            },
            sortOrder: 0
        }
    ];
};
