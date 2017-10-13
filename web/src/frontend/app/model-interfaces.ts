import { AktiviteterValg } from './ducks/filtrering';

export enum Sorteringsrekkefolge {
    ikke_satt = 'ikke_satt',
    ascending = 'ascending',
    descending = 'descending'
}

export enum EtikettType {
    NYBRUKER = 'nybruker',
    EGEN_ANSATT = 'egen-ansatt',
    DISKRESJONSKODE = 'diskresjonskode',
    SIKKERHETSTILTAK = 'sikkerhetstiltak',
    DOED = 'doed'
}

export interface FiltervalgModell {
    nyeBrukere?: boolean;
    inaktiveBrukere?: boolean;
    venterPaSvarFraNAV?: boolean;
    venterPaSvarFraBruker?: boolean;
    minArbeidsliste?: boolean;
    alder?: string[];
    kjonn?: string[];
    fodselsdagIMnd?: string[];
    innsatsgruppe?: string[];
    formidlingsgruppe?: string[];
    servicegruppe?: string[];
    veiledere?: string[];
    ytelse: string;
    brukerstatus?: string;
    aktiviteter?: string[];
    tiltakstyper: string[];
}

export interface EnhetModell {
    enhetId: string;
    navn?: string;
}

export interface ValgtEnhetModell {
    enhet: EnhetModell;
    status: string;
}

export interface VeilederModell {
    ident?: string;
    navn?: string;
    fornavn?: string;
    etternavn?: string;
}

export interface BrukerModell {
    fnr: string;
    fornavn: string;
    etternavn: string;
    veilederId?: string;
    sikkerhetstiltak: string[];
    diskresjonskode?: string;
    egenAnsatt: boolean;
    erDoed: boolean;
    fodselsdagIMnd: number;
    fodselsdato: string; // dato
    kjonn: string; // enum
    ytelse?: string;
    utlopsdato?: string; // dato
    utlopsdatoFasett?: string; // dato
    dagputlopUke?: number;
    dagputlopUkeFasett?: string; // dato
    permutlopUke?: number;
    permutlopUkeFasett?: string; // dato
    aapmaxtidUke?: number;
    aapmaxtidUkeFasett?: string; // dato
    arbeidsliste: ArbeidslisteModell;
    venterPaSvarFraNAV?: string;
    venterPaSvarFraBruker?: string;
    nyesteUtlopteAktivitet?: string; // dato
    veilederNavn?: string;
    brukertiltak?: string[];
    aktiviteter?: AktiviteterModell;
    markert?: boolean;
}

// TODO: Alle strenger her er iso-8601 datoer. Bør castes før de lagres i storen?
export interface AktiviteterModell {
    egen?: string;
    stilling?: string;
    sokeavtale?: string;
    behandling?: string;
    ijobb?: string;
    samtalereferat?: string;
    mote?: string;
    tiltak?: string;
    gruppeaktivitet?: string;
}

export interface ArbeidslisteModell {
    kommentar?: string;
    frist: string;
    arbeidslisteAktiv: boolean;
    endringstidspunkt: string; // dato
    isOppfolgendeVeileder: boolean;
    sistEndretAv: { veilederId: string };
}

export interface StatustallModell {
    totalt: number;
    nyeBrukere?: number;
    inaktiveBrukere: number;
    venterPaSvarFraNAV: number;
    venterPaSvarFraBruker: number;
}

export interface FeilmeldingModalModell {
    aarsak: string;
    brukereError: string[];
}

export enum Status {
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
    OK = 'OK',
    RELOADING = 'RELOADING',
    ERROR = 'ERROR'
}

export interface ArbeidslisteDataModell {
    fnr: string;
    kommentar: string;
    frist: string;
}
