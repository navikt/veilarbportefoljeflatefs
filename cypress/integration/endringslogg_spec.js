describe("Stepper i endringslogg", () => {
  it("Start server", () => {
    cy.configure();
  });
  it("Blå prikk skal synes", () => {
    cy.getByTestId("endringslogg_nye-notifikasjoner").should("be.visible");
  });
  it("Åpne endringslogg", () => {
    cy.getByTestId("endringslogg-innhold").should("not.be.visible");
    cy.getByTestId("endringslogg-knapp").click();
    cy.getByTestId("endringslogg-innhold").should("be.visible");
  });
  it("Åpne stepper", () => {
    cy.getByTestId("endringslogg_tour-modal").should("not.be.visible");
    cy.getByTestId("endringslogg_se-hvordan-knapp")
      .contains("Se hvordan")
      .first()
      .click();
    cy.getByTestId("endringslogg_tour-modal").should("be.visible");
  });
  it("Klikk gjennom stegviseren med neste og ferdig", () => {
    cy.getByTestId("endringslogg_forrige-knapp").should("not.be.visible");
    cy.getByTestId("endringslogg_neste-knapp")
      .contains("Neste")
      .click();
    cy.getByTestId("endringslogg_forrige-knapp").should("be.visible");
    cy.getByTestId("endringslogg_stegviser").then($element => {
      if ($element.find(".stegviser__steg").length === 3) {
        return cy
          .getByTestId("endringslogg_neste-knapp")
          .contains("Neste")
          .click();
      }
    });
    cy.getByTestId("endringslogg_ferdig-knapp")
      .contains("Ferdig")
      .click();
    cy.getByTestId("endringslogg_tour-modal").should("not.be.visible");
  });
  it("Lukk endringsloggg", () => {
    cy.getByTestId("endringslogg-innhold").should("be.visible");
    cy.getByTestId("endringslogg-knapp").click();
    cy.getByTestId("endringslogg-innhold").should("not.be.visible");
  });
  it("Blå prikk skal ikke synes", () => {
    cy.getByTestId("endringslogg_nye-notifikasjoner").should("not.be.visible");
  });
});
