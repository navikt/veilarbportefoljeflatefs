import React from "react";

describe('Tildel veileder', () => {
    it('Gå til min oversikt', () => {
        cy.gaTilOversikt('min-oversikt')
    })
    it('Velg bruker', () => {
        cy.getByTestId(`brukerliste-checkbox_min-oversikt_7`).check()
    })
    it('Klikk tildel bruker', () => {
        cy.getByTestId(`tildel-veileder-knapp`).click()
    })
    it('Velg en veileder', () => {
        cy.getByTestId(`tildel-veileder_valg_0`).check({force: true})
    })
    it('Klikk velg', () => {
        cy.getByTestId(`tildel-veileder_velg-knapp`).click()
    })
    it('Lukk modal', () => {
        cy.wait(5000)
        cy.getByTestId(`modal-suksess_tildel-veileder`).click()
    })
})
