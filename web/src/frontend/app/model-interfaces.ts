export enum Sorteringsrekkefolge {
    ikke_satt = "ikke_satt",
    ascending = "ascending",
    descending = "descending"
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
    ident: string;
    navn?: string;
    fornavn?: string;
    etternavn?: string;
}
