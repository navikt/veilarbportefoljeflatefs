import React from 'react';
import {kebabCase} from '../../src/utils/utils';

const mineFilterNavn = 'Voff';
const mineFilterNavnRedigert = 'Mjau';
const forLangtFilterNavn =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum Lorem Ipsum.";
const testFilterNavn = 'Denne brukes til test la stå';
let antallFilter = 0;

before('Start server', () => {
    cy.configure();
});

describe('Mine filter', () => {
    it('Finn antall filter', () => {
        cy.klikkTab('MINE_FILTER');
        cy.get('[data-testid=mine-filter_rad-wrapper]').then(ant => {
            antallFilter += Cypress.$(ant).length;
        });
    });
    it('Det skal være riktig antall filter i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter);
    });

    it('Lagre nytt filter', () => {
        cy.klikkTab('STATUS');
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({
            force: true
        });
        cy.getByTestId('filtreringlabel').contains('Ufordelte brukere');
        cy.getByTestId('sidebar-tab_FILTER').click();
        cy.apneFilterDropdown('alder');
        cy.getByTestId('filter_19-og-under').check({force: true});
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains('≤ 19 år');
        cy.getByTestId('lagre-filter_knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_knapp').click();
    });
    it('Validering: Tomt filternavn', () => {
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains('Filteret mangler navn.');
    });
    it('Validering: For langt filternavn', () => {
        cy.getByTestId('lagre-nytt-filter_modal_navn-input').type(forLangtFilterNavn);
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains(
            'Filternavn er for langt, kan ikke ha mer enn 255 bokstaver.'
        );
    });
    it('Validering: Eksisterende filternavn', () => {
        cy.getByTestId('lagre-nytt-filter_modal_navn-input')
            .clear()
            .type(testFilterNavn);
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains('Filternavn er allerede i bruk.');
    });
    it('Lagring av riktig filternavn', () => {
        cy.getByTestId('lagre-nytt-filter_modal_navn-input')
            .clear()
            .type(mineFilterNavn);
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('sidebar-tab_MINE_FILTER').should('have.class', 'sidebar__tab-valgt');
        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavn);
        cy.getByTestId(`mine-filter-rad_${kebabCase(mineFilterNavn)}`).should('be.checked');
        cy.getByTestId('filtreringlabel').should('have.length', 2);
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter + 1);
    });

    it('Rediger filternavn', () => {
        cy.getByTestId(`rediger-filter_knapp_${kebabCase(mineFilterNavn)}`).click();
        cy.getByTestId('redigere-filter-navn-input')
            .clear()
            .type(mineFilterNavnRedigert);
        cy.getByTestId('rediger-filter_modal_lagre-knapp').click();
        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavnRedigert);
        cy.getByTestId('filtreringlabel').should('have.length', 2);
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter + 1);
        cy.getByTestId('filtreringlabel')
            .contains('Ufordelte brukere')
            .click();
        cy.klikkTab('STATUS');
        cy.getByTestId('filter_checkboks-container_avtaltMoteMedNav').check({
            force: true
        });
        cy.getByTestId('filtreringlabel')
            .contains('≤ 19 år')
            .click();
        cy.getByTestId('lagre-filter_knapp').click();
        cy.getByTestId('mine-filter_modal_oppdater-filter-tekst').contains(mineFilterNavnRedigert);
    });
    it('Rediger filtervalg', () => {
        cy.getByTestId('oppdater-eksisterende-filter_modal_knapp').click();
        cy.getByTestId('rediger-filter_modal_lagre-knapp').click();
        cy.getByTestId('filtreringlabel')
            .should('have.length', 1)
            .contains('Møte med NAV idag');
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter + 1);
    });

    it('Slett filter', () => {
        cy.getByTestId(`rediger-filter_knapp_${kebabCase(mineFilterNavnRedigert)}`).click();
        cy.getByTestId('rediger-filter_modal_slett-knapp').click();
        cy.getByTestId('bekreft-sletting_modal_slett-knapp').click();
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter);
    });
    it('Verifiser fjernet permittert-filter i Min oversikt', () => {
        cy.gaTilOversikt('min-oversikt');
        cy.klikkTab('MINE_FILTER');
        cy.getByTestId('mine-filter_alertstripe')
            .should('be.visible')
            .contains(
                "'Permitterte filter' er slettet fordi filteret 'Alle utenom permitterte etter 09.03.2020' er fjernet."
            );
        cy.getByTestId('mine-filter_alertstripe_knapp')
            .should('be.visible')
            .click();
        cy.getByTestId('mine-filter_alertstripe').should('not.exist');
    });
});

describe('Drag and drop', () => {
    it('Validering av hengelåsen', () => {
        cy.gaTilOversikt('enhetens-oversikt');
        cy.getByTestId('toggle-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('be.visible');
        cy.getByTestId('mine-filter_sortering_lagre-knapp').should('be.visible');
        cy.getByTestId('mine-filter_sortering_avbryt-knapp').should('be.visible');
        cy.getByTestId('mine-filter_sortering_nullstill-knapp').should('be.visible');
        cy.getByTestId('toggle-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('not.exist');
        cy.getByTestId('mine-filter_sortering_lagre-knapp').should('not.exist');
        cy.getByTestId('mine-filter_sortering_avbryt-knapp').should('not.exist');
        cy.getByTestId('mine-filter_sortering_nullstill-knapp').should('not.exist');
        cy.getByTestId('toggle-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('be.visible');
        cy.getByTestId('mine-filter_sortering_lagre-knapp').should('be.visible');
        cy.getByTestId('mine-filter_sortering_avbryt-knapp').should('be.visible');
        cy.getByTestId('mine-filter_sortering_nullstill-knapp').should('be.visible');
    });
    it('Verifiser lagring', () => {
        cy.getByTestId('drag-drop_container')
            .children()
            .first()
            .next()
            .next()
            .next()
            .contains(testFilterNavn);
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 3)
            .click()
            .type('{shift}{downarrow}');
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 4);
        cy.getByTestId('mine-filter_sortering_lagre-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('not.exist');
        cy.getByTestId('mine-filter_radio-container')
            .children()
            .last()
            .contains(testFilterNavn);
    });
    it('Verifiser avbryt-knapp', () => {
        cy.getByTestId('toggle-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('be.visible');
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 4)
            .click()
            .type('{shift}{uparrow}');
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 3);
        cy.getByTestId('mine-filter_sortering_avbryt-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('not.exist');
        cy.getByTestId('mine-filter_radio-container')
            .children()
            .last()
            .contains(testFilterNavn);
    });
    it('Verifiser nullstill-knapp', () => {
        cy.getByTestId('toggle-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('be.visible');
        cy.getByTestId('mine-filter_sortering_nullstill-knapp').click();
        cy.getByTestId('mine-filter_sortering_lagre-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('not.exist');
        cy.getByTestId('mine-filter_radio-container')
            .children()
            .first()
            .next()
            .next()
            .contains(testFilterNavn);
    });
});
