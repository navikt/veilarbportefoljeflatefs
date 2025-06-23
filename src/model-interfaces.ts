import {FargekategoriModell, Hovedmal, InnsatsgruppeGjeldendeVedtak14a} from './typer/bruker-modell';

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

export type IdentParam = {
    ident: string;
};

export enum SesjonStatus {
    GYLDIG = 'GYLDIG',
    UTLOPT = 'UTLØPT'
}
