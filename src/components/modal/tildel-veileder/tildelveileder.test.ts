import {BrukerModell} from '../../../model-interfaces';

interface MiniBrukerModell {
    veilederId?: string | undefined;
    arbeidsliste: {
        arbeidslisteAktiv: boolean;
        navkontorForArbeidsliste: string | undefined;
    };
    huskelapp?: {
        enhetId: string | null;
    };
    fargekategori: string | null;
    fargekategoriEnhetId: string | null;
    fnr: string;
}

// Vi treng eigentleg ikkje Brukermodell her, men for at testen skal vere ein gyldig test må vi bruke noko frå andre filer
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

const brukereArbeidslisteVilBliSlettet = (bruker: MiniBrukerModell, ident: string, enhet: string | null) => {
    return (
        // har arbeidsliste å slette
        bruker.arbeidsliste.arbeidslisteAktiv &&
        // endring av veileder eller ingen veileder frå før
        (bruker.veilederId !== ident || bruker.veilederId === null) &&
        // har kontor for arbeidslista
        bruker.arbeidsliste.navkontorForArbeidsliste !== null &&
        // endring i kontor frå det i arbeidslista
        bruker.arbeidsliste.navkontorForArbeidsliste !== enhet
    );
};

const brukereHuskelappVilBliSlettet = (bruker: MiniBrukerModell, ident: string, enhet: string | null) => {
    return (
        !!bruker.huskelapp &&
        (bruker.veilederId !== ident || bruker.veilederId === null) &&
        bruker.huskelapp.enhetId !== null &&
        bruker.huskelapp.enhetId !== enhet
    );
};

describe('Testar logikk for tildeling av veileder', () => {
    it('Sjekk om vi kan få mismatch mellom arbeidslister der noko vert sletta og der ingenting blir sletta', () => {
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
            brukereSomIkkeSkalSlettesFilter(bruker, ident, enhet)
        );
        const brukereSomSkalSletteArbeidsliste: MiniBrukerModell[] = brukere.filter(bruker =>
            brukereArbeidslisteVilBliSlettet(bruker, ident, enhet)
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

    it('Sjekk om vi kan få mismatch mellom huskelappar der noko vert sletta og der ingenting blir sletta', () => {
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
            huskelapp: {
                enhetId: ulikEnhet
            },
            fargekategori: null,
            fargekategoriEnhetId: null
        };

        const brukerMedHuskelappSomIkkjeSkalSlettast: MiniBrukerModell = {
            fnr: '2',
            veilederId: ulikIdent, // eller null
            arbeidsliste: ingenArbeidsliste,
            huskelapp: {
                enhetId: enhet
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
            brukereHuskelappVilBliSlettet(bruker, ident, enhet)
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
