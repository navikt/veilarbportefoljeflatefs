import {innloggetVeileder} from './veiledere';

export const innloggetEnhet = {
    enhetId: '1234',
    navn: 'NAV Testheim'
};

const alternativEnhet = {
    enhetId: '0001',
    navn: 'NAV Testdalen'
};

const alternativEnhet2 = {
    enhetId: '0002',
    navn: 'NAV Brummedal'
};

/* eslint-disable import/no-anonymous-default-export */
export default {
    ident: innloggetVeileder.ident,
    navn: innloggetVeileder.navn,
    etternavn: innloggetVeileder.etternavn,
    fornavn: innloggetVeileder.fornavn,
    enheter: [innloggetEnhet, alternativEnhet, alternativEnhet2]
};
