import { expect } from 'chai';
import reducer, * as Func from './filtrering';

describe('filtreringreducer', () => {
    const initialState = reducer(undefined, {});

    it('skal oppdater "nyebrukere"', () => {
        const nState = reducer(initialState, Func.endreFiltervalg('nyeBrukere', true));
        const nState2 = reducer(initialState, Func.endreFiltervalg('nyeBrukere', false));

        expect(nState.filtervalg.nyeBrukere).to.equal(true);
        expect(nState2.filtervalg.nyeBrukere).to.equal(false);
    });

    it('skal oppdater "inaktiveBrukere"', () => {
        const nState = reducer(initialState, Func.endreFiltervalg('inaktiveBrukere', true));
        const nState2 = reducer(initialState, Func.endreFiltervalg('inaktiveBrukere', false));

        expect(nState.filtervalg.inaktiveBrukere).to.equal(true);
        expect(nState2.filtervalg.inaktiveBrukere).to.equal(false);
    });

    it('skal oppdater "alder"', () => {
        const nState = reducer(initialState, Func.endreFiltervalg('alder', [0, 1, 4]));
        const nState2 = reducer(nState, Func.endreFiltervalg('alder', []));

        expect(nState.filtervalg.alder).to.deep.equal([0, 1, 4]);
        expect(nState2.filtervalg.alder).to.deep.equal([]);
    });

    it('skal oppdater "kjonn"', () => {
        const nState = reducer(initialState, Func.endreFiltervalg('kjonn', [0, 1, 4]));
        const nState2 = reducer(nState, Func.endreFiltervalg('kjonn', []));

        expect(nState.filtervalg.kjonn).to.deep.equal([0, 1, 4]);
        expect(nState2.filtervalg.kjonn).to.deep.equal([]);
    });

    it('skal oppdater "fodselsdagIMnd"', () => {
        const nState = reducer(initialState, Func.endreFiltervalg('fodselsdagIMnd', [0, 1, 4]));
        const nState2 = reducer(nState, Func.endreFiltervalg('fodselsdagIMnd', []));

        expect(nState.filtervalg.fodselsdagIMnd).to.deep.equal([0, 1, 4]);
        expect(nState2.filtervalg.fodselsdagIMnd).to.deep.equal([]);
    });

    it('skal oppdater "ytelse"', () => {
        const nState = reducer(initialState, Func.endreFiltervalg('ytelse', [0, 1, 4]));
        const nState2 = reducer(nState, Func.endreFiltervalg('ytelse', []));

        expect(nState.filtervalg.ytelse).to.deep.equal([0, 1, 4]);
        expect(nState2.filtervalg.ytelse).to.deep.equal([]);
    });
});
