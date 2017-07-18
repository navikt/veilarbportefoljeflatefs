import { PropTypes as PT } from 'react';

export const enhetShape = PT.shape({
    enhetId: PT.string,
    navn: PT.string
});

export const veilederShape = PT.shape({
    ident: PT.string.isRequired,
    navn: PT.string,
    fornavn: PT.string,
    etternavn: PT.string
});

export const facetResultsShape = PT.shape({
    value: PT.string.isRequired,
    count: PT.number.isRequired
});

export const portefoljestorrelserShape = PT.shape({
    facetResults: PT.arrayOf(facetResultsShape).isRequired
});

export const veiledereShape = PT.shape({
    enhet: enhetShape.isRequired,
    veilederListe: PT.arrayOf(veilederShape).isRequired
});

export const brukerShape = PT.shape({
    diskresjonskode: PT.string,
    egenAnsatt: PT.bool.isRequired,
    erDoed: PT.bool.isRequired,
    etternavn: PT.string.isRequired,
    fnr: PT.string.isRequired,
    fornavn: PT.string.isRequired,
    sikkerhetstiltak: PT.arrayOf(PT.string).isRequired,
    veilederId: PT.string,
    veilederNavn: PT.string
});

export const portefoljeShape = PT.shape({
    brukere: PT.arrayOf(brukerShape).isRequired,
    antallTotalt: PT.number.isRequired,
    antallReturnert: PT.number.isRequired,
    fraIndex: PT.number.isRequired
});

export const valgtEnhetShape = PT.shape({
    enhetShape,
    status: PT.string.isRequired
});

export const filtervalgShape = PT.shape({
    nyeBrukere: PT.bool,
    inaktiveBrukere: PT.bool,
    venterPaSvarFraNAV: PT.bool,
    venterPaSvarFraBruker: PT.bool,
    minArbeidsliste: PT.bool,
    alder: PT.arrayOf(PT.string),
    kjonn: PT.arrayOf(PT.string),
    fodselsdagIMnd: PT.arrayOf(PT.string),
    innsatsgruppe: PT.arrayOf(PT.string),
    formidlingsgruppe: PT.arrayOf(PT.string),
    servicegruppe: PT.arrayOf(PT.string),
    veiledere: PT.arrayOf(PT.string),
    ytelse: PT.string
});

export const filtervalgLabelShape = PT.shape({
    nyeBrukere: PT.bool,
    inaktiveBrukere: PT.bool,
    venterPaSvarFraNAV: PT.bool,
    venterPaSvarFraBruker: PT.bool,
    minArbeidsliste: PT.bool,
    alder: PT.arrayOf(PT.string),
    kjonn: PT.arrayOf(PT.string),
    fodselsdagIMnd: PT.arrayOf(PT.string),
    innsatsgruppe: PT.arrayOf(PT.string),
    formidlingsgruppe: PT.arrayOf(PT.string),
    servicegruppe: PT.arrayOf(PT.string),
    veiledere: PT.arrayOf(PT.object),
    ytelse: PT.string
});

export const statustallShape = PT.shape({
    totalt: PT.number.isRequired,
    nyeBrukere: PT.number,
    inaktiveBrukere: PT.number.isRequired,
    venterPaSvarFraNAV: PT.number.isRequired,
    venterPaSvarFraBruker: PT.number.isRequired
});

