import {lag2Sifret, range} from '../utils/utils';
import {KategoriModell, Sorteringsfelt} from '../model-interfaces';
import {Dictionary} from '../utils/types/types';

const skjemaelementInnrykkKlasse = 'skjemaelement--innrykk';

export type CheckboxFilter = {
    label: string;
    className?: string;
    indeterminate?: () => boolean;
};
export type CheckboxFilterMap = Dictionary<CheckboxFilter> | Dictionary<string>;

export const UFORDELTE_BRUKERE = 'UFORDELTE_BRUKERE';
export const NYE_BRUKERE_FOR_VEILEDER = 'NYE_BRUKERE_FOR_VEILEDER';
export const TRENGER_VURDERING = 'TRENGER_VURDERING';
export const INAKTIVE_BRUKERE = 'INAKTIVE_BRUKERE';
export const VENTER_PA_SVAR_FRA_NAV = 'VENTER_PA_SVAR_FRA_NAV';
export const VENTER_PA_SVAR_FRA_BRUKER = 'VENTER_PA_SVAR_FRA_BRUKER';
export const UTLOPTE_AKTIVITETER = 'UTLOPTE_AKTIVITETER';
export const IKKE_I_AVTALT_AKTIVITET = 'IKKE_I_AVTALT_AKTIVITET';
export const I_AVTALT_AKTIVITET = 'I_AVTALT_AKTIVITET';
export const MIN_ARBEIDSLISTE = 'MIN_ARBEIDSLISTE';
export const ER_SYKMELDT_MED_ARBEIDSGIVER = 'ER_SYKMELDT_MED_ARBEIDSGIVER';
export const MOTER_IDAG = 'MOTER_IDAG';
export const UTLOP_YTELSE = 'UTLOP_YTELSE';
export const DAGPENGER_YTELSE = 'DAGPENGER';
export const DAGPENGER_YTELSE_ORDINARE = 'ORDINARE_DAGPENGER';
export const DAGPENGER_YTELSE_PERMITTERING = 'DAGPENGER_MED_PERMITTERING';
export const DAGPENGER_YTELSE_PERMITTERING_FISKEINDUSTRI = 'DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI';
export const DAGPENGER_YTELSE_LONNSGARANTIMIDLER = 'LONNSGARANTIMIDLER_DAGPENGER';
export const AAP_YTELSE = 'AAP';
export const AAP_YTELSE_MAXTID = 'AAP_MAXTID';
export const AAP_YTELSE_UNNTAK = 'AAP_UNNTAK';
export const TILTAKSPENGER_YTELSE = 'TILTAKSPENGER';
export const UNDER_VURDERING = 'UNDER_VURDERING';
export const SISTE_ENDRING = 'SISTE_ENDRING';
export const SISTE_ENDRING_DATO = 'SISTE_ENDRING_DATO';
export const HAR_AVVIK = 'HAR_AVVIK';
export const HOVEDMAL_ULIK = 'HOVEDMAAL_ULIK';
export const INNSATSGRUPPE_ULIK = 'INNSATSGRUPPE_ULIK';
export const INNSATSGRUPPE_OG_HOVEDMAL_ULIK = 'INNSATSGRUPPE_OG_HOVEDMAAL_ULIK';
export const INNSATSGRUPPE_MANGLER_I_NY_KILDE = 'INNSATSGRUPPE_MANGLER_I_NY_KILDE';

