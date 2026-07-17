import {
    hentEnhetsFilterGrupper,
    hentVeiledergrupperForEnhetPortefolje,
    lagreNyVeiledergruppePortefolje,
    nyVeiledergruppe,
    redigerVeiledergruppe,
    redigerVeiledergruppePortefolje,
    slettVeiledergruppe,
    slettVeiledergruppePortefolje
} from '../middleware/api';
import {doThenDispatch, STATUS} from './utils';
import {
    LagreNyVeiledergruppePortefolje,
    LagretFilterDTO,
    LagretFilterState,
    LagretVeiledergruppePortefolje,
    NyttLagretFilter,
    RedigerLagretFilter,
    RedigerVeiledergruppePortefolje
} from './lagret-filter';
import {
    mapLagretFilterFraDTO,
    mapVeiledergrupperTilLagretFilter
} from '../components/modal/mine-filter/mine-filter-mapper';
import {BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE} from '../konstanter';
import {sjekkFeature} from './features';
import {Filtervalg} from '../typer/filtervalg-modell';

// Actions
export const HENT_VEILEDERGRUPPER_OK = 'veiledergrupper/OK';
export const HENT_VEILEDERGRUPPER_FEILET = 'veiledergrupper/FEILET';
export const HENT_VEILEDERGRUPPER_PENDING = 'veiledergrupper/PENDING';

export const REDIGER_VEILEDERGRUPPER_OK = 'veiledergrupper_endre/OK';
export const REDIGER_VEILEDERGRUPPER_FEILET = 'veiledergrupper_endre/FEILET';
export const REDIGER_VEILEDERGRUPPER_PENDING = 'veiledergrupper_endre/PENDING';

export const NY_VEILEDERGRUPPER_OK = 'veiledergrupper_ny/OK';
export const NY_VEILEDERGRUPPER_FEILET = 'veiledergrupper_ny/FEILET';
export const NY_VEILEDERGRUPPER_PENDING = 'veiledergrupper_ny/PENDING';

export const SLETT_VEILEDERGRUPPER_OK = 'veiledergrupper_slette/OK';
export const SLETT_VEILEDERGRUPPER_FEILET = 'veiledergrupper_slette/FEILET';
export const SLETT_VEILEDERGRUPPER_PENDING = 'veiledergrupper_slette/PENDING';

const initialState = {
    status: STATUS.NOT_STARTED,
    data: [],
    handlingType: null
};

//  Reducer
export function veiledergrupperLagretFilterReducer(state: LagretFilterState = initialState, action) {
    switch (action.type) {
        case HENT_VEILEDERGRUPPER_PENDING:
        case NY_VEILEDERGRUPPER_PENDING:
        case REDIGER_VEILEDERGRUPPER_PENDING:
        case SLETT_VEILEDERGRUPPER_PENDING:
            return {...state, status: STATUS.PENDING};
        case HENT_VEILEDERGRUPPER_FEILET:
            return {...state, status: STATUS.ERROR};
        case NY_VEILEDERGRUPPER_FEILET:
            return {...state, status: STATUS.ERROR};
        case REDIGER_VEILEDERGRUPPER_FEILET:
            return {...state, status: STATUS.ERROR};
        case SLETT_VEILEDERGRUPPER_FEILET:
            return {...state, status: STATUS.ERROR};

        case HENT_VEILEDERGRUPPER_OK:
            return {...state, status: STATUS.OK, data: action.data};
        case NY_VEILEDERGRUPPER_OK:
            return {
                ...state,
                status: STATUS.OK,
                data: state.data.concat(action.data)
            };
        case REDIGER_VEILEDERGRUPPER_OK:
            return {
                ...state,
                status: STATUS.OK,
                data: state.data.map(elem => {
                    if (elem.filterId !== action.data.filterId) {
                        return elem;
                    }
                    return action.data;
                })
            };
        case SLETT_VEILEDERGRUPPER_OK:
            return {
                ...state,
                status: STATUS.OK,
                data: state.data.filter(elem => elem.filterId !== action.data)
            };

        default:
            return state;
    }
}

