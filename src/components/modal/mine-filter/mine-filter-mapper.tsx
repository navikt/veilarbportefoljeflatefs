import {LagretFilter, LagretFilterDTO} from '../../../ducks/lagret-filter';
import {initialState as filtervalgInitialState} from '../../../ducks/filtrering';
import {Filtervalg, FiltervalgModell} from '../../../typer/filtervalg-modell';
import {AktiviteterFilternokler, AktiviteterValg} from '../../../filtrering/filter-konstanter';
import {filtervalgValidators} from './mine-filter-validering-filtermodel-utils';

// Mapper som lese fra lagret-filter objectet som kommer fra veilarbfilter:
export function mapLagretFilterFraDTO(dto: LagretFilterDTO, brukAktiveFiltervalg: boolean): LagretFilter {
    return {
        filterNavn: dto.filterNavn,
        filterId: dto.filterId,
        filterValg: brukAktiveFiltervalg
            ? mapAktiveValgTilFiltermodell(dto.filterValg, dto.aktiveFilterValg)
            : dto.filterValg,
        sortOrder: dto.sortOrder,
        filterCleanup: dto.filterCleanup,
        aktiv: dto.aktiv,
        note: dto.note
    };
}

export function mapAktiveValgTilFiltermodell(
    filtervalg: FiltervalgModell,
    aktiveFilterValg: string | null | undefined
): FiltervalgModell {
    // midlertidig sjekk til databasen får populert data for alle brukere, default til opprinnelige filtervalg
    if (!aktiveFilterValg) {
        return {...filtervalg};
    }

    try {
        const parsed = JSON.parse(aktiveFilterValg);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error('aktiveFilterValg er ikke et objekt');
        }

        // Sjekk om nøkler og verdier er gyldige i filtermodellen FØR de settes i state
        for (const [key, value] of Object.entries(parsed)) {
            // TODO - legg muligheter for mapping-logikk ved endringer i eksisterende filtervalg her
            const validator = filtervalgValidators[key as Filtervalg];
            if (!validator) {
                throw new Error('Ukjente nøkkelverdi i aktiveFiltervalg');
            }
            const gyldigeVerdier = validator(value);
            if (gyldigeVerdier === undefined) {
                throw new Error('Ukjente verdier eller datatype i aktiveFiltervalg');
            }
        }
        return {...filtervalgInitialState, ...parsed};
    } catch (e) {
        throw new Error('Feil ved parsing av filtervalg for lagra filter', {cause: e});
    }
}

/**
 * Migreringsfunksjoner for felt i FiltervalgModell.
 * Brukes når backend fremdeles returnerer gamle verdier for et felt som har endra format
 * eller verdi i frontend. Hver funksjon tar den parsa (potensielt gamle) verdien og returnerer den
 * migrerte verdien i det nye formatet.
 */
type FiltervalgMigrations = {
    [K in keyof FiltervalgModell]?: (value: NonNullable<FiltervalgModell[K]>) => FiltervalgModell[K];
};

const filtervalgMigrations: FiltervalgMigrations = {
    // Døme 1: Skalar-verdi endra kode
    // kjonn: value => (value as string) === 'MANN' ? 'M' : (value as string) === 'KVINNE' ? 'K' : value,
    // Døme 2: Erstatt verdiar inne i ei liste
    // landgruppe: value => value.map(g => (g === 'GAMMEL_KODE' ? 'NY_KODE' : g)),
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