export const mapFilternavnTilFilterValue = {
    ufordeltebruker: UFORDELTE_BRUKERE,
    nyeBrukere: NYE_BRUKERE_FOR_VEILEDER,
    trengerVurdering: TRENGER_VURDERING,
    erSykmeldtMedArbeidsgiver: ER_SYKMELDT_MED_ARBEIDSGIVER,
    venterPaSvarFraNAV: VENTER_PA_SVAR_FRA_NAV,
    venterPaSvarFraBruker: VENTER_PA_SVAR_FRA_BRUKER,
    avtaltMoteMedNav: MOTER_IDAG,
    utlopteAktiviteter: UTLOPTE_AKTIVITETER,
    ikkeIavtaltAktivitet: IKKE_I_AVTALT_AKTIVITET,
    iavtaltAktivitet: I_AVTALT_AKTIVITET,
    inaktiveBrukere: INAKTIVE_BRUKERE,
    minArbeidsliste: MIN_ARBEIDSLISTE,
    minArbeidslisteBla: KategoriModell.BLA,
    minArbeidslisteLilla: KategoriModell.LILLA,
    minArbeidslisteGronn: KategoriModell.GRONN,
    minArbeidslisteGul: KategoriModell.GUL,
    utlopYtelse: UTLOP_YTELSE,
    aapYtelse: AAP_YTELSE,
    aapYtelseMaxtid: AAP_YTELSE_MAXTID,
    aapYtelseUnntak: AAP_YTELSE_UNNTAK,
    underVurdering: UNDER_VURDERING,
    sisteEndring: SISTE_ENDRING,
    sisteEndringDato: SISTE_ENDRING_DATO,
    harAvvik: HAR_AVVIK,
    hovedmalUlik: HOVEDMAL_ULIK,
    innsatsgruppeUlik: INNSATSGRUPPE_ULIK,
    innsatsgruppeOgHovedmalUlik: INNSATSGRUPPE_OG_HOVEDMAL_ULIK,
    innsatsgruppeManglerINyKilde: INNSATSGRUPPE_MANGLER_I_NY_KILDE
};

export const filterSomIkkeSkalSendesTilBackend = [mapFilternavnTilFilterValue.harAvvik];

export function lagConfig(data: any): any {
    if (typeof data === 'string') {
        return {label: data};
    }
    return data;
}

export const ferdigfilterListe = {
    UFORDELTE_BRUKERE: 'Ufordelte brukere',
    NYE_BRUKERE_FOR_VEILEDER: 'Nye brukere',
    TRENGER_VURDERING: 'Trenger vurdering',
    ER_SYKMELDT_MED_ARBEIDSGIVER: 'Sykmeldt med arbeidsgiver',
    UNDER_VURDERING: 'Under vurdering',
    VENTER_PA_SVAR_FRA_NAV: 'Venter på svar fra NAV',
    VENTER_PA_SVAR_FRA_BRUKER: 'Venter på svar fra bruker',
    MOTER_IDAG: 'Møte med NAV idag',
    UTLOPTE_AKTIVITETER: 'Utløpte aktiviteter',
    IKKE_I_AVTALT_AKTIVITET: 'Ikke i avtalt aktivitet',
    I_AVTALT_AKTIVITET: 'I avtalt aktivitet',
    INAKTIVE_BRUKERE: 'Ikke servicebehov',
    MIN_ARBEIDSLISTE: 'Min arbeidsliste'
};

export const arbeidslisteKategori = {
    BLA: 'Blå',
    LILLA: 'Lilla',
    GRONN: 'Grønn',
    GUL: 'Gul'
};

export const alder = {
    '0-19': '≤ 19 år',
    '20-24': '20-24 år',
    '25-29': '25-29 år',
    '30-39': '30-39 år',
    '40-49': '40-49 år',
    '50-59': '50-59 år',
    '60-66': '60-66 år',
    '67-70': '67-70 år'
};

export const fodselsdagIMnd = () =>
    range(1, 31, true).reduce(
        (acc, x) => ({
            ...acc,
            [x]: lag2Sifret(x)
        }),
        {}
    );

export const kjonn = {
    K: {label: 'Kvinne'},
    M: {label: 'Mann'}
};

export const barnUnder18Aar = {
    HAR_BARN_UNDER_18_AAR: 'Har barn under 18 år'
};

export const innsatsgruppe = {
    IKVAL: {label: 'Standardinnsats'},
    BFORM: {label: 'Situasjonsbestemt innsats'},
    BATT: {label: 'Spesielt tilpasset innsats'},
    VARIG: {label: 'Varig tilpasset'}
};

export const hovedmal = {
    SKAFFEA: {label: 'Skaffe arbeid'},
    BEHOLDEA: {label: 'Beholde arbeid'},
    OKEDELT: {label: 'Øke deltakelse eller mål om arbeid'}
};

export const formidlingsgruppe = {
    ARBS: {label: 'Arbeidssøker'},
    IARBS: {label: 'Ikke arbeidssøker'},
    ISERV: {label: 'Ikke servicebehov'}
};

