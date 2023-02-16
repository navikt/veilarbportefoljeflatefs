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
const johansen = 'Johansen';
const aasen = 'Aasen';
const minstEnVeileder = 'Du må legge til veiledere.';
let antallVeiledergrupper = 0;

const navDsRadioButtonsSelector = ".navds-radio-buttons"

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

        cy.getByTestId('filtreringlabel_ufordelte-brukere').should('be.visible');

        cy.wait(500);
        cy.getByTestId('sidebar-tab_FILTER').click();

        cy.apneLukkeFilterDropdown('alder');

        cy.getByTestId('filter_0-19').check({force: true});

        cy.getByTestId('filtreringlabel_-19-ar').should('be.visible');

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

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 2);

        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter + 1);
    });

    it('Rediger filter', () => {
        cy.getByTestId(`rediger-filter_knapp_${kebabCase(mineFilterNavn)}`).click();

        cy.getByTestId('redigere-filter-navn-input')
            .clear()
            .type(mineFilterNavnRedigert);

        cy.getByTestId('rediger-filter_modal_lagre-knapp').click();

        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavnRedigert);

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 2);

        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter + 1);

        cy.getByTestId('filtreringlabel_ufordelte-brukere')
            .should('be.visible')
            .click();

        cy.klikkTab('STATUS');

        cy.getByTestId('filter_checkboks-container_avtaltMoteMedNav').check({
            force: true
        });

        cy.getByTestId('filtreringlabel_-19-ar')
            .should('be.visible')
            .click();

        cy.getByTestId('lagre-filter_knapp').click();

        cy.getByTestId('mine-filter_modal_oppdater-filter-tekst').contains(mineFilterNavnRedigert);

        cy.getByTestId('oppdater-eksisterende-filter_modal_knapp').click();

        cy.getByTestId('rediger-filter_modal_lagre-knapp').click();

        cy.getByTestId('filtreringlabel_mote-med-nav-idag').should('be.visible');

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
            .contains(testFilterNavn);

        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 2)
            .click()
            .type('{shift}{downarrow}{downarrow}');

        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 4);

        cy.getByTestId('mine-filter_sortering_lagre-knapp').click();

        cy.getByTestId('drag-drop_infotekst').should('not.exist');

        cy.getByTestId('mine-filter_radio-container')
            .get(navDsRadioButtonsSelector)
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
            .get(navDsRadioButtonsSelector)
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
            .get(navDsRadioButtonsSelector)
            .children()
            .first()
            .next()
            .contains(testFilterNavn);

        cy.getByTestId('filtreringlabel_mote-med-nav-idag')
            .should('be.visible')
            .click();
    });

    it('Tiltaksfilter borte fra lagret filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 5);
        cy.getByTestId('mine-filter-rad_tiltaksfilter').click({force: true});

        cy.getByTestId('la-sta-knapp').click();
        cy.getByTestId('mine-filter-rad_tiltaksfilter').click({force: true});

        cy.getByTestId('slett-knapp').click();
        cy.getByTestId('bekreft-sletting_modal_slett-knapp').click();
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 4);
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

        cy.wait(1000);

        cy.getByTestId('veiledergruppe_modal_sok-veileder-input').type(andersen);

        cy.getByTestId('veiledergruppe_modal_sok-veileder-input').should('have.value', andersen);

        cy.getByTestId('veiledergruppe_modal_gruppenavn-input').should('have.value', '');

        cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({
            force: true
        });

        cy.getByTestId('veiledergruppe_modal_sok-veileder-input')
            .clear()
            .type(johansen);

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

        cy.getByTestId('filtrering_label-container')
            .children()
            .contains(andersen);

        cy.getByTestId('filtrering_label-container')
            .children()
            .contains(johansen);

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

        cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();

        cy.getByTestId('veiledergruppe_modal_form').contains(minstEnVeileder);

        cy.getByTestId('veiledergruppe_modal_sok-veileder-input').type(aasen);

        cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({
            force: true
        });

        cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();

        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper + 1);

        cy.getByTestId('timed-toast_gruppen-er-lagret')
            .should('be.visible')
            .contains('Gruppen er lagret');

        //TODO funker denne?
        cy.getByTestId('filtrering_label-container')
            .children()
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

        cy.get('.veiledergruppe_modal_rediger-veiledergruppe').should('be.visible');

        cy.getByTestId('veiledergruppe_modal_alertstripe')
            .should('be.visible')
            .contains('En eller flere veiledere i gruppen har ikke tilgang lenger, og gruppen er nå lik');

        cy.getByTestId('veiledergruppe_modal_avbryt-knapp').click();

        cy.get('.veiledergruppe_modal_rediger-veiledergruppe').should('not.exist');

        cy.getByTestId('filtreringlabel_nullstill-filtervalg')
            .should('be.visible')
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

        cy.getByTestId('checkbox-filterform_velg-knapp').click();

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

        cy.getByTestId('checkbox-filterform_velg-knapp').click();

        cy.getByTestId('alder-filterform').should('not.exist');

        cy.getByTestId('filtreringlabel_2-34-ar').should('be.visible');

        cy.getByTestId('filtrering-filter_container').scrollTo('top');

        cy.apneLukkeFilterDropdown('alder');

        cy.getByTestId('alder-filterform').should('exist');

        cy.getByTestId('filter_alder-fra').should('have.value', fraAlder);

        cy.getByTestId('filter_alder-til').should('have.value', tilAlder);

        cy.checkbox('filter_40-49');

        cy.getByTestId('filter_alder-fra').should('have.value', '');

        cy.getByTestId('filter_alder-til').should('have.value', '');

        cy.getByTestId('checkbox-filterform_velg-knapp').should('be.disabled');

        cy.getByTestId('filtreringlabel_40-49-ar')
            .should('be.visible')
            .click();

        cy.apneLukkeFilterDropdown('alder');

        cy.getByTestId('filter_40-49').should('not.be.checked');

        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(hoyAlder);

        cy.getByTestId('checkbox-filterform_velg-knapp').click();

        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .should('have.value', '');

        cy.getByTestId('checkbox-filterform_velg-knapp').click();

        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Du må skrive et tall lavere enn 100 i fra-feltet hvis til-feltet står tomt.');

        cy.getByTestId('filter_alder-fra')
            .click()
            .clear();

        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(tilAlder);

        cy.getByTestId('checkbox-filterform_velg-knapp').click();

        cy.getByTestId('alder-filterform').should('not.exist');

        cy.getByTestId('filtrering-filter_container').scrollTo('top');

        cy.apneLukkeFilterDropdown('alder');

        cy.getByTestId('alder-filterform').should('exist');

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 1);

        cy.getByTestId('filtreringlabel_34-100-ar')
            .should('be.visible')
            .click();

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 0);
    });

    it('Hendelser-filterform - Enhetens oversikt', () => {
        cy.getByTestId('dropdown-knapp_sisteEndringKategori').click();

        cy.checkbox('lagtTilAvBruker_jobb-jeg-har-na');

        cy.getByTestId('brukerliste_innhold')
            .children()
            .should('have.length', 6)
            .last()
            .prev()
            .contains('Siste endring');

        cy.getByTestId('brukerliste_innhold')
            .last()
            .contains('Dato siste endring');

        cy.getByTestId('dropdown-knapp_velg-kolonner')
            .contains('Velg kolonner')
            .click({force: true});

        cy.getByTestId('velg-kolonne-rad_siste_endring')
            .should('be.checked')
            .uncheck({force: true});

        cy.getByTestId('velg-kolonne-rad_veileder').check({force: true});

        cy.getByTestId('brukerliste_innhold')
            .children()
            .should('have.length', 5)
            .last()
            .prev()
            .contains('Veileder');

        cy.getByTestId('velg-kolonne-rad_siste_endring_dato')
            .should('be.checked')
            .uncheck({force: true});

        cy.getByTestId('brukerliste_innhold')
            .children()
            .should('have.length', 4)
            .last()
            .contains('Veileder');

        cy.getByTestId('dropdown-knapp_velg-kolonner')
            .contains('Velg kolonner')
            .click({force: true});

        cy.getByTestId('filtreringlabel_aktivitet-lagt-til-jobb-jeg-har-na')
            .should('exist')
            .click();
    });

    it('Hendelser-filterform - Min oversikt', () => {
        cy.gaTilOversikt('min-oversikt');

        cy.klikkTab('FILTER');

        cy.getByTestId('dropdown-knapp_sisteEndringKategori')
            .contains('Siste endring av bruker')
            .click();

        cy.checkbox('lagtTilAvBruker_jobb-jeg-har-na');

        cy.checkbox('filter_uleste-endringer');

        cy.getByTestId('filtreringlabel_aktivitet-lagt-til-jobb-jeg-har-na').should('be.visible');

        cy.getByTestId('filtreringlabel_uleste-endringer-siste-endring-av-bruker').should('be.visible');

        cy.getByTestId('hendelser-filterform_nullstill-knapp').click();

        cy.gaTilOversikt('enhetens-oversikt');
    });

    it('Double checkbox-filterform', () => {
        cy.apneLukkeFilterDropdown('er-utdanningen-godkjent-og-bestatt');

        cy.getByTestId('filter_utdanningBestatt_JA').check({force: true});

        cy.getByTestId('filtreringlabel_utdanning-bestatt-ja').should('be.visible');

        cy.getByTestId('filter_utdanningBestatt_JA').uncheck({force: true});

        cy.getByTestId('filter_utdanningBestatt_JA').check({force: true});

        cy.getByTestId('filtreringlabel_utdanning-bestatt-ja').should('be.visible');

        cy.getByTestId('filter_utdanningBestatt_NEI').check({force: true});

        cy.getByTestId('filtreringlabel_utdanning-bestatt-nei').should('be.visible');

        cy.getByTestId('filter_utdanningGodkjent_NEI').check({force: true});

        cy.getByTestId('filtreringlabel_utdanning-godkjent-nei').should('be.visible');

        // cy.getByTestId('double-checkbox-filterform_nullstill-knapp')
        //     .should('be.enabled')
        //     .click();

        cy.getByTestId('filtreringlabel_nullstill-filtervalg')
            .should('be.visible')
            .click();

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 0);
    });

    it('Aktivitet-filterform', () => {
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');

        cy.apneLukkeFilterDropdown('aktivitet');

        cy.getByTestId('aktivitet-filterform-forenklet').should('exist');

        cy.getByTestId('aktivitet-filterform-forenklet_nullstill-knapp').should('be.disabled');

        cy.getByTestId('aktivitet-forenklet_STILLING').check({force: true});

        cy.getByTestId('aktivitet-filterform-forenklet_nullstill-knapp').should('be.enabled');

        cy.getByTestId('filtreringlabel_stilling-bruker-skal-soke').should('be.visible');

        cy.getByTestId('aktivitet-forenklet_TILTAK').check({force: true});

        cy.getByTestId('filtreringlabel_tiltak-gjennom-nav').should('be.visible');

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 2);

        cy.getByTestId('aktivitet-filterform-forenklet_nullstill-knapp').click();

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 0);

        cy.getByTestId('aktivitet-forenklet_STILLING').check({force: true});

        cy.getByTestId('aktivitet-forenklet_TILTAK').check({force: true});

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 2);

        cy.getByTestId('aktiviteter_avansert-filter_knapp').click();

        cy.getByTestId('aktivitet-filterform-forenklet').should('not.exist');

        cy.getByTestId('aktivitet-filterform').should('exist');

        cy.getByTestId('aktivitet-filterform_nullstill-knapp').should('be.disabled');

        cy.getByTestId('aktivitet-filterform-STILLING-ja').check({force: true});

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 1);

        cy.getByTestId('aktivitet-filterform_nullstill-knapp').should('be.enabled');

        cy.getByTestId('filtreringlabel_stilling-bruker-skal-soke-ja').should('be.visible');

        cy.getByTestId('aktivitet-filterform-TILTAK-ja').check({force: true});

        cy.getByTestId('filtreringlabel_tiltak-gjennom-nav-ja').should('be.visible');

        cy.getByTestId('aktivitet-filterform-MOTE-ja').check({force: true});

        cy.getByTestId('filtreringlabel_mote-med-nav-ja').should('be.visible');

        cy.getByTestId('aktiviteter_forenklet-filter_knapp').click();

        cy.getByTestId('aktivitet-filterform-forenklet').should('exist');

        cy.getByTestId('aktivitet-filterform').should('not.exist');

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 4);

        cy.getByTestId('filtreringlabel_nullstill-filtervalg')
            .should('be.visible')
            .click();
    });

    it('Fødselsdato-filterform', () => {
        cy.apneLukkeFilterDropdown('fodselsdato');

        cy.getByTestId('fodselsdato-filterform').should('exist');

        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').should('be.disabled');

        cy.getByTestId('fodselsdato-filterform_dato-04').click();

        cy.getByTestId('filtrering-filter_container').scrollTo('top');

        cy.getByTestId('filtreringlabel_fodselsdato-4').should('be.visible');

        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').should('be.enabled');

        cy.getByTestId('fodselsdato-filterform_dato-23').click();

        cy.getByTestId('filtrering-filter_container').scrollTo('top');

        cy.getByTestId('filtreringlabel_fodselsdato-23').should('be.visible');

        cy.getByTestId('fodselsdato-filterform_dato-27').click();

        cy.getByTestId('filtrering-filter_container').scrollTo('top');

        cy.getByTestId('filtreringlabel_fodselsdato-27').should('be.visible');

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 4);

        cy.getByTestId('fodselsdato-filterform_dato-04_input').should('be.checked');

        cy.getByTestId('fodselsdato-filterform_dato-23_input').should('be.checked');

        cy.getByTestId('fodselsdato-filterform_dato-27_input').should('be.checked');

        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').click();

        cy.getByTestId('fodselsdato-filterform_dato-04_input').should('not.be.checked');

        cy.getByTestId('fodselsdato-filterform_dato-23_input').should('not.be.checked');

        cy.getByTestId('fodselsdato-filterform_dato-27_input').should('not.be.checked');

        cy.getByTestId('filtrering-filter_container').scrollTo('top');

        cy.apneLukkeFilterDropdown('fodselsdato');

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 0);
    });

    it('Radio-filterform', () => {
        cy.apneLukkeFilterDropdown('kjonn');

        cy.getByTestId('radio-filterform').should('exist');

        cy.getByTestId('radio-filterform_nullstill-knapp').should('be.disabled');

        cy.checkbox('radio-valg_kvinne');

        cy.getByTestId('radio-filterform_nullstill-knapp').should('be.enabled');

        cy.getByTestId('filtrering_label-container')
            .contains('Kvinne')
            .should('be.visible');

        cy.getByTestId('radio-filterform_nullstill-knapp').click();

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 0);
    });

    it('Checkbox-filterform', () => {
        cy.apneLukkeFilterDropdown('innsatsgruppe');

        cy.getByTestId('checkbox-filterform').should('exist');

        cy.getByTestId('checkbox-filterform_nullstill-knapp').should('be.disabled');

        cy.checkbox('filter_IKVAL');

        cy.getByTestId('filtreringlabel_standardinnsats').should('be.visible');

        cy.getByTestId('checkbox-filterform_nullstill-knapp').should('be.enabled');

        cy.checkbox('filter_BATT');

        cy.getByTestId('filtreringlabel_spesielt-tilpasset-innsats').should('be.visible');

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 2);

        cy.getByTestId('checkbox-filterform_nullstill-knapp').click();

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 0);
    });

    it('Slett alle filtre', () => {
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');

        cy.apneLukkeFilterDropdown('aktivitet');

        cy.getByTestId('aktivitet-forenklet_STILLING').check({force: true});

        cy.getByTestId('filtreringlabel_stilling-bruker-skal-soke').should('be.visible');

        cy.getByTestId('aktivitet-forenklet_TILTAK').check({force: true});

        cy.getByTestId('filtreringlabel_tiltak-gjennom-nav').should('be.visible');

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 2);

        cy.apneLukkeFilterDropdown('aktivitet');

        cy.getByTestId('dropdown-knapp_tiltakstype')
            .should('be.enabled')
            .click();

        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');

        cy.getByTestId('filter_PRAKSKJERM').check({force: true});

        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');

        cy.getByTestId('filter_AVKLARAG').check({force: true});

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 5);

        cy.getByTestId('filtreringlabel_nullstill-filtervalg').click();

        cy.getByTestId('filtrering_label-container')
            .children()
            .should('have.length', 0);

        cy.getByTestId('alertstripe_filtrering')
            .should('be.visible')
            .contains('Du må gjøre en filtrering for å se brukere i listen.');
    });

    it('fjern brukerfeilmelding velge minst en bruker', () => {
        cy.gaTilOversikt('min-oversikt');
        cy.getByTestId('sidebar-tab_STATUS').click();
        cy.getByTestId('filter_checkboks-container_nyeBrukere').check({
            force: true
        });
        cy.getByTestId('filter_checkboks-container_nyeBrukere').should('be.checked');
        cy.getByTestId('filtreringlabel_nye-brukere').should('be.visible');
        cy.getByTestId('sidebar-tab_FILTER').click();
        cy.getByTestId('tildel-veileder_knapp')
            .should('be.enabled')
            .click({force: true});
        cy.getByTestId('brukerfeilmelding').should('be.visible');
        cy.apneLukkeFilterDropdown('kjonn');
        cy.checkbox('radio-valg_kvinne');
        cy.getByTestId('brukerfeilmelding').should('not.exist');
    })
});
