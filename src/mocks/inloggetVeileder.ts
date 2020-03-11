import { innloggetVeileder } from './veiledere';

export const inloggetEnhet = {
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

export default {
    ident: innloggetVeileder.ident,
    navn: innloggetVeileder.navn,
    etternavn: innloggetVeileder.etternavn,
    fornavn: innloggetVeileder.fornavn,
    enheter: [inloggetEnhet, alternativEnhet, alternativEnhet2]
};
