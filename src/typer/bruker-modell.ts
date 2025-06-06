import {ArbeidslisteModell} from './arbeidsliste';

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
    trengerOppfolgingsvedtak: boolean;
    vurderingsBehov?: VurderingsBehov;
    profileringResultat?: Profileringsresultat;
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
    tiltakshendelse: TiltakshendelseModell | null;
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
    utkast14a: Utkast14a;

    sisteEndringKategori?: string;
    sisteEndringTidspunkt?: string; //dato
    sisteEndringAktivitetId?: string;
    nesteUtlopsdatoAktivitet?: string;
    hovedStatsborgerskap: Statsborgerskap;
    harFlereStatsborgerskap: boolean;
    innflyttingTilNorgeFraLand: string;
    foedeland?: string;
    tolkebehov: Tolkebehov;
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
    gjeldendeVedtak14a: GjeldendeVedtak14aModell | null;
    utgattVarsel: UtgattVarselHendelse | null;
}

export enum VurderingsBehov {
    ARBEIDSEVNE_VURDERING = 'ARBEIDSEVNE_VURDERING',
    IKKE_VURDERT = 'IKKE_VURDERT',
    ANTATT_GODE_MULIGHETER = 'ANTATT_GODE_MULIGHETER',
    ANTATT_BEHOV_FOR_VEILEDNING = 'ANTATT_BEHOV_FOR_VEILEDNING',
    OPPGITT_HINDRINGER = 'OPPGITT_HINDRINGER'
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

interface Utkast14a {
    status?: string;
    statusEndret?: string; // LocalDateTime frå backend
    ansvarligVeileder?: string;
}

interface Statsborgerskap {
    statsborgerskap: string;
    gyldigFra?: string;
    gyldigTil?: string;
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

export interface UtgattVarselHendelse {
    beskrivelse: string;
    dato: string;
    lenke: string;
    detaljer?: string;
}

interface Tolkebehov {
    talespraaktolk?: string;
    tegnspraaktolk?: string;
    sistOppdatert?: string; // LocalDate i backend
}
