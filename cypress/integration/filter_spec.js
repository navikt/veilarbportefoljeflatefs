const fraAlder = '2';
const tilAlder = '34';
const hoyAlder = '109';

const klikkVelg = () => {
    it('Klikk velg', () => {
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
    });
};

it('Start server', () => {
    cy.configure();
});

describe('Sjekk at alders-input fungerer', () => {
    it('Gå til filter-tab', () => {
        cy.klikkTab('FILTER');
    });
    it('Skriv inn tall i inputfeltene', () => {
        cy.apneFilterDropdown('alder');
        cy.getByTestId('checkbox-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('not.be.visible');
        cy.getByTestId('filter_alder-fra')
            .click()
            .type(tilAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .type(fraAlder);
        cy.getByTestId('checkbox-filterform_lukk-knapp').should('not.be.visible');
    });
    klikkVelg();
    it('Se validering', () => {
        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Fra-alder kan ikke være større enn til-alder.');
    });
    it('Skriv inn riktige tall i inputfeltene', () => {
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(fraAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .type(tilAlder);
        cy.getByTestId('filter_alder_valideringstekst').should('not.be.visible');
        cy.getByTestId('filter_alder_valideringstekst').should('not.be.visible');
    });
    klikkVelg();
    it('Etiketten har "2-34 år"', () => {
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-' + tilAlder + ' år');
    });
    it('Velg checkbox', () => {
        cy.apneFilterDropdown('alder');
        cy.getByTestId('filter_alder-fra').should('have.value', fraAlder);
        cy.getByTestId('filter_alder-til').should('have.value', tilAlder);
        cy.checkbox('filter_40-49');
        cy.getByTestId('filter_alder-fra').should('have.value', '');
        cy.getByTestId('filter_alder-til').should('have.value', '');
    });
    klikkVelg();
    it('Etiketten har "40-49 år"', () => {
        cy.getByTestId('filtreringlabel').contains('40-49 år');
    });
    it('Skriv kun inn fra-tall', () => {
        cy.apneFilterDropdown('alder');
        cy.getByTestId('filter_40-49').should('be.checked');
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(fraAlder);
        cy.getByTestId('filter_alder_valideringstekst').should('not.be.visible');
        cy.getByTestId('filter_40-49').should('not.be.checked');
    });
    klikkVelg();
    it('Etiketten har "2-100 år"', () => {
        cy.getByTestId('filtreringlabel').contains(fraAlder + '-100 år');
    });
    it('Validering av for høyt tall', () => {
        cy.apneFilterDropdown('alder');
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear()
            .type(hoyAlder);
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .should('have.value', '');
    });
    klikkVelg();
    it('Se validering', () => {
        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Du må skrive et tall lavere enn 100 i fra-feltet hvis til-feltet står tomt.');
    });
    it('Skriv kun inn til-tall', () => {
        cy.getByTestId('filter_alder-fra')
            .click()
            .clear();
        cy.getByTestId('filter_alder-til')
            .click()
            .clear()
            .type(tilAlder);
    });
    klikkVelg();
    it('Etiketten har "0-34 år"', () => {
        cy.getByTestId('filtreringlabel').contains('0-' + tilAlder + ' år');
    });
});

describe('Sjekk at "utdanningen godkjent og bestått" fungerer', () => {
    it('Klikk "Er utdanningen godkjent og bestått"-dropdown', () => {
        cy.apneFilterDropdown('er-utdanningen-godkjent-og-bestatt');
    });

    it('Kontroller oppforsel utdanningGodkjent', () => {
        cy.getByTestId('double-checkbox-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.getByTestId('double-checkbox-filterform_velg-knapp').should('not.be.visible');
        cy.getByTestId('filter_utdanningGodkjent_NEI').check({force: true});

        cy.getByTestId('double-checkbox-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible')
            .click();
        cy.getByTestId('filtreringlabel').contains('Utdanning godkjent: Nei');

        cy.apneFilterDropdown('er-utdanningen-godkjent-og-bestatt');
    });

    it('Kontroller oppforsel utdanningBestatt', () => {
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
    });
});

describe('Slett alle filtre', () => {
    it('Velg to aktivitetsfiltre', () => {
        cy.getByTestId('dropdown-knapp_tiltakstype').should('be.disabled');
        cy.apneFilterDropdown('aktivitet');
        cy.getByTestId('aktivitet-filterform-STILLING-ja').check({force: true});
        cy.getByTestId('aktivitet-filterform-TILTAK-ja').check({force: true});
        cy.getByTestId('aktivitet-filterform_velg-knapp').click();
        cy.getByTestId('filtreringlabel').contains('Stilling bruker skal søke: JA');
        cy.getByTestId('filtreringlabel').contains('Tiltak gjennom NAV: JA');
        cy.getByTestId('filtreringlabel').contains('Slett alle filtervalg');
        cy.getByTestId('filtreringlabel').should('have.length', 7);
    });
    it('Velg to tiltakstyper', () => {
        cy.getByTestId('dropdown-knapp_tiltakstype')
            .should('be.enabled')
            .click();

        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.getByTestId('checkbox-filterform_lukk-knapp').should('be.visible');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('not.be.visible');
        cy.getByTestId('filter_PRAKSKJERM').check({force: true});

        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.getByTestId('checkbox-filterform_lukk-knapp').should('not.be.visible');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('be.visible');
        cy.getByTestId('filter_AVKLARAG').check({force: true});
        cy.getByTestId('checkbox-filterform_velg-knapp')
            .should('be.enabled')
            .click();
    });
    it('Klikk på slett alle filtervalg-etikett', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 9);
        cy.getByTestId('filtreringlabel')
            .contains('Slett alle filtervalg')
            .click();
        cy.getByTestId('filtreringlabel').should('have.length', 0);
    });
    it('Alertstripen er synlig', () => {
        cy.getByTestId('alertstripe_filtrering')
            .should('be.visible')
            .contains('Du må gjøre en filtrering for å se brukere i listen.');
    });
});
describe('Verifiser nullstill-knapp', () => {
    it('Velg to aktivitetsfiltre', () => {
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
    });
    it('Velg fødselsdatoer', () => {
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
    });
});

describe('Verifiser radio-dropdowns', () => {
    it('Velg kjønnsfilter', () => {
        cy.apneFilterDropdown('kjonn');
        cy.getByTestId('radio-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
        cy.checkbox('radio-valg_kvinne');
        cy.getByTestId('radio-filterform_lukk-knapp').should('not.be.visible');
        cy.getByTestId('radio-filterform_velg-knapp')
            .contains('Velg')
            .should('be.visible');
        cy.getByTestId('radio-filterform_velg-knapp').click();
        cy.getByTestId('filtreringlabel').should('have.length', 1);
        cy.getByTestId('filtreringlabel').should('contain', 'Kvinne');
        cy.apneFilterDropdown('kjonn');
        cy.getByTestId('radio-filterform_nullstill-knapp').click();
        cy.getByTestId('filtreringlabel').should('have.length', 0);
        cy.getByTestId('radio-filterform_velg-knapp').should('not.be.visible');
        cy.getByTestId('radio-filterform_lukk-knapp')
            .contains('Lukk')
            .should('be.visible');
    });
});
