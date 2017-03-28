import { range, lag2Sifret } from '../../utils/utils';

function lagChecklistdata(arr) {
    return arr.map((label, index) => ({ value: index, label, checked: false }));
}

export const aldersIntervaller = lagChecklistdata([
    '19 og under',
    '20-24',
    '25-29',
    '30-39',
    '40-49',
    '50-59',
    '60-66',
    '67-70'
]);
export const fodselsdagIMnd = range(1, 31, true).map((x, index) => ({
    value: index,
    label: lag2Sifret(x),
    checked: false
}));
export const kjonn = lagChecklistdata(['Kvinne', 'Mann']);
export const innsatsgrupper = lagChecklistdata([
    'Spesielt tilpasset innsats',
    'Situasjonsbestemt innsats',
    'Standardinnsats',
    'Varig tilpasset'
]);
export const formidlingsgrupper = lagChecklistdata([
    'Arbeidssøker',
    'Ikke arbeidssøker',
    'Ikke servicebehov',
    'Pre arbeidssøker',
    'Pre reaktivert arbeidssøker'
]);
export const servicegrupper = lagChecklistdata([
    'Behov for arbeidsevnevurdering',
    'Ikke vurdert',
    'Helserelatert arbeidsrettet oppfølging i NAV',
    'Varig tilpasset innsats',
    'Sykmeldt, oppfølging på arbeidsplassen',
    'Sykmeldt uten arbeidsgiver'
]);
export const ytelser = [
    'ORDINARE_DAGPENGER',
    'DAGPENGER_MED_PERMITTERING',
    'DAGPENGER_OVRIGE',
    'AAP_MAXTID',
    'AAP_UNNTAK',
    'TILTAKSPENGER'
].map(ytelse => ({
    name: 'ytelse',
    value: ytelse,
    label: ytelse.toLocaleLowerCase().replace(/_/g, ' '),
    checked: false
}));

const filtreringLister = {
    alder: aldersIntervaller,
    kjonn,
    fodselsdagIMnd,
    innsatsgruppe: innsatsgrupper,
    formidlingsgruppe: formidlingsgrupper,
    servicegruppe: servicegrupper,
    ytelse: ytelser
};

export default filtreringLister;
