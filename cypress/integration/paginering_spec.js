describe('Paginering og til toppen-knapp', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Gå til min oversikt', () => {
        cy.gaTilOversikt('min-oversikt');
        cy.getByTestId('paginering_venstre').should('be.disabled');
        cy.getByTestId('paginering_hoyre').should('be.enabled');
    });
    it('7-tallet i paginering skal være synlig, og det skal være 20 brukere i brukerlisten', () => {
        cy.getByTestId('paginering-tall_7').should('be.visible');
        cy.get('.brukerliste')
            .children()
            .should('have.length', 20);
    });
    it('Klikk på se alle', () => {
        cy.getByTestId('se-alle_knapp')
            .should('be.visible')
            .click();
        cy.wait(1000);
    });
    it('Scroll ned', () => {
        cy.getByTestId('til-toppen_knapp').should('be.hidden');
        cy.scrollTo(0, 2000);
    });
    it('Klikk på til toppen-knapp', () => {
        cy.getByTestId('til-toppen_knapp')
            .should('not.be.hidden')
            .click();
        cy.getByTestId('til-toppen_knapp').should('be.hidden');
    });
    it('7-tallet i paginering skal ikke være synlig, og det skal være 123 brukere i brukerlisten', () => {
        cy.getByTestId('paginering-tall_7').should('not.be.visible');
        cy.get('.brukerliste')
            .children()
            .should('have.length', 123);
    });
    it('Gå til side 2 med piltast', () => {
        cy.getByTestId('paginering_venstre').should('be.disabled');
        cy.getByTestId('paginering_hoyre').should('be.disabled');
        cy.getByTestId('se-faerre_knapp')
            .should('be.visible')
            .click();
        cy.getByTestId('paginering-tall_2').should('not.be.visible');
        cy.getByTestId('paginering_venstre').should('be.disabled');
        cy.getByTestId('paginering_hoyre')
            .should('be.enabled')
            .click();
        cy.getByTestId('paginering-tall_2').should('be.visible');
    });
    it('Gå til side 1 ved å klikke på tallet', () => {
        cy.getByTestId('paginering-tall_1')
            .should('be.visible')
            .click();
        cy.getByTestId('paginering_venstre').should('be.disabled');
        cy.getByTestId('paginering_hoyre').should('be.enabled');
    });
});
