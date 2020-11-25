import React from 'react';
import {kebabCase} from '../../src/utils/utils';

const mineFilterNavn = 'Voff';
const mineFilterNavnRedigert = 'Mjau';
const forLangtFilterNavn =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum Lorem Ipsum.";
const testFilterNavn = 'Denne brukes til test la stå';
let antallFilter = 0;

const fraAlder = '2';
const tilAlder = '34';
const hoyAlder = '109';

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

    it('Validering', () => {
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains('Filteret mangler navn.');
        cy.getByTestId('lagre-nytt-filter_modal_navn-input').type(forLangtFilterNavn);
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains(
            'Filternavn er for langt, kan ikke ha mer enn 255 bokstaver.'
        );
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

    it('Rediger filter', () => {
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

    it('Drag and drop - Validering av hengelåsen', () => {
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

    it('Drag and drop - Verifiser lagring', () => {
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

    it('Drag and drop - Verifiser avbryt-knapp', () => {
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

    it('Drag and drop - Verifiser nullstill-knapp', () => {
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

describe('Filter', () => {
    it('Aldersinput med validering', () => {
        cy.klikkTab('FILTER');
        cy.apneFilterDropdown('alder');
        cy.getByTestId('checkbox-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('not.exist');
        cy.getByTestId('filter_alder-fra')
            .click()
            .type(tilAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .type(fraAlder);
        cy.getByTestId('checkbox-filterform_lukk-knapp').should('not.exist');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Fra-alder kan ikke være større enn til-alder.');
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(fraAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .type(tilAlder);
        cy.getByTestId('filter_alder_valideringstekst').should('not.exist');
        cy.getByTestId('filter_alder_valideringstekst').should('not.exist');

        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-' + tilAlder + ' år');
        cy.apneFilterDropdown('alder');
        cy.getByTestId('filter_alder-fra').should('have.value', fraAlder);
        cy.getByTestId('filter_alder-til').should('have.value', tilAlder);
        cy.checkbox('filter_40-49');
        cy.getByTestId('filter_alder-fra').should('have.value', '');
        cy.getByTestId('filter_alder-til').should('have.value', '');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains('40-49 år');
        cy.apneFilterDropdown('alder');
        cy.getByTestId('filter_40-49').should('be.checked');
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(fraAlder);
        cy.getByTestId('filter_alder_valideringstekst').should('not.exist');
        cy.getByTestId('filter_40-49').should('not.be.checked');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-100 år');
        cy.apneFilterDropdown('alder');
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(hoyAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .should('have.value', '');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Du må skrive et tall lavere enn 100 i fra-feltet hvis til-feltet står tomt.');
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear();
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .type(tilAlder);
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel')
            .contains('0-' + tilAlder + ' år')
            .click();
    });

    it('Utdanningsfilter', () => {
        cy.apneFilterDropdown('er-utdanningen-godkjent-og-bestatt');
        cy.getByTestId('filter_utdanningBestatt_JA').check({force: true});
        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible');
        cy.getByTestId('filter_utdanningBestatt_JA').uncheck({force: true});
        cy.getByTestId('filter_utdanningBestatt_JA').check({force: true});
        cy.getByTestId('filter_utdanningBestatt_NEI').check({force: true});
        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains('Utdanning bestått: Nei');
        cy.getByTestId('filtreringlabel').contains('Utdanning bestått: Ja');
        cy.apneFilterDropdown('er-utdanningen-godkjent-og-bestatt');
        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible');
        cy.getByTestId('filter_utdanningGodkjent_NEI').check({force: true});
        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains('Utdanning godkjent: Nei');
        cy.getByTestId('filtreringlabel')
            .contains('Slett alle filtervalg')
            .click();
    });

    it('Slett alle filtre', () => {
        cy.getByTestId('dropdown-knapp_tiltakstype').should('be.disabled');
        cy.apneFilterDropdown('aktivitet');
        cy.getByTestId('aktivitet-filterform-STILLING-ja').check({force: true});
        cy.getByTestId('aktivitet-filterform-TILTAK-ja').check({force: true});
        cy.getByTestId('aktivitet-filterform_velg-knapp').click();
        cy.getByTestId('filtreringlabel').contains('Stilling bruker skal søke: JA');
        cy.getByTestId('filtreringlabel').contains('Tiltak gjennom NAV: JA');
        cy.getByTestId('filtreringlabel').should('have.length', 2);
        cy.getByTestId('dropdown-knapp_tiltakstype')
            .should('be.enabled')
            .click();
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.getByTestId('checkbox-filterform_lukk-knapp').should('be.visible');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('not.exist');
        cy.getByTestId('filter_PRAKSKJERM').check({force: true});
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.getByTestId('checkbox-filterform_lukk-knapp').should('not.exist');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('be.visible');
        cy.getByTestId('filter_AVKLARAG').check({force: true});
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .should('be.enabled')
            .click();

        cy.getByTestId('filtreringlabel').should('have.length', 5);
        cy.getByTestId('filtreringlabel')
            .contains('Slett alle filtervalg')
            .click();
        cy.getByTestId('filtreringlabel').should('have.length', 0);
        cy.getByTestId('alertstripe_filtrering')
            .should('be.visible')
            .contains('Du må gjøre en filtrering for å se brukere i listen.');
    });

    it('Nullstill-knapp i checkbox-filterform, radio-filterform, double-checkbox-filterform, fødselsdato-filterform og aktivitet-filterform', () => {
        cy.getByTestId('dropdown-knapp_tiltakstype').should('be.disabled');
        cy.apneFilterDropdown('aktivitet');
        cy.getByTestId('aktivitet-filterform-STILLING-ja').check({force: true});
        cy.getByTestId('aktivitet-filterform-TILTAK-ja').check({force: true});
        cy.getByTestId('aktivitet-filterform_velg-knapp').click();
        cy.getByTestId('filtreringlabel').contains('Stilling bruker skal søke: JA');
        cy.getByTestId('filtreringlabel').contains('Tiltak gjennom NAV: JA');
        cy.getByTestId('filtreringlabel').should('have.length', 2);
        cy.apneFilterDropdown('aktivitet');
        cy.getByTestId('aktivitet-filterform_nullstill-knapp').click();
        cy.getByTestId('filtreringlabel').should('have.length', 0);
        cy.getByTestId('filtrering-filter_container').scrollTo('top');
        cy.apneFilterDropdown('fodselsdato');
        cy.getByTestId('fodselsdato-filterform_dato-04').click();
        cy.getByTestId('fodselsdato-filterform_dato-23').click();
        cy.getByTestId('fodselsdato-filterform_dato-27').click();
        cy.getByTestId('checkbox-filterform_velg-knapp').click();
        cy.getByTestId('filtreringlabel').should('have.length', 4);
        cy.getByTestId('filtreringlabel')
            .should('contain', 'Fødselsdato: 23')
            .and('contain', 'Fødselsdato: 27')
            .and('contain', 'Fødselsdato: 4');
        cy.apneFilterDropdown('fodselsdato');
        cy.getByTestId('fodselsdato-filterform_dato-04_input').should('be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-23_input').should('be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-27_input').should('be.checked');
        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').click();
        cy.getByTestId('fodselsdato-filterform_dato-04_input').should('not.be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-23_input').should('not.be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-27_input').should('not.be.checked');
        cy.getByTestId('filtreringlabel').should('have.length', 0);
        cy.getByTestId('checkbox-filterform_lukk-knapp')
            .should('be.visible')
            .click();
        cy.apneFilterDropdown('kjonn');
        cy.getByTestId('radio-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.checkbox('radio-valg_kvinne');
        cy.getByTestId('radio-filterform_lukk-knapp').should('not.exist');
        cy.getByTestId('radio-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').should('have.length', 1);
        cy.getByTestId('filtreringlabel').should('contain', 'Kvinne');
        cy.apneFilterDropdown('kjonn');
        cy.getByTestId('radio-filterform_nullstill-knapp').click();
        cy.getByTestId('filtreringlabel').should('have.length', 0);
        cy.getByTestId('radio-filterform_velg-knapp').should('not.exist');
        cy.getByTestId('radio-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible')
            .click();
        cy.apneFilterDropdown('innsatsgruppe');
        cy.getByTestId('checkbox-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.checkbox('filter_IKVAL');
        cy.checkbox('filter_BATT');
        cy.getByTestId('checkbox-filterform_lukk-knapp').should('not.exist');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').should('have.length', 2);
        cy.apneFilterDropdown('innsatsgruppe');
        cy.getByTestId('checkbox-filterform_nullstill-knapp').click();
        cy.getByTestId('checkbox-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').should('have.length', 0);
    });
});
