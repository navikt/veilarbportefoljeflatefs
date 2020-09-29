import React from "react";

describe('Søk veileder', () => {
    it('Start system', () => {
        cy.start();
    })
    it('Filtrer på ufordelte brukere', () => {
        cy.getByTestId('filter-checkboks-container_ufordeltebruker').check({force: true})
    })
    it('Sjekk at etiketten for ufordelte brukere er der', () => {
        cy.getByTestId('filtreringlabel').contains("Ufordelte brukere")
    })
    it('Klikk søk veileder', () => {
        cy.getByTestId('sok-veileder-knapp').click()
    })
    it('Velg en veileder', () => {
        cy.getByTestId('sok-veileder_valg_0').check({force: true})
    })
    it('Klikk velg', () => {
        cy.getByTestId('sok-veileder_velg-knapp').click()
    })
    it('Sjekk at ny etikett har riktig navn', () => {
        cy.getByTestId('filtreringlabel').contains("Aasen, Markus")
    })
})
