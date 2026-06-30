import {FiltervalgModell} from '../typer/filtervalg-modell';

export interface LagretFilter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    aktiveFilterValg?: string | null; //TODO: nullable mens jeg tester
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
