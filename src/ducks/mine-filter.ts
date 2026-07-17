import {doThenDispatch, handterFeil, sendResultatTilDispatch, STATUS} from './utils';
import {
    hentMineFilter,
    hentMineFilterPortefolje,
    lagreNyttMineFilterPortefolje,
    lagreSorteringFiltere,
    lagreSorteringMineFilterePortefolje,
    nyttMineFilter,
    redigerMineFilter,
    redigerMineFilterPortefolje,
    slettMineFilter,
    slettMineFilterPortefolje
} from '../middleware/api';
import {
    HandlingsType,
    LagreNyttFilterPortefolje,
    LagretFilterDTO,
    LagretFilterPortefolje,
    LagretFilterState,
    NyttLagretFilter,
    RedigerLagretFilter,
    RedigerLagretFilterPortefolje,
    SorteringOgId,
    SortOrderPortefolje
} from './lagret-filter';
import {
    mapLagretFilterFraDTO,
    mapLagretFilterFraPortefoljeTilLagretFilter
} from '../components/modal/mine-filter/mine-filter-mapper';
import {sjekkFeature} from './features';
import {BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE} from '../konstanter';

// Actions
export const HENT_MINEFILTER_OK = 'lagredefilter/OK';
export const HENT_MINEFILTER_FEILET = 'lagredefilter/FEILET';
export const HENT_MINEFILTER_PENDING = 'lagredefilter/PENDING';

export const REDIGER_MINEFILTER_OK = 'lagredefilter_endre/OK';
export const REDIGER_MINEFILTER_FEILET = 'lagredefilter_endre/FEILET';
export const REDIGER_MINEFILTER_PENDING = 'lagredefilter_endre/PENDING';

export const NY_MINEFILTER_OK = 'lagredefilter_ny/OK';
export const NY_MINEFILTER_FEILET = 'lagredefilter_ny/FEILET';
export const NY_MINEFILTER_PENDING = 'lagredefilter_ny/PENDING';

export const SLETT_MINEFILTER_OK = 'lagredefilter_slette/OK';
export const SLETT_MINEFILTER_FEILET = 'lagredefilter_slette/FEILET';
export const SLETT_MINEFILTER_PENDING = 'lagredefilter_slette/PENDING';

export const SORTER_MINEFILTER_OK = 'lagredefilter_sortering/OK';
export const SORTER_MINEFILTER_FEILET = 'lagredefilter_sortering/FEILET';

const initialState = {
    status: STATUS.NOT_STARTED,
    data: [],
    handlingType: null
};

//  Reducer
export function mineFilterReducer(state: LagretFilterState = initialState, action) {
    switch (action.type) {
        case HENT_MINEFILTER_PENDING:
            return {
                ...state,
                status: STATUS.PENDING,
                handlingType: HandlingsType.HENTE
            };
        case NY_MINEFILTER_PENDING:
            return {
                ...state,
                status: STATUS.PENDING,
                handlingType: HandlingsType.NYTT
            };
        case REDIGER_MINEFILTER_PENDING:
            return {
                ...state,
                status: STATUS.PENDING,
                handlingType: HandlingsType.REDIGERE
            };
        case SLETT_MINEFILTER_PENDING:
            return {
                ...state,
                status: STATUS.PENDING,
                handlingType: HandlingsType.SLETTE
            };
        case HENT_MINEFILTER_FEILET:
            return {
                ...state,
                status: STATUS.ERROR,
                handlingType: HandlingsType.HENTE
            };
        case NY_MINEFILTER_FEILET:
            return {
                ...state,
                status: STATUS.ERROR,
                handlingType: HandlingsType.NYTT
            };
        case REDIGER_MINEFILTER_FEILET:
            return {
                ...state,
                status: STATUS.ERROR,
                handlingType: HandlingsType.REDIGERE
            };
        case SLETT_MINEFILTER_FEILET:
            return {
                ...state,
                status: STATUS.ERROR,
                handlingType: HandlingsType.SLETTE
            };
        case HENT_MINEFILTER_OK:
            return {
                ...state,
                status: STATUS.OK,
                data: action.data,
                handlingType: HandlingsType.HENTE
            };
        case NY_MINEFILTER_OK:
            return {
                ...state,
                status: STATUS.OK,
                handlingType: HandlingsType.NYTT,
                data: state.data.concat(action.data)
            };
        case REDIGER_MINEFILTER_OK:
            return {
                ...state,
                status: STATUS.OK,
                handlingType: HandlingsType.REDIGERE,
                data: state.data.map(elem => {
                    if (elem.filterId !== action.data.filterId) {
                        return elem;
                    }
                    return action.data;
                })
            };
        case SLETT_MINEFILTER_OK:
            return {
                ...state,
                status: STATUS.OK,
                handlingType: HandlingsType.SLETTE,
                data: state.data.filter(elem => elem.filterId !== action.data)
            };

        case SORTER_MINEFILTER_FEILET:
            return {
                ...state,
                status: STATUS.ERROR,
                handlingType: HandlingsType.SORTERING
            };
        case SORTER_MINEFILTER_OK:
            return {
                ...state,
                status: STATUS.OK,
                handlingType: HandlingsType.SORTERING,
                data: action.data
            };
        default:
            return state;
    }
}

