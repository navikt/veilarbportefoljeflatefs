/* Enhet og veileder */

export interface EnhetModell {
    enhetId: string;
    navn?: string;
}

export interface VeilederModell {
    ident: string;
    navn: string;
    fornavn: string;
    etternavn: string;
    enheter: EnhetModell[];
}

/* Både i filtervalg og brukarmodell */

/** Namn på filter for innsatsgruppe i backend + data ein får på gjeldande vedtak for ein person */
export enum InnsatsgruppeGjeldendeVedtak14a {
    STANDARD_INNSATS = 'STANDARD_INNSATS',
    SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
    SPESIELT_TILPASSET_INNSATS = 'SPESIELT_TILPASSET_INNSATS',
    GRADERT_VARIG_TILPASSET_INNSATS = 'GRADERT_VARIG_TILPASSET_INNSATS',
    VARIG_TILPASSET_INNSATS = 'VARIG_TILPASSET_INNSATS'
}

/** Namn på filter for innsatsgruppe i backend + data ein får på gjeldande vedtak for ein person */
export enum Hovedmal {
    SKAFFE_ARBEID = 'SKAFFE_ARBEID',
    BEHOLDE_ARBEID = 'BEHOLDE_ARBEID',
    OKE_DELTAKELSE = 'OKE_DELTAKELSE'
}

export enum FargekategoriModell {
    FARGEKATEGORI_A = 'FARGEKATEGORI_A',
    FARGEKATEGORI_B = 'FARGEKATEGORI_B',
    FARGEKATEGORI_C = 'FARGEKATEGORI_C',
    FARGEKATEGORI_D = 'FARGEKATEGORI_D',
    FARGEKATEGORI_F = 'FARGEKATEGORI_F',
    FARGEKATEGORI_E = 'FARGEKATEGORI_E',
    INGEN_KATEGORI = 'INGEN_KATEGORI'
}

/* Visningstekstar */

/** Korte visningsnavn for innsatsgrupper.
 *  Brukt til visning av innsatsgruppe i tabellrad for bruker. */
export const innsatsgruppeNavn: {[key in InnsatsgruppeGjeldendeVedtak14a]: string} = {
    [InnsatsgruppeGjeldendeVedtak14a.STANDARD_INNSATS]: 'Gode muligheter',
    [InnsatsgruppeGjeldendeVedtak14a.SITUASJONSBESTEMT_INNSATS]: 'Trenger veiledning',
    [InnsatsgruppeGjeldendeVedtak14a.SPESIELT_TILPASSET_INNSATS]: 'Trenger veiledning, nedsatt arbeidsevne',
    [InnsatsgruppeGjeldendeVedtak14a.GRADERT_VARIG_TILPASSET_INNSATS]: 'Jobbe delvis',
    [InnsatsgruppeGjeldendeVedtak14a.VARIG_TILPASSET_INNSATS]: 'Liten mulighet til å jobbe'
};

export const HovedmalNavn: {[key in Hovedmal]: string} = {
    [Hovedmal.SKAFFE_ARBEID]: 'Skaffe arbeid',
    [Hovedmal.BEHOLDE_ARBEID]: 'Beholde arbeid',
    [Hovedmal.OKE_DELTAKELSE]: 'Øke deltakelse'
};

export enum Fargekategorinavn {
    FARGEKATEGORI_A = 'Blå halvsirkel',
    FARGEKATEGORI_B = 'Grønn trekant',
    FARGEKATEGORI_C = 'Gul sirkel',
    FARGEKATEGORI_D = 'Lilla firkant',
    FARGEKATEGORI_E = 'Turkis femkant',
    FARGEKATEGORI_F = 'Oransje rombe',
    INGEN_KATEGORI = 'Ingen kategori'
}

/* Brukermodell */

/* Anna */

export interface FargekategoriDataModell {
    fnr: string[];
    fargekategoriVerdi: FargekategoriModell;
}

export interface SkjermingEtikettConfig {
    hidden: true | false;
    tittel: string | null;
    type: 'error' | 'warning' | 'info' | 'success';
}

export interface IdentParam {
    ident: string;
}

export enum SesjonStatus {
    GYLDIG = 'GYLDIG',
    UTLOPT = 'UTLØPT'
}
