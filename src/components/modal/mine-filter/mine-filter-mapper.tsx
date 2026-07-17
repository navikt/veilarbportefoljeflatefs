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

export function mapLagretFilterFraPortefoljeTilLagretFilter(dto: LagretFilterPortefolje): LagretFilter {
    return {
        filterNavn: dto.filterNavn,
        filterId: dto.filterId,
        filterValg: {...dto.filterValg, veilederNavnQuery: initialState[Filtervalg.veilederNavnQuery]},
        sortOrder: dto.sortOrder,
        filterCleanup: false,
        aktiv: true
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

        // Migrer gamle nøkler og verdier til nye, dersom det finnes migreringer for de
        const migrert = migrerParsed(parsed);

        // Sjekk om nøkler og verdier er gyldige i filtermodellen FØR de settes i state
        for (const [key, value] of Object.entries(migrert)) {
            const validator = filtervalgValidators[key as Filtervalg];
            if (!validator) {
                throw new Error('Ukjent nøkkelverdi i aktiveFiltervalg');
            }
            const gyldigeVerdier = validator(value);
            if (gyldigeVerdier === undefined) {
                throw new Error(`Ukjente verdier eller datatype i aktiveFiltervalg med nøkkel ${key}`);
            }
        }
        return {...filtervalgInitialState, ...migrert};
    } catch (e) {
        throw new Error('Feil ved parsing av filtervalg for lagra filter', {cause: e});
    }
}

/**
 * Midlertidige migreringer for felt/verdier i FiltervalgModell.
 * Brukes når frontend-modellen er oppdatert, men databasen i veilarbfilter fremdeles
 * inneholder gamle nøkler eller verdier. Migreringen kjøres FØR validering, slik at
 * gamle data blir omskrevet til nytt format i stedet for å kaste feil.
 * Fjern oppføringene igjen så snart databasen er migrert.
 */
function migrerParsed(parsed: Record<string, unknown>): Record<string, unknown> {
    const migrert: Record<string, unknown> = {};
    for (const [rawKey, rawValue] of Object.entries(parsed)) {
        const key = (nokkelMigreringer[rawKey] ?? rawKey) as Filtervalg;
        const etterFormMigrering = formMigreringer[key] ? formMigreringer[key]!(rawValue) : rawValue;
        migrert[key] = migrerVerdi(key, etterFormMigrering);
    }
    return migrert;
}

function migrerVerdi(key: Filtervalg, value: unknown): unknown {
    const mapping = verdiMigreringer[key];
    if (!mapping) return value;
    if (typeof value === 'string') {
        return mapping[value] ?? value;
    }
    if (Array.isArray(value)) {
        return value.map(v => (typeof v === 'string' ? (mapping[v] ?? v) : v));
    }
    return value;
}

/** Gammel nøkkel i DB → ny nøkkel i FiltervalgModell.
 * Eksempel:
 *   gammeltNokkelnavn: Filtervalg.nyttNokkelnavn
 *   kjoenn: Filtervalg.kjonn
 *
 */
const nokkelMigreringer: Record<string, Filtervalg> = {
    // Legg til midlertidige nøkkelendringer her.
};

/** Per felt: fri transformasjonsfunksjon for endring av form/type på verdien.
 * Brukes når verdien har byttet datatype (f.eks. array → streng, streng → objekt)
 * og enkel enum-mapping i `verdiMigreringer` ikke er nok.
 *
 * Eksempel:
 *   // 'kjonn' gikk fra string[] til string:
 *   [Filtervalg.kjonn]: value => Array.isArray(value) ? (value[0] ?? null) : value,
 *
 *   // 'alder' gikk fra string til string[]:
 *   [Filtervalg.alder]: value => (typeof value === 'string' ? [value] : value),
 */
const formMigreringer: Partial<Record<Filtervalg, (value: unknown) => unknown>> = {
    // Legg til midlertidige form-endringer her.
};

/** Per felt: gammel enum-verdi → ny enum-verdi.
 * Fungerer både for listeverdier og skalarverdier.
 * Eksempel:
 *   [Filtervalg.landgruppe]: {GAMMEL_KODE: 'NY_KODE'}
 *   [Filtervalg.kjonn]:      {MANN: 'M', KVINNE: 'K'},
 */
const verdiMigreringer: Partial<Record<Filtervalg, Record<string, string>>> = {
    // Legg til midlertidige verdiendringer her.
};

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
