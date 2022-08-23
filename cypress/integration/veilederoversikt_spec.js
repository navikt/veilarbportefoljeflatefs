before('Start server', () => {
    cy.configure();
});

describe('Annen veileder', () => {
    it('Gå inn til annen veileders oversikt via tabellen', () => {
        cy.gaTilOversikt('veileder-oversikt');
        cy.getByTestId('sorteringspil_synkende').should('not.exist');
        cy.getByTestId('veilederoversikt_sortering_antall-brukere').click();
        cy.getByTestId('sorteringspil_stigende').should('be.visible');
        cy.getByTestId('veilederoversikt_sortering_antall-brukere').click();
        cy.getByTestId('sorteringspil_stigende').should('not.exist');
        cy.getByTestId('sorteringspil_synkende').should('be.visible');
        cy.getByTestId('se-flere_knapp').should('be.disabled');

        cy.getByTestId('veilederoversikt_navn_lenke')
            .contains('Testesen, Testias')
            .click();
        cy.getByTestId('annen-veileder_infotekst')
            .should('be.visible')
            .should('contain', 'Du er inne på Testias Testesen sin oversikt');
    });
    it('Søk veileder i veilederoversikt', () => {
        cy.gaTilOversikt('veileder-oversikt');
        cy.getByTestId('veilederoversikt_sok-veileder-input').click();
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste')
            .get(".navds-checkboxes")
            .children()
            .should('have.length', 41);
        cy.getByTestId('veilederoversikt_sok-veileder-input').type('Gloslido');
        cy.getByTestId('veilederoversikt_alertstripe_info')
            .should('contain', 'Ingen veiledere funnet')
            .should('be.visible');
        cy.getByTestId('veilederoversikt_sok-veileder-input')
            .click()
            .clear()
            .type('Glosli');
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste')
            .get(".navds-checkboxes")
            .children()
            .should('have.length', 1);
        cy.getByTestId('veileder-checkbox-filterform_nullstill-knapp').should('be.disabled');
        cy.getByTestId('veilederoversikt_veilederliste_tbody')
            .children()
            .should('have.length', 41);

        cy.checkbox('veilederoversikt_sok-veileder_veilederliste_element_0');
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste_element_0').should('be.checked');
        cy.getByTestId('veilederoversikt_veilederliste_tbody')
            .children()
            .should('have.length', 1);

        cy.getByTestId('veileder-checkbox-filterform_nullstill-knapp')
            .should('be.enabled')
            .click();

        cy.getByTestId('veilederoversikt_veilederliste_tbody')
            .children()
            .should('have.length', 41);

        //TODO fjern denne når søk veileder er ferdig i pilotering
        // cy.gaTilOversikt('veileder-oversikt');
        // cy.getByTestId('veilederoversikt_sok-veileder-input').click();
        // cy.getByTestId('veilederoversikt_sok-veileder_veilederliste')
        //     .children()
        //     .should('have.length', 40);
        // cy.getByTestId('veilederoversikt_sok-veileder-input').type('Gloslido');
        // cy.getByTestId('veilederoversikt_alertstripe_info')
        //     .should('contain', 'Ingen veiledere funnet')
        //     .should('be.visible');
        // cy.getByTestId('veilederoversikt_sok-veileder-input')
        //     .click()
        //     .clear()
        //     .type('Glosli');
        // cy.getByTestId('veilederoversikt_sok-veileder_veilederliste')
        //     .children()
        //     .should('have.length', 1);
        // cy.getByTestId('veileder-checkbox-filterform_nullstill-knapp').should('be.disabled');
        // cy.getByTestId('veilederoversikt_veilederliste_tbody')
        //     .children()
        //     .should('have.length', 20);
        // cy.getByTestId('veilederoversikt_sok-veileder_veilederliste_element_0')
        //     .should('not.be.checked')
        //     .check({force: true});
        // cy.getByTestId('veilederoversikt_sok-veileder_veilederliste_element_0').should('be.checked');
        // cy.getByTestId('veileder-checkbox-filterform_nullstill-knapp').should('be.enabled');
        // cy.getByTestId('veilederoversikt_veilederliste_tbody')
        //     .children()
        //     .should('have.length', 1);
        // cy.getByTestId('filtrering_label-container')
        //     .children()
        //     .contains('Glosli, Kasper')
        //     .click();
        // cy.getByTestId('veilederoversikt_sok-veileder-input')
        //     .click()
        //     .clear();
    });
});
