export interface BrukerModell {
    guid: string; // denne sendes ikke fra backend
    markert?: boolean; // sendes ikke fra backend

    etiketter: Etiketter;

    fnr: string;
    fornavn: string;
    etternavn: string;
    hovedStatsborgerskap: Statsborgerskap | null;
    foedeland: string | null;
    geografiskBosted: GeografiskBosted;
    tolkebehov: Tolkebehov;
    barnUnder18AarData: BarnUnder18AarModell[];

    oppfolgingStartdato: string;
    tildeltTidspunkt: string | null;
    veilederId: string | null;
    egenAnsatt: boolean;
    skjermetTil: string | null;

    tiltakshendelse: TiltakshendelseModell | null;
    hendelse: HendelseInnhold | null;
    meldingerVenterPaSvar: MeldingerVenterPaSvar;
    aktiviteterAvtaltMedNav: AktiviteterAvtaltMedNav;
    moteMedNavIDag: MoteMedNavIDag | null;

    sisteEndringAvBruker: SisteEndringAvBruker | null;
    utdanningOgSituasjonSistEndret: string | null; // dato
    nesteSvarfristCvStillingFraNav: string | null;
    ytelser: Ytelser;
    vedtak14a: Vedtak14a;

    fargekategori: FargekategoriModell | null;
    fargekategoriEnhetId: string | null;
    huskelapp: HuskelappModell | null;
}

export interface Etiketter {
    erDoed: boolean;
    erSykmeldtMedArbeidsgiver: boolean;
    trengerOppfolgingsvedtak: boolean;
    nyForVeileder: boolean;
    nyForEnhet: boolean;
    harBehovForArbeidsevneVurdering: boolean;
    harSikkerhetstiltak: boolean;
    diskresjonskodeFortrolig: string | null;
    profileringResultat: Profileringsresultat | null;
}

export interface MoteMedNavIDag {
    avtaltMedNav: boolean;
    klokkeslett: string;
    varighetMinutter: number;
}

export interface SisteEndringAvBruker {
    kategori: string;
    tidspunkt: string;
    aktivitetId: string | null;
}

export interface GeografiskBosted {
    bostedKommune: string | null;
    bostedKommuneUkjentEllerUtland: string;
    bostedBydel: string | null;
    bostedSistOppdatert: string | null;
}

export interface Ytelser {
    ytelserArena: YtelserArena;
    aap: AapKelvinData | null;
    tiltakspenger: TiltakspengerData | null;
    ensligeForsorgereOvergangsstonad: EnsligeForsorgereOvergangsstonad | null;
}

export interface YtelserArena {
    innsatsgruppe: Innsatsgruppe | null;
    ytelse?: string;
    utlopsdato?: string;
    dagputlopUke?: number;
    permutlopUke?: number;
    aapmaxtidUke?: number;
    aapUnntakUkerIgjen?: number;
    aapordinerutlopsdato?: string;
}

export interface MeldingerVenterPaSvar {
    datoMeldingVenterPaNav: string | null;
    datoMeldingVenterPaBruker: string | null;
}

export enum Profileringsresultat {
    UKJENT_VERDI = 'UKJENT_VERDI',
    UDEFINERT = 'UDEFINERT',
    ANTATT_GODE_MULIGHETER = 'ANTATT_GODE_MULIGHETER',
    ANTATT_BEHOV_FOR_VEILEDNING = 'ANTATT_BEHOV_FOR_VEILEDNING',
    OPPGITT_HINDRINGER = 'OPPGITT_HINDRINGER'
}

/** Innsatsgruppe frå Arena */
export enum Innsatsgruppe {
    IKVAL = 'IKVAL',
    BFORM = 'BFORM',
    BATT = 'BATT',
    VARIG = 'VARIG'
}

export interface TiltakshendelseModell {
    id: string;
    opprettet: Date;
    tekst: string;
    lenke: string;
    tiltakstype: string | null;
}

export interface AktiviteterAvtaltMedNav {
    nesteUtlopsdatoForAlleAktiviteter: string | null;
    nesteUtlopsdatoForFiltrerteAktiviteter: string | null;
    nyesteUtlopteAktivitet: string | null;
    aktivitetStart: string | null;
    nesteAktivitetStart: string | null;
    forrigeAktivitetStart: string | null;
}

export interface Vedtak14a {
    gjeldendeVedtak14a: GjeldendeVedtak14aModell | null;
    utkast14a: Utkast14a | null;
}

export interface GjeldendeVedtak14aModell {
    innsatsgruppe: InnsatsgruppeGjeldendeVedtak14a;
    hovedmal: Hovedmal | null;
    fattetDato: Date;
}

export interface Utkast14a {
    status: string;
    dagerSidenStatusEndretSeg: string;
    ansvarligVeileder: string;
}

export interface Statsborgerskap {
    statsborgerskap: string;
    gyldigFra?: string;
}

export interface EnsligeForsorgereOvergangsstonad {
    vedtaksPeriodetype: string;
    harAktivitetsplikt?: boolean;
    utlopsDato: Date;
    yngsteBarnsFodselsdato: Date;
}

export interface BarnUnder18AarModell {
    alder: number;
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

export interface HuskelappModell {
    huskelappId: string | null;
    frist?: Date | null;
    kommentar?: string | null;
    endretDato: Date | null;
    endretAv: string | null;
    enhetId: string | null;
}

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

export interface HendelseInnhold {
    beskrivelse: string;
    dato: string;
    lenke: string;
}

export interface Tolkebehov {
    talespraaktolk: string;
    tegnspraaktolk: string;
    sistOppdatert: string | null; // LocalDate i backend
}

export interface AapKelvinData {
    vedtaksdatoTilOgMed: string | null;
    rettighetstype: string | null;
}

export interface TiltakspengerData {
    vedtaksdatoTilOgMed: string | null;
    rettighet: string | null;
}
