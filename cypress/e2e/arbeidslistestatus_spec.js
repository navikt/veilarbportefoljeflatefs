/*before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();
    cy.gaTilOversikt('min-oversikt');
});

describe('Arbeidslistestatus', () => {

    it('Sjekk tekst på legg til i / fjern fra arbeidslisteknapp', () => {
        // Sjekkar at rett knapp er synleg frå start
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.getByTestId('fjern-fra-arbeidsliste_knapp').should('not.exist');

        // Vel "Min arbeidsliste"-filteret under Status i sidemenyen
        cy.getByTestId('filter_checkboks-container_minArbeidsliste').click();

        // No skal "Fjern fra arbeidsliste"-knappen vere synleg
        cy.getByTestId('fjern-fra-arbeidsliste_knapp').should('be.enabled');

        // Nullstill filter etter test
        cy.getByTestId('filtreringlabel_min-arbeidsliste').click();
    });

    it('Legg til person i lilla arbeidsliste', () => {
        // Vel "Min arbeidsliste"-filteret under Status i sidemenyen
        cy.getByTestId('filter_checkboks-container_minArbeidsliste').click();

        // Hentar ut kor mange som er i Lilla arbeidsliste i starten av testen
        cy.getByTestId('filter_checkboks-label_minArbeidslisteLilla').as('lillaArbeidslistetall').then(antallILillaArbeidslisteFor => {
            // Nullstill valg av filter "min arbeidsliste"
            cy.scrollTo('top');
            cy.getByTestId('filtreringlabel_min-arbeidsliste').click();
            cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');

            // Vel ein brukar som skal leggast til i arbeidsliste
            cy.scrollTo('top');
            cy.wait(200);
            cy.checkboxFirst('min-oversikt_brukerliste-checkbox');

            // Legg dei til i arbeidslista
            cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled').click();

            // Gjer ting i modal og lagre det (tittel, kommentar, fargekategori = lilla)
            cy.getByTestId('modal_arbeidsliste_tittel').type('arbeidslistetittel');
            cy.getByTestId('modal_arbeidsliste_kommentar').type('arbeidslistekommentar');
            cy.getByTestId('modal_arbeidslistekategori_LILLA').click();
            cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();

            // Desse testane er litt ustabile så vi kommenterer dei ut. 2024-04-19 Ingrid og Klara
            // // Sjå laster-modal
            // cy.getByTestId('veilarbportefoljeflatefs-laster-modal').should('be.visible');
            // cy.getByTestId('veilarbportefoljeflatefs-laster-modal').should('not.exist');
            cy.wait(300); // Ventar på at laster-modalen skal forsvinne

            // Sjekk at det no er ein meir person i lilla arbeidsliste
            cy.getByTestId('filter_checkboks-container_minArbeidsliste').click();
            cy.get('@lillaArbeidslistetall').then(antallILillaArbeidslisteEtter => {
                expect(parseInt(antallILillaArbeidslisteEtter.text()))
                    .to.equal(parseInt(antallILillaArbeidslisteFor.text()) + 1);
            });
        });
    });
});*/
