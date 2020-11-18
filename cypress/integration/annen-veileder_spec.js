describe('Gå inn til annen veileders oversikt via tabellen', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Gå til veilederoversikt', () => {
        cy.gaTilOversikt('veileder-oversikt');
    });
    it('Sorter på antall brukere ', () => {
        cy.getByTestId('sorteringspil_ascending').should('not.be.visible');
        cy.getByTestId('sorteringspil_descending').should('not.be.visible');
        cy.getByTestId('veilederoversikt_sortering_antall-brukere').click();
        cy.getByTestId('sorteringspil_ascending').should('be.visible');
        cy.getByTestId('veilederoversikt_sortering_antall-brukere').click();
        cy.getByTestId('sorteringspil_ascending').should('not.be.visible');
        cy.getByTestId('sorteringspil_descending').should('be.visible');
    });
    it('Velg Herman Thoresen', () => {
        cy.getByTestId('veilederoversikt_navn_lenke')
            .contains('Thoresen, Herman')
            .click();
    });
    it('Det skal vises en infotekst', () => {
        cy.getByTestId('annen-veileder_infotekst')
            .should('be.visible')
            .and('contain', 'Du er inne på Herman Thoresen sin oversikt');
    });
});

describe('Søk veileder i veilederoversikt', () => {
    it('Gå til veilederoversikt', () => {
        cy.gaTilOversikt('veileder-oversikt');
    });
    it('Søk på Glosli ', () => {
        cy.getByTestId('veilederoversikt_sok-veileder-input').click();
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste')
            .children()
            .should('have.length', 40);
        cy.getByTestId('veilederoversikt_sok-veileder-input').type('Gloslido');
        cy.getByTestId('veilederoversikt_alertstripe_info')
            .should('contain', 'Ingen veiledere funnet')
            .and('be.visible');
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
        cy.getByTestId('veilederoversikt_sok-veileder_velg-knapp').should('not.be.visible');
    });
    it('Velg Glosli ', () => {
        cy.getByTestId('veilederoversikt_veilederliste_tbody')
            .children()
            .should('have.length', 20);
        cy.checkbox('veilederoversikt_sok-veileder_veilederliste_element_0');
        cy.getByTestId('veilederoversikt_sok-veileder_lukk-knapp').should('not.be.visible');
        cy.getByTestId('veilederoversikt_sok-veileder_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('veilederoversikt_veilederliste_tbody')
            .children()
            .should('have.length', 1);
        cy.getByTestId('filtreringlabel')
            .contains('Glosli, Kasper')
            .should('be.visible');
    });
});