export function hentMineFilterForVeileder() {
    return doThenDispatch(
        (_dispatch, getState) => {
            const brukFilterFraPortefolje = sjekkFeature(getState(), BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE);
            if (brukFilterFraPortefolje) {
                return hentMineFilterPortefolje().then((dtoer: LagretFilterPortefolje[]) =>
                    dtoer.map(dto => mapLagretFilterFraPortefoljeTilLagretFilter(dto))
                );
            } else {
                return hentMineFilter().then((dtoer: LagretFilterDTO[]) =>
                    dtoer.map(dto => mapLagretFilterFraDTO(dto))
                );
            }
        },
        {OK: HENT_MINEFILTER_OK, FEILET: HENT_MINEFILTER_FEILET, PENDING: HENT_MINEFILTER_PENDING}
    );
}

export function lagreEndringer(endringer: RedigerLagretFilter | RedigerLagretFilterPortefolje) {
    return doThenDispatch(
        (_dispatch, getState) => {
            const brukFilterFraPortefolje = sjekkFeature(getState(), BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE);
            if (brukFilterFraPortefolje) {
                const redigerLagretFilter: RedigerLagretFilterPortefolje = {
                    filterNavn: endringer.filterNavn,
                    filterId: endringer.filterId,
                    filterValg: endringer.filterValg
                };
                return redigerMineFilterPortefolje(redigerLagretFilter).then(
                    mapLagretFilterFraPortefoljeTilLagretFilter
                );
            } else {
                return redigerMineFilter(endringer as RedigerLagretFilter).then(dto => mapLagretFilterFraDTO(dto));
            }
        },
        {
            OK: REDIGER_MINEFILTER_OK,
            FEILET: REDIGER_MINEFILTER_FEILET,
            PENDING: REDIGER_MINEFILTER_PENDING
        }
    );
}

export function lagreNyttFilter(nyttFilter: NyttLagretFilter | LagreNyttFilterPortefolje) {
    return doThenDispatch(
        (_dispatch, getState) => {
            const brukFilterFraPortefolje = sjekkFeature(getState(), BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE);
            if (brukFilterFraPortefolje) {
                const lagreNyttFilter: LagreNyttFilterPortefolje = {
                    filterNavn: nyttFilter.filterNavn,
                    filterValg: nyttFilter.filterValg
                };
                return lagreNyttMineFilterPortefolje(lagreNyttFilter).then(dto =>
                    mapLagretFilterFraPortefoljeTilLagretFilter(dto)
                );
            } else {
                return nyttMineFilter(nyttFilter as NyttLagretFilter).then(dto => mapLagretFilterFraDTO(dto));
            }
        },
        {
            OK: NY_MINEFILTER_OK,
            FEILET: NY_MINEFILTER_FEILET,
            PENDING: NY_MINEFILTER_PENDING
        }
    );
}

export function slettFilter(filterId: number) {
    return doThenDispatch(
        (_dispatch, getState) => {
            const brukFilterFraPortefolje = sjekkFeature(getState(), BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE);
            if (brukFilterFraPortefolje) {
                return slettMineFilterPortefolje(filterId);
            } else {
                return slettMineFilter(filterId);
            }
        },
        {
            OK: SLETT_MINEFILTER_OK,
            FEILET: SLETT_MINEFILTER_FEILET,
            PENDING: SLETT_MINEFILTER_PENDING
        }
    );
}

export function lagreSorteringForFilter(sorteringOgIder: SorteringOgId[] | SortOrderPortefolje[]) {
    return (dispatch, getState) => {
        const brukFilterFraPortefolje = sjekkFeature(getState(), BRUK_LAGREDE_FILTER_FRA_VEILARBPORTEFOLJE);
        if (brukFilterFraPortefolje) {
            return lagreSorteringMineFilterePortefolje(sorteringOgIder as SortOrderPortefolje[])
                .then(data => sendResultatTilDispatch(dispatch, SORTER_MINEFILTER_OK)(data))
                .catch(handterFeil(dispatch, SORTER_MINEFILTER_FEILET));
        } else {
            return lagreSorteringFiltere(sorteringOgIder as SorteringOgId[])
                .then(data => sendResultatTilDispatch(dispatch, SORTER_MINEFILTER_OK)(data))
                .catch(handterFeil(dispatch, SORTER_MINEFILTER_FEILET));
        }
    };
}