export const servicegruppe = {
    BKART: {label: 'Behov for arbeidsevnevurdering'},
    IVURD: {label: 'Ikke vurdert'},
    OPPFI: {label: 'Helserelatert arbeidsrettet oppfølging i NAV'},
    VURDI: {label: 'Sykmeldt oppfølging på arbeidsplassen'},
    VURDU: {label: 'Sykmeldt uten arbeidsgiver'}
};

export const manuellBrukerStatus = {
    MANUELL: {label: 'Manuell oppfølging'},
    KRR: {label: 'Reservert i KRR'}
};
export const manuellBrukerStatusUtenKRR = {
    MANUELL: {label: 'Manuell oppfølging'}
};

export const ytelse = {
    DAGPENGER: {label: 'Dagpenger'},
    ORDINARE_DAGPENGER: {
        label: 'Ordinære dagpenger',
        className: skjemaelementInnrykkKlasse
    },
    DAGPENGER_MED_PERMITTERING: {
        label: 'Dagpenger under permittering',
        className: skjemaelementInnrykkKlasse
    },
    DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI: {
        label: 'Dagpenger v/perm fiskeindustri',
        className: skjemaelementInnrykkKlasse
    },
    LONNSGARANTIMIDLER_DAGPENGER: {
        label: 'Lønnsgarantimidler dagpenger',
        className: skjemaelementInnrykkKlasse
    },
    AAP: {label: 'AAP'},
    AAP_MAXTID: {label: 'AAP ordinær', className: skjemaelementInnrykkKlasse},
    AAP_UNNTAK: {label: 'AAP unntak', className: skjemaelementInnrykkKlasse},
    TILTAKSPENGER: {label: 'Tiltakspenger'}
};

export const ytelsevalg: () => {[id: string]: string} = () =>
    Object.keys(ytelse).reduce(
        (acc, val) => ({
            ...acc,
            [val]: val
        }),
        {}
    );

export const ytelseUtlopsSortering = {
    DAGPENGER: Sorteringsfelt.DAGPENGER_UTLOP_UKE,
    ORDINARE_DAGPENGER: Sorteringsfelt.DAGPENGER_UTLOP_UKE,
    DAGPENGER_MED_PERMITTERING: Sorteringsfelt.DAGPENGER_PERM_UTLOP_UKE,
    TILTAKSPENGER: Sorteringsfelt.UTLOPSDATO
};

export const ytelseAapSortering = {
    AAP: {
        periodetype: Sorteringsfelt.AAP_TYPE,
        vurderingsfrist: Sorteringsfelt.AAP_VURDERINGSFRIST,
        vedtaksperiode: Sorteringsfelt.UTLOPSDATO,
        rettighetsperiode: Sorteringsfelt.AAP_RETTIGHETSPERIODE
    },
    AAP_MAXTID: {
        vurderingsfrist: Sorteringsfelt.AAP_VURDERINGSFRIST,
        vedtaksperiode: Sorteringsfelt.UTLOPSDATO,
        rettighetsperiode: Sorteringsfelt.AAP_MAXTID_UKE
    },
    AAP_UNNTAK: {
        vurderingsfrist: Sorteringsfelt.AAP_VURDERINGSFRIST,
        vedtaksperiode: Sorteringsfelt.UTLOPSDATO,
        rettighetsperiode: Sorteringsfelt.AAP_UNNTAK_UKE
    }
};

export const rettighetsgruppe = {
    AAP: {label: 'Arbeidsavklaringspenger'},
    DAGP: {label: 'Dagpenger'},
    INDS: {label: 'Tiltakspenger'},
    IYT: {label: 'Ingen livsoppholdsytelser Arena'}
};

export const ensligeForsorgere = {
    OVERGANGSSTØNAD: {label: 'Overgangsstønad'}
};

export const aktiviteter = {
    SOKEAVTALE: 'Avtale om å søke jobber',
    STILLING: 'Stilling bruker skal søke',
    BEHANDLING: 'Medisinsk behandling',
    TILTAK: 'Tiltak gjennom NAV',
    EGEN: 'Jobbrettet egenaktivitet',
    IJOBB: 'Jobb bruker har nå',
    MOTE: 'Møte med NAV',
    GRUPPEAKTIVITET: 'Gruppeaktivitet',
    UTDANNINGAKTIVITET: 'Utdanning og kurs (for enslige forsørgere eller egenfinansiert)'
};

