import React from 'react';
import {kebabCase} from '../../src/utils/utils';

const mineFilterNavn = 'Voff';
const mineFilterNavnRedigert = 'Mjau';
const forLangtFilterNavn =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum Lorem Ipsum.";
const testFilterNavn = 'Denne brukes til test la stå';
let antallFilter = 0;

describe('Lag nytt filter', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Gå til Mine filter-tab', () => {
        cy.klikkTab('MINE_FILTER');
    });
    it('Finn antall filter', () => {
        cy.get('[data-testid=mine-filter_rad-wrapper]').then(ant => {
            antallFilter += Cypress.$(ant).length;
        });
    });
    it('Det skal være riktig antall filter i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter);
    });
    it('Klikk på status-tab', () => {
        cy.klikkTab('STATUS');
    });
    it('Filtrer på ufordelte brukere', () => {
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({
            force: true
        });
    });
    it('Etiketten for ufordelte brukere vises', () => {
        cy.getByTestId('filtreringlabel').contains('Ufordelte brukere');
    });
    it('Gå til Filter i sidebaren', () => {
        cy.getByTestId('sidebar-tab_FILTER').click();
    });
    it('Filtrer på alder: under 19', () => {
        cy.getByTestId('dropdown-knapp_Alder').click();
        cy.getByTestId('filter_19-og-under').check({force: true});
    });
    it('Trykk på velg', () => {
        cy.getByTestId('checkbox-filterform_velg-knapp').click();
    });
    it('Etiketten for ≤ 19 år vises', () => {
        cy.getByTestId('filtreringlabel').contains('≤ 19 år');
    });
    it('Klikk Lagre filter-knapp', () => {
        cy.getByTestId('lagre-filter_knapp').click();
    });
    it('Klikk lagre som nytt filter', () => {
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
    it('Skriv inn filternavn', () => {
        cy.getByTestId('lagre-nytt-filter_modal_navn-input')
            .clear()
            .type(mineFilterNavn);
    });
    it('Klikk lagre', () => {
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
    });
    it('Mine filter-tab er åpen', () => {
        cy.getByTestId('sidebar-tab_MINE_FILTER').should('have.class', 'sidebar__tab-valgt');
    });
    it('Nytt filter er valgt', () => {
        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavn);
        cy.getByTestId(`mine-filter-rad_${kebabCase(mineFilterNavn)}`).should('be.checked');
    });
    it('Etikettene viser to filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 2);
    });
    it('Det skal være riktig antall filter i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter + 1);
    });
});

describe('Rediger filternavn', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-filter_knapp_${kebabCase(mineFilterNavn)}`).click();
    });
    it('Skriv inn nytt navn', () => {
        cy.getByTestId('redigere-filter-navn-input')
            .clear()
            .type(mineFilterNavnRedigert);
    });
    it('Klikk lagre', () => {
        cy.getByTestId('rediger-filter_modal_lagre-knapp').click();
    });
    it('Filternavn skal være oppdatert', () => {
        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavnRedigert);
    });
    it('Etikettene viser to filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 2);
    });
    it('Det skal være riktig antall filter i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter + 1);
    });
});

describe('Rediger filtervalg', () => {
    it('Fjern etikett med ufordelte brukere', () => {
        cy.getByTestId('filtreringlabel')
            .contains('Ufordelte brukere')
            .click();
    });
    it('Klikk på status-tab', () => {
        cy.klikkTab('STATUS');
    });
    it('Legg til filter', () => {
        cy.getByTestId('filter_checkboks-container_avtaltMoteMedNav').check({
            force: true
        });
    });
    it('Fjern etikett med ufordelte brukere', () => {
        cy.getByTestId('filtreringlabel')
            .contains('≤ 19 år')
            .click();
    });
    it('Klikk Lagre filter-knapp', () => {
        cy.getByTestId('lagre-filter_knapp').click();
    });
    it('Teksten i modalen skal inneholde riktig filternavn', () => {
        cy.getByTestId('mine-filter_modal_oppdater-filter-tekst').contains(mineFilterNavnRedigert);
    });
    it('Klikk oppdater eksisterende filter-knapp', () => {
        cy.getByTestId('oppdater-eksisterende-filter_modal_knapp').click();
    });
    it('Klikk lagre', () => {
        cy.getByTestId('rediger-filter_modal_lagre-knapp').click();
    });
    it('Etikettene viser Møte med NAV i dag', () => {
        cy.getByTestId('filtreringlabel')
            .should('have.length', 1)
            .contains('Møte med NAV idag');
    });
    it('Det skal være riktig antall filter i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter + 1);
    });
});

describe('Slett lagret filter', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-filter_knapp_${kebabCase(mineFilterNavnRedigert)}`).click();
    });
    it('Slett filter', () => {
        cy.getByTestId('rediger-filter_modal_slett-knapp').click();
    });
    it('Bekreft sletting', () => {
        cy.wait(2000);
        cy.getByTestId('bekreft-sletting_modal_slett-knapp').click();
    });
    it('Det skal være riktig antall filter i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter);
    });
});

