import React from "react";

describe('Tildel veileder', () => {
    it('Start server', () => {
        cy.configure();
    })
    it('Gå til min oversikt', () => {
        cy.gaTilOversikt('min-oversikt')
    })
    it('Velg bruker', () => {
        cy.checkbox('min-oversikt_brukerliste-checkbox_7')
    })
    it('Klikk tildel veileder', () => {
        cy.getByTestId(`tildel-veileder_knapp`).click()
    })
    it('Velg en veileder', () => {
        cy.checkbox('tildel-veileder_valg_0');
    })
    it('Klikk velg', () => {
        cy.getByTestId(`tildel-veileder_velg-knapp`).click()
    })
    it('Lukk modal', () => {
        cy.wait(5000)
        cy.getByTestId('modal-suksess_tildel-veileder').click()
    })
})
