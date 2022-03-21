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
    VEDTAKSTATUS = 'vedtakstatus',
    VEDTAKSTATUS_ENDRET = 'vedtak_status_endret',
    ANSVARLIG_VEILEDER_FOR_VEDTAK = 'ansvarlig_veileder_for_vedtak',
    ARBEIDSLISTEKATEGORI = 'arbeidslistekategori',
    SISTE_ENDRING = 'siste_endring_kategori',
    SISTE_ENDRING_DATO = 'siste_endring_tidspunkt'
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
    nyForVeileder: boolean;
    nyForEnhet: boolean;
    trengerVurdering: boolean;
    vurderingsBehov?: VurderingsBehov;
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
    arbeidsliste: ArbeidslisteModell;
    venterPaSvarFraNAV?: string;
    venterPaSvarFraBruker?: string;
    nyesteUtlopteAktivitet?: string; // dato
    veilederNavn?: string;
    brukertiltak?: string[];
    aktiviteter?: AktiviteterModell;
    aktivitetStart?: string; // dato
    nesteAktivitetStart?: string; // dato
    forrigeAktivitetStart?: string; // dato
    markert?: boolean;
    manuellBrukerStatus: string;
    erSykmeldtMedArbeidsgiver: boolean;
    moteStartTid: string;
    moteSluttTid: string;
    moteErAvtaltMedNAV?: boolean;
    vedtakStatus?: string;
    vedtakStatusEndret?: string;
    ansvarligVeilederForVedtak?: string;
    trengerRevurdering: boolean;
    sisteEndringKategori?: string;
    sisteEndringTidspunkt?: string; //dato
    sisteEndringAktivitetId?: string;
    nesteUtlopsdatoAktivitet?: string;
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
    kommentar: string;
    frist: string | null;
}
