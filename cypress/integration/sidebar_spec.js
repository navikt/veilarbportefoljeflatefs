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

describe('Mine filter', () => {
    it('Finn antall filter', () => {
        cy.gaTilOversikt('enhetens-oversikt');
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
        cy.apneLukkeFilterDropdown('alder');
        cy.getByTestId('filter_19-og-under').check({force: true});
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
        cy.getByTestId('mine-filter_radio-container')
            .children()
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
        cy.getByTestId('filtreringlabel')
            .contains('Møte med NAV idag')
            .click();
    });
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
        cy.getByTestId('timed-toast_gruppen-er-opprettet').contains('Gruppen er opprettet');
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
        cy.getByTestId('timed-toast_gruppen-er-lagret').contains('Gruppen er lagret');
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
        cy.getByTestId('timed-toast_gruppen-er-lagret')
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
        cy.getByTestId('timed-toast_gruppen-er-slettet')
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
        cy.getByTestId('veiledergruppe_modal_avbryt-knapp').click();
        cy.get('.veiledergruppe_modal_rediger-veiledergruppe').should('not.exist');

        cy.getByTestId('filtreringlabel')
            .contains('Slett alle filtervalg')
            .click();
    });
});

describe('Filter', () => {
    beforeEach('Gå til filter-tab', () => {
        cy.klikkTab('FILTER');
    });

    afterEach('Gå til status-tab', () => {
        cy.klikkTab('STATUS');
    });
    it('Alder-filterform', () => {
        cy.apneLukkeFilterDropdown('alder');
        cy.getByTestId('alder-filterform').should('exist');
        cy.getByTestId('alder-filterform_nullstill-knapp').should('be.disabled');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('be.disabled');
        cy.getByTestId('filter_alder-fra')
            .click()
            .type(tilAlder);
        cy.getByTestId('alder-filterform_nullstill-knapp').should('be.enabled');
        cy.getByTestId('filter_alder-til')
            .click()
            .type(fraAlder);
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.enabled')
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
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.enabled')
            .click();
        cy.getByTestId('alder-filterform').should('not.exist');
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-' + tilAlder + ' år');

        cy.apneLukkeFilterDropdown('alder');
        cy.getByTestId('alder-filterform').should('exist');
        cy.getByTestId('filter_alder-fra').should('have.value', fraAlder);
        cy.getByTestId('filter_alder-til').should('have.value', tilAlder);

        cy.checkbox('filter_40-49');
        cy.getByTestId('filter_alder-fra').should('have.value', '');
        cy.getByTestId('filter_alder-til').should('have.value', '');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('be.disabled');

        cy.getByTestId('filtreringlabel').contains('40-49 år');
        cy.getByTestId('filter_40-49').should('be.checked');
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(fraAlder);

        cy.getByTestId('filter_alder_valideringstekst').should('not.exist');
        cy.getByTestId('filter_40-49').should('not.be.checked');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .should('be.enabled')
            .click();
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-100 år');
        cy.getByTestId('alder-filterform').should('not.exist');

        cy.apneLukkeFilterDropdown('alder');
        cy.getByTestId('alder-filterform').should('exist');
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(hoyAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .should('have.value', '');
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .should('be.enabled')
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
            .should('be.enabled')
            .click();
        cy.getByTestId('alder-filterform').should('not.exist');

        cy.apneLukkeFilterDropdown('alder');

        cy.getByTestId('alder-filterform').should('exist');

        cy.getByTestId('alder-filterform_nullstill-knapp')
            .should('be.enabled')
            .click();
    });

    it('Double checkbox-filterform', () => {
        cy.apneLukkeFilterDropdown('er-utdanningen-godkjent-og-bestatt');
        cy.getByTestId('filter_utdanningBestatt_JA').check({force: true});
        cy.getByTestId('filtreringlabel').contains('Utdanning bestått: Ja');
        cy.getByTestId('filter_utdanningBestatt_JA').uncheck({force: true});
        cy.getByTestId('filter_utdanningBestatt_JA').check({force: true});
        cy.getByTestId('filtreringlabel').contains('Utdanning bestått: Ja');
        cy.getByTestId('filter_utdanningBestatt_NEI').check({force: true});
        cy.getByTestId('filtreringlabel').contains('Utdanning bestått: Nei');
        cy.getByTestId('filter_utdanningGodkjent_NEI').check({force: true});
        cy.getByTestId('filtreringlabel').contains('Utdanning godkjent: Nei');
        cy.getByTestId('double-checkbox-filterform_nullstill-knapp')
            .should('be.enabled')
            .click();
        cy.getByTestId('filtreringlabel').should('have.length', 0);
    });

    it('Aktivitet-filterform', () => {
        cy.getByTestId('dropdown-knapp_tiltakstype').should('be.disabled');
        cy.apneLukkeFilterDropdown('aktivitet');
        cy.getByTestId('aktivitet-filterform').should('exist');
        cy.getByTestId('aktivitet-filterform_nullstill-knapp').should('be.disabled');
        cy.getByTestId('aktivitet-filterform-STILLING-ja').check({force: true});
        cy.getByTestId('aktivitet-filterform_nullstill-knapp').should('be.enabled');
        cy.getByTestId('filtreringlabel').contains('Stilling bruker skal søke: JA');
        cy.getByTestId('aktivitet-filterform-TILTAK-ja').check({force: true});
        cy.getByTestId('filtreringlabel').contains('Tiltak gjennom NAV: JA');
        cy.getByTestId('filtreringlabel').should('have.length', 2);
        cy.getByTestId('dropdown-knapp_tiltakstype').should('be.enabled');
        cy.getByTestId('aktivitet-filterform_nullstill-knapp').click();
        cy.getByTestId('filtreringlabel').should('have.length', 0);
        cy.getByTestId('aktivitet-filterform').should('not.exist');
    });

    it('Fødselsdato-filterform', () => {
        cy.apneLukkeFilterDropdown('fodselsdato');
        cy.getByTestId('fodselsdato-filterform').should('exist');
        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').should('be.disabled');
        cy.getByTestId('fodselsdato-filterform_dato-04').click();
        cy.getByTestId('filtreringlabel').contains('Fødselsdato: 4');
        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').should('be.enabled');
        cy.getByTestId('fodselsdato-filterform_dato-23').click();
        cy.getByTestId('filtreringlabel').contains('Fødselsdato: 23');
        cy.getByTestId('fodselsdato-filterform_dato-27').click();
        cy.getByTestId('filtreringlabel').contains('Fødselsdato: 27');
        cy.getByTestId('filtreringlabel').should('have.length', 4);
        cy.getByTestId('fodselsdato-filterform_dato-04_input').should('be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-23_input').should('be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-27_input').should('be.checked');
        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').click();
        cy.getByTestId('fodselsdato-filterform').should('not.exist');
        cy.apneLukkeFilterDropdown('fodselsdato');
        cy.getByTestId('fodselsdato-filterform_dato-04_input').should('not.be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-23_input').should('not.be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-27_input').should('not.be.checked');
        cy.apneLukkeFilterDropdown('fodselsdato');
        cy.getByTestId('filtreringlabel').should('have.length', 0);
    });

    it('Radio-filterform', () => {
        cy.apneLukkeFilterDropdown('kjonn');
        cy.getByTestId('radio-filterform').should('exist');
        cy.getByTestId('radio-filterform_nullstill-knapp').should('be.disabled');
        cy.checkbox('radio-valg_kvinne');
        cy.getByTestId('radio-filterform_nullstill-knapp').should('be.enabled');
        cy.getByTestId('filtreringlabel')
            .should('have.length', 1)
            .contains('Kvinne');
        cy.getByTestId('radio-filterform_nullstill-knapp').click();
        cy.getByTestId('radio-filterform').should('not.exist');
        cy.getByTestId('filtreringlabel').should('have.length', 0);
    });

    it('Checkbox-filterform', () => {
        cy.apneLukkeFilterDropdown('innsatsgruppe');
        cy.getByTestId('checkbox-filterform').should('exist');
        cy.getByTestId('checkbox-filterform_nullstill-knapp').should('be.disabled');
        cy.checkbox('filter_IKVAL');
        cy.getByTestId('filtreringlabel').contains('Standardinnsats');
        cy.getByTestId('checkbox-filterform_nullstill-knapp').should('be.enabled');
        cy.checkbox('filter_BATT');
        cy.getByTestId('filtreringlabel').contains('Spesielt tilpasset innsats');
        cy.getByTestId('filtreringlabel').should('have.length', 2);
        cy.getByTestId('checkbox-filterform_nullstill-knapp').click();
        cy.getByTestId('checkbox-filterform').should('not.exist');
        cy.getByTestId('filtreringlabel').should('have.length', 0);
    });

    it('Slett alle filtre', () => {
        cy.getByTestId('dropdown-knapp_tiltakstype').should('be.disabled');
        cy.apneLukkeFilterDropdown('aktivitet');
        cy.getByTestId('aktivitet-filterform-STILLING-ja').check({force: true});
        cy.getByTestId('filtreringlabel').contains('Stilling bruker skal søke: JA');
        cy.getByTestId('aktivitet-filterform-TILTAK-ja').check({force: true});
        cy.getByTestId('filtreringlabel').contains('Tiltak gjennom NAV: JA');
        cy.getByTestId('filtreringlabel').should('have.length', 2);
        cy.apneLukkeFilterDropdown('aktivitet');
        cy.getByTestId('dropdown-knapp_tiltakstype')
            .should('be.enabled')
            .click();
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.getByTestId('filter_PRAKSKJERM').check({force: true});
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.getByTestId('filter_AVKLARAG').check({force: true});
        cy.getByTestId('filtreringlabel').should('have.length', 5);
        cy.getByTestId('filtreringlabel')
            .contains('Slett alle filtervalg')
            .click();
        cy.getByTestId('filtreringlabel').should('have.length', 0);
        cy.getByTestId('alertstripe_filtrering')
            .should('be.visible')
            .contains('Du må gjøre en filtrering for å se brukere i listen.');
    });
});
