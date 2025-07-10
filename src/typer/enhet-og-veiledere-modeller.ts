export interface EnhetModell {
    enhetId: string;
    navn?: string;
}

export interface VeilederModell {
    ident: string;
    navn: string;
    fornavn: string;
    etternavn: string;
}

/* Formatet vi får innlogga veileder på frå veilarbveileder/api/veileder/v2/me */
export interface InnloggetVeilederModell extends VeilederModell {
    enheter: EnhetModell[];
}

/* Responstypen for veilarbveileder/api/enhet/${enhetId}/veiledere */
export interface VeilederePaEnhetModell {
    veilederListe: VeilederModell[];
    enhet: EnhetModell;
}
