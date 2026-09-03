import {FiltervalgModell} from '../typer/filtervalg-modell';

export interface LagretFilter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    sortOrder: number | null;
}

export interface LagretFilterState {
    status: string;
    data: LagretFilter[];
    handlingType: HandlingsType | null;
}

export enum HandlingsType {
    NYTT,
    REDIGERE,
    SLETTE,
    HENTE,
    SORTERING
}

export interface LagretFilterDto {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    sortOrder: number;
}

export interface LagreNyttFilterRequest {
    filterNavn: string;
    filterValg: FiltervalgModell;
}

export interface RedigerLagretFilterRequest {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
}

export interface LagreSortOrderRequest {
    sortOrder: number;
    filterId: number;
}

export interface LagretVeiledergruppeDto {
    filterNavn: string;
    filterId: number;
    veiledere: string[];
}

export interface LagreNyVeiledergruppeRequest {
    filterNavn: string;
    veiledere: string[];
}

export interface RedigerVeiledergruppeRequest {
    filterNavn: string;
    filterId: number;
    veiledere: string[];
}
