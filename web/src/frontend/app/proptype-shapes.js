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
    veilederListe: PT.arrayOf(veilederShape).isRequired,
    totaltAntallVeiledere: PT.number.isRequired,
    sublistFraIndex: PT.number.isRequired
});

export const brukerShape = PT.shape({
    diskresjonskode: PT.string,
    egenAnsatt: PT.bool.isRequired,
    erDoed: PT.bool.isRequired,
    etternavn: PT.string.isRequired,
    fnr: PT.string.isRequired,
    fornavn: PT.string.isRequired,
    sikkerhetstiltak: PT.arrayOf(PT.string).isRequired,
    veilederId: PT.string
});

export const portefoljeShape = PT.shape({
    brukere: PT.arrayOf(brukerShape).isRequired,
    antallTotalt: PT.number.isRequired,
    antallReturnert: PT.number.isRequired,
    fraIndex: PT.number.isRequired
});