export const cvJobbprofil = {
    HAR_DELT_CV: {label: 'CV delt med NAV'},
    HAR_IKKE_DELT_CV: {label: 'Ikke delt CV med NAV'}
};

export const stillingFraNavFilter = {
    CV_KAN_DELES_STATUS_JA: {label: 'Svart JA til å dele CV med arbeidsgiver'}
};

export const registreringstype = {
    ER_PERMITTERT: {label: 'Er permittert eller kommer til å bli permittert'},
    USIKKER_JOBBSITUASJON: {label: 'Er usikker på jobbsituasjonen min'},
    MISTET_JOBBEN: {label: 'Har mistet eller kommer til å miste jobben'},
    VIL_FORTSETTE_I_JOBB: {label: 'Har jobb og ønsker å fortsette i den jobben jeg har'},
    DELTIDSJOBB_VIL_MER: {label: 'Har deltidsjobb, men vil jobbe mer'},
    VIL_BYTTE_JOBB: {label: 'Har jobb, men vil bytte'},
    AKKURAT_FULLFORT_UTDANNING: {label: 'Har akkurat fullført utdanning, militærtjeneste eller annet'},
    HAR_SAGT_OPP: {label: 'Har sagt opp eller kommer til å si opp'},
    ALDRI_HATT_JOBB: {label: 'Har aldri vært i jobb'},
    JOBB_OVER_2_AAR: {label: 'Har ikke vært i jobb de 2 siste årene'},
    INGEN_DATA: {label: 'Ingen registreringsinformasjon'}
};

export const landgruppe = {
    LANDGRUPPE_0: 'Landgruppe 0',
    LANDGRUPPE_1: 'Landgruppe 1',
    LANDGRUPPE_2: 'Landgruppe 2',
    LANDGRUPPE_3: 'Landgruppe 3',
    LANDGRUPPE_UKJENT: 'Ukjent fødeland'
};

export const tolkebehov = {
    TALESPRAAKTOLK: 'Talespråktolk',
    TEGNSPRAAKTOLK: 'Tegnspråktolk'
};

export const landgruppeTooltips = {
    LANDGRUPPE_0: 'Norge',
    LANDGRUPPE_1: 'Vest-Europa (utenom Norge), USA, Canada, Australia og New Zealand',
    LANDGRUPPE_2: 'Østeuropeiske EU-land',
    LANDGRUPPE_3:
        'Asia, Afrika, Amerika (utenom USA og Canada), Øst-Europa (utenfor EU), Oseania (utenom Australia og New Zealand)',
    LANDGRUPPE_UKJENT: 'Mangler informasjon om fødeland'
};

export const utdanning = {
    INGEN_UTDANNING: {label: 'Ingen utdanning'},
    GRUNNSKOLE: {label: 'Grunnskole'},
    VIDEREGAENDE_GRUNNUTDANNING: {label: 'Videregående grunnutdanning (1 til 2 år)'},
    VIDEREGAENDE_FAGBREV_SVENNEBREV: {label: 'Videregående, fagbrev eller svennebrev (3 år eller mer)'},
    HOYERE_UTDANNING_1_TIL_4: {label: 'Høyere utdanning (1 til 4 år)'},
    HOYERE_UTDANNING_5_ELLER_MER: {label: 'Høyere utdanning (5 år eller mer)'},
    INGEN_DATA: {label: 'Ingen registreringsinformasjon'}
};

export const utdanningGodkjent = {
    JA: 'Ja',
    NEI: 'Nei',
    VET_IKKE: 'Vet ikke',
    INGEN_DATA: 'Ingen registreringsinformasjon'
};

export const utdanningBestatt = {
    JA: 'Ja',
    NEI: 'Nei',
    INGEN_DATA: 'Ingen registreringsinformasjon'
};

export const ulesteEndringer = {
    ULESTE_ENDRINGER: 'Uleste endringer'
};

