import React from "react";

describe('Lag nytt filter', () => {
//TODO bør få dette over i commands.js-filen, men den kjører foreløpig ikke med Cypress run
    it('Åpne browser med oversikten', () => {
        cy.server();
        cy.visit('/')
        cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
        Cypress.on('uncaught:exception', (err) => {
            console.log(err);
            return false;
        })
        cy.get('[data-testid=enhetens-oversikt]').should('contain', 'Enhetens oversikt').should('exist')
    })
    it('Filtrer på ufordelte brukere', () => {
        cy.get('[data-testid=filter-checkboks-container_ufordeltebruker]').check({force: true})
    })
    it('Sjekk at etiketten for ufordelte brukere er der', () => {
        cy.get('[data-testid=filtreringlabel]').contains("Ufordelte brukere")
    })
    it('Gå til Filter i sidebaren', () => {
        cy.get('[data-testid=sidebar-tab_FILTER]').click()
    })
    it('Filtrer på alder: under 19', () => {
        cy.get('[data-testid=Alder-dropdown-knapp]').click()
        cy.get('[data-testid=filter_19-og-under]').check({force: true})
    })
    it('Trykk på velg', () => {
        cy.get('[data-testid=checkbox-filterform__velg-knapp]').click()
    })
    it('Sjekk at etiketten for <= 19 år er der', () => {
        cy.get('[data-testid=filtreringlabel]').contains("≤ 19 år")
    })
    it('Klikk Lagre', () => {
        cy.get('[data-testid=lagre-filter-knapp]').click()
    })
    it('Klikk lagre som nytt filter', () => {
        cy.get('[data-testid=lagre-nytt-filter-knapp]').click()
    })
    it('Skriv inn filternavn', () => {
        cy.get('[data-testid=lagre-nytt-filter-navn-input]').type("Team VOFF er best!")
    })
    it('Klikk lagre', () => {
        cy.get('[data-testid=lagre-nytt-filter-modal-lagre-knapp]').click()
    })
})
