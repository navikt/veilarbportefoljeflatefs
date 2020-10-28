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

describe('Lag ny veiledergruppe', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Gå til enhetens oversikt', () => {
        cy.gaTilOversikt('enhetens-oversikt');
    });
    it('Gå til Veiledergrupper tab', () => {
        cy.klikkTab('VEILEDERGRUPPER');
    });
    it('Finn antall veiledergrupper', () => {
        cy.get('[data-testid=veiledergruppe_rad-wrapper]').then(ant => {
            antallVeiledergrupper += Cypress.$(ant).length;
        });
    });
    it('Det skal være riktig antall veiledergrupper ', () => {
        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper);
    });
    it('Klikk på ny gruppe', () => {
        cy.getByTestId('veiledergruppe_ny-gruppe_knapp').click();
    });
    it('Søk veileder', () => {
        cy.getByTestId('veiledergruppe_modal_gruppenavn-input').clear();
        cy.getByTestId('veiledergruppe_modal_sok-veileder-input').type(andersen);
        cy.getByTestId('veiledergruppe_modal_sok-veileder-input').should('have.value', andersen);
        cy.getByTestId('veiledergruppe_modal_gruppenavn-input').should('have.value', '');
    });
    it('Velg søkt veileder', () => {
        cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({
            force: true
        });
    });
    it('Søk en veileder til', () => {
        cy.getByTestId('veiledergruppe_modal_sok-veileder-input')
            .clear()
            .type(jonas);
    });
    it('Velg søkt veileder', () => {
        cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({
            force: true
        });
    });
    it('Klikk lagre', () => {
        cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
    });
    it('Validering: Tomt gruppenavn', () => {
        cy.getByTestId('veiledergruppe_modal_form').contains('Gruppen mangler navn, legg inn gruppenavn.');
    });
    it('Validering: Eksisterende gruppenavn', () => {
        cy.getByTestId('veiledergruppe_modal_gruppenavn-input').type(eksisterendeGruppenavn);
        cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
        cy.getByTestId('veiledergruppe_modal_form').contains('Gruppenavn er allerede i bruk.');
    });
    it('Skriv inn gruppenavn', () => {
        cy.getByTestId('veiledergruppe_modal_gruppenavn-input')
            .clear()
            .type(gruppenavn);
        cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
    });
    it('Toasten skal vise "Gruppen er opprettet"', () => {
        cy.getByTestId('timed-toast').contains('Gruppen er opprettet');
    });
    it('Etikettene skal inneholde Andersen og Jonas', () => {
        cy.getByTestId('filtreringlabel').contains(andersen);
        cy.getByTestId('filtreringlabel').contains(jonas);
    });
    it('Det skal være riktig antall veiledergrupper', () => {
        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper + 1);
    });
    it('Ny gruppe skal være valgt', () => {
        cy.getByTestId('veiledergruppe_rad-wrapper').contains(gruppenavn);
        cy.getByTestId(`veiledergruppe-rad_${kebabCase(gruppenavn)}`).should('be.checked');
    });
    it('Verifiser at den nye gruppen finnes i veilederoversikt', () => {
        cy.gaTilOversikt('veileder-oversikt');
        cy.getByTestId('veiledergruppe_rad-wrapper').contains(gruppenavn);
        cy.gaTilOversikt('enhetens-oversikt');
    });
});

describe('Rediger gruppenavn', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavn)}`, {timeout: 5000}).click();
    });
    it('Skriv inn nytt gruppenavn', () => {
        cy.getByTestId('veiledergruppe_modal_gruppenavn-input')
            .clear()
            .type(gruppenavnRedigert);
    });
    it('Klikk lagre', () => {
        cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
    });
    it('Toasten skal vise "Gruppen er lagret"', () => {
        cy.getByTestId('timed-toast').contains('Gruppen er lagret');
    });
    it('Sjekk at filternavn er oppdatert', () => {
        cy.getByTestId('veiledergruppe_rad-wrapper').contains(gruppenavnRedigert);
    });
    it('Det skal være riktig antall veiledergrupper', () => {
        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper + 1);
    });
});

describe('Rediger filtervalg', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavnRedigert)}`).click();
    });
    it('Fjern veiledere', () => {
        cy.getByTestId('veiledergruppe_modal_valgt-veileder_fjern-knapp')
            .first()
            .click();
        cy.getByTestId('veiledergruppe_modal_valgt-veileder_fjern-knapp')
            .first()
            .click();
    });
    it('Antall veiledere skal være 0, og det skal stå "Ingen veiledere lagt til i gruppen"', () => {
        cy.getByTestId('veiledergruppe_modal_antall-valgte-veiledere_0').should('exist');
        cy.getByTestId('veiledergruppe_modal_valgte-veiledere_wrapper').contains('Ingen veiledere lagt til i gruppen');
    });
    it('Klikk lagre endringer', () => {
        cy.getByTestId('veiledergruppe_modal_lagre-knapp')
            .contains('Lagre endringer')
            .click();
    });
    it('Feilmelding sier at du må legge til veiledere', () => {
        cy.getByTestId('veiledergruppe_modal_form').contains(minstEnVeileder);
    });
    it('Velg veileder', () => {
        cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({
            force: true
        });
    });
    it('Klikk lagre endringer', () => {
        cy.getByTestId('veiledergruppe_modal_lagre-knapp')
            .contains('Lagre endringer')
            .click();
    });
    it('Det skal være riktig antall veiledergrupper', () => {
        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper + 1);
    });
    it('Toasten skal vise "Gruppen er lagret"', () => {
        cy.getByTestId('timed-toast')
            .should('be.visible')
            .contains('Gruppen er lagret');
    });
    it('Sjekk at det er ett filtervalg', () => {
        cy.getByTestId('filtreringlabel')
            .should('have.length', 1)
            .contains(aasen);
    });
});

describe('Slett veiledergruppe', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavnRedigert)}`).click();
    });
    it('Klikk på slette-knapp', () => {
        cy.getByTestId('veiledergruppe_modal_slette-knapp').click();
    });
    it('Bekreft sletting', () => {
        cy.getByTestId('bekreft-sletting_modal_slett-knapp').click();
    });
    it('Det skal være riktig antall veiledergrupper', () => {
        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper);
    });
    it('Toasten skal vise "Gruppen er slettet"', () => {
        cy.getByTestId('timed-toast')
            .should('be.visible')
            .contains('Gruppen er slettet');
    });
});

describe('Veileder har byttet enhet', () => {
    it('Marker gruppen som inneholder veiledere som har sluttet', () => {
        cy.getByTestId(`veiledergruppe-rad_${kebabCase(eksisterendeGruppenavn)}`).click({force: true});
    });
    it('Redigermodalen og alertstripe skal synes', () => {
        cy.get('.veiledergruppe_modal_rediger-veiledergruppe')
            .should('be.visible')
            .contains('Rediger veiledergruppe');
        cy.getByTestId('veiledergruppe_modal_alertstripe')
            .should('be.visible')
            .contains('En eller flere veiledere i gruppen har ikke tilgang lenger, og gruppen er nå lik');
    });
});
