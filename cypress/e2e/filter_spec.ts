import {
    aktiviteter,
    alder,
    hendelserEtikett,
    innsatsgruppeGjeldendeVedtak14a
} from '../../src/filtrering/filter-konstanter';
import {kebabUtenSpesialtegn} from '../../src/utils/utils';
import {InnsatsgruppeGjeldendeVedtak14a} from '../../src/typer/bruker-modell';

const fraAlder = '2';
const tilAlder = '34';
const hoyAlder = '109';

before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();
});

beforeEach('Gå til filter-tab', () => {
    cy.klikkTab('FILTER');
});

afterEach('Gå til status-tab', () => {
    cy.klikkTab('STATUS');
});

describe('Filter', () => {
    it('Alder-filterform', () => {
        // Åpne alder-filterdropdown
        cy.apneLukkeFilterDropdown('alder');
        cy.getByTestId('alder-filterform').should('exist');

        // Skal ikkje kunne nullstille når det ikkje er filtrert
        cy.getByTestId('alder-filterform_nullstill-knapp').should('be.disabled');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('be.disabled');

        // Skriv inn ein frå-alder, nullstill-knappen skal ha blitt aktiv
        cy.getByTestId('filter_alder-fra').click().type(tilAlder);
        cy.getByTestId('alder-filterform_nullstill-knapp').should('be.enabled');

        // Skriv inn til-alder også og trykkar "velg"
        cy.getByTestId('filter_alder-til').click().type(fraAlder);
        cy.getByTestId('checkbox-filterform_velg-knapp').click();

        // Skal få feilmelding fordi frå-verdi er større enn til-verdi
        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Fra-alder kan ikke være større enn til-alder.');

        // Byttar frå- og tilverdi, får ingen feilmelding
        cy.getByTestId('filter_alder-fra').click().clear().type(fraAlder);
        cy.getByTestId('filter_alder-til').click().clear().type(tilAlder);
        cy.getByTestId('filter_alder_valideringstekst').should('not.exist');

        // Vel filteret, filterdropdown skal lukke seg
        cy.getByTestId('checkbox-filterform_velg-knapp').click();
        cy.getByTestId('alder-filterform').should('not.exist');

        // Kan sjå filtreringslabel
        cy.getByTestId(`filtreringlabel_${fraAlder}-${tilAlder}-ar`).should('be.visible');

        // Opnar filterdropdown igjen
        cy.getByTestId('filtrering-filter_container').scrollTo('top');
        cy.apneLukkeFilterDropdown('alder');
        cy.getByTestId('alder-filterform').should('exist');

        // Sjekkar at frå- og tilfeltet framleis har same verdiar
        cy.getByTestId('filter_alder-fra').should('have.value', fraAlder);
        cy.getByTestId('filter_alder-til').should('have.value', tilAlder);

        // Vel eit pre-definert aldersfilter (40-49 år), ser at frå-/til-felta er nulla ut
        cy.checkbox('filter_40-49');
        cy.getByTestId('filter_alder-fra').should('have.value', '');
        cy.getByTestId('filter_alder-til').should('have.value', '');
        cy.getByTestId('checkbox-filterform_velg-knapp').should('be.disabled');

        // Vi nullar det valde filteret ved å trykke på filtreringslabel
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(alder['40-49'])}`).should('be.visible').click();

        // Opnar filterdropdown igjen. Ser at filter ikkje er valt
        cy.apneLukkeFilterDropdown('alder');
        cy.getByTestId('filter_40-49').should('not.be.checked');

        // Testar validering: kan ikkje ha frå-feltet over 100 om til-feltet er tomt
        cy.getByTestId('filter_alder-til').click().clear().should('have.value', '');
        cy.getByTestId('filter_alder-fra').click().clear().type(hoyAlder);
        cy.getByTestId('checkbox-filterform_velg-knapp').click();
        cy.getByTestId('filter_alder_valideringstekst')
            .should('be.visible')
            .contains('Du må skrive et tall lavere enn 100 i fra-feltet hvis til-feltet står tomt.');

        // Skriv inn ein verdi under 100 i frå-alder, vel filter, sjå at ting lukkar seg
        cy.getByTestId('filter_alder-fra').click().clear().type(tilAlder);
        cy.getByTestId('checkbox-filterform_velg-knapp').click();
        cy.getByTestId('alder-filterform').should('not.exist');

        // Sjekk at vi har filtertag: 34-100 år + Nullstill filtervalg
        cy.getByTestId('filtrering_label-container').children().should('have.length', 2);

        // Fjern alder-filtertaggen, sjå at begge forsvinn
        cy.getByTestId(`filtreringlabel_${tilAlder}-100-ar`).should('be.visible').click();
        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);
    });

    it('Hendelser-filterform - Enhetens oversikt', () => {
        // Kolonner ved starten av testen: Etternavn, Fødselsnr, Oppfølging startet, Siste endring, Dato siste endring
        const tallPaKolonnerVedStart = 5;

        // Opne filterdropdown for siste-endring-kategori
        cy.getByTestId('dropdown-knapp_sisteEndringKategori').click();

        // Vel "Jobb jeg har nå"
        cy.checkbox('lagtTilAvBruker_jobb-jeg-har-na');

        // Sjekk at vi får rett tal kolonner. Dei to siste skal vere "Siste endring" og "Dato siste endring"
        cy.getByTestId('brukerliste_innhold').children().as('kolonneoverskrifter')
            .should('have.length', tallPaKolonnerVedStart);
        cy.get('@kolonneoverskrifter').last().prev().contains('Siste endring');
        cy.get('@kolonneoverskrifter').last().contains('Dato siste endring');

        /* Test av Velg kolonner */
        // Tek bort kolonna for "Sist endret". No er "Veileder" nest sist
        cy.getByTestId('dropdown-knapp_velg-kolonner').contains('Velg kolonner').click({force: true});
        cy.getByTestId('velg-kolonne-rad_siste_endring').should('be.checked').uncheck({force: true});
        cy.getByTestId('velg-kolonne-rad_veileder').check({force: true});
        cy.get('@kolonneoverskrifter').should('have.length', tallPaKolonnerVedStart - 1).last().prev().contains('Veileder');

        // Tek bort kolonna for "Sist endret dato". Skal no ha 3 kolonner, "Veileder" er sist.
        cy.getByTestId('velg-kolonne-rad_siste_endring_dato').should('be.checked').uncheck({force: true});
        cy.getByTestId('brukerliste_innhold').children().should('have.length', tallPaKolonnerVedStart - 2).last().contains('Veileder');

        // Lukk kolonnevalg
        cy.getByTestId('dropdown-knapp_velg-kolonner').contains('Velg kolonner').click({force: true});

        // Nullstill filtertags
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(hendelserEtikett["NY_IJOBB"])} `).should('exist').click();
    });

    it('Hendelser-filterform - Min oversikt', () => {
        // Gå til Min oversikt, åpne filterfane
        cy.gaTilOversikt('min-oversikt');
        cy.klikkTab('FILTER');

        // Sjekk at hendelse-dropdown står på "Siste endring av bruker"
        cy.getByTestId('dropdown-knapp_sisteEndringKategori').contains('Siste endring av bruker').click();

        // Vel "Jobb jeg har nå" og "Uleste endringer"
        cy.checkbox('lagtTilAvBruker_jobb-jeg-har-na');
        cy.checkbox('filter_uleste-endringer');

        // Sjå at filtertags dukkar opp
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(hendelserEtikett["NY_IJOBB"])}`).should('be.visible');
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(hendelserEtikett["ULESTE_ENDRINGER"])}`).should('be.visible');
        cy.getByTestId('filtrering_label-container').children().should('have.length', 3);

        // Nullstill hendelsesfilteret
        cy.getByTestId('hendelser-filterform_nullstill-knapp').click();
        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);

        // Gå attende til enhetens oversikt for å nullstille testen
        cy.getByTestId('sidebar-tab_STATUS').click();
        cy.gaTilOversikt('enhetens-oversikt');
    });

    it('Utdanning godkjent checkbox-filterform', () => {
        // Opne filter "Er utdanningen godkjent" under "Svar fra registrering"
        cy.apneLukkeFilterDropdown('er-utdanningen-godkjent');

        // Huk av for "Ja", sjå at vi får rett filtertag
        cy.getByTestId('filter_JA').check({force: true});
        cy.getByTestId('filtreringlabel_utdanning-godkjent-ja').should('be.visible');

        // Bytt til "Nei", sjå at vi får rett filtertag
        cy.getByTestId('filter_JA').uncheck({force: true});
        cy.getByTestId('filter_NEI').check({force: true});
        cy.getByTestId('filtreringlabel_utdanning-godkjent-nei').should('be.visible');
        cy.getByTestId('filtrering_label-container').children().should('have.length', 2);

        // Nullstill filterval før neste test
        cy.getByTestId('checkbox-filterform_nullstill-knapp').click();
        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);
    });

    it('Aktivitet-filterform: Forenklet filter', () => {
        // Åpne filterdropdown for Aktivitet, sjekk at rette ting vises eller er deaktivert
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.apneLukkeFilterDropdown('aktivitet');
        cy.getByTestId('aktivitet-filterform-forenklet').should('exist');
        cy.getByTestId('aktivitet-filterform-forenklet_nullstill-knapp').should('be.disabled');

        // Vel filter "Stilling bruker skal søke", får opp filtertag
        cy.getByTestId('aktivitet-forenklet_STILLING').check({force: true});
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(aktiviteter.STILLING)}`).should('be.visible');

        // No skal ein kunne nullstille aktivitetfilter
        cy.getByTestId('aktivitet-filterform-forenklet_nullstill-knapp').should('be.enabled');

        // Vel filter "Tiltak gjennom Nav", får opp filtertag
        cy.getByTestId('aktivitet-forenklet_TILTAK').check({force: true});
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(aktiviteter.TILTAK)}`).should('be.visible');

        // Ser at talet på filtertags går frå 3 (inkl "nullstill filter") til 0 når ein nullstillar aktivitetsfiltera
        cy.getByTestId('filtrering_label-container').children().should('have.length', 3);
        cy.getByTestId('aktivitet-filterform-forenklet_nullstill-knapp').click();
        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);
    })

    it('Aktivitet-filterform: Avansert filter', () => {
        // Gå til filterdropdown for Aktivitet
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.apneLukkeFilterDropdown('aktivitet');

        // Vel nokre forenkla filter, får opp tags
        cy.getByTestId('aktivitet-forenklet_STILLING').check({force: true});
        cy.getByTestId('aktivitet-forenklet_TILTAK').check({force: true});
        cy.getByTestId('filtrering_label-container').children().should('have.length', 3);

        // Opne Avansert filter, sjå at vi no ikkje kan nullstille
        cy.getByTestId('aktiviteter_avansert-filter_knapp').click();
        cy.getByTestId('aktivitet-filterform-forenklet').should('not.exist');
        cy.getByTestId('aktivitet-filterform').should('exist');
        cy.getByTestId('aktivitet-filterform_nullstill-knapp').should('be.disabled');

        // Vel eit filter: "Stilling bruker skal søke: Ja".
        cy.getByTestId('aktivitet-filterform-STILLING-ja').check({force: true});

        // No skal vi berre ha "stilling bruker skal søke: ja"-filteret (og "Nullstill filtervalg")
        cy.getByTestId('filtrering_label-container').children().should('have.length', 2);
        cy.getByTestId('aktivitet-filterform_nullstill-knapp').should('be.enabled');
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(aktiviteter.STILLING)}-ja`).should('be.visible');

        // Hukar av for "ja" på "Tiltak gjennom Nav" også, får rett filtertag
        cy.getByTestId('aktivitet-filterform-TILTAK-ja').check({force: true});
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(aktiviteter.TILTAK)}-ja`).should('be.visible');

        // Hukar av for "ja" på "Møte med Nav", får rett filtertag
        cy.getByTestId('aktivitet-filterform-MOTE-ja').check({force: true});
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(aktiviteter.MOTE)}-ja`).should('be.visible');

        // Går til Forenklet filter igjen
        cy.getByTestId('aktiviteter_forenklet-filter_knapp').click();
        cy.getByTestId('aktivitet-filterform-forenklet').should('exist');
        cy.getByTestId('aktivitet-filterform').should('not.exist');

        // Ser at vi har 4 filtertags (3 filter + "Nullstill filtervalg")
        cy.getByTestId('filtrering_label-container').children().should('have.length', 4);

        // Nullstiller filtervalga
        cy.getByTestId('filtreringlabel_nullstill-filtervalg').should('be.visible').click();
    });

    it('Fødselsdato-filterform', () => {
        // Opne filterdropdown for fødselsdato
        cy.apneLukkeFilterDropdown('fodselsdato');
        cy.getByTestId('fodselsdato-filterform').should('exist');
        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').should('be.disabled');

        // Vel ein dato, sjekk at filtertag er synleg og at ein no kan nullstille
        cy.getByTestId('fodselsdato-filterform_dato-04').click();
        cy.getByTestId('filtrering-filter_container').scrollTo('top');
        cy.getByTestId('filtreringlabel_fodselsdato-4').should('be.visible');
        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').should('be.enabled');

        // Vel to datoar til, sjekk at filtertags blir synleg
        cy.getByTestId('fodselsdato-filterform_dato-23').click();
        cy.getByTestId('filtrering-filter_container').scrollTo('top');
        cy.getByTestId('filtreringlabel_fodselsdato-23').should('be.visible');
        cy.getByTestId('fodselsdato-filterform_dato-27').click();
        cy.getByTestId('filtrering-filter_container').scrollTo('top');
        cy.getByTestId('filtreringlabel_fodselsdato-27').should('be.visible');

        // Det skal no vere fire filtertags (3 med dato + "Nullstill filtervalg")
        cy.getByTestId('filtrering_label-container').children().should('have.length', 4);

        // Alle dei tre valde datoane skal vere valde i kalenderen
        cy.getByTestId('fodselsdato-filterform_dato-04_input').should('be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-23_input').should('be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-27_input').should('be.checked');

        // Vi nullstiller filter frå filterdropdown. Datoane skal ikkje vere valde i kalenderen meir.
        cy.getByTestId('fodselsdato-filterform_nullstill-knapp').click();
        cy.getByTestId('fodselsdato-filterform_dato-04_input').should('not.be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-23_input').should('not.be.checked');
        cy.getByTestId('fodselsdato-filterform_dato-27_input').should('not.be.checked');

        // Sjekkar at vi ikkje har nokon filtertags meir
        cy.getByTestId('filtrering-filter_container').scrollTo('top');
        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);

        // Lukkar filterdropdown før neste test
        cy.apneLukkeFilterDropdown('fodselsdato');
    });

    it('Radio-filterform', () => {
        // Opne filterdropdown for kjønn, sjekk at rette ting er synleg/deaktiverte
        cy.apneLukkeFilterDropdown('kjonn');
        cy.getByTestId('radio-filterform').should('exist');
        cy.getByTestId('radio-filterform_nullstill-knapp').should('be.disabled');

        // Vel filter for kvinne, få opp filtertag
        cy.checkbox('radio-valg_kvinne');
        cy.getByTestId('filtrering_label-container').contains('Kvinne').should('be.visible');

        // Det skal gå an å nullstille
        cy.getByTestId('radio-filterform_nullstill-knapp').should('be.enabled');

        // Vi nullstiller og sjekkar at filtertags blir borte
        cy.getByTestId('radio-filterform_nullstill-knapp').click();
        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);
    });

    it('Checkbox-filterform: Innsatsgruppe gjeldende vedtak § 14 a', () => {
        // Opnar filterdropdown for innsatsgruppe, sjekkar at rette ting er synleg/deaktivert
        cy.apneLukkeFilterDropdown('innsatsgruppe-gjeldende-vedtak-14a');
        cy.getByTestId('checkbox-filterform').should('exist');
        cy.getByTestId('checkbox-filterform_nullstill-knapp').should('be.disabled');

        // Vel filter for Standardinnsats (aka Gode muligheter), får opp filtertag. Nullstill skal vere synleg.
        cy.checkbox(`filter_${InnsatsgruppeGjeldendeVedtak14a.STANDARD_INNSATS}`);
        cy.getByTestId(`filtreringlabel_${
            kebabUtenSpesialtegn(innsatsgruppeGjeldendeVedtak14a[InnsatsgruppeGjeldendeVedtak14a.STANDARD_INNSATS])
        }`).should('be.visible');
        cy.getByTestId('checkbox-filterform_nullstill-knapp').should('be.enabled');

        // Vel eit filter til, no Spesielt tilpasset innsats (aka Trenger veiledning, nedsatt arbeidsevne)
        cy.checkbox(`filter_${InnsatsgruppeGjeldendeVedtak14a.SPESIELT_TILPASSET_INNSATS}`);
        cy.getByTestId(`filtreringlabel_${
            kebabUtenSpesialtegn(innsatsgruppeGjeldendeVedtak14a[InnsatsgruppeGjeldendeVedtak14a.SPESIELT_TILPASSET_INNSATS])
        }`).should('be.visible');

        // Sjekkar at vi har rett mengd filtertags
        cy.getByTestId('filtrering_label-container').children().should('have.length', 3);

        // Nullstiller med knapp i filterdropdown
        cy.getByTestId('checkbox-filterform_nullstill-knapp').click();
        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);
    });

    it('Slett alle filtre', () => {

        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');

        // Vel eit par aktivitetsfilter
        cy.apneLukkeFilterDropdown('aktivitet');
        cy.getByTestId('aktivitet-forenklet_STILLING').check({force: true});
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(aktiviteter.STILLING)}`).should('be.visible');
        cy.getByTestId('aktivitet-forenklet_TILTAK').check({force: true});
        cy.getByTestId(`filtreringlabel_${kebabUtenSpesialtegn(aktiviteter.TILTAK)}`).should('be.visible');
        cy.getByTestId('filtrering_label-container').children().should('have.length', 3);
        cy.apneLukkeFilterDropdown('aktivitet');


        // Vel nokre ("Arbeidspraksis i skjermet virksomhet" og "Avklaring")
        cy.getByTestId('dropdown-knapp_tiltakstype').should('be.enabled').click();
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.getByTestId('filter_PRAKSKJERM').check({force: true});
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.getByTestId('filter_AVKLARAG').check({force: true});

        // Vi har no 4 valde filter og fem filtertags
        cy.getByTestId('filtrering_label-container').children().should('have.length', 5);

        // Nullstill filtervalg
        cy.getByTestId('filtreringlabel_nullstill-filtervalg').click();
        cy.getByTestId('filtrering_label-container').children().should('have.length', 0);
        cy.getByTestId('alertstripe_filtrering')
            .should('be.visible')
            .contains('Du må gjøre en filtrering for å se brukere i listen.');
    });
});
