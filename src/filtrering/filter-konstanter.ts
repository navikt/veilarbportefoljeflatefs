import {lag2Sifret, range} from '../utils/utils';
import {KategoriModell, Sorteringsfelt} from '../model-interfaces';

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
export const AAP_YTELSE = 'AAP';
export const AAP_YTELSE_MAXTID = 'AAP_MAXTID';
export const AAP_YTELSE_UNNTAK = 'AAP_UNNTAK';
export const UNDER_VURDERING = 'UNDER_VURDERING';
export const SISTE_ENDRING = 'SISTE_ENDRING';
export const SISTE_ENDRING_DATO = 'SISTE_ENDRING_DATO';

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
    sisteEndringDato: SISTE_ENDRING_DATO
};

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

export const innsatsgruppe = {
    IKVAL: 'Standardinnsats',
    BFORM: 'Situasjonsbestemt innsats',
    BATT: 'Spesielt tilpasset innsats',
    VARIG: 'Varig tilpasset'
};

export const hovedmal = {
    SKAFFEA: 'Skaffe arbeid',
    BEHOLDEA: 'Beholde arbeid',
    OKEDELT: 'Øke deltakelse eller mål om arbeid'
};

export const formidlingsgruppe = {
    ARBS: 'Arbeidssøker',
    IARBS: 'Ikke arbeidssøker',
    ISERV: 'Ikke servicebehov'
};

export const servicegruppe = {
    BKART: 'Behov for arbeidsevnevurdering',
    IVURD: 'Ikke vurdert',
    OPPFI: 'Helserelatert arbeidsrettet oppfølging i NAV',
    VURDI: 'Sykmeldt oppfølging på arbeidsplassen',
    VURDU: 'Sykmeldt uten arbeidsgiver'
};

export const manuellBrukerStatus = {
    MANUELL: 'Manuell oppfølging',
    KRR: 'Reservert i KRR'
};
export const manuellBrukerStatusUtenKRR = {
    MANUELL: 'Manuell oppfølging'
};

export const ytelse = {
    DAGPENGER: {label: 'Dagpenger'},
    ORDINARE_DAGPENGER: {
        label: 'Ordinære dagpenger',
        className: 'skjemaelement--innrykk'
    },
    DAGPENGER_MED_PERMITTERING: {
        label: 'Dagpenger under permittering',
        className: 'skjemaelement--innrykk'
    },
    DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI: {
        label: 'Dagpenger v/perm fiskeindustri',
        className: 'skjemaelement--innrykk'
    },
    LONNSGARANTIMIDLER_DAGPENGER: {
        label: 'Lønnsgarantimidler dagpenger',
        className: 'skjemaelement--innrykk'
    },
    AAP: {label: 'AAP'},
    AAP_MAXTID: {label: 'AAP maxtid', className: 'skjemaelement--innrykk'},
    AAP_UNNTAK: {label: 'AAP unntak', className: 'skjemaelement--innrykk'},
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
        vedtaksperiode: Sorteringsfelt.UTLOPSDATO,
        rettighetsperiode: Sorteringsfelt.AAP_RETTIGHETSPERIODE
    },
    AAP_MAXTID: {
        vedtaksperiode: Sorteringsfelt.UTLOPSDATO,
        rettighetsperiode: Sorteringsfelt.AAP_MAXTID_UKE
    },
    AAP_UNNTAK: {
        vedtaksperiode: Sorteringsfelt.UTLOPSDATO,
        rettighetsperiode: Sorteringsfelt.AAP_UNNTAK_UKE
    }
};

export const rettighetsgruppe = {
    AAP: 'Arbeidsavklaringspenger',
    DAGP: 'Dagpenger',
    INDS: 'Tiltakspenger',
    IYT: 'Ingen livsoppholdsytelser Arena'
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

export const registreringstype = {
    ER_PERMITTERT: 'Er permittert eller kommer til å bli permittert',
    USIKKER_JOBBSITUASJON: 'Er usikker på jobbsituasjonen min',
    MISTET_JOBBEN: 'Har mistet eller kommer til å miste jobben',
    VIL_FORTSETTE_I_JOBB: 'Har jobb og ønsker å fortsette i den jobben jeg har',
    DELTIDSJOBB_VIL_MER: 'Har deltidsjobb, men vil jobbe mer',
    VIL_BYTTE_JOBB: 'Har jobb, men vil bytte',
    AKKURAT_FULLFORT_UTDANNING: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
    HAR_SAGT_OPP: 'Har sagt opp eller kommer til å si opp',
    ALDRI_HATT_JOBB: 'Har aldri vært i jobb',
    JOBB_OVER_2_AAR: 'Har ikke vært i jobb de 2 siste årene'
};

export const utdanning = {
    INGEN_UTDANNING: 'Ingen utdanning',
    GRUNNSKOLE: 'Grunnskole',
    VIDEREGAENDE_GRUNNUTDANNING: 'Videregående grunnutdanning (1 til 2 år)',
    VIDEREGAENDE_FAGBREV_SVENNEBREV: 'Videregående, fagbrev eller svennebrev (3 år eller mer)',
    HOYERE_UTDANNING_1_TIL_4: 'Høyere utdanning (1 til 4 år)',
    HOYERE_UTDANNING_5_ELLER_MER: 'Høyere utdanning (5 år eller mer)'
};

export const utdanningGodkjent = {
    JA: 'Ja',
    NEI: 'Nei',
    VET_IKKE: 'Vet ikke'
};

export const utdanningBestatt = {
    JA: 'Ja',
    NEI: 'Nei'
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

export default {
    ytelseUtlopsSortering,
    ferdigfilterListe,
    alder,
    fodselsdagIMnd,
    kjonn,
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
    ulesteEndringer
};
