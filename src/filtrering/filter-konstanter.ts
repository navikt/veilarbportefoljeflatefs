import { range, lag2Sifret } from '../utils/utils';
import { Sorteringsfelt } from '../model-interfaces';

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

export const mapFilternavnTilFilterValue = {
    ufordeltebruker : UFORDELTE_BRUKERE,
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
};

export const FILTERGRUPPE_ENHET = 'enhet';

export function lagConfig(data: any): any {
    if (typeof data === 'string') {
        return { label: data };
    }
    return data;
}

export const ferdigfilterListe = {
    UFORDELTE_BRUKERE: 'Ufordelte brukere',
    NYE_BRUKERE_FOR_VEILEDER: 'Nye brukere',
    TRENGER_VURDERING: 'Trenger vurdering',
    INAKTIVE_BRUKERE: 'Ikke servicebehov',
    VENTER_PA_SVAR_FRA_NAV: 'Venter på svar fra NAV',
    VENTER_PA_SVAR_FRA_BRUKER: 'Venter på svar fra bruker',
    UTLOPTE_AKTIVITETER: 'Utløpte aktiviteter',
    IKKE_I_AVTALT_AKTIVITET: 'Ikke i avtalt aktivitet',
    I_AVTALT_AKTIVITET: 'I avtalt aktivitet',
    MIN_ARBEIDSLISTE: 'Min arbeidsliste',
    ER_SYKMELDT_MED_ARBEIDSGIVER: 'Sykmeldt med arbeidsgiver',
    MOTER_IDAG: 'Møte med NAV idag'
};

export const alder = {
    '19-og-under':'≤ 19 år' ,
    '40-49': '40-49 år',
    '20-24': '20-24 år',
    '50-59': '50-59 år',
    '25-29': '25-29 år',
    '60-66': '60-66 år',
    '30-39': '30-39 år',
    '67-70': '67-70 år',
};

export const fodselsdagIMnd = () => range(1, 31, true).reduce((acc, x) => ({
    ...acc,
    [x]: lag2Sifret(x)
}), {});

export const kjonn = {
    K: 'Kvinne',
    M: 'Mann'
};

export const innsatsgruppe = {
    IKVAL: 'Standardinnsats',
    BFORM: 'Situasjonsbestemt innsats',
    BATT: 'Spesielt tilpasset innsats',
    VARIG: 'Varig tilpasset',
};

export const hovedmal = {
    SKAFFEA : 'Skaffe arbeid',
    BEHOLDEA: 'Beholde arbeid',
    OKEDELT: 'Øke deltakelse eller mål om arbeid',
};

export const formidlingsgruppe = {
    ARBS: 'Arbeidssøker',
    IARBS: 'Ikke arbeidssøker',
    ISERV: 'Ikke servicebehov',
};

export const servicegruppe = {
    BKART: 'Behov for arbeidsevnevurdering',
    IVURD: 'Ikke vurdert',
    OPPFI: 'Helserelatert arbeidsrettet oppfølging i NAV',
    VURDI: 'Sykmeldt oppfølging på arbeidsplassen',
    VURDU: 'Sykmeldt uten arbeidsgiver'
};

export const ytelse = {
    DAGPENGER: {label: 'Dagpenger'},
    ORDINARE_DAGPENGER: { label: 'Ordinære dagpenger', className: 'skjemaelement--innrykk' },
    DAGPENGER_MED_PERMITTERING: { label: 'Dagpenger under permittering', className: 'skjemaelement--innrykk' },
    DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI: { label: 'Dagpenger v/perm fiskeindustri', className: 'skjemaelement--innrykk' },
    LONNSGARANTIMIDLER_DAGPENGER: { label: 'Lønnsgarantimidler dagpenger', className: 'skjemaelement--innrykk' },
    AAP: {label: 'AAP'},
    AAP_MAXTID: { label: 'AAP maxtid', className: 'skjemaelement--innrykk' },
    AAP_UNNTAK: { label: 'AAP unntak', className: 'skjemaelement--innrykk' },
    TILTAKSPENGER: {label: 'Tiltakspenger'}
};

export const manuellBrukerStatus = {
    MANUELL: 'Manuell oppfølging',
    KRR: 'Reservert i KRR'
};

export const ytelsevalg: () => {[id: string]: string} = () => Object.keys(ytelse).reduce((acc, val) => ({ ...acc, [val]: val }), {});

export const ytelseUtlopsSortering = {
    DAGPENGER: Sorteringsfelt.DAGPENGER_UTLOP_UKE,
    ORDINARE_DAGPENGER: Sorteringsfelt.DAGPENGER_UTLOP_UKE,
    DAGPENGER_MED_PERMITTERING: Sorteringsfelt.DAGPENGER_PERM_UTLOP_UKE,
    TILTAKSPENGER: Sorteringsfelt.UTLOPSDATO
};

export const ytelseAapSortering = {
    AAP: { vedtaksperiode: Sorteringsfelt.UTLOPSDATO, rettighetsperiode: Sorteringsfelt.AAP_RETTIGHETSPERIODE },
    AAP_MAXTID: { vedtaksperiode: Sorteringsfelt.UTLOPSDATO, rettighetsperiode: Sorteringsfelt.AAP_MAXTID_UKE },
    AAP_UNNTAK: { vedtaksperiode: Sorteringsfelt.UTLOPSDATO, rettighetsperiode: Sorteringsfelt.AAP_UNNTAK_UKE }
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

const veiledere = {
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
    veiledere,
    aktiviteter,
    ytelseAapSortering,
    manuellBrukerStatus
};
