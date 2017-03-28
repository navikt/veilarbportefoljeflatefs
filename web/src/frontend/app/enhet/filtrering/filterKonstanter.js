import { range, lag2Sifret } from '../../utils/utils';
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
    'K': 'Kvinne',
    'M': 'Mann'
};

export const innsatsgruppe = {
    'BATT': 'Spesielt tilpasset innsats',
    'BFORM': 'Situasjonsbestemt innsats',
    'IKVAL': 'Standardinnsats',
    'VARIG': 'Varig tilpasset'
};

export const formidlingsgruppe = {
    'ARBS': 'Arbeidssøker',
    'IARBS': 'Ikke arbeidssøker',
    'ISERV': 'Ikke servicebehov',
    'PARBS': 'Pre arbeidssøker',
    'RARBS': 'Pre reaktivert arbeidssøker'
};
export const servicegruppe = {
    'BKART': 'Behov for arbeidsevnevurdering',
    'IVURD': 'Ikke vurdert',
    'OPPFI': 'Helserelatert arbeidsrettet oppfølging i NAV',
    'VARIG': 'Varig tilpasset innsats',
    'VURDI': 'Sykmeldt oppfølging på arbeidsplassen',
    'VURDU': 'Sykmeldt uten arbeidsgiver'
};
export const ytelse = {
    'ORDINARE_DAGPENGER': 'Ordinære dagpenger',
    'DAGPENGER_MED_PERMITTERING': 'Dagpenger med permittering',
    'DAGPENGER_OVRIGE': 'Dagpenger øvrige',
    'AAP_MAXTID': 'AAP maxtid',
    'AAP_UNNTAK': 'AAP unntak',
    'TILTAKSPENGER': 'Tiltakspenger'
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
    ytelse
}
