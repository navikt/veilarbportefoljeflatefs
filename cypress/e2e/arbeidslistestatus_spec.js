before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();
});

describe('Filter min arbeidsliste', () => {
    let antallFor = '';

    beforeEach('Gå til Min oversikt', () => {
        cy.gaTilOversikt('min-oversikt');
    });

    it('Sjekk tekst på legg til i / fjern fra arbeidslisteknapp', () => {
        // Sjekkar at rett knapp er synleg frå start
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.getByTestId('fjern-fra-arbeidsliste_knapp').should('not.exist');

        // Vel "Min arbeidsliste"-filteret under Status i sidemenyen
        cy.getByTestId('filter_checkboks-container_minArbeidsliste').click();

        // No skal "Fjern fra arbeidsliste"-knappen vere synleg
        cy.getByTestId('fjern-fra-arbeidsliste_knapp').should('be.enabled');
    });

    it('Legg til person i lilla arbeidsliste', () => {
        // Tell kor mange som er i Lilla arbeidsliste i starten av testen
        cy.getByTestId('filter_checkboks-label_minArbeidslisteLilla').then($tall => {
            antallFor = $tall.text();
        });

        // Nullstill valg av filter "min arbeidsliste"
        cy.scrollTo('top');
        cy.getByTestId('filtreringlabel_min-arbeidsliste').click();
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');

        // Vel ein brukar som skal leggast til i arbeidsliste
        cy.scrollTo('top');
        cy.wait(200);
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');

        // Legg dei til i arbeidslista
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.getByTestId('legg-i-arbeidsliste_knapp').click();

        // Gjer ting i modal
        cy.getByTestId('modal_arbeidsliste_tittel').type('arbeidslistetittel');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('arbeidslistekommentar');
        cy.getByTestId('modal_arbeidslistekategori_LILLA').click();
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();

        // Sjå laster-modal
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');

        // Sjekk at det no er ein meir person i lilla arbeidsliste
        cy.getByTestId('filter_checkboks-container_minArbeidsliste').click();
        cy.getByTestId('filter_checkboks-label_minArbeidslisteLilla').then($tall => {
            expect(antallFor).not.to.eq($tall.text());
        });
    });
});
