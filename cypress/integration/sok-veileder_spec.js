import React from "react";

describe('Søk veileder', () => {
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
    it('Klikk søk veileder', () => {
        cy.get('[data-testid=sok-veileder-knapp]').click()
    })
    it('Velg en veileder', () => {
        cy.get('[data-testid=sok-veileder_valg_0]').check({force: true})
    })
    it('Klikk velg', () => {
        cy.get('[data-testid=sok-veileder_velg-knapp]').click()
    })
    it('Sjekk at ny etikett har riktig navn', () => {
        cy.get('[data-testid=filtreringlabel]').contains("Aasen, Markus")
    })
})
