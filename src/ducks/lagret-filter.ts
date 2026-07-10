import {FiltervalgModell} from '../typer/filtervalg-modell';

export interface LagretFilter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    sortOrder: number | null;
    filterCleanup: boolean;
    aktiv: boolean;
    note: string;
}

export interface LagretFilterDTO {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    aktiveFilterValg?: string | null; // kan være null til databasen har fått populert de nye kolonnen med data
    sortOrder: number | null;
    filterCleanup: boolean;
    aktiv: boolean;
    note: string;
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
