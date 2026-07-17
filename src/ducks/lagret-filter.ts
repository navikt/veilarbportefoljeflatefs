import {FiltervalgModell} from '../typer/filtervalg-modell';

export interface LagretFilter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    sortOrder: number | null;
    filterCleanup: boolean;
    aktiv?: boolean;
    note?: string;
}

export interface LagretFilterDTO {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    aktiveFilterValg: string;
    sortOrder: number | null;
    filterCleanup: boolean;
    aktiv?: boolean;
    note?: string;
}

export interface LagretFilterState {
    status: string;
    data: LagretFilter[];
    handlingType: HandlingsType | null;
}

export interface RedigerLagretFilter {
    filterNavn: string;
    filterValg: FiltervalgModell;
    aktiveFilterValg: string;
    filterId: number;
}

export interface NyttLagretFilter {
    filterNavn: string;
    filterValg: FiltervalgModell;
    aktiveFilterValg: string;
}

export interface SorteringOgId {
    sortOrder: number;
    filterId: number;
}

export enum HandlingsType {
    NYTT,
    REDIGERE,
    SLETTE,
    HENTE,
    SORTERING
}

// Nye klasser som går til veilarbportefolje:
export interface LagretFilterPortefolje {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    sortOrder: number;
    aktiv: boolean;
    ikke_aktiv_beskrivelse: string;
}

export interface LagreNyttFilterPortefolje {
    filterNavn: string;
    filterValg: FiltervalgModell;
}

export interface RedigerLagretFilterPortefolje {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
}

export interface SortOrderPortefolje {
    sortOrder: number;
    filterId: number;
}

export interface LagretVeiledergruppePortefolje {
    filterNavn: string;
    filterId: number;
    veiledere: string[];
}

export interface LagreNyVeiledergruppePortefolje {
    filterNavn: string;
    veiledere: string[];
}

export interface RedigerVeiledergruppePortefolje {
    filterNavn: string;
    filterId: number;
    veiledere: string[];
}
