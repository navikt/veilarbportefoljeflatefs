import {inneholderBareElementerViSerEtter, inneholderMinstEtAvElementeneViSerEtter} from '../utils/listesammenligning';

describe('Tester at vi kan finne ut om element i ei liste finnes i ei sammenligningsliste', () => {
    it('når listene er like', () => {
        const listeViHar = ['A'];
        const listeMedTingViVilFinne = ['A'];

        const detViVilFinneErILista = inneholderMinstEtAvElementeneViSerEtter(listeViHar, listeMedTingViVilFinne);

        expect(detViVilFinneErILista).toBe(true);
    });

    it('når lista vi har inneholder alle elementene vi ser etter', () => {
        const listeViHar = ['A', 'B'];
        const listeMedTingViVilFinne = ['A'];

        const detViVilFinneErILista = inneholderMinstEtAvElementeneViSerEtter(listeViHar, listeMedTingViVilFinne);

        expect(detViVilFinneErILista).toBe(true);
    });

    it('når liste A inneholder deler av B', () => {
        const listeViHar = ['A', 'B'];
        const listeMedTingViVilFinne = ['A', 'C'];

        const detViVilFinneErILista = inneholderMinstEtAvElementeneViSerEtter(listeViHar, listeMedTingViVilFinne);

        expect(detViVilFinneErILista).toBe(true);
    });

    it('når liste A ikke inneholder noen av elementene i B', () => {
        const listeViHar = ['A', 'B'];
        const listeMedTingViVilFinne = ['C', 'D'];

        const detViVilFinneErILista = inneholderMinstEtAvElementeneViSerEtter(listeViHar, listeMedTingViVilFinne);

        expect(detViVilFinneErILista).toBe(false);
    });
});

describe('Tester at vi kan finne ut om alle element i ei liste finnes i ei sammenligningsliste', () => {
    it('når listene er like', () => {
        const listeViHar = ['A'];
        const listeMedTingViVilFinne = ['A'];

        const detViVilFinneErILista = inneholderBareElementerViSerEtter(listeViHar, listeMedTingViVilFinne);

        expect(detViVilFinneErILista).toBe(true);
    });

    it('når lista vi har inneholder kun elementer vi ser etter', () => {
        const listeViHar = ['A', 'B'];
        const listeMedTingViVilFinne = ['A', 'B', 'C'];

        const detViVilFinneErILista = inneholderBareElementerViSerEtter(listeViHar, listeMedTingViVilFinne);

        expect(detViVilFinneErILista).toBe(true);
    });

    it('når lista vi har også inneholder elementer som vi ikke ser etter', () => {
        const listeViHar = ['A', 'B'];
        const listeMedTingViVilFinne = ['A', 'C'];

        const detViVilFinneErILista = inneholderBareElementerViSerEtter(listeViHar, listeMedTingViVilFinne);

        expect(detViVilFinneErILista).toBe(false);
    });

    it('når lista vi har ikke inneholder noen av elementene vi ser etter', () => {
        const listeViHar = ['A', 'B'];
        const listeMedTingViVilFinne = ['C', 'D'];

        const detViVilFinneErILista = inneholderBareElementerViSerEtter(listeViHar, listeMedTingViVilFinne);

        expect(detViVilFinneErILista).toBe(false);
    });
});
