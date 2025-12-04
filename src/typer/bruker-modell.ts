export interface BrukerModell {
    etiketter: Etiketter;
    geografiskBosted: GeografiskBosted;
    meldingerVenterPaSvar: MeldingerVenterPaSvar;
    ytelser: Ytelser;

    fnr: string;
    guid: string; // denne sendes ikke fra backend
    fornavn: string;
    etternavn: string;
    oppfolgingStartdato: string; // dato
    tildeltTidspunkt: string; // dato
    veilederId?: string;
    egenAnsatt: boolean;
    skjermetTil?: string;
    nyesteUtlopteAktivitet?: string; // dato
    tiltakshendelse: TiltakshendelseModell | null;
    aktiviteter?: AktiviteterModell; // kun avtalte aktiviteter
    aktivitetStart?: string; // dato
    nesteAktivitetStart?: string; // dato
    forrigeAktivitetStart?: string; // dato
    markert?: boolean; // sendes ikke fra backend
    moteStartTid: string; // kun avtalte moter, moteStartTid verdien blir brukt til å avgjere kva status som vert vist i kolonna for "avtalt med Nav". Vurder å gje den betre namn og tydelegare verdi. 2025-06-18, Ingrid.
    alleMoterStartTid?: string; // klokkeslett for møtet i dag, og regne ut varighet med alleMoterSluttTid
    alleMoterSluttTid?: string; // kun for å regne ut varighet
    utkast14a: Utkast14a | null;
    sisteEndringKategori?: string;
    sisteEndringTidspunkt?: string; //dato
    sisteEndringAktivitetId?: string;
    nesteUtlopsdatoAktivitet?: string;
    hovedStatsborgerskap: Statsborgerskap;
    foedeland?: string;
    tolkebehov: Tolkebehov;
    nesteSvarfristCvStillingFraNav?: string;
    avvik14aVedtak?: string; // Skal fjernast, så gjer feltet valfritt
    barnUnder18AarData: BarnUnder18AarModell[];
    fargekategori: FargekategoriModell | null;
    fargekategoriEnhetId: string | null;
    huskelapp?: HuskelappModell;
    utdanningOgSituasjonSistEndret: string; // dato
    gjeldendeVedtak14a: GjeldendeVedtak14aModell | null;
    hendelse: HendelseInnhold | null;
}

export interface Etiketter {
    erDoed: boolean;
    erSykmeldtMedArbeidsgiver: boolean;
    trengerOppfolgingsvedtak: boolean;
    nyForVeileder: boolean;
    nyForEnhet: boolean;
    harBehovForArbeidsevneVurdering: boolean;
    harSikkerhetstiltak: boolean;
    diskresjonskodeFortrolig?: string | null;
    profileringResultat: Profileringsresultat | null;
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

// TODO: Alle strenger her er iso-8601 datoer. Bør castes før de lagres i storen? 2017-09-27 Korsveien
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

export interface Utkast14a {
    status?: string;
    statusEndret?: string; // LocalDateTime frå backend
    ansvarligVeileder?: string;
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

export interface GjeldendeVedtak14aModell {
    innsatsgruppe: InnsatsgruppeGjeldendeVedtak14a;
    hovedmal: Hovedmal;
    fattetDato: Date;
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

interface Tolkebehov {
    talespraaktolk?: string;
    tegnspraaktolk?: string;
    sistOppdatert?: string; // LocalDate i backend
}

export interface AapKelvinData {
    vedtaksdatoTilOgMed?: string; // dato
    rettighetstype?: string;
}

export interface TiltakspengerData {
    vedtaksdatoTilOgMed?: string; // dato
    rettighet?: string;
}
