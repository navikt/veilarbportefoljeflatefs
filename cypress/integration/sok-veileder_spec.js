import React from "react";

const forsteVeileder = "Aasen, Markus";

describe('Søk veileder med navn', () => {
    it('Filtrer på ufordelte brukere', () => {
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({force: true});
    })
    it('Sjekk at etiketten for ufordelte brukere er der', () => {
        cy.getByTestId('filtreringlabel').contains("Ufordelte brukere");
    })
    it('Klikk søk veileder', () => {
        cy.getByTestId('sok-veileder_knapp').click();
    })
    it('Skriv inn navn', () => {
        cy.getByTestId('sok-filter_input').click().type(forsteVeileder);
    })
    it('Velg en veileder', () => {
        cy.getByTestId('sok-veileder_rad_0').check({force: true});
    })
    it('Klikk velg', () => {
        cy.getByTestId('sok-veileder_velg-knapp').click();
    })
    it('Sjekk at ny etikett har riktig navn', () => {
        cy.getByTestId('filtreringlabel').contains(forsteVeileder);
    })
})

describe('Søk veileder med nav-ident', () => {
    it('Klikk søk veileder', () => {
        cy.getByTestId('sok-veileder_knapp').click();
    })
    it('Skriv inn nav-ident', () => {
        cy.getByTestId('sok-filter_input').click().type('Z6');
    })
    it('Velg øverste veileder', () => {
        cy.getByTestId('sok-veileder_rad_0').check({force: true});
    })
    it('Klikk velg', () => {
        cy.getByTestId('sok-veileder_velg-knapp').click();
    })
    it('Sjekk at ny etikett ikke er det samme som forrige vi søkte opp', () => {
        cy.getByTestId('filtreringlabel').should("not.contain", forsteVeileder);
    })
})
