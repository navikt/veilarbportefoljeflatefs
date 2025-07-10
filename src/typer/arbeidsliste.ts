/* Denne modellen finst framleis fordi vi kan filtrere på arbeidslister via Lagra filter,
 * og difor også har filtertags/filtrering-label'ar å vise med dei gamle kategoriane. 2025-05-19, Ingrid. */
/** OpenSearch-verdiar for å filtrere på arbeidslista sine fargekategoriar */
export enum KategoriModell {
    BLA = 'BLA',
    LILLA = 'LILLA',
    GRONN = 'GRONN',
    GUL = 'GUL'
}

/* Denne modellen finst framleis fordi vi framleis får Arbeidslister på brukermodellen frå OpenSearch. 2025-05-19, Ingrid. */
export interface ArbeidslisteModell {
    kommentar?: string;
    overskrift?: string;
    frist: string;
    arbeidslisteAktiv: boolean;
    endringstidspunkt: string; // dato
    isOppfolgendeVeileder: boolean;
    sistEndretAv: {veilederId: string};
    kategori: KategoriModell;
    hentetKommentarOgTittel: boolean;
    navkontorForArbeidsliste?: string;
}
