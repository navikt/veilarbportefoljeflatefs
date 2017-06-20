import { expect } from 'chai';
import { ASCENDING, DESCENDING } from '../konstanter';

import { sorterPaaEtternavn, sorterPaaPortefoljestorrelse } from './veilederpaginering';

describe('VeilederPagineringReducer', () => {
    describe('sorterPaaEtternavn', () => {
        //Dette er den korrekte testen, Aa === å, men node støtter ikke dette enda (verifisert at det fungerer i chrome)
        xit('sjekker at listen blir sortert alfabetisk', () => {
            const veiledere = [
                { etternavn: 'Johnsen' },
                { etternavn: 'Albertsen' },
                { etternavn: 'Akselsen' },
                { etternavn: 'Aakselsen' },
                { etternavn: 'Marsvinsen' }
            ];

            expect(sorterPaaEtternavn(veiledere, ASCENDING)).to.deep.equal([
                { etternavn: 'Akselsen' },
                { etternavn: 'Albertsen' },
                { etternavn: 'Johnsen' },
                { etternavn: 'Marsvinsen' },
                { etternavn: 'Aakselsen' }
            ]);
        });
        it('sjekker at listen blir sortert motsatt alfabetisk', () => {
            const veiledere = [
                { etternavn: 'Johnsen' },
                { etternavn: 'Albertsen' },
                { etternavn: 'Akselsen' },
                { etternavn: 'Marsvinsen' }
            ];

            expect(sorterPaaEtternavn(veiledere, DESCENDING)).to.deep.equal([
                { etternavn: 'Marsvinsen' },
                { etternavn: 'Johnsen' },
                { etternavn: 'Albertsen' },
                { etternavn: 'Akselsen' }
            ]);
        });
    });

    describe('sorterPaaPortefoljestorrelser', () => {
        it('sjekker at veiledere blir sortert etter portføljestørrelser i stigende rekkefølge', () => {
            const veiledere = [
                { portefoljestorrelse: 10 },
                { portefoljestorrelse: 5 },
                { portefoljestorrelse: 20 },
                { portefoljestorrelse: 2 }
            ];

            expect(sorterPaaPortefoljestorrelse(veiledere, ASCENDING)).to.deep.equal([
                { portefoljestorrelse: 2 },
                { portefoljestorrelse: 5 },
                { portefoljestorrelse: 10 },
                { portefoljestorrelse: 20 }
            ]);
        });
        it('sjekker at veiledere blir sortert etter portføljestørrelser i synkende rekkefølge', () => {
            const veiledere = [
                { portefoljestorrelse: 10 },
                { portefoljestorrelse: 5 },
                { portefoljestorrelse: 20 },
                { portefoljestorrelse: 2 }
            ];

            expect(sorterPaaPortefoljestorrelse(veiledere, ASCENDING)).to.deep.equal([
                { portefoljestorrelse: 2 },
                { portefoljestorrelse: 5 },
                { portefoljestorrelse: 10 },
                { portefoljestorrelse: 20 }
            ]);
        });
    });
});
