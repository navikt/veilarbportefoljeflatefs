import {innloggetVeileder as iv} from './veiledere';

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

const innloggetVeileder = {
    ...iv,
    enheter: [innloggetEnhet, alternativEnhet, alternativEnhet2]
};

export default innloggetVeileder;
