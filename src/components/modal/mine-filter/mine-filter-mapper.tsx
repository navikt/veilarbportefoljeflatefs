import {LagretFilter, LagretFilterDTO} from '../../../ducks/lagret-filter';
import {initialState as filtervalgInitialState} from '../../../ducks/filtrering';
import {Filtervalg, FiltervalgModell} from '../../../typer/filtervalg-modell';
import {AktiviteterFilternokler, AktiviteterValg} from '../../../filtrering/filter-konstanter';

// Mapper som lese fra lagret-filter objectet som kommer fra veilarbfilter:
export function mapLagretFilterFraDTO(dto: LagretFilterDTO, brukAktiveFiltervalg: boolean): LagretFilter {
    return {
        filterNavn: dto.filterNavn,
        filterId: dto.filterId,
        filterValg: brukAktiveFiltervalg ? mapAktiveValgTilFiltermodell(dto.aktiveFilterValg) : dto.filterValg,
        sortOrder: dto.sortOrder,
        filterCleanup: dto.filterCleanup,
        aktiv: dto.aktiv,
        note: dto.note
    };
}

export function mapAktiveValgTilFiltermodell(aktiveFilterValg: string | null | undefined): FiltervalgModell {
    if (!aktiveFilterValg) {
        return {...filtervalgInitialState};
    }
    try {
        const parsed = JSON.parse(aktiveFilterValg);
        // todo: her kan det legges inn migreringslogikk til når vi har endret på filtervalg-modellen,
        //  f.eks. endra navn på filter eller endra format på verdi, eller selve verdien.
        //  Dette gjøres for å kunne migrere databasen i veilarbfilter i et eget steg uten at ting brekker.
        return {...filtervalgInitialState, ...parsed};
    } catch (e) {
        // TODO: legg på feilmelding her om det ikke fungerer så ting ikke krasjer som før,
        //  og heller returner null e.l. så hele filteret blir fjerna fra lista.
        // eslint-disable-next-line no-console
        console.error('Kunne ikkje parse aktiveFilterValg', e);
        return {...filtervalgInitialState};
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
