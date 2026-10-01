import {LagretFilter, LagretFilterDto, LagretVeiledergruppeDto} from '../../../ducks/lagret-filter';
import {initialState as filtervalgInitialState} from '../../../ducks/filtrering';
import {Filtervalg, FiltervalgModell} from '../../../typer/filtervalg-modell';

export function mapVeiledergrupperDtoTilLagretFilter(dto: LagretVeiledergruppeDto): LagretFilter {
    return {
        filterNavn: dto.filterNavn,
        filterId: dto.filterId,
        filterValg: {...filtervalgInitialState, [Filtervalg.veiledere]: dto.veiledere ?? []},
        sortOrder: null,
        infoOmSlettetFiltervalg: null
    };
}

function beholdKjenteFiltervalg(filterValg: FiltervalgModell): FiltervalgModell {
    return Object.fromEntries(
        Object.keys(filtervalgInitialState).map(key => [key, filterValg[key] ?? filtervalgInitialState[key]])
    ) as FiltervalgModell;
}

export function mapLagretFilterDtoTilLagretFilter(dto: LagretFilterDto): LagretFilter {
    return {
        filterNavn: dto.filterNavn,
        filterId: dto.filterId,
        filterValg: {
            ...beholdKjenteFiltervalg(dto.filterValg),
            veilederNavnQuery: filtervalgInitialState[Filtervalg.veilederNavnQuery]
        },
        sortOrder: dto.sortOrder,
        infoOmSlettetFiltervalg: dto.infoOmSlettetFiltervalg
    };
}
