import {FiltervalgModell} from '../typer/filtervalg-modell';

export interface LagretFilter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    opprettetDato: Date;
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
    filterId: number;
}

export interface NyttLagretFilter {
    filterNavn: string;
    filterValg: FiltervalgModell;
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
