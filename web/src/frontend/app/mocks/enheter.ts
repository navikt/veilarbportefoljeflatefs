import { innloggetVeileder } from "./veiledere";

export const inloggetEnhet = {
    enhetId: '1234',
    navn: 'NAV Testheim'
};

export default {
    ident: innloggetVeileder.ident,
    enhetliste: [inloggetEnhet]
};