export const hendelserLabels = {
    MAL: 'Endring i mål',
    NY_STILLING: 'En jobb jeg vil søke på',
    NY_IJOBB: 'Jobb jeg har nå',
    NY_EGEN: 'Jobbrettet egenaktivitet',
    NY_BEHANDLING: 'Medisinsk behandling',

    FULLFORT_STILLING: 'En jobb jeg vil søke på',
    FULLFORT_IJOBB: 'Jobb jeg har nå',
    FULLFORT_EGEN: 'Jobbrettet egenaktivitet',
    FULLFORT_BEHANDLING: 'Medisinsk behandling',
    FULLFORT_SOKEAVTALE: 'Avtale om å søke jobber',

    AVBRUTT_STILLING: 'En jobb jeg vil søke på',
    AVBRUTT_IJOBB: 'Jobb jeg har nå',
    AVBRUTT_EGEN: 'Jobbrettet egenaktivitet',
    AVBRUTT_BEHANDLING: 'Medisinsk behandling',
    AVBRUTT_SOKEAVTALE: 'Avtale om å søke jobber'
};

export const hendelserEtikett = {
    ULESTE_ENDRINGER: 'Uleste endringer (Siste endring av bruker)',
    MAL: 'Endring i mål',
    NY_STILLING: 'Aktivitet lagt til: En jobb jeg vil søke på',
    NY_IJOBB: 'Aktivitet lagt til: Jobb jeg har nå',
    NY_EGEN: 'Aktivitet lagt til: Jobbrettet egenaktivitet',
    NY_BEHANDLING: 'Aktivitet lagt til: Medisinsk behandling',

    FULLFORT_STILLING: 'Aktivitet fullført: En jobb jeg vil søke på',
    FULLFORT_IJOBB: 'Aktivitet fullført: Jobb jeg har nå',
    FULLFORT_EGEN: 'Aktivitet fullført: Jobbrettet egenaktivitet',
    FULLFORT_BEHANDLING: 'Aktivitet fullført: Medisinsk behandling',
    FULLFORT_SOKEAVTALE: 'Aktivitet fullført: Avtale om å søke jobber',

    AVBRUTT_STILLING: 'Aktivitet avbrutt: En jobb jeg vil søke på',
    AVBRUTT_IJOBB: 'Aktivitet avbrutt: Jobb jeg har nå',
    AVBRUTT_EGEN: 'Aktivitet avbrutt: Jobbrettet egenaktivitet',
    AVBRUTT_BEHANDLING: 'Aktivitet avbrutt: Medisinsk behandling',
    AVBRUTT_SOKEAVTALE: 'Aktivitet avbrutt: Avtale om å søke jobber'
};

export const avvik14aVedtakHovedFilter = {
    [mapFilternavnTilFilterValue.harAvvik]: {label: 'Status'}
};

export const avvik14aVedtakAvhengigeFilter = {
    [mapFilternavnTilFilterValue.hovedmalUlik]: {label: 'Hovedmål ulikt', className: skjemaelementInnrykkKlasse},
    [mapFilternavnTilFilterValue.innsatsgruppeUlik]: {
        label: 'Innsatsgruppe ulik',
        className: skjemaelementInnrykkKlasse
    },
    [mapFilternavnTilFilterValue.innsatsgruppeOgHovedmalUlik]: {
        label: 'Innsatsgruppe og hovedmål ulike',
        className: skjemaelementInnrykkKlasse
    },
    [mapFilternavnTilFilterValue.innsatsgruppeManglerINyKilde]: {
        label: 'Innsatsgruppe mangler',
        className: skjemaelementInnrykkKlasse
    }
};

export const avvik14aVedtak = {
    ...avvik14aVedtakHovedFilter,
    ...avvik14aVedtakAvhengigeFilter
};

const filterKonstanter = {
    ytelseUtlopsSortering,
    ferdigfilterListe,
    alder,
    fodselsdagIMnd,
    kjonn,
    landgruppe,
    innsatsgruppe,
    hovedmal,
    formidlingsgruppe,
    servicegruppe,
    ytelse,
    ytelsevalg,
    rettighetsgruppe,
    aktiviteter,
    ytelseAapSortering,
    manuellBrukerStatus,
    registreringstype,
    arbeidslisteKategori,
    cvJobbprofil,
    utdanning,
    utdanningBestatt,
    utdanningGodkjent,
    hendelserEtikett,
    hendelserLabels,
    ulesteEndringer,
    tolkebehov,
    stillingFraNavFilter,
    avvik14aVedtak,
    ensligeForsorgere,
    barnUnder18Aar
};

export default filterKonstanter;
