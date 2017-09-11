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
    ytelse?: string;
    brukerstatus?: string;
    aktiviteter?: string[];
    tiltakstyper: string[];
}
