import {fakerNB_NO as faker} from '@faker-js/faker';
import {rnd} from '../utils';
import {MOCK_CONFIG} from '../constants';
import {VeilederePaEnhetModell, VeilederModell} from '../../typer/enhet-og-veiledere-modeller';

faker.seed(MOCK_CONFIG.seed);

export function lagTilfeldigVeilederId() {
    return `Z${rnd(100000, 999999)}`;
}

function lagVeileder(): VeilederModell {
    const ident = lagTilfeldigVeilederId();
    const kjonn = Math.random() > 0.5 ? 'K' : 'M';
    const fornavn = faker.person.firstName(kjonn === 'K' ? 'female' : 'male');
    const etternavn = faker.person.lastName(kjonn === 'K' ? 'female' : 'male');
    const navn = fornavn + ' ' + etternavn;
    return {
        ident,
        navn,
        fornavn,
        etternavn
    };
}

function lagVeiledere(): VeilederModell[] {
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

export const veilederResponse: VeilederePaEnhetModell = {
    veilederListe: veiledere,
    enhet: {enhetId: '1234', navn: 'Nav Testheim'}
};
