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
    nyeBrukere: PT.bool.isRequired,
    inaktiveBrukere: PT.bool.isRequired,
    alder: PT.arrayOf(PT.string).isRequired,
    kjonn: PT.arrayOf(PT.string).isRequired,
    fodselsdagIMnd: PT.arrayOf(PT.string).isRequired,
    innsatsgruppe: PT.arrayOf(PT.string).isRequired,
    formidlingsgruppe: PT.arrayOf(PT.string).isRequired,
    servicegruppe: PT.arrayOf(PT.string).isRequired,
    ytelse: PT.string
});

export const statustallShape = PT.shape({
    totalt: PT.number.isRequired,
    nyeBrukere: PT.number,
    inaktiveBrukere: PT.number.isRequired
});
