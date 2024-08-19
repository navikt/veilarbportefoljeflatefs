import {FiltreringAktiviteterValg} from './ducks/filtrering';

export enum Sorteringsrekkefolge {
    ikke_satt = 'ikke_satt',
    stigende = 'stigende',
    synkende = 'synkende'
}

export enum Sorteringsfelt {
    IKKE_SATT = 'ikke_satt',
    VALGTE_AKTIVITETER = 'valgteaktiviteter',
    ETTERNAVN = 'etternavn',
    FODSELSNUMMER = 'fodselsnummer',
    OPPFOLGINGSTARTET = 'oppfolging_startdato',
    UTLOPSDATO = 'utlopsdato',
    DAGPENGER_UTLOP_UKE = 'dagputlopuke',
    DAGPENGER_PERM_UTLOP_UKE = 'permutlopuke',
    AAP_MAXTID_UKE = 'aapmaxtiduke',
    AAP_UNNTAK_UKE = 'aapunntakukerigjen',
    AAP_VURDERINGSFRIST = 'aap_vurderingsfrist',
    AAP_TYPE = 'aap_type',
    ARBEIDSLISTE_FRIST = 'arbeidslistefrist',
    ARBEIDSLISTE_OVERSKRIFT = 'arbeidsliste_overskrift',
    VENTER_PA_SVAR_FRA_NAV = 'venterpasvarfranav',
    VENTER_PA_SVAR_FRA_BRUKER = 'venterpasvarfrabruker',
    UTLOPTE_AKTIVITETER = 'utlopteaktiviteter',
    I_AVTALT_AKTIVITET = 'iavtaltaktivitet',
    START_DATO_FOR_AVTALT_AKTIVITET = 'aktivitet_start',
    NESTE_START_DATO_FOR_AVTALT_AKTIVITET = 'neste_aktivitet_start',
    FORRIGE_DATO_FOR_AVTALT_AKTIVITET = 'forrige_aktivitet_start',
    AAP_RETTIGHETSPERIODE = 'aaprettighetsperiode',
    NAVIDENT = 'veileder_id',
    VEILEDER = 'veileder_navn',
    MOTER_IDAG = 'moterMedNAVIdag',
    MOTESTATUS = 'motestatus',
    UTKAST_14A_STATUS = 'utkast_14a_status',
    UTKAST_14A_STATUS_ENDRET = 'utkast_14a_status_endret',
    UTKAST_14A_ANSVARLIG_VEILEDER = 'utkast_14a_ansvarlig_veileder',
    ARBEIDSLISTEKATEGORI = 'arbeidslistekategori',
    FARGEKATEGORI = 'fargekategori',
    SISTE_ENDRING = 'siste_endring_kategori',
    SISTE_ENDRING_DATO = 'siste_endring_tidspunkt',
    FODELAND = 'fodeland',
    STATSBORGERSKAP = 'statsborgerskap',
    STATSBORGERSKAP_GYLDIG_FRA = 'statsborgerskap_gyldig_fra',
    BOSTED_KOMMUNE = 'kommunenummer',
    BOSTED_BYDEL = 'bydelsnummer',
    BOSTED_SIST_OPPDATERT = 'bostedSistOppdatert',
    TOLKEBEHOV = 'tolkebehov',
    TOLKE_SPRAAK = 'tolkespraak',
    TOLKEBEHOV_SIST_OPPDATERT = 'tolkebehov_sistoppdatert',
    CV_SVARFRIST = 'neste_svarfrist_stilling_fra_nav',
    ENSLIGE_FORSORGERE_UTLOPS_YTELSE = 'enslige_forsorgere_utlop_ytelse',
    ENSLIGE_FORSORGERE_VEDTAKSPERIODETYPE = 'enslige_forsorgere_vedtaksperiodetype',
    ENSLIGE_FORSORGERE_AKTIVITETSPLIKT = 'enslige_forsorgere_aktivitetsplikt',
    ENSLIGE_FORSORGERE_OM_BARNET = 'enslige_forsorgere_om_barnet',

