export interface EnhetModell {
    enhetId: string;
    navn?: string;
}

/* Formatet vi får innlogga veileder på frå veilarbveileder/api/veileder/v2/me */
export interface VeilederModell {
    ident: string;
    navn: string;
    fornavn: string;
    etternavn: string;
    enheter: EnhetModell[];
}

/* Formatet vi får kvar veileder på enheten på, frå veilarbveileder/api/enhet/${enhetId}/veiledere */
export type VeilederUtenEnhetModell = Omit<VeilederModell, 'enheter'>;

/* Responstypen for veilarbveileder/api/enhet/${enhetId}/veiledere */
export interface VeilederePaEnhetModell {
    veilederListe: VeilederUtenEnhetModell[];
    enhet: EnhetModell;
}
