import { range, lag2Sifret } from '../../utils/utils';

export const alder = {
    '19-og-under': '19 og under',
    '20-24': '20-24 år',
    '25-29': '25-29 år',
    '30-39': '30-39 år',
    '40-49': '40-49 år',
    '50-59': '50-59 år',
    '60-66': '60-66 år',
    '67-70': '67-70 år'
};

export const fodselsdag = range(1, 31, true).reduce((acc, x) => ({
    ...acc,
    [x]: lag2Sifret(x)
}), {});

export const kjonn = {
    'K': 'Kvinne',
    'M': 'Mann'
};

export const innsatsgrupper = {
    'BATT': 'Spesielt tilpasset innsats',
    'BFORM': 'Situasjonsbestemt innsats',
    'IKVAL': 'Standardinnsats',
    'VARIG': 'Varig tilpasset'
};

export const formidlingsgrupper = {
    'ARBS': 'Arbeidssøker',
    'IARBS': 'Ikke arbeidssøker',
    'ISERV': 'Ikke servicebehov',
    'PARBS': 'Pre arbeidssøker',
    'RARBS': 'Pre reaktivert arbeidssøker'
};
export const servicegrupper = {
    'Behov-for-arbeidsevnevurdering': 'Behov for arbeidsevnevurdering',
    'Ikke-vurdert': 'Ikke vurdert',
    'Helserelatert-arbeidsrettet-oppfolging-i-NAV': 'Helserelatert arbeidsrettet oppfølging i NAV',
    'Varig-tilpasset-innsats': 'Varig tilpasset innsats',
    'Sykmeldt-oppfolging-pa-arbeidsplassen': 'Sykmeldt oppfølging på arbeidsplassen',
    'Sykmeldt-uten-arbeidsgiver': 'Sykmeldt uten arbeidsgiver'
};
export const ytelser = {
    'ORDINARE_DAGPENGER': 'Ordinære dagpenger',
    'DAGPENGER_MED_PERMITTERING': 'Dagpenger med permittering',
    'DAGPENGER_OVRIGE': 'Dagpenger øvrige',
    'AAP_MAXTID': 'AAP maxtid',
    'AAP_UNNTAK': 'AAP unntak',
    'TILTAKSPENGER': 'Tiltakspenger'
};
