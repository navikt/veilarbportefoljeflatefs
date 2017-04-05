import { expect } from 'chai';

import { veiledereSok } from '../veiledere/veiledersok-utils';

const veilederliste = [
    {
        ident: 'X111111',
        navn: 'Arne And',
        fornavn: 'Arne',
        etternavn: 'And'
    },
    {
        ident: 'X222222',
        navn: 'Jens Bjarne Olsen',
        fornavn: 'Jens Bjarne',
        etternavn: 'Olsen'
    }

];

describe('veilederSok', () => {
    it('skal finne paa fornavn', () => {
        expect(veiledereSok('Jens', veilederliste).X111111.className).to.equal('veileder__hide');
        expect(veiledereSok('Jens', veilederliste).X222222.className).to.equal('');
    });
    it('skal finne paa etternavn', () => {
        expect(veiledereSok('Olsen', veilederliste).X111111.className).to.equal('veileder__hide');
        expect(veiledereSok('Olsen', veilederliste).X222222.className).to.equal('');    });
    it('skal finne paa forste fornavn og etternavn', () => {
        expect(veiledereSok('jens olsen', veilederliste).X111111.className).to.equal('veileder__hide');
        expect(veiledereSok('jens olsen', veilederliste).X222222.className).to.equal('');    });
    it('skal finne paa ident', () => {
        expect(veiledereSok('x222222', veilederliste).X111111.className).to.equal('veileder__hide');
        expect(veiledereSok('x222222', veilederliste).X222222.className).to.equal('');    })
});
