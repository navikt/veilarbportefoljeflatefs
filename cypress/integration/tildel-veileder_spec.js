import React from "react";

const dataTestid = (id) => {
    return `[data-testid=${id}]`
};

before('Åpne oversikten', () => {
    cy.server();
    cy.visit('http://localhost:3000')
    cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
    Cypress.on('uncaught:exception', (err) => {
        console.log(err);
        return false;
    })
})

describe('Tildel veileder', () => {
    it('Gå til min oversikt', () => {
        cy.get(dataTestid("min-oversikt")).click()
        cy.url().should('include', '/veilarbportefoljeflatefs/portefolje')
    })
    it('Velg bruker', () => {
        cy.get(dataTestid("brukerliste-checkbox_min-oversikt_7")).check()
    })
    it('Klikk tildel bruker', () => {
        cy.get(dataTestid("tildel-veileder-knapp")).click()
    })
    it('Velg en veileder', () => {
        cy.get(dataTestid("tildel-veileder_valg_0")).check({force: true})
    })
    it('Klikk velg', () => {
        cy.get(dataTestid("tildel-veileder_velg-knapp")).click()
    })
    it('Lukk modal', () => {
        cy.wait(5000)
        cy.get(dataTestid("modal-suksess_tildel-veileder")).click()
    })
})