    BARN_UNDER_18_AAR = 'barn_under_18_aar',
    UTDANNING_OG_SITUASJON_SIST_ENDRET = 'utdanningOgSituasjonSistEndret',
    HUSKELAPP_KOMMENTAR = 'huskelapp_kommentar',
    HUSKELAPP_FRIST = 'huskelapp_frist',
    HUSKELAPP = 'huskelapp'
}

export interface FiltervalgModell {
    ferdigfilterListe: string[];
    nyeBrukereForVeileder?: boolean;
    inaktiveBrukere?: boolean;
    venterPaSvarFraNAV?: boolean;
    venterPaSvarFraBruker?: boolean;
    arbeidslisteKategori: KategoriModell[];
    alder?: string[];
    kjonn?: null | string;
    landgruppe: string[];
    foedeland: string[];
    fodselsdagIMnd?: string[];
    innsatsgruppe?: string[];
    formidlingsgruppe?: string[];
    servicegruppe?: string[];
    veiledere: string[];
    ytelse: null | string;
    aktiviteter?: FiltreringAktiviteterValg;
    aktiviteterForenklet: string[];
    tiltakstyper: string[];
    hovedmal?: string[];
    navnEllerFnrQuery: string;
    rettighetsgruppe?: string[];
    manuellBrukerStatus?: string[];
    veilederNavnQuery: string;
    registreringstype: string[];
    cvJobbprofil: null | string;
    utdanning: string[];
    utdanningGodkjent: string[];
    utdanningBestatt: string[];
    sisteEndringKategori: string[];
    ulesteEndringer: null | string;
    tolkebehov: string[];
    tolkBehovSpraak: string[];
    stillingFraNavFilter: string[];
    geografiskBosted: string[];
    visGeografiskBosted: string[];
    avvik14aVedtak: string[];
    ensligeForsorgere: string[];
    barnUnder18Aar: string[];
    barnUnder18AarAlder: string[];
    fargekategorier: FargekategoriModell[];
}

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

export enum VurderingsBehov {
    ARBEIDSEVNE_VURDERING = 'ARBEIDSEVNE_VURDERING',
    IKKE_VURDERT = 'IKKE_VURDERT',
    ANTATT_GODE_MULIGHETER = 'ANTATT_GODE_MULIGHETER',
    ANTATT_BEHOV_FOR_VEILEDNING = 'ANTATT_BEHOV_FOR_VEILEDNING',
    OPPGITT_HINDRINGER = 'OPPGITT_HINDRINGER'
}

export enum Innsatsgruppe {
    IKVAL = 'IKVAL',
    BFORM = 'BFORM',
    BATT = 'BATT',
    VARIG = 'VARIG'
}

export interface BrukerModell {
    fnr: string;
    guid: string;
    fornavn: string;
    etternavn: string;
    oppfolgingStartdato: string; // dato
    veilederId?: string;
    sikkerhetstiltak: string[];
    diskresjonskode?: string;
    egenAnsatt: boolean;
    skjermetTil?: string;
    nyForVeileder: boolean;
    nyForEnhet: boolean;
    trengerVurdering: boolean;
    vurderingsBehov?: VurderingsBehov;
    innsatsgruppe: Innsatsgruppe;
    erDoed: boolean;
    fodselsdagIMnd: number;
    fodselsdato: string; // dato
    kjonn: string; // enum
    ytelse?: string;
    utlopsdato?: string; // dato
    aapUnntakUkerIgjen?: number;
    dagputlopUke?: number;
    permutlopUke?: number;
    aapmaxtidUke?: number;
    aapordinerutlopsdato?: string; // dato
    arbeidsliste: ArbeidslisteModell;
    venterPaSvarFraNAV?: string;
    venterPaSvarFraBruker?: string;
    nyesteUtlopteAktivitet?: string; // dato
    veilederNavn?: string;
    brukertiltak?: string[];
    tiltakshendelser?: TiltakshendelseModell[];
    aktiviteter?: AktiviteterModell; // kun avtalte aktiviteter
    alleAktiviteter?: AktiviteterModell;
    aktivitetStart?: string; // dato
    nesteAktivitetStart?: string; // dato
    forrigeAktivitetStart?: string; // dato
    markert?: boolean;
    manuellBrukerStatus: string;
    erSykmeldtMedArbeidsgiver: boolean;
    moteStartTid: string; // kun avtalte moter
    moteSluttTid: string; // kun avtalte moter
    alleMoterStartTid?: string;
    alleMoterSluttTid?: string;
    utkast14aStatus?: string;
    utkast14aStatusEndret?: string;
    utkast14aAnsvarligVeileder?: string;
    trengerRevurdering: boolean;
    sisteEndringKategori?: string;
    sisteEndringTidspunkt?: string; //dato
    sisteEndringAktivitetId?: string;
    nesteUtlopsdatoAktivitet?: string;
    hovedStatsborgerskap: Statsborgerskap;
    harFlereStatsborgerskap: boolean;
    innflyttingTilNorgeFraLand: string;
    foedeland?: string;
    talespraaktolk?: string;
    tegnspraaktolk?: string;
    tolkBehovSistOppdatert?: string;
    bostedKommune?: string;
    bostedBydel?: string;
    bostedSistOppdatert?: string;
    harUtelandsAddresse?: boolean;
    harUkjentBosted?: boolean;
    nesteSvarfristCvStillingFraNav?: string;
    avvik14aVedtak: string;
    ensligeForsorgereOvergangsstonad?: EnsligeForsorgereOvergangsstonad;

