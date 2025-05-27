import {lagLablerTilVeiledereMedIdenter} from './lagLablerTilVeiledereMedIdenter';
import {VeilederModell} from '../typer/enhet-og-veiledere-modeller';

describe('Test lagLablerTilVeiledereMedIdenter', () => {
    it('Test when all veiledere are active', () => {
        const identer = ['A1', 'A2', 'A3'];
        const aktivVeiledere: VeilederModell[] = [
            {
                ident: 'A1',
                navn: 'TestName 1 TestLastName 1',
                etternavn: 'TestName 1',
                fornavn: 'TestLastName 1'
            },
            {
                ident: 'A2',
                navn: 'TestName 2 TestLastName 2',
                etternavn: 'TestName 2',
                fornavn: 'TestLastName 2'
            },
            {
                ident: 'A3',
                navn: 'TestName 3 TestLastName 3',
                etternavn: 'TestName 3',
                fornavn: 'TestLastName 3'
            }
        ];
        let filteredVeileder = lagLablerTilVeiledereMedIdenter(identer, aktivVeiledere, () => {});
        expect(filteredVeileder.length).toBe(3);
    });

    it('Test when some of veiledere are not active anymore', () => {
        const identer = ['A1', 'A2', 'A3'];
        const aktivVeiledere: VeilederModell[] = [
            {
                ident: 'A1',
                navn: 'TestName 1 TestLastName 1',
                etternavn: 'TestName 1',
                fornavn: 'TestLastName 1'
            },
            {
                ident: 'A3',
                navn: 'TestName 3 TestLastName 3',
                etternavn: 'TestName 3',
                fornavn: 'TestLastName 3'
            }
        ];
        const filteredVeileder = lagLablerTilVeiledereMedIdenter(identer, aktivVeiledere, () => {});
        expect(filteredVeileder.length).toBe(2);
        filteredVeileder.forEach(item => {
            expect(item.label).toBeDefined();
            expect(item.key).toBeDefined();
        });
    });

    it('Test when some of veiledere are not active anymore', () => {
        const identer = ['A1', 'A2', 'A3'];
        const aktivVeiledere: VeilederModell[] = [
            {
                ident: 'A3',
                navn: 'TestName 3 TestLastName 3',
                etternavn: 'TestName 3',
                fornavn: 'TestLastName 3'
            }
        ];
        const filteredVeileder = lagLablerTilVeiledereMedIdenter(identer, aktivVeiledere, () => {});
        expect(filteredVeileder.length).toBe(1);
        filteredVeileder.forEach(item => {
            expect(item.label).toBeDefined();
            expect(item.key).toBeDefined();
        });
    });
});
