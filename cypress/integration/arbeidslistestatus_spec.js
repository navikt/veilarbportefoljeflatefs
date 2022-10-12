import React from 'react';
import 'cypress-wait-until';

before('Start server', () => {
    cy.configure();
});

describe('Filter min arbeidsliste', () => {
    let antallFor = '';

    beforeEach('Gå til Min oversikt', () => {
        cy.gaTilOversikt('min-oversikt');
        cy.getByTestId('filter_checkboks-container_minArbeidsliste').click();

        cy.getByTestId('filter_checkboks-label_minArbeidslisteLilla').then($tall => {
            antallFor = $tall.text();
        });
    });

    it('Legg til person i lilla arbeidsliste', () => {
        cy.getByTestId('filtreringlabel_min-arbeidsliste').click();
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
        cy.getByTestId('filter_checkboks-container_minArbeidsliste').click();

        cy.getByTestId('filter_checkboks-label_minArbeidslisteLilla').then($tall => {
            expect(antallFor).not.to.eq($tall.text());
        });
    });
});
