import {LagretFilter, LagretFilterDto, LagretVeiledergruppeDto} from '../../../ducks/lagret-filter';
import {initialState, initialState as filtervalgInitialState} from '../../../ducks/filtrering';
import {Filtervalg} from '../../../typer/filtervalg-modell';

export function mapVeiledergrupperDtoTilLagretFilter(dto: LagretVeiledergruppeDto): LagretFilter {
    return {
        filterNavn: dto.filterNavn,
        filterId: dto.filterId,
        filterValg: {...filtervalgInitialState, [Filtervalg.veiledere]: dto.veiledere ?? []},
        sortOrder: null
    };
}

export function mapLagretFilterDtoTilLagretFilter(dto: LagretFilterDto): LagretFilter {
    return {
        filterNavn: dto.filterNavn,
        filterId: dto.filterId,
        filterValg: {...dto.filterValg, veilederNavnQuery: initialState[Filtervalg.veilederNavnQuery]},
        sortOrder: dto.sortOrder
    };
}
