import {innloggetVeileder as innloggetVeilederFraVeiledereliste} from './veiledere';
import {EnhetModell, InnloggetVeilederModell} from '../../typer/enhet-og-veiledere-modeller';

export const innloggetEnhet: EnhetModell = {
    enhetId: '1234',
    navn: 'Nav Testheim'
};

const alternativEnhet: EnhetModell = {
    enhetId: '0001',
    navn: 'Nav Testdalen'
};

const alternativEnhet2: EnhetModell = {
    enhetId: '0002',
    navn: 'Nav Brummedal'
};

export const innloggetVeileder: InnloggetVeilederModell = {
    ...innloggetVeilederFraVeiledereliste,
    enheter: [innloggetEnhet, alternativEnhet, alternativEnhet2]
};
