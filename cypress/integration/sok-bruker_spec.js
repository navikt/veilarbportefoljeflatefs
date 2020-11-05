describe('Søk etter brukere med navn og fnr', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Skriv inn navn', () => {
        cy.getByTestId('sok-navn-fnr_input')
            .click()
            .type('andersen');
    });
    it('Se etikett "Søk på navn"', () => {
        cy.getByTestId('filtreringlabel')
            .contains('Søk på navn')
            .should('be.visible');
    });

    it('Skriv inn fnr', () => {
        cy.getByTestId('sok-navn-fnr_input')
            .click()
            .clear()
            .type('10108000398');
    });
    it('Se etikett "Søk på navn"', () => {
        cy.getByTestId('filtreringlabel')
            .contains('Søk på navn')
            .should('be.visible');
    });
});
