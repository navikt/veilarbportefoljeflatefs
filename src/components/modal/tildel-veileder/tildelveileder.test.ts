import {BrukerModell, FargekategoriModell, HuskelappModell} from '../../../model-interfaces';
import {
    harArbeidslisteSomVilBliSlettetFilter,
    harFargekategoriSomVilBliSlettetFilter,
    harHuskelappSomVilBliSlettetFilter,
    ingentingHosBrukerVilBliSlettet
} from './tildel-veileder-utils';

interface MiniBrukerModell {
    veilederId?: string | undefined;
    arbeidsliste: {
        arbeidslisteAktiv: boolean;
        navkontorForArbeidsliste: string | undefined;
    };
    huskelapp?: HuskelappModell;
    fargekategori: FargekategoriModell | null;
    fargekategoriEnhetId: string | null;
    fnr: string;
}

const brukereSomIkkeSkalSlettesFilter = (
    bruker: MiniBrukerModell | BrukerModell,
    ident: string,
    enhet: string | null
) => {
    return (
        bruker.veilederId === ident ||
        ((!bruker.arbeidsliste.arbeidslisteAktiv || bruker.arbeidsliste.navkontorForArbeidsliste === enhet) &&
            (!bruker.huskelapp || bruker.huskelapp?.enhetId === enhet) &&
            (!bruker.fargekategori || bruker.fargekategoriEnhetId === enhet))
    );
};

