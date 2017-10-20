import { rnd, MOCK_CONFIG } from './utils';
import faker from 'faker/locale/nb_NO';

faker.seed(MOCK_CONFIG.seed);

export function lagTilfeldigVeilederId() {
    return `Z${rnd(100000, 999999)}`;
}

function lagVeileder() {
    const ident = lagTilfeldigVeilederId();
    const kjonn = Math.random() > 0.5 ? 'K' : 'M';
    const fornavn = faker.name.firstName(kjonn === 'K' ? 1 : 0);
    const etternavn = faker.name.lastName(kjonn === 'K' ? 1 : 0);
    const navn = etternavn + ', ' + fornavn;
    return {
        ident,
        navn,
        fornavn,
        etternavn
    };
}

export const veiledere = new Array(40).fill(0).map(() => lagVeileder());
export const innloggetVeileder = veiledere[0];

export default {
    veilederListe: veiledere,
    enhet: {enhetId: '1234', navn: 'NAV Testheim'}
};
