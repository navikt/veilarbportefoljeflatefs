export enum Sorteringsrekkefolge {
    ikke_satt = 'ikke_satt',
    ascending = 'ascending',
    descending = 'descending'
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
    enhetId?: string;
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
    diskresjonskode?: string;
    egenAnsatt: boolean;
    erDoed: boolean;
    etternavn: string;
    fnr: string;
    fornavn: string;
    sikkerhetstiltak: string[];
    veilederId?: string;
    veilederNavn?: string;
    arbeidsliste: ArbeidslisteModell;
    markert?: boolean;
}

export interface ArbeidslisteModell {
    kommentar?: string;
    frist?: string;
    arbeidslisteAktiv?: boolean;
    endringstidspunkt?: boolean;
    isOppfolgendeVeileder?: boolean;
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
