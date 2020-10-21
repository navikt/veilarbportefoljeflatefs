import React from "react";

const forsteVeileder = "Aasen, Markus";

describe("Søk veileder med navn", () => {
  it("Start server", () => {
    cy.configure();
  });
  it("Gå til enhetens oversikt", () => {
    cy.gaTilOversikt("enhetens-oversikt");
  });
  it("Gå til Status tab", () => {
    cy.klikkTab("STATUS");
  });
  it("Filtrer på ufordelte brukere", () => {
    cy.checkbox("filter_checkboks-container_ufordeltebruker");
  });
  it("Sjekk at etiketten for ufordelte brukere er der", () => {
    cy.getByTestId("filtreringlabel").contains("Ufordelte brukere");
  });
  it("Klikk søk veileder", () => {
    cy.getByTestId("sok-veileder_knapp").click();
  });
  it("Skriv inn navn", () => {
    cy.getByTestId("sok-filter_input")
      .click()
      .type(forsteVeileder);
  });
  it("Velg en veileder", () => {
    cy.checkbox("sok-veileder_rad_0");
  });
  it("Klikk velg", () => {
    cy.getByTestId("sok-veileder_velg-knapp").click();
  });
  it("Sjekk at ny etikett har riktig navn", () => {
    cy.getByTestId("filtreringlabel").contains(forsteVeileder);
  });
});
