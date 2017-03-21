import { PropTypes as PT } from 'react';

export const enhetShape = PT.shape({
    enhetId: PT.string,
    navn: PT.string
});

export const veilederShape = PT.shape({
    ident: PT.string.isRequired,
    navn: PT.string.isRequired,
    fornavn: PT.string.isRequired,
    etternavn: PT.string.isRequired
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

export const filtervalgMellomlagringShape = PT.shape({
    alder: PT.arrayOf(PT.number).isRequired,
    kjonn: PT.arrayOf(PT.number).isRequired,
    fodselsdagIMnd: PT.arrayOf(PT.number).isRequired,
    innsatsgruppe: PT.arrayOf(PT.number).isRequired
});

export const filtervalgShape = PT.shape({
    nyeBrukere: PT.bool.isRequired,
    inaktiveBrukere: PT.bool.isRequired,
    alder: PT.arrayOf(PT.number).isRequired,
    kjonn: PT.arrayOf(PT.number).isRequired,
    fodselsdagIMnd: PT.arrayOf(PT.number).isRequired,
    innsatsgruppe: PT.arrayOf(PT.number).isRequired
});
