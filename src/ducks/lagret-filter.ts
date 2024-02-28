import {PortefoljeFilter, VeilederModell} from '../model-interfaces';

export interface LagretFilter {
    filterNavn: string;
    filterId: number;
    filterValg: PortefoljeFilter;
    opprettetDato: Date;
    sortOrder: number | null;
    filterCleanup: boolean;
    aktiv: boolean;
    note: string;
}

export interface LagretVeiledergruppe {
    filterNavn: string;
    filterId: number;
    filterValg: VeilederModell;
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
    filterValg: PortefoljeFilter;
    filterId: number;
}

export interface NyttLagretFilter {
    filterNavn: string;
    filterValg: PortefoljeFilter;
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