// Action Creators
export function hentLagretFilterForEnhet(enhetId: string) {
    return doThenDispatch(
        (_dispatch, getState) => {
            const brukFilterFraPortefolje = sjekkFeature(getState(), BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE);
            if (brukFilterFraPortefolje) {
                hentVeiledergrupperForEnhetPortefolje(enhetId).then((dtoer: LagretVeiledergruppePortefolje[]) =>
                    dtoer.map(dto => mapVeiledergrupperTilLagretFilter(dto))
                );
            } else {
                hentEnhetsFilterGrupper(enhetId).then((dtoer: LagretFilterDTO[]) =>
                    dtoer.map(dto => mapLagretFilterFraDTO(dto))
                );
            }
        },
        {
            OK: HENT_VEILEDERGRUPPER_OK,
            FEILET: HENT_VEILEDERGRUPPER_FEILET,
            PENDING: HENT_VEILEDERGRUPPER_PENDING
        }
    );
}

// Action Creators
export function lagreEndringer(endringer: RedigerLagretFilter, enhetId: string) {
    return doThenDispatch(
        (_dispatch, getState) => {
            const brukFilterFraPortefolje = sjekkFeature(getState(), BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE);
            if (brukFilterFraPortefolje) {
                const redigerVeiledergruppe: RedigerVeiledergruppePortefolje = {
                    filterNavn: endringer.filterNavn,
                    filterId: endringer.filterId,
                    veiledere: endringer.filterValg[Filtervalg.veiledere]
                };
                redigerVeiledergruppePortefolje(redigerVeiledergruppe, enhetId).then(dto =>
                    mapVeiledergrupperTilLagretFilter(dto)
                );
            } else {
                redigerVeiledergruppe(endringer, enhetId).then(dto => mapLagretFilterFraDTO(dto));
            }
        },
        {
            OK: REDIGER_VEILEDERGRUPPER_OK,
            FEILET: REDIGER_VEILEDERGRUPPER_FEILET,
            PENDING: REDIGER_VEILEDERGRUPPER_PENDING
        }
    );
}

// Action Creators
export function lageNyGruppe(endringer: NyttLagretFilter, enhetId: string) {
    return doThenDispatch(
        (_dispatch, getState) => {
            const brukFilterFraPortefolje = sjekkFeature(getState(), BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE);
            if (brukFilterFraPortefolje) {
                const nyVeiledergruppe: LagreNyVeiledergruppePortefolje = {
                    filterNavn: endringer.filterNavn,
                    veiledere: endringer.filterValg[Filtervalg.veiledere]
                };
                lagreNyVeiledergruppePortefolje(nyVeiledergruppe, enhetId).then(dto =>
                    mapVeiledergrupperTilLagretFilter(dto)
                );
            } else {
                nyVeiledergruppe(endringer, enhetId).then(dto => mapLagretFilterFraDTO(dto));
            }
        },
        {
            OK: NY_VEILEDERGRUPPER_OK,
            FEILET: NY_VEILEDERGRUPPER_FEILET,
            PENDING: NY_VEILEDERGRUPPER_PENDING
        }
    );
}

// Action Creators
export function slettGruppe(enhetId: string, filterId: number) {
    return doThenDispatch(
        (_dispatch, getState) => {
            const brukFilterFraPortefolje = sjekkFeature(getState(), BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE);
            if (brukFilterFraPortefolje) {
                return slettVeiledergruppePortefolje(enhetId, filterId);
            } else {
                return slettVeiledergruppe(enhetId, filterId);
            }
        },
        {
            OK: SLETT_VEILEDERGRUPPER_OK,
            FEILET: SLETT_VEILEDERGRUPPER_FEILET,
            PENDING: SLETT_VEILEDERGRUPPER_PENDING
        }
    );
}
