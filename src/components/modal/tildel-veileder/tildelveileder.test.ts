import {FargekategoriModell, HuskelappModell} from '../../../model-interfaces';
import {
    harArbeidslisteSomVilBliSlettetFilter,
    harFargekategoriSomVilBliSlettetFilter,
    harHuskelappSomVilBliSlettetFilter,
    ingentingHosBrukerVilBliSlettet
} from './tildel-veileder-utils';

/** Minifisert utgåve av BrukerModell der vi berre har med felta som er relevant i testane */
interface MiniBrukerModell {
    veilederId?: string;
    arbeidsliste: {
        arbeidslisteAktiv: boolean;
        navkontorForArbeidsliste: string | undefined;
    };
    huskelapp?: HuskelappModell;
    fargekategori: FargekategoriModell | null;
    fargekategoriEnhetId: string | null;
    fnr: string;
}

describe('Testar logikk for tildeling av veileder', () => {
    it('Sjekk om vi kan få mismatch mellom brukarar der arbeidslister vert sletta og der det ikkje blir sletta', () => {
        const ident = 'Z123456';
        const ulikIdent = 'Z654321';
        const enhet = '1234';
        const ulikEnhet = '4321';

        const brukerMedArbeidslisteSomSkalSlettes: MiniBrukerModell = {
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

        const brukerMedArbeidslisteSomIkkeSkalSlettes: MiniBrukerModell = {
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

        const brukerUtenArbeidsliste: MiniBrukerModell = {
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
            brukerMedArbeidslisteSomSkalSlettes,
            brukerMedArbeidslisteSomIkkeSkalSlettes,
            brukerUtenArbeidsliste
        ];

        const brukereDerIngentingSkalSlettes: MiniBrukerModell[] = finnBrukereDerIngentingSkalSlettes(
            brukere,
            ident,
            enhet
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
            brukereDerIngentingSkalSlettes.some(bruker => brukereSomSkalSletteArbeidsliste.includes(bruker))
        ).toBeFalsy();
        expect(
            brukereSomSkalSletteArbeidsliste.some(bruker => brukereDerIngentingSkalSlettes.includes(bruker))
        ).toBeFalsy();

        // Alle brukarane skal anten slette noko eller ikkje slette noko
        expect(brukereDerIngentingSkalSlettes.concat(brukereSomSkalSletteArbeidsliste).length).toEqual(brukere.length);
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

        const brukerMedHuskelappSomSkalSlettes: MiniBrukerModell = {
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

        const brukerMedHuskelappSomIkkeSkalSlettes: MiniBrukerModell = {
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

        const brukerUtenHuskelapp: MiniBrukerModell = {
            fnr: '3',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: undefined,
            fargekategori: null,
            fargekategoriEnhetId: null
        };

        const brukere = [brukerMedHuskelappSomSkalSlettes, brukerMedHuskelappSomIkkeSkalSlettes, brukerUtenHuskelapp];

        const brukereDerIngentingSkalSlettes: MiniBrukerModell[] = finnBrukereDerIngentingSkalSlettes(
            brukere,
            ident,
            enhet
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
            brukereDerIngentingSkalSlettes.some(bruker => brukereSomSkalSletteHuskelapp.includes(bruker))
        ).toBeFalsy();
        expect(
            brukereSomSkalSletteHuskelapp.some(bruker => brukereDerIngentingSkalSlettes.includes(bruker))
        ).toBeFalsy();

        // Alle brukarane skal anten slette noko eller ikkje slette noko
        expect(brukereDerIngentingSkalSlettes.concat(brukereSomSkalSletteHuskelapp).length).toEqual(brukere.length);
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

        const brukerMedHuskelappSomSkalSlettes: MiniBrukerModell = {
            fnr: '1',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: undefined,
            fargekategori: FargekategoriModell.FARGEKATEGORI_A,
            fargekategoriEnhetId: ulikEnhet
        };

        const brukerMedHuskelappSomIkkeSkalSlettes: MiniBrukerModell = {
            fnr: '2',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: undefined,
            fargekategori: null,
            fargekategoriEnhetId: enhet
        };

        const brukerUtenHuskelapp: MiniBrukerModell = {
            fnr: '3',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: undefined,
            fargekategori: null,
            fargekategoriEnhetId: null
        };

        const brukere = [brukerMedHuskelappSomSkalSlettes, brukerMedHuskelappSomIkkeSkalSlettes, brukerUtenHuskelapp];

        const brukereDerIngentingSkalSlettes: MiniBrukerModell[] = finnBrukereDerIngentingSkalSlettes(
            brukere,
            ident,
            enhet
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
            brukereDerIngentingSkalSlettes.some(bruker => brukereSomSkalSletteHuskelapp.includes(bruker))
        ).toBeFalsy();
        expect(
            brukereSomSkalSletteHuskelapp.some(bruker => brukereDerIngentingSkalSlettes.includes(bruker))
        ).toBeFalsy();

        // Alle brukarane skal anten slette noko eller ikkje slette noko
        expect(brukereDerIngentingSkalSlettes.concat(brukereSomSkalSletteHuskelapp).length).toEqual(brukere.length);
    });
});

const finnBrukereDerIngentingSkalSlettes = (brukere: MiniBrukerModell[], ident, enhet) => {
    return brukere.filter(bruker =>
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
};
