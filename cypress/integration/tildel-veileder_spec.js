import React from 'react';

describe('Tildel veileder', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Gå til min oversikt', () => {
        cy.gaTilOversikt('min-oversikt');
    });
    it('Velg bruker', () => {
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
    });
    it('Klikk tildel veileder', () => {
        cy.getByTestId('tildel-veileder_dropdown').should('not.be.visible');
        cy.getByTestId('tildel-veileder_knapp').click();
        cy.getByTestId('tildel-veileder_dropdown').should('be.visible');
    });
    it('Velg en veileder', () => {
        cy.checkbox('tildel-veileder_valg_0');
    });
    it('Klikk velg', () => {
        cy.getByTestId('modal-suksess_tildel-veileder').should('not.be.visible');
        cy.getByTestId(`tildel-veileder_velg-knapp`)
            .contains('Velg')
            .should('be.visible')
            .click();
    });
    it('Lukk modal', () => {
        cy.wait(5000);
        cy.getByTestId('modal-suksess_tildel-veileder')
            .should('be.visible')
            .click();
        cy.getByTestId('modal-suksess_tildel-veileder').should('not.be.visible');
    });
});
