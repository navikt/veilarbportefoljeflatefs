describe("Søk etter brukere med navn og fnr", () => {
    it("Skriv inn navn", () => {
        cy.getByTestId('sok-navn-fnr_input').click().type("andersen");
    });
    it('Se etikett "Søk på navn"', () => {
        cy.getByTestId('filtreringlabel').contains("Søk på navn").should("be.visible")
    });

    //TODO fyll ut med riktig filtrering når vi får fikset mocken

    it("Skriv inn fnr", () => {
        cy.getByTestId('sok-navn-fnr_input').click().type("10108000398")
    });
    it('Se etikett "Søk på navn"', () => {
        cy.getByTestId('filtreringlabel').contains("Søk på navn").should("be.visible")
    });
});
