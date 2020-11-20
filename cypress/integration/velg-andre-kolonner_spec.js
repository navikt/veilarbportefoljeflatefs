import React from 'react';

describe('Velg andre kolonner', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Alertstripe synes', () => {
        cy.getByTestId('alertstripe_filtrering').should('be.visible');
    });
    it('Filtrer på i avtalt aktivitet', () => {
        cy.getByTestId('filter_checkboks-container_iavtaltAktivitet').check({
            force: true
        });
    });
    it('"Veileder" skal vises i kolonnene', () => {
        cy.getByTestId('sorteringheader_veileder').should('be.visible');
    });
    it('"Oppfølging startet" skal ikke vises i kolonnene', () => {
        cy.getByTestId('sorteringheader_oppfolging-startet').should('not.be.visible');
    });
    it('Klikk på Velg kolonner', () => {
        cy.getByTestId('dropdown-knapp_velg-kolonner')
            .contains('Velg kolonner')
            .should('not.be.disabled')
            .click();
    });
    it('Ta bort veileder', () => {
        cy.getByTestId('velg-kolonne-rad_veileder').uncheck({force: true});
    });
    it('Velg "Oppfølging startet"', () => {
        cy.getByTestId('velg-kolonne-rad_oppfolgingstartet')
            .should('not.be.disabled')
            .check({force: true});
    });
    it('"Veileder" skal ikke vises i kolonnene', () => {
        cy.getByTestId('sorteringheader_veileder').should('not.be.visible');
    });
    it('"Oppfølging startet" skal vises i kolonnene', () => {
        cy.getByTestId('sorteringheader_oppfolging-startet').should('be.visible');
    });
});
