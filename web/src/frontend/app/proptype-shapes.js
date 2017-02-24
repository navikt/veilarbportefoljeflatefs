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

// export const brukerShape = PT.shape({
//     fnr: PT.string.isRequired,
//     erDoed: PT.bool.isRequired,
//     egenAnsatt: PT.boolean.isRequired,
//     fornavn: PT.string.isRequired,
//     etternavn: PT.string.isRequired,
//     diskresjonskode: PT.string.isRequired,
//     sikkerhetstiltak: PT.arrayOf(object).isRequired,
//     veilederId: PT.string.isRequired
// });