describe('Testar logikk for tildeling av veileder', () => {
    it('Sjekk om vi kan få mismatch mellom brukarar der arbeidslister vert sletta og der det ikkje blir sletta', () => {
        const ident = 'Z123456';
        const ulikIdent = 'Z654321';
        const enhet = '1234';
        const ulikEnhet = '4321';

        const brukerMedArbeidslisteSomSkalSlettast: MiniBrukerModell = {
            fnr: '1',
            veilederId: ulikIdent, // eller null
            arbeidsliste: {
                arbeidslisteAktiv: true,
                navkontorForArbeidsliste: ulikEnhet
            },
            huskelapp: undefined,
            fargekategori: null,
            fargekategoriEnhetId: null
        };

        const brukerMedArbeidslisteSomIkkjeSkalSlettast: MiniBrukerModell = {
            fnr: '2',
            veilederId: ulikIdent, // eller null
            arbeidsliste: {
                arbeidslisteAktiv: true,
                navkontorForArbeidsliste: enhet
            },
            huskelapp: undefined,
            fargekategori: null,
            fargekategoriEnhetId: null
        };

        const brukerUtanArbeidsliste: MiniBrukerModell = {
            fnr: '3',
            veilederId: ulikIdent, // eller null
            arbeidsliste: {
                arbeidslisteAktiv: false,
                navkontorForArbeidsliste: undefined
            },
            huskelapp: undefined,
            fargekategori: null,
            fargekategoriEnhetId: null
        };

        const brukere = [
            brukerMedArbeidslisteSomSkalSlettast,
            brukerMedArbeidslisteSomIkkjeSkalSlettast,
            brukerUtanArbeidsliste
        ];

        const brukereDerIngentingSkalSlettast: MiniBrukerModell[] = brukere.filter(bruker =>
            ingentingHosBrukerVilBliSlettet({
                tilVeileder: ident,
                fraVeileder: bruker.veilederId,
                tilEnhet: enhet,
                arbeidslisteAktiv: bruker.arbeidsliste.arbeidslisteAktiv,
                navkontorForArbeidsliste: bruker.arbeidsliste.navkontorForArbeidsliste,
                huskelapp: bruker.huskelapp,
                fargekategori: bruker.fargekategori,
                fargekategoriEnhetId: bruker.fargekategoriEnhetId
            })
        );
        const brukereSomSkalSletteArbeidsliste: MiniBrukerModell[] = brukere.filter(bruker =>
            harArbeidslisteSomVilBliSlettetFilter({
                tilVeileder: ident,
                fraVeileder: bruker.veilederId,
                tilEnhet: enhet,
                arbeidslisteAktiv: bruker.arbeidsliste.arbeidslisteAktiv,
                navkontorForArbeidsliste: bruker.arbeidsliste.navkontorForArbeidsliste
            })
        );

        // Ikkje overlapp i dei som skal slettast og ikkje
        expect(
            brukereDerIngentingSkalSlettast.some(bruker => brukereSomSkalSletteArbeidsliste.includes(bruker))
        ).toBeFalsy();
        expect(
            brukereSomSkalSletteArbeidsliste.some(bruker => brukereDerIngentingSkalSlettast.includes(bruker))
        ).toBeFalsy();

        // Alle brukarane skal anten slette noko eller ikkje slette noko
        expect(brukereDerIngentingSkalSlettast.concat(brukereSomSkalSletteArbeidsliste).length).toEqual(brukere.length);
    });

    it('Sjekk om vi kan få mismatch mellom brukarar der huskelapp vert sletta og ikkje blir sletta', () => {
        const ident = 'Z123456';
        const ulikIdent = 'Z654321';
        const enhet = '1234';
        const ulikEnhet = '4321';

        const ingenArbeidsliste = {
            arbeidslisteAktiv: false,
            navkontorForArbeidsliste: undefined
        };

        const irrelevanteHuskelappProps = {
            huskelappId: '1',
            frist: null,
            endretDato: new Date(),
            endretAv: 'Z111111'
        };

        const brukerMedHuskelappSomSkalSlettast: MiniBrukerModell = {
            fnr: '1',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: {
                enhetId: ulikEnhet,
                ...irrelevanteHuskelappProps
            },
            fargekategori: null,
            fargekategoriEnhetId: null
        };

        const brukerMedHuskelappSomIkkjeSkalSlettast: MiniBrukerModell = {
            fnr: '2',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: {
                enhetId: enhet,
                ...irrelevanteHuskelappProps
            },
            fargekategori: null,
            fargekategoriEnhetId: null
        };

        const brukerUtanHuskelapp: MiniBrukerModell = {
            fnr: '3',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: undefined,
            fargekategori: null,
            fargekategoriEnhetId: null
        };

        const brukere = [
            brukerMedHuskelappSomSkalSlettast,
            brukerMedHuskelappSomIkkjeSkalSlettast,
            brukerUtanHuskelapp
        ];

        const brukereDerIngentingSkalSlettast: MiniBrukerModell[] = brukere.filter(bruker =>
            brukereSomIkkeSkalSlettesFilter(bruker, ident, enhet)
        );
        const brukereSomSkalSletteHuskelapp: MiniBrukerModell[] = brukere.filter(bruker =>
            harHuskelappSomVilBliSlettetFilter({
                tilVeileder: ident,
                fraVeileder: bruker.veilederId,
                tilEnhet: enhet,
                huskelapp: bruker.huskelapp
            })
        );

        // Ikkje overlapp i dei som skal slettast og ikkje
        expect(
            brukereDerIngentingSkalSlettast.some(bruker => brukereSomSkalSletteHuskelapp.includes(bruker))
        ).toBeFalsy();
        expect(
            brukereSomSkalSletteHuskelapp.some(bruker => brukereDerIngentingSkalSlettast.includes(bruker))
        ).toBeFalsy();

        // Alle brukarane skal anten slette noko eller ikkje slette noko
        expect(brukereDerIngentingSkalSlettast.concat(brukereSomSkalSletteHuskelapp).length).toEqual(brukere.length);
    });

    it('Sjekk om vi kan få mismatch mellom brukarar der fargekategori vert sletta og ikkje blir sletta', () => {
        const ident = 'Z123456';
        const ulikIdent = 'Z654321';
        const enhet = '1234';
        const ulikEnhet = '4321';

        const ingenArbeidsliste = {
            arbeidslisteAktiv: false,
            navkontorForArbeidsliste: undefined
        };

        const brukerMedHuskelappSomSkalSlettast: MiniBrukerModell = {
            fnr: '1',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: undefined,
            fargekategori: FargekategoriModell.FARGEKATEGORI_A,
            fargekategoriEnhetId: ulikEnhet
        };

        const brukerMedHuskelappSomIkkjeSkalSlettast: MiniBrukerModell = {
            fnr: '2',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: undefined,
            fargekategori: null,
            fargekategoriEnhetId: enhet
        };

        const brukerUtanHuskelapp: MiniBrukerModell = {
            fnr: '3',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: undefined,
            fargekategori: null,
            fargekategoriEnhetId: null
        };

        const brukere = [
            brukerMedHuskelappSomSkalSlettast,
            brukerMedHuskelappSomIkkjeSkalSlettast,
            brukerUtanHuskelapp
        ];

        const brukereDerIngentingSkalSlettast: MiniBrukerModell[] = brukere.filter(bruker =>
            brukereSomIkkeSkalSlettesFilter(bruker, ident, enhet)
        );
        const brukereSomSkalSletteHuskelapp: MiniBrukerModell[] = brukere.filter(bruker =>
            harFargekategoriSomVilBliSlettetFilter({
                tilVeileder: ident,
                fraVeileder: bruker.veilederId,
                tilEnhet: enhet,
                fargekategori: bruker.fargekategori,
                fargekategoriEnhetId: bruker.fargekategoriEnhetId
            })
        );

        // Ikkje overlapp i dei som skal slettast og ikkje
        expect(
            brukereDerIngentingSkalSlettast.some(bruker => brukereSomSkalSletteHuskelapp.includes(bruker))
        ).toBeFalsy();
        expect(
            brukereSomSkalSletteHuskelapp.some(bruker => brukereDerIngentingSkalSlettast.includes(bruker))
        ).toBeFalsy();

        // Alle brukarane skal anten slette noko eller ikkje slette noko
        expect(brukereDerIngentingSkalSlettast.concat(brukereSomSkalSletteHuskelapp).length).toEqual(brukere.length);
    });
});
