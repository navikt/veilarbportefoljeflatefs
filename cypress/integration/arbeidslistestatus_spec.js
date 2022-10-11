import React from 'react';
import 'cypress-wait-until';

before('Start server', () => {
    cy.configure();
});

describe('Filter min arbeidsliste', () => {
    let fornavn = '';
    let antallMedArbeidsliste = 0;
    let antallMedArbeidslisteEtterOppretting = 0;
    let tittel;
    let kommentar;
    let antallFor = '';
    let antallEtter = '';
    const redigertTittel = 'Redigering av tittel';
    const redigertKommentar = 'Redigering av kommentar';
    let antallForSletting = 0;
    let antallEtterSletting = 0;
    const nyTittel = 'Skal ikke lagres';
    const nyKommentar = 'Kommentar skal heller ikke lagres';

    beforeEach('Gå til Min oversikt', () => {
        cy.gaTilOversikt('min-oversikt');
        cy.getByTestId('filter_checkboks-container_minArbeidsliste').click();

        cy.getByTestId('filter_checkboks-label_minArbeidslisteLilla').then($tall => {
            antallFor = $tall.text();
        });
    });

    it('Åpne Min arbeidsliste', () => {
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.disabled');
        cy.getByTestId('min-oversikt_brukerliste-checkbox').first().check();

        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');
        cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.enabled');
        cy.getByTestId('legg-i-arbeidsliste_knapp').click();
        cy.getByTestId('modal_arbeidsliste_tittel').type('arbeidslistetittel');
        cy.getByTestId('modal_arbeidsliste_kommentar').type('arbeidslistekommentar');
        cy.getByTestId('modal_arbeidslistekategori_LILLA').click();
        cy.getByTestId('modal_arbeidsliste_lagre-knapp').click();

        cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
        cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');

        cy.getByTestId('filter_checkboks-label_minArbeidslisteLilla').then($tall => {
            expect(antallFor).not.to.eq($tall.text());
        });
    });
});
/*
        cy.getByTestId('antall-tiltak').then($navn => {
  expect(antallTiltak).not.to.eq($navn.text());
});

                                       cy.get('[data-cy=brukerliste_element_arbeidsliste]').then(ant => {
                                           antallFor += Cypress.$(ant).length;
                                       });

                                cy.getByTestId('legg-i-arbeidsliste_knapp').should('be.disabled');
                                cy.getByTestId('min-oversikt_brukerliste-checkbox_arbeidsliste')
                                 .first().click({force: true});

                                      cy.checkboxFirst('min-oversikt_brukerliste-checkbox_arbeidsliste');

                                              cy.getByTestId('fjern-fra-arbeidsliste_knapp').should('be.enabled').click();
                                              cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('be.visible').click();
                                              cy.get('.veilarbportefoljeflatefs-laster-modal').should('be.visible');
                                              cy.get('.veilarbportefoljeflatefs-laster-modal').should('not.exist');
                                              cy.getByTestId('modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp').should('not.exist');
                                              cy.get('[data-cy=brukerliste_element_arbeidsliste]')
                                                 .should('be.visible')
                                                 .then(ant => {
                                                     antallEtter += Cypress.$(ant).length;
                                                 })
                                                 .then(() => {
                                                     expect(antallEtter).to.be.equals(antallFor - 1);
                                                 });


});
 */
