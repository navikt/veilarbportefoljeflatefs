import React from 'react';
import {kebabCase} from '../../src/utils/utils';

const gruppenavn = 'Voffvoff';
const gruppenavnRedigert = 'Mjaumjau';
const eksisterendeGruppenavn = 'Gruppen brukes til test la stå';
const andersen = 'Andersen';
const jonas = 'Jonas';
const aasen = 'Aasen';
const minstEnVeileder = 'Du må legge til veiledere.';
let antallVeiledergrupper = 0;

before('Start server', () => {
    cy.configure();
});

describe('Veiledergrupper', () => {
    it('Verifiser antall grupper', () => {
        cy.gaTilOversikt('enhetens-oversikt');
        cy.klikkTab('VEILEDERGRUPPER');
        cy.get('[data-testid=veiledergruppe_rad-wrapper]').then(ant => {
            antallVeiledergrupper += Cypress.$(ant).length;
        });
    });

    it('Det skal være riktig antall veiledergrupper ', () => {
        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper);
    });

    it('Lag ny veiledergruppe', () => {
        cy.getByTestId('veiledergruppe_ny-gruppe_knapp').click();
        cy.getByTestId('veiledergruppe_modal_gruppenavn-input').clear();
        cy.getByTestId('veiledergruppe_modal_sok-veileder-input').type(andersen);
        cy.getByTestId('veiledergruppe_modal_sok-veileder-input').should('have.value', andersen);
        cy.getByTestId('veiledergruppe_modal_gruppenavn-input').should('have.value', '');
        cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({
            force: true
        });
        cy.getByTestId('veiledergruppe_modal_sok-veileder-input')
            .clear()
            .type(jonas);
        cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({
            force: true
        });
        cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
        cy.getByTestId('veiledergruppe_modal_form').contains('Gruppen mangler navn, legg inn gruppenavn.');
        cy.getByTestId('veiledergruppe_modal_gruppenavn-input').type(eksisterendeGruppenavn);
        cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
        cy.getByTestId('veiledergruppe_modal_form').contains('Gruppenavn er allerede i bruk.');
        cy.getByTestId('veiledergruppe_modal_gruppenavn-input')
            .clear()
            .type(gruppenavn);
        cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
        cy.getByTestId('timed-toast').contains('Gruppen er opprettet');
        cy.getByTestId('filtreringlabel').contains(andersen);
        cy.getByTestId('filtreringlabel').contains(jonas);
        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper + 1);
        cy.getByTestId('veiledergruppe_rad-wrapper').contains(gruppenavn);
        cy.getByTestId(`veiledergruppe-rad_${kebabCase(gruppenavn)}`).should('be.checked');
        cy.gaTilOversikt('veileder-oversikt');
        cy.getByTestId('veiledergruppe_rad-wrapper').contains(gruppenavn);
        cy.gaTilOversikt('enhetens-oversikt');
    });

    it('Rediger gruppenavn', () => {
        cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavn)}`, {timeout: 5000}).click();
        cy.getByTestId('veiledergruppe_modal_gruppenavn-input')
            .clear()
            .type(gruppenavnRedigert);
        cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
        cy.getByTestId('timed-toast').contains('Gruppen er lagret');
        cy.getByTestId('veiledergruppe_rad-wrapper').contains(gruppenavnRedigert);
        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper + 1);
    });

    it('Rediger filtervalg', () => {
        cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavnRedigert)}`).click();
        cy.getByTestId('veiledergruppe_modal_valgt-veileder_fjern-knapp')
            .first()
            .click();
        cy.getByTestId('veiledergruppe_modal_valgt-veileder_fjern-knapp')
            .first()
            .click();
        cy.getByTestId('veiledergruppe_modal_antall-valgte-veiledere_0').should('exist');
        cy.getByTestId('veiledergruppe_modal_valgte-veiledere_wrapper').contains('Ingen veiledere lagt til i gruppen');
        cy.getByTestId('veiledergruppe_modal_lagre-knapp')
            .contains('Lagre endringer')
            .click();
        cy.getByTestId('veiledergruppe_modal_form').contains(minstEnVeileder);
        cy.getByTestId('veiledergruppe_modal_sok-veileder-input').type(aasen);
        cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({
            force: true
        });
        cy.getByTestId('veiledergruppe_modal_lagre-knapp')
            .contains('Lagre endringer')
            .click();
        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper + 1);
        cy.getByTestId('timed-toast')
            .should('be.visible')
            .contains('Gruppen er lagret');
        cy.getByTestId('filtreringlabel')
            .should('have.length', 1)
            .contains(aasen);
    });

    it('Slett veiledergruppe', () => {
        cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavnRedigert)}`).click();
        cy.getByTestId('veiledergruppe_modal_slette-knapp').click();
        cy.getByTestId('bekreft-sletting_modal_slett-knapp').click();
        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper);
        cy.getByTestId('timed-toast')
            .should('be.visible')
            .contains('Gruppen er slettet');
    });

    it('Veileder har byttet enhet', () => {
        cy.getByTestId(`veiledergruppe-rad_${kebabCase(eksisterendeGruppenavn)}`).click({force: true});
        cy.get('.veiledergruppe_modal_rediger-veiledergruppe')
            .should('be.visible')
            .contains('Rediger veiledergruppe');
        cy.getByTestId('veiledergruppe_modal_alertstripe')
            .should('be.visible')
            .contains('En eller flere veiledere i gruppen har ikke tilgang lenger, og gruppen er nå lik');
    });
});