    barnUnder18AarData: BarnUnder18Aar[];
    brukersSituasjonSistEndret: string;
    fargekategori: FargekategoriModell | null;
    fargekategoriEnhetId: string | null;
    huskelapp?: HuskelappModell;
    utdanningOgSituasjonSistEndret: string;
}

export interface EnsligeForsorgereOvergangsstonad {
    vedtaksPeriodetype: string;
    harAktivitetsplikt?: boolean;
    utlopsDato: Date;
    yngsteBarnsFodselsdato: Date;
}

export interface BarnUnder18Aar {
    alder: number;
}

interface Statsborgerskap {
    statsborgerskap: string;
    gyldigFra?: string;
    gyldigTil?: string;
}

// TODO: Alle strenger her er iso-8601 datoer. Bør castes før de lagres i storen?
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

export enum FargekategoriModell {
    FARGEKATEGORI_A = 'FARGEKATEGORI_A',
    FARGEKATEGORI_B = 'FARGEKATEGORI_B',
    FARGEKATEGORI_C = 'FARGEKATEGORI_C',
    FARGEKATEGORI_D = 'FARGEKATEGORI_D',
    FARGEKATEGORI_F = 'FARGEKATEGORI_F',
    FARGEKATEGORI_E = 'FARGEKATEGORI_E',
    INGEN_KATEGORI = 'INGEN_KATEGORI'
}

export enum Fargekategorinavn {
    FARGEKATEGORI_A = 'Blå halvsirkel',
    FARGEKATEGORI_B = 'Grønn trekant',
    FARGEKATEGORI_C = 'Gul sirkel',
    FARGEKATEGORI_D = 'Lilla firkant',
    FARGEKATEGORI_E = 'Turkis femkant',
    FARGEKATEGORI_F = 'Oransje rombe',
    INGEN_KATEGORI = 'Ingen kategori'
}

export enum KategoriModell {
    BLA = 'BLA',
    LILLA = 'LILLA',
    GRONN = 'GRONN',
    GUL = 'GUL'
}

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

export interface HuskelappModell {
    huskelappId: string | null;
    frist?: Date | null;
    kommentar?: string | null;
    endretDato: Date | null;
    endretAv: string | null;
    enhetId: string | null;
}

export interface TiltakshendelseModell {
    hendelseId: string;
    hendelseOpprettet: Date;
    hendelseTekst: string;
    hendelseLenke: string;
    tiltakstypeKode: string | null;
    sistEndret: Date;
}

export enum Status {
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
    OK = 'OK',
    RELOADING = 'RELOADING',
    ERROR = 'ERROR'
}

export interface ArbeidslisteDataModell {
    fnr: string;
    kommentar: string | null;
    frist: string | null;
    kategori: KategoriModell | null;
}

export interface FargekategoriDataModell {
    fnr: string[];
    fargekategoriVerdi: FargekategoriModell;
}

export interface Systemmelding {
    tittel: string;
    type: 'error' | 'warning' | 'info' | 'success';
    beskrivelse: any;
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
