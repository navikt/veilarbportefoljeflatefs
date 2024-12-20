import {innloggetVeileder as iv} from './veiledere';

export const innloggetEnhet = {
    enhetId: '1234',
    navn: 'Nav Testheim'
};

const alternativEnhet = {
    enhetId: '0001',
    navn: 'Nav Testdalen'
};

const alternativEnhet2 = {
    enhetId: '0002',
    navn: 'Nav Brummedal'
};

const innloggetVeileder = {
    ...iv,
    enheter: [innloggetEnhet, alternativEnhet, alternativEnhet2]
};

export default innloggetVeileder;
