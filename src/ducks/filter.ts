import {FiltervalgModell} from "../model-interfaces";

export interface Filter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    opprettetDato: Date;
    sortOrder: number | null;
}

export interface FilterState {
    status: string;
    data: Filter[];
    handlingType: HandlingsType | null;
}

export interface RedigerFilter {
    filterNavn: string;
    filterValg: FiltervalgModell;
    filterId: number;
}

export interface NyttFilter {
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