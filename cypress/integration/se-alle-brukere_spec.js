describe('Paginering og til toppen-knapp', () => {
    it('Gå til min oversikt', () => {
        cy.gaTilOversikt('min-oversikt')
    })
    it('Klikk på se alle', () => {
        cy.getByTestId('se-alle_knapp').should("be.visible").contains("Se alle");
        cy.getByTestId('se-faerre_knapp').should("not.be.visible");
        cy.getByTestId('se-alle_knapp').contains("Se alle").click();
        cy.getByTestId('se-alle_knapp').should("not.be.visible");
        cy.getByTestId('se-faerre_knapp').should("be.visible").contains("Se færre");
    })
    it('Scroll ned', () => {
        cy.getByTestId('til-toppen_knapp').should("be.hidden");
        cy.scrollTo(0, 2000);
    })
    it('Klikk på til toppen-knapp', () => {
        cy.getByTestId('til-toppen_knapp').should("not.be.hidden").click();
        cy.getByTestId('til-toppen_knapp').should("be.hidden");
    })
    it('Klikk på se færre', () => {
        cy.getByTestId('se-faerre_knapp').should("be.visible").contains("Se færre");
        cy.getByTestId('se-alle_knapp').should("not.be.visible");
        cy.getByTestId('se-faerre_knapp').contains("Se færre").click();
        cy.getByTestId('se-faerre_knapp').should("not.be.visible");
        cy.getByTestId('se-alle_knapp').should("be.visible").contains("Se alle");
    })
    it('Gå til side 2 med piltast', () => {
        cy.getByTestId('paginering-tall_2').should("not.be.visible");
        cy.getByTestId('paginering_venstre').should("be.disabled");
        cy.getByTestId('paginering_hoyre').should("be.enabled").click();
        cy.getByTestId('paginering-tall_2').should("be.visible");
    })
    it('Gå til side 7 ved å klikke på tallet', () => {
        cy.getByTestId('paginering-tall_2').should("be.visible");
        cy.getByTestId('paginering-tall_7').should("be.visible").click();
        cy.getByTestId('paginering-tall_2').should("not.be.visible");
        cy.getByTestId('paginering_hoyre').should("be.disabled");
    })
    it('Gå til side 1 ved å klikke på tallet', () => {
        cy.getByTestId('paginering-tall_1').should("be.visible").click();
        cy.getByTestId('paginering_venstre').should("be.disabled");
        cy.getByTestId('paginering_hoyre').should("be.enabled");
    })
})

