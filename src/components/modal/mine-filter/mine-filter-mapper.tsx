import {
    LagretFilter,
    LagretFilterDTO,
    LagretFilterPortefolje,
    LagretVeiledergruppePortefolje
} from '../../../ducks/lagret-filter';
import {initialState, initialState as filtervalgInitialState} from '../../../ducks/filtrering';
import {Filtervalg, FiltervalgModell} from '../../../typer/filtervalg-modell';
import {AktiviteterFilternokler, AktiviteterValg} from '../../../filtrering/filter-konstanter';
import {filtervalgValidators} from './mine-filter-validering-filtermodel-utils';

// Mapper som lese fra lagret-filter objectet som kommer fra veilarbfilter:
export function mapLagretFilterFraDTO(dto: LagretFilterDTO): LagretFilter {
    return {
        filterNavn: dto.filterNavn,
        filterId: dto.filterId,
        filterValg: mapLagraFiltervalgTilFiltermodell(dto.aktiveFilterValg),
        sortOrder: dto.sortOrder,
        filterCleanup: dto.filterCleanup,
        aktiv: dto.aktiv,
        note: dto.note
    };
}

// Mapper som lese fra veiledergruppe objectet som kommer fra veilarbportefolje:
export function mapVeiledergrupperTilLagretFilter(dto: LagretVeiledergruppePortefolje): LagretFilter {
    return {
        filterNavn: dto.filterNavn,
        filterId: dto.filterId,
        filterValg: {...filtervalgInitialState, [Filtervalg.veiledere]: dto.veiledere ?? []},
        sortOrder: null,
        filterCleanup: false
    };
}

// Mapper som lese fra mine filer objectet som kommer fra veilarbportefolje:
export function mapLagretFilterFraPortefoljeTilLagretFilter(dto: LagretFilterPortefolje): LagretFilter {
    return {
        filterNavn: dto.filterNavn,
        filterId: dto.filterId,
        filterValg: {...dto.filterValg, veilederNavnQuery: initialState[Filtervalg.veilederNavnQuery]},
        sortOrder: dto.sortOrder,
        filterCleanup: false,
        aktiv: dto.aktiv,
        note: dto.ikke_aktiv_beskrivelse
    };
}

export function mapLagraFiltervalgTilFiltermodell(aktiveFilterValg: string | null | undefined): FiltervalgModell {
    // Noen filtre har ikke lengre verdier pga fjerning av gamle filtervalg, og da skal vi ikke kaste feil, men heller returnere default state
    if (!aktiveFilterValg) {
        return {...initialState};
    }

    try {
        const parsed = JSON.parse(aktiveFilterValg);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error('aktiveFilterValg er ikke et objekt');
        }

        // Sjekk om nøkler og verdier er gyldige i filtermodellen FØR de settes i state
        for (const [key, value] of Object.entries(parsed)) {
            const validator = filtervalgValidators[key as Filtervalg];
            if (!validator) {
                throw new Error('Ukjent nøkkelverdi i aktiveFiltervalg');
            }
            const gyldigeVerdier = validator(value);
            if (gyldigeVerdier === undefined) {
                throw new Error(`Ukjente verdier eller datatype i aktiveFiltervalg med nøkkel ${key}`);
            }
        }
        return {...filtervalgInitialState, ...parsed};
    } catch (e) {
        throw new Error('Feil ved parsing av filtervalg for lagra filter', {cause: e});
    }
}

// Mapper som skriver aktive filtervalg til objected som skal sendes til veilarbfilter:
export function mapFiltermodellTilAktiveValgOgStringify(filtervalg: FiltervalgModell): string {
    const aktiveFiltre = Object.fromEntries(
        Object.entries(filtervalg).filter(([key, value]) => {
            // Spesialhåndtering av aktiviteter
            if (key === Filtervalg.aktiviteter) {
                return !erDefaultAktiviteter(value as AktiviteterFilternokler | undefined);
            }
            // Generiske defaults
            if (value == null) return false;
            if (typeof value === 'string') return value !== '';
            if (Array.isArray(value)) return value.length > 0;

            // Ta med alle filtre som ikke er defaults
            return true;
        })
    );
    return JSON.stringify(aktiveFiltre);
}

function erDefaultAktiviteter(aktiviteter: AktiviteterFilternokler | undefined): boolean {
    if (!aktiviteter) {
        return true;
    }

    return Object.values(aktiviteter).every(verdi => verdi === AktiviteterValg.NA);
}
