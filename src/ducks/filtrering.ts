import {ReactNode} from 'react';
import {FargekategoriModell} from '../typer/bruker-modell';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {VELG_MINE_FILTER} from './lagret-filter-ui-state';
import {OversiktType} from './ui/listevisning';
import {LagretFilter} from './lagret-filter';
import {
    AktiviteterValg,
    alleFargekategoriFilterAlternativer,
    initialStateAktiviteterFiltervalg,
    MINE_FARGEKATEGORIER
} from '../filtrering/filter-konstanter';
import {alfabetiskSammenligning} from '../utils/utils';

// Actions
export const ENDRE_FILTER = 'filtrering/ENDRE_FILTER';
export const SETT_FILTERVALG = 'filtrering/SETT_FILTERVALG';
export const SLETT_ENKELT_FILTER = 'filtrering/SLETT_ENKELT_FILTER';
export const CLEAR_FILTER = 'filtrering/CLEAR_FILTER';
export const VEILEDER_SOKT_FRA_TOOLBAR = 'filtrering/VEILEDER_SOKT_FRA_TOOLBAR';
export const FARGEKATEGORIER_HOVEDFILTER_KLIKK = 'filtrering/FARGEKATEGORIER_HOVEDFILTER_KLIKK';
export const FARGEKATEGORIER_UNDERFILTER_KLIKK = 'filtrering/FARGEKATEGORIER_UNDERFILTER_KLIKK';

//  Reducer
export const initialState: FiltervalgModell = {
    ferdigfilterListe: [],
    arbeidslisteKategori: [],
    alder: [],
    kjonn: null,
    landgruppe: [],
    foedeland: [],
    fodselsdagIMnd: [],
    innsatsgruppe: [],
    formidlingsgruppe: [],
    servicegruppe: [],
    veiledere: [],
    ytelse: null,
    aktiviteter: initialStateAktiviteterFiltervalg,
    aktiviteterForenklet: [],
    tiltakstyper: [],
    hovedmal: [],
    navnEllerFnrQuery: '',
    rettighetsgruppe: [],
    manuellBrukerStatus: [],
    veilederNavnQuery: '',
    registreringstype: [],
    cvJobbprofil: null,
    utdanning: [],
    utdanningGodkjent: [],
    utdanningBestatt: [],
    sisteEndringKategori: [],
    ulesteEndringer: null,
    tolkebehov: [],
    tolkBehovSpraak: [],
    stillingFraNavFilter: [],
    geografiskBosted: [],
    visGeografiskBosted: [],
    avvik14aVedtak: [],
    ensligeForsorgere: [],
    barnUnder18Aar: [],
    barnUnder18AarAlder: [],
    fargekategorier: [],
    gjeldendeVedtak14a: [],
    innsatsgruppeGjeldendeVedtak14a: [],
    hovedmalGjeldendeVedtak14a: []
};

export function fjern(filterId, verdi, fjernVerdi) {
    if (typeof verdi === 'boolean') {
        return false;
    } else if (Array.isArray(verdi)) {
        return verdi.filter(enkeltVerdi => enkeltVerdi !== fjernVerdi);
    } else if (filterId === 'aktiviteter') {
        let tomtVerdi = {};
        tomtVerdi[fjernVerdi] = AktiviteterValg.NA;
        return Object.assign({}, verdi, tomtVerdi);
    } else if (fjernVerdi && typeof verdi === 'object') {
        return Object.entries(verdi)
            .filter(([key]) => key !== fjernVerdi)
            .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
    } else if (fjernVerdi === null) {
        return null;
    } else if (typeof verdi === 'string') {
        return '';
    }

    throw new Error(`Kan ikke håndtere fjerning av ${fjernVerdi} fra ${verdi}`);
}

export function filtreringReducer(state: FiltervalgModell = initialState, action): FiltervalgModell {
    switch (action.type) {
        case CLEAR_FILTER:
            return initialState;
        case ENDRE_FILTER:
            return {
                ...state,
                [action.data.filterId]: action.data.filterVerdi
            };
        case SLETT_ENKELT_FILTER:
            return {
                ...state,
                [action.data.filterId]: fjern(
                    action.data.filterId,
                    state[action.data.filterId],
                    action.data.filterVerdi
                )
            };
        case SETT_FILTERVALG:
            return {...action.data};
        case VELG_MINE_FILTER:
            return {...action.data.filterValg};
        case FARGEKATEGORIER_HOVEDFILTER_KLIKK: {
            const hovedfilterAlleredeValgt = state.ferdigfilterListe.includes(MINE_FARGEKATEGORIER);

            const nyFerdigfilterListe = hovedfilterAlleredeValgt
                ? [...state.ferdigfilterListe.filter(f => f !== MINE_FARGEKATEGORIER)].sort(alfabetiskSammenligning)
                : [...state.ferdigfilterListe, MINE_FARGEKATEGORIER].sort(alfabetiskSammenligning);
            const nyFargekategorier = hovedfilterAlleredeValgt ? [] : [...alleFargekategoriFilterAlternativer];

            return {...state, ferdigfilterListe: nyFerdigfilterListe, fargekategorier: nyFargekategorier};
        }
        case FARGEKATEGORIER_UNDERFILTER_KLIKK: {
            const filterVerdi = action.data as FargekategoriModell;
            const underfilterAlleredeValgt = state.fargekategorier.includes(filterVerdi);

            const nyFargekategorier = underfilterAlleredeValgt
                ? [...state.fargekategorier.filter(f => f !== filterVerdi)].sort(alfabetiskSammenligning)
                : [...state.fargekategorier, filterVerdi].sort(alfabetiskSammenligning);

            const ingenFargekategorierValgt = nyFargekategorier.length === 0;
            const mineFargekategorierIkkeValgt = !state.ferdigfilterListe.includes(MINE_FARGEKATEGORIER);

            const nyFerdigfilterListe = () => {
                if (ingenFargekategorierValgt) {
                    return [...state.ferdigfilterListe.filter(f => f !== MINE_FARGEKATEGORIER)].sort(
                        alfabetiskSammenligning
                    );
                } else if (mineFargekategorierIkkeValgt) {
                    return [...state.ferdigfilterListe, MINE_FARGEKATEGORIER].sort(alfabetiskSammenligning);
                } else {
                    return state.ferdigfilterListe;
                }
            };

            return {...state, fargekategorier: nyFargekategorier, ferdigfilterListe: nyFerdigfilterListe()};
        }
        default:
            return state;
    }
}

export function velgMineFilter(filterVerdi: LagretFilter, oversiktType: OversiktType) {
    return {
        type: VELG_MINE_FILTER,
        data: filterVerdi,
        name: oversiktType
    };
}

export function endreFiltervalg(
    filterId: string,
    filterVerdi: ReactNode,
    oversiktType: OversiktType = OversiktType.enhetensOversikt
) {
    if (Array.isArray(filterVerdi)) {
        filterVerdi.sort(alfabetiskSammenligning);
    }
    return {
        type: ENDRE_FILTER,
        data: {filterId, filterVerdi},
        name: oversiktType
    };
}

export function slettEnkeltFilter(filterId, filterVerdi, oversiktType = OversiktType.enhetensOversikt) {
    return {
        type: SLETT_ENKELT_FILTER,
        data: {filterId, filterVerdi},
        name: oversiktType
    };
}

export function clearFiltervalg(oversiktType = OversiktType.enhetensOversikt) {
    return {type: CLEAR_FILTER, name: oversiktType};
}

export function veilederSoktFraToolbar() {
    return dispatch => {
        dispatch({type: VEILEDER_SOKT_FRA_TOOLBAR});
    };
}
