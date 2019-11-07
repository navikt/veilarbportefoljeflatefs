import { innloggetVeileder } from './veiledere';

export const inloggetEnhet = {
    enhetId: '1234',
    navn: 'NAV Testheim'
};

const alternativEnhet = {
    enhetId: '0001',
    navn: 'NAV Testdalen'
};

export default {
    ident: innloggetVeileder.ident,
    enhetliste: [inloggetEnhet, alternativEnhet]
};
