import {kebabCase} from '../../src/utils/utils';

const mineFilterNavn = 'Voff';
const mineFilterNavnRedigert = 'Mjau';
const forLangtFilterNavn =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum Lorem Ipsum.";
const testFilterNavn = 'Denne brukes til test la stå';
let antallFilter = 0;

const navDsRadioButtonsSelector = '.navds-radio-buttons';

before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();
});

describe('Mine filter', () => {

    it('Finn antall filter', () => {
        cy.gaTilOversikt('enhetens-oversikt');
        cy.klikkTab('MINE_FILTER');

        // Tel kor mange filter vi har i mine filter slik at vi kan samanlikne med etter vi har laga nye
        cy.get('[data-testid=mine-filter_rad-wrapper]').then(ant => {
            antallFilter += Cypress.$(ant).length;
        });
    });

    it('Lagre nytt filter', () => {
        cy.klikkTab('STATUS');

        // Vel ufordelte brukarar, sjekkar at vi ser filter-tag etterpå
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({force: true});
        cy.getByTestId('filtreringlabel_ufordelte-brukere').should('be.visible');

        // Vel aldersgruppe 0-19 år og sjekkar at filter-tag er synleg
        cy.wait(500);
        cy.getByTestId('sidebar-tab_FILTER').click();
        cy.apneLukkeFilterDropdown('alder');
        cy.getByTestId('filter_0-19').check({force: true});
        cy.getByTestId('filtreringlabel_-19-ar').should('be.visible');

        // Lagrar nytt filter
        cy.getByTestId('lagre-filter_knapp').click();
        cy.getByTestId('oppdater-eksisterende-filter_modal_knapp').should('exist');
        cy.getByTestId('lagre-nytt-filter_modal_knapp').should('exist').click();
    });

    it('Validering', () => {
        // Held fram med greier frå førre modal

        // Prøvar å lagre utan å ha skrive inn data, får feilmelding
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains('Filteret mangler navn.');

        // Skriv inn eit for langt namn, prøvar lagre, får feilmelding
        cy.getByTestId('lagre-nytt-filter_modal_navn-input').type(forLangtFilterNavn);
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains(
            'Filternavn er for langt, kan ikke ha mer enn 255 bokstaver.'
        );

        // Skriv inn namn som allereie er i bruk, prøvar lagre, får feilmelding
        cy.getByTestId('lagre-nytt-filter_modal_navn-input').clear().type(testFilterNavn);
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains('Filternavn er allerede i bruk.');
    });

    it('Lagring av riktig filternavn', () => {
        // Held fram med greier frå førre test

        // Skriv inn eit gyldig namn, lagrar
        cy.getByTestId('lagre-nytt-filter_modal_navn-input').clear().type(mineFilterNavn);
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();

        // Vi kan sjå rett fane, og det nye filteret vårt er synleg
        cy.getByTestId('sidebar-tab_MINE_FILTER').should('have.class', 'sidebar__tab-valgt');
        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavn);

        // Nyfilteret vårt er valgt, og og begge filtertagsa som skal visast er synlege
        cy.getByTestId(`mine-filter-rad_${kebabCase(mineFilterNavn)}`).should('be.checked');
        cy.getByTestId('filtrering_label-container').children().should('have.length', 2);

        // Det er no eit meir filter enn det var før
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter + 1);

    });

    it('Rediger filter', () => {
        cy.getByTestId(`rediger-filter_knapp_${kebabCase(mineFilterNavn)}`).click();

        cy.getByTestId('redigere-filter-navn-input').clear().type(mineFilterNavnRedigert);

        cy.getByTestId('rediger-filter_modal_lagre-knapp').click();

        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavnRedigert);

        cy.getByTestId('filtrering_label-container').children().should('have.length', 2);

        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', antallFilter + 1);

        cy.getByTestId('filtreringlabel_ufordelte-brukere').should('be.visible').click();

        cy.klikkTab('STATUS');

        cy.getByTestId('filter_checkboks-container_avtaltMoteMedNav').check({
            force: true
        });

        cy.getByTestId('filtreringlabel_-19-ar').should('be.visible').click();

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

        cy.getByTestId('mine-filter_alertstripe').should('be.visible')
            .within(() => {
                cy.contains( "'Permitterte filter' er slettet fordi filteret 'Alle utenom permitterte etter 09.03.2020' er fjernet.");
                cy.get('button').should('be.visible').click();
            });

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

        cy.getByTestId('filtreringlabel_mote-med-nav-idag').should('be.visible').click();
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
