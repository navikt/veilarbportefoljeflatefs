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
