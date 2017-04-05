import { range, lag2Sifret } from '../utils/utils';

export function lagConfig(data) {
    if (typeof data === 'string') {
        return { label: data };
    }
    return data;
}

export const inaktiveBrukere = 'Inaktive brukere';
export const nyeBrukere = 'Nye brukere';

export const alder = {
    '19-og-under': '19 år og under',
    '20-24': '20-24 år',
    '25-29': '25-29 år',
    '30-39': '30-39 år',
    '40-49': '40-49 år',
    '50-59': '50-59 år',
    '60-66': '60-66 år',
    '67-70': '67-70 år'
};

export const fodselsdagIMnd = range(1, 31, true).reduce((acc, x) => ({
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
    VARIG: 'Varig tilpasset'
};

export const formidlingsgruppe = {
    ARBS: 'Arbeidssøker',
    IARBS: 'Ikke arbeidssøker',
    ISERV: 'Ikke servicebehov',
    PARBS: 'Pre arbeidssøker',
    RARBS: 'Pre reaktivert arbeidssøker'
};
export const servicegruppe = {
    BKART: 'Behov for arbeidsevnevurdering',
    IVURD: 'Ikke vurdert',
    OPPFI: 'Helserelatert arbeidsrettet oppfølging i NAV',
    VURDI: 'Sykmeldt oppfølging på arbeidsplassen',
    VURDU: 'Sykmeldt uten arbeidsgiver'
};
export const ytelse = {
    DAGPENGER: 'Dagpenger',
    ORDINARE_DAGPENGER: { label: 'Ordinære dagpenger', className: 'skjemaelement--innrykk' },
    DAGPENGER_MED_PERMITTERING: { label: 'Dagpenger med permittering', className: 'skjemaelement--innrykk' },
    AAP: 'AAP',
    AAP_MAXTID: { label: 'AAP maxtid', className: 'skjemaelement--innrykk' },
    AAP_UNNTAK: { label: 'AAP unntak', className: 'skjemaelement--innrykk' },
    TILTAKSPENGER: 'Tiltakspenger'
};
export const rettighetsgruppe = {
    AAP: 'Arbeidsavklaringspenger',
    DAGP: 'Dagpenger',
    INDS: 'Tiltakspenger',
    IYT: 'Ingen livsoppholdsytelser Arena',
    VENT: 'Ventestønad',
    VLONN: 'Ventelønn'
};

export default {
    inaktiveBrukere,
    nyeBrukere,
    alder,
    fodselsdagIMnd,
    kjonn,
    innsatsgruppe,
    formidlingsgruppe,
    servicegruppe,
    ytelse,
    rettighetsgruppe
};
