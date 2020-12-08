before('Start server', () => {
    cy.configure();
});

describe('Annen veileder', () => {
    it('Gå inn til annen veileders oversikt via tabellen', () => {
        cy.gaTilOversikt('veileder-oversikt');
        cy.getByTestId('sorteringspil_ascending').should('not.exist');
        cy.getByTestId('sorteringspil_descending').should('not.exist');
        cy.getByTestId('veilederoversikt_sortering_antall-brukere').click();
        cy.getByTestId('sorteringspil_ascending').should('be.visible');
        cy.getByTestId('veilederoversikt_sortering_antall-brukere').click();
        cy.getByTestId('sorteringspil_ascending').should('not.exist');
        cy.getByTestId('sorteringspil_descending').should('be.visible');
        cy.getByTestId('se-alle_knapp').click();

        cy.getByTestId('veilederoversikt_navn_lenke')
            .contains('Thoresen, Herman')
            .click();
        cy.getByTestId('annen-veileder_infotekst')
            .should('be.visible')
            .should('contain', 'Du er inne på Herman Thoresen sin oversikt');
    });
    it('Søk veileder i veilederoversikt', () => {
        cy.gaTilOversikt('veileder-oversikt');
        cy.getByTestId('veilederoversikt_sok-veileder-input').click();
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste')
            .children()
            .should('have.length', 40);
        cy.getByTestId('veilederoversikt_sok-veileder-input').type('Gloslido');
        cy.getByTestId('veilederoversikt_alertstripe_info')
            .should('contain', 'Ingen veiledere funnet')
            .should('be.visible');
        cy.getByTestId('veilederoversikt_sok-veileder-input')
            .click()
            .clear()
            .type('Glosli');
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste')
            .children()
            .should('have.length', 1);
        cy.getByTestId('veilederoversikt_sok-veileder_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.getByTestId('veilederoversikt_sok-veileder_velg-knapp').should('not.exist');
        cy.getByTestId('veilederoversikt_veilederliste_tbody')
            .children()
            .should('have.length', 20);
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste_element_0')
            .should('not.be.checked')
            .check({force: true});
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste_element_0').should('be.checked');
        cy.getByTestId('veilederoversikt_sok-veileder_lukk-knapp').should('not.exist');
        cy.getByTestId('veilederoversikt_sok-veileder_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('veilederoversikt_veilederliste_tbody')
            .children()
            .should('have.length', 1);
        cy.getByTestId('filtreringlabel')
            .contains('Glosli, Kasper')
            .should('be.visible')
            .click();
        cy.getByTestId('veilederoversikt_sok-veileder-input')
            .click()
            .clear();
    });
});
