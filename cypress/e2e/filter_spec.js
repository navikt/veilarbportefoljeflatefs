const fraAlder = '2';
const tilAlder = '34';
const hoyAlder = '109';

before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();
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

        cy.getByTestId('filter_alder-fra').click().type(tilAlder);

        cy.getByTestId('alder-filterform_nullstill-knapp').should('be.enabled');

        cy.getByTestId('filter_alder-til').click().type(fraAlder);

        cy.getByTestId('checkbox-filterform_velg-knapp').click();

        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Fra-alder kan ikke være større enn til-alder.');

        cy.getByTestId('filter_alder-fra').click().clear().type(fraAlder);

        cy.getByTestId('filter_alder-til').click().clear().type(tilAlder);

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

        cy.getByTestId('filtreringlabel_40-49-ar').should('be.visible').click();

        cy.apneLukkeFilterDropdown('alder');

        cy.getByTestId('filter_40-49').should('not.be.checked');

        cy.getByTestId('filter_alder-fra').click().clear().type(hoyAlder);

        cy.getByTestId('checkbox-filterform_velg-knapp').click();

        cy.getByTestId('filter_alder-til').click().clear().should('have.value', '');

        cy.getByTestId('checkbox-filterform_velg-knapp').click();

        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Du må skrive et tall lavere enn 100 i fra-feltet hvis til-feltet står tomt.');

        cy.getByTestId('filter_alder-fra').click().clear();

        cy.getByTestId('filter_alder-fra').click().clear().type(tilAlder);

        cy.getByTestId('checkbox-filterform_velg-knapp').click();

        cy.getByTestId('alder-filterform').should('not.exist');

        cy.getByTestId('filtrering-filter_container').scrollTo('top');

        cy.apneLukkeFilterDropdown('alder');

        cy.getByTestId('alder-filterform').should('exist');

        cy.getByTestId('filtrering_label-container').children().should('have.length', 1);

        cy.getByTestId('filtreringlabel_34-100-ar').should('be.visible').click();

        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);
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

        cy.getByTestId('brukerliste_innhold').last().contains('Dato siste endring');

        cy.getByTestId('dropdown-knapp_velg-kolonner').contains('Velg kolonner').click({force: true});

        cy.getByTestId('velg-kolonne-rad_siste_endring').should('be.checked').uncheck({force: true});

        cy.getByTestId('velg-kolonne-rad_veileder').check({force: true});

        cy.getByTestId('brukerliste_innhold').children().should('have.length', 5).last().prev().contains('Veileder');

        cy.getByTestId('velg-kolonne-rad_siste_endring_dato').should('be.checked').uncheck({force: true});

        cy.getByTestId('brukerliste_innhold').children().should('have.length', 4).last().contains('Veileder');

        cy.getByTestId('dropdown-knapp_velg-kolonner').contains('Velg kolonner').click({force: true});

        cy.getByTestId('filtreringlabel_aktivitet-lagt-til-jobb-jeg-har-na').should('exist').click();
    });

    it('Hendelser-filterform - Min oversikt', () => {
        cy.gaTilOversikt('min-oversikt');

        cy.klikkTab('FILTER');

        cy.getByTestId('dropdown-knapp_sisteEndringKategori').contains('Siste endring av bruker').click();

        cy.checkbox('lagtTilAvBruker_jobb-jeg-har-na');

        cy.checkbox('filter_uleste-endringer');

        cy.getByTestId('filtreringlabel_aktivitet-lagt-til-jobb-jeg-har-na').should('be.visible');

        cy.getByTestId('filtreringlabel_uleste-endringer-siste-endring-av-bruker').should('be.visible');

        cy.getByTestId('hendelser-filterform_nullstill-knapp').click();

        cy.gaTilOversikt('enhetens-oversikt');
    });

    it('Utdanning godkjent checkbox-filterform', () => {
        cy.apneLukkeFilterDropdown('er-utdanningen-godkjent');

        cy.getByTestId('filter_JA').check({force: true});

        cy.getByTestId('filtreringlabel_utdanning-godkjent-ja').should('be.visible');

        cy.getByTestId('filter_JA').uncheck({force: true});

        cy.getByTestId('filter_NEI').check({force: true});

        cy.getByTestId('filtreringlabel_utdanning-godkjent-nei').should('be.visible');

        cy.getByTestId('filter_NEI').uncheck({force: true});
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

        cy.getByTestId('filtrering_label-container').children().should('have.length', 2);

        cy.getByTestId('aktivitet-filterform-forenklet_nullstill-knapp').click();

        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);

        cy.getByTestId('aktivitet-forenklet_STILLING').check({force: true});

        cy.getByTestId('aktivitet-forenklet_TILTAK').check({force: true});

        cy.getByTestId('filtrering_label-container').children().should('have.length', 2);

        cy.getByTestId('aktiviteter_avansert-filter_knapp').click();

        cy.getByTestId('aktivitet-filterform-forenklet').should('not.exist');

        cy.getByTestId('aktivitet-filterform').should('exist');

        cy.getByTestId('aktivitet-filterform_nullstill-knapp').should('be.disabled');

        cy.getByTestId('aktivitet-filterform-STILLING-ja').check({force: true});

        cy.getByTestId('filtrering_label-container').children().should('have.length', 1);

        cy.getByTestId('aktivitet-filterform_nullstill-knapp').should('be.enabled');

        cy.getByTestId('filtreringlabel_stilling-bruker-skal-soke-ja').should('be.visible');

        cy.getByTestId('aktivitet-filterform-TILTAK-ja').check({force: true});

        cy.getByTestId('filtreringlabel_tiltak-gjennom-nav-ja').should('be.visible');

        cy.getByTestId('aktivitet-filterform-MOTE-ja').check({force: true});

        cy.getByTestId('filtreringlabel_mote-med-nav-ja').should('be.visible');

        cy.getByTestId('aktiviteter_forenklet-filter_knapp').click();

        cy.getByTestId('aktivitet-filterform-forenklet').should('exist');

        cy.getByTestId('aktivitet-filterform').should('not.exist');

        cy.getByTestId('filtrering_label-container').children().should('have.length', 4);

        cy.getByTestId('filtreringlabel_nullstill-filtervalg').should('be.visible').click();
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

        cy.getByTestId('filtrering_label-container').children().should('have.length', 4);

        cy.getByTestId('fodselsdato-filterform_dato-04_input').should('be.checked');

        cy.getByTestId('fodselsdato-filterform_dato-23_input').should('be.checked');

        cy.getByTestId('fodselsdato-filterform_dato-27_input').should('be.checked');

        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').click();

        cy.getByTestId('fodselsdato-filterform_dato-04_input').should('not.be.checked');

        cy.getByTestId('fodselsdato-filterform_dato-23_input').should('not.be.checked');

        cy.getByTestId('fodselsdato-filterform_dato-27_input').should('not.be.checked');

        cy.getByTestId('filtrering-filter_container').scrollTo('top');

        cy.apneLukkeFilterDropdown('fodselsdato');

        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);
    });

    it('Radio-filterform', () => {
        cy.apneLukkeFilterDropdown('kjonn');

        cy.getByTestId('radio-filterform').should('exist');

        cy.getByTestId('radio-filterform_nullstill-knapp').should('be.disabled');

        cy.checkbox('radio-valg_kvinne');

        cy.getByTestId('radio-filterform_nullstill-knapp').should('be.enabled');

        cy.getByTestId('filtrering_label-container').contains('Kvinne').should('be.visible');

        cy.getByTestId('radio-filterform_nullstill-knapp').click();

        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);
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

        cy.getByTestId('filtrering_label-container').children().should('have.length', 2);

        cy.getByTestId('checkbox-filterform_nullstill-knapp').click();

        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);
    });

    it('Slett alle filtre', () => {
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');

        cy.apneLukkeFilterDropdown('aktivitet');

        cy.getByTestId('aktivitet-forenklet_STILLING').check({force: true});

        cy.getByTestId('filtreringlabel_stilling-bruker-skal-soke').should('be.visible');

        cy.getByTestId('aktivitet-forenklet_TILTAK').check({force: true});

        cy.getByTestId('filtreringlabel_tiltak-gjennom-nav').should('be.visible');

        cy.getByTestId('filtrering_label-container').children().should('have.length', 2);

        cy.apneLukkeFilterDropdown('aktivitet');

        cy.getByTestId('dropdown-knapp_tiltakstype').should('be.enabled').click();

        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');

        cy.getByTestId('filter_PRAKSKJERM').check({force: true});

        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');

        cy.getByTestId('filter_AVKLARAG').check({force: true});

        cy.getByTestId('filtrering_label-container').children().should('have.length', 5);

        cy.getByTestId('filtreringlabel_nullstill-filtervalg').click();

        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);

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
        cy.getByTestId('tildel-veileder_knapp').should('be.enabled').click({force: true});
        cy.getByTestId('brukerfeilmelding').should('be.visible');
        cy.apneLukkeFilterDropdown('kjonn');
        cy.getByTestId('radio-valg_kvinne').check({force: true});
        cy.getByTestId('brukerfeilmelding').should('not.exist');
    });
});