describe('Sjekk at drag and drop funker', () => {
    it('Test-filter er det tredje filteret', () => {
        cy.getByTestId('mine-filter_radio-container')
            .children()
            .first()
            .next()
            .next()
            .contains(testFilterNavn);
    });
    it('Klikk på hengelåsen', () => {
        cy.getByTestId('toggle-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('be.visible');
    });
    it('Dra test-filteret til nederste rad', () => {
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 2)
            .click()
            .type('{shift}{downarrow}');
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 3);
    });
    it('Klikk lagre', () => {
        cy.getByTestId('mine-filter_sortering_lagre-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('not.be.visible');
    });
    it('Test-filter skal ligge nederst', () => {
        cy.getByTestId('mine-filter_radio-container')
            .children()
            .last()
            .contains(testFilterNavn);
    });
    it('Klikk på hengelåsen', () => {
        cy.getByTestId('toggle-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('be.visible');
    });
    it('Dra test-filter opp ett trinn', () => {
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 3)
            .click()
            .type('{shift}{uparrow}');
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 2);
    });
    it('Klikk avbryt', () => {
        cy.getByTestId('mine-filter_sortering_avbryt-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('not.be.visible');
    });
    it('Test-filter skal ligge nederst', () => {
        cy.getByTestId('mine-filter_radio-container')
            .children()
            .last()
            .contains(testFilterNavn);
    });
    it('Klikk på hengelåsen', () => {
        cy.getByTestId('toggle-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('be.visible');
    });
    it('Klikk nullstill', () => {
        cy.getByTestId('mine-filter_sortering_nullstill-knapp').click();
    });
    it('Klikk lagre', () => {
        cy.getByTestId('mine-filter_sortering_lagre-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('not.be.visible');
    });
    it('Filtrene settes alfabetisk, test-filteret er nå det tredje filteret', () => {
        cy.getByTestId('mine-filter_radio-container')
            .children()
            .first()
            .next()
            .next()
            .contains(testFilterNavn);
    });
});

describe('Fjern fjernet filter', () => {
    it('Start server', () => {
        cy.configure();
    });
    it('Gå til Mine filter-tab', () => {
        cy.klikkTab('MINE_FILTER');
    });
    it('Alertstripe synes fordi vi har fjernet filter', () => {
        cy.getByTestId('mine-filter_alertstripe').should('be.visible');
    });
    it('Klikk lukknapp i alertstripen', () => {
        cy.getByTestId('mine-filter_alertstripe_knapp')
            .should('be.visible')
            .click();
    });
    it('Alertstripe synes ikke fordi vi har fjernet filter', () => {
        cy.getByTestId('mine-filter_alertstripe').should('not.be.visible');
    });
});
