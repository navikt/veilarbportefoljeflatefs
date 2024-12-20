import {fakerNB_NO as faker} from '@faker-js/faker';
import {rnd} from '../utils';
import {MOCK_CONFIG} from '../constants';

faker.seed(MOCK_CONFIG.seed);

export function lagTilfeldigVeilederId() {
    return `Z${rnd(100000, 999999)}`;
}

function lagVeileder() {
    const ident = lagTilfeldigVeilederId();
    const kjonn = Math.random() > 0.5 ? 'K' : 'M';
    const fornavn = faker.person.firstName(kjonn === 'K' ? 'female' : 'male');
    const etternavn = faker.person.lastName(kjonn === 'K' ? 'female' : 'male');
    const navn = etternavn + ', ' + fornavn;
    return {
        ident,
        navn,
        fornavn,
        etternavn
    };
}

function lagVeiledere() {
    const veiledere = new Array(40).fill(0).map(() => lagVeileder());
    veiledere.push({
        ident: lagTilfeldigVeilederId(),
        navn: 'Testesen, Testias',
        fornavn: 'Testias',
        etternavn: 'Testesen'
    });

    return veiledere;
}

export const veiledere = lagVeiledere();
export const innloggetVeileder = veiledere[0];

export const veilederResponse = {
    veilederListe: veiledere,
    enhet: {enhetId: '1234', navn: 'Nav Testheim'}
};
