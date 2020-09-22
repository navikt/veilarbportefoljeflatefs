import React from "react";

describe('Tildel veileder', () => {
//TODO bør få dette over i commands.js-filen, men den kjører foreløpig ikke med Cypress run
    it('Åpne browser med oversikten', () => {
        cy.server();
        cy.visit('/')
        cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
        Cypress.on('uncaught:exception', (err) => {
            console.log(err);
            return false;
        })
        cy.get('[data-testid=enhetens-oversikt]').contains('Enhetens oversikt')
            .should('exist')
    })
    it('Gå til min oversikt', () => {
        cy.get(`[data-testid=min-oversikt]`).click()
        cy.url().should('include', '/veilarbportefoljeflatefs/portefolje')
    })
    it('Velg bruker', () => {
        cy.get(`[data-testid=brukerliste-checkbox_min-oversikt_7]`).check()
    })
    it('Klikk tildel bruker', () => {
        cy.get(`[data-testid=tildel-veileder-knapp]`).click()
    })
    it('Velg en veileder', () => {
        cy.get(`[data-testid=tildel-veileder_valg_0]`).check({force: true})
    })
    it('Klikk velg', () => {
        cy.get(`[data-testid=tildel-veileder_velg-knapp]`).click()
    })
    it('Lukk modal', () => {
        cy.wait(5000)
        cy.get(`[data-testid=modal-suksess_tildel-veileder]`).click()
    })
})
