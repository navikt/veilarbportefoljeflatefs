/*before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();
    cy.gaTilOversikt('min-oversikt');
});

describe('Arbeidslistestatus', () => {

    it('Sjekk tekst på legg til i / fjern fra arbeidslisteknapp', () => {

        // Vel "Min arbeidsliste"-filteret under Status i sidemenyen
        cy.getByTestId('filter_checkboks-container_minArbeidsliste').click();

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

            // Sjekk at det no er ein meir person i lilla arbeidsliste
            cy.getByTestId('filter_checkboks-container_minArbeidsliste').click();
        });
    });
});*/
