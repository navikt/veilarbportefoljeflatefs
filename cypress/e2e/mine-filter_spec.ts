import {kebabCase} from '../../src/utils/utils';

const mineFilterNavn = 'Voff';
const mineFilterNavnRedigert = 'Mjau';
const forLangtFilterNavn =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum Lorem Ipsum.";
const testFilterNavn = 'Denne brukes til test la stå';

const navDsRadioButtonsSelector = '.navds-radio-buttons';

before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();
    cy.gaTilOversikt('enhetens-oversikt');
    cy.klikkTab('MINE_FILTER');
});

beforeEach('Lag alias for Mine filter: @mineFilter', () => {
    // Aliaset kan hentast med cy.get('@mineFilter').
    // Cypress dobbeltsjekkar at verdien er oppdatert ved bruk av aliaset.
    cy.getByTestId('mine-filter_rad-wrapper').as('mineFilter');
});

describe('Mine filter', () => {
    it('Lagre nytt filter', () => {
        cy.klikkTab('STATUS').then(() => {
            // Vel ufordelte brukarar, sjekkar at vi ser filter-tag etterpå
            cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({force: true});
            cy.getByTestId('filtreringlabel_ufordelte-brukere').should('be.visible');

            // Vel aldersgruppe 0-19 år og sjekkar at filter-tag er synleg
            cy.wait(500);
            cy.getByTestId('sidebar-tab_FILTER').click();
            cy.apneLukkeFilterDropdown('alder');
            cy.getByTestId('filter_0-19').check({force: true});
            cy.getByTestId('filtreringlabel_-19-ar').should('be.visible');

            // Lagrar nytt filter (i staden for å oppdatere eksisterande)
            cy.getByTestId('lagre-filter_knapp').click();
            cy.getByTestId('oppdater-eksisterende-filter_modal_knapp').should('exist');
            cy.getByTestId('lagre-nytt-filter_modal_knapp').should('exist').click();

            /* Testar validering */
            // Prøvar å lagre utan å ha skrive inn data, får feilmelding
            cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
            cy.getByTestId('lagre-nytt-filter_modal_form').contains('Filteret mangler navn.');

            // Skriv inn eit for langt namn, prøvar lagre, får feilmelding
            cy.getByTestId('lagre-nytt-filter_modal_navn-input').type(forLangtFilterNavn, {delay: 0});
            cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
            cy.getByTestId('lagre-nytt-filter_modal_form').contains(
                'Filternavn er for langt, kan ikke ha mer enn 255 bokstaver.'
            );

            // Skriv inn namn som allereie er i bruk, prøvar lagre, får feilmelding
            cy.getByTestId('lagre-nytt-filter_modal_navn-input').clear().type(testFilterNavn);
            cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
            cy.getByTestId('lagre-nytt-filter_modal_form').contains('Filternavn er allerede i bruk.');

            // Lukkar modal, nullstiller test
            cy.getByTestId('egenmodal_header').within(() => {
                cy.get('button').click();
            });
            cy.klikkTab('MINE_FILTER');
        });
    });

    it('Lagring av riktig filternavn', () => {
        // Hentar ut filtera før vi legg til den nye
        cy.get('@mineFilter').then(filterForLeggTil => {
            // Åpnar lagre-modal, lagrar som nytt filter
            cy.getByTestId('lagre-filter_knapp').click();
            cy.getByTestId('lagre-nytt-filter_modal_knapp').should('exist').click();

            // Skriv inn eit gyldig namn, lagrar
            cy.getByTestId('lagre-nytt-filter_modal_navn-input').type(mineFilterNavn);
            cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();

            // Rett fane er open (har rendra innhald), og det nye filteret vårt er synleg
            cy.faneErApen('MINE_FILTER');
            cy.get('@mineFilter').contains(mineFilterNavn);

            // Nyfilteret vårt er valgt, og at begge filtertagsa (+ Nullstill filtervalg) som skal visast er synlege
            cy.getByTestId(`mine-filter-rad_${kebabCase(mineFilterNavn)}`).should('be.checked');
            cy.getByTestId('filtrering_label-container').children().should('have.length', 3);

            // Det er no eit meir filter enn det var før
            cy.get('@mineFilter').should('have.length', filterForLeggTil.length + 1);
        });
    });

    it('Rediger namn på filter', () => {
        // Finn kor mange filter burkaren har laga, så vi kan sjekke at det ikkje endrar seg gjennom testen
        cy.get('@mineFilter').then(mineFilterForRedigering => {
            const antallFilterForRedigering = mineFilterForRedigering.length;

            // Opne redigering for filter "Voff"
            cy.getByTestId(`rediger-filter_knapp_${kebabCase(mineFilterNavn)}`).click();

            // Skriv inn nytt filternamn ("Mjau") og lagre det
            cy.getByTestId('redigere-filter-navn-input').clear().type(mineFilterNavnRedigert);
            cy.getByTestId('rediger-filter_modal_lagre-knapp').click();

            // Sjekk at namnet er oppdatert etter lagring
            cy.get('@mineFilter').contains(mineFilterNavnRedigert);

            // Sjekk at det er to filtertags (+ "Nullstill filtervalg"), og at talet på filter er det same
            cy.getByTestId('filtrering_label-container').children().should('have.length', 3);
            cy.get('@mineFilter').should('have.length', antallFilterForRedigering);
        });
    });

    /* Avhengig av førre test: namn på redigert filter */
    it('Rediger filterverdiar i filter', () => {
        // Finn kor mange filter burkaren har laga, så vi kan sjekke at det ikkje endrar seg gjennom testen
        cy.get('@mineFilter').then(mineFilterForRedigering => {
            // Vel ufordelte brukarar og status-fana
            cy.getByTestId('filtreringlabel_ufordelte-brukere').should('be.visible').click();
            cy.klikkTab('STATUS');

            // Huk av for "Avtalt møte med nav"
            cy.getByTestId('filter_checkboks-container_avtaltMoteMedNav').check({force: true});

            // Ta bort filtreringslabel for 0-19 år
            cy.getByTestId('filtreringlabel_-19-ar').should('be.visible').click();
            cy.getByTestId('filtrering_label-container').children().should('have.length', 2);

            // Trykk på lagre filter og få spørsmål om du vil oppdatere filteret
            cy.getByTestId('lagre-filter_knapp').click();
            cy.getByTestId('mine-filter_modal_oppdater-filter-tekst').contains(mineFilterNavnRedigert);

            // Vel å oppdatere filteret, lagre endringane
            cy.getByTestId('oppdater-eksisterende-filter_modal_knapp').click();
            cy.getByTestId('rediger-filter_modal_lagre-knapp').click();

            // Sjekk at vi kan sjå filtertag "møte med nav i dag" og at talet på filter framleis ikkje har endra seg
            cy.getByTestId('filtreringlabel_mote-med-nav-i-dag').should('be.visible');
            cy.get('@mineFilter').should('have.length', mineFilterForRedigering.length);
        });
    });

    /* Avhengig av førre test: namn på redigert filter */
    it('Slett filter', () => {
        cy.get('@mineFilter').then(filterForSletting => {
            // Opne redigering på filteret vi skal slette ("Mjau")
            cy.getByTestId(`rediger-filter_knapp_${kebabCase(mineFilterNavnRedigert)}`)
                .as('filterSomSkalSlettes')
                .click();

            // Slett filteret
            cy.getByTestId('rediger-filter_modal_slett-knapp').click();
            cy.getByTestId('bekreft-sletting_modal_slett-knapp').click();

            // Sjekk at vi no har færre filter
            cy.get('@mineFilter').should('have.length', filterForSletting.length - 1);
            cy.get('@filterSomSkalSlettes').should('not.exist');
        });
    });

    it('Verifiser fjernet permittert-filter i Min oversikt', () => {
        // Gå til Mine filter
        cy.gaTilOversikt('min-oversikt');
        cy.klikkTab('MINE_FILTER');

        // Sjekk at vi får eit varsel om at filter er fjerna. Lukk varselet.
        cy.getByTestId('mine-filter_alertstripe')
            .should('be.visible')
            .within(() => {
                cy.contains(
                    "'Permitterte filter' er slettet fordi filteret 'Alle utenom permitterte etter 09.03.2020' er fjernet."
                );
                cy.get('button').should('be.visible').click();
            });

        // Varselet er borte etter lukking
        cy.getByTestId('mine-filter_alertstripe').should('not.exist');
    });

    it('Drag and drop - Validering av åpning/lukking av redigering (hengelåsen)', () => {
        // Gå til enhetens oversikt
        cy.gaTilOversikt('enhetens-oversikt');

        // Sjekk at vi ikkje kan sjå ting for endring av rekkefølge når det ikkje er skrudd på
        cy.getByTestId('drag-drop_infotekst').should('not.exist');
        cy.getByTestId('mine-filter_sortering_lagre-knapp').should('not.exist');
        cy.getByTestId('mine-filter_sortering_avbryt-knapp').should('not.exist');
        cy.getByTestId('mine-filter_sortering_nullstill-knapp').should('not.exist');

        // Skru på endring av rekkefølge
        cy.getByTestId('toggle-knapp').click();

        // Skal kunne sjå infotekst og knappar for lagring, avbryt og nullstill.
        cy.getByTestId('drag-drop_infotekst').should('be.visible');
        cy.getByTestId('mine-filter_sortering_lagre-knapp').should('be.visible');
        cy.getByTestId('mine-filter_sortering_avbryt-knapp').should('be.visible');
        cy.getByTestId('mine-filter_sortering_nullstill-knapp').should('be.visible');

        // Skru av endring av rekkefølge
        cy.getByTestId('toggle-knapp').click();

        // Sjekk at ting for endring av rekkefølgje er borte igjen
        cy.getByTestId('drag-drop_infotekst').should('not.exist');
        cy.getByTestId('mine-filter_sortering_lagre-knapp').should('not.exist');
        cy.getByTestId('mine-filter_sortering_avbryt-knapp').should('not.exist');
        cy.getByTestId('mine-filter_sortering_nullstill-knapp').should('not.exist');
    });

    /* Avhengig av tidlegare testar: sikre plassering av element i lista */
    it('Drag and drop - Verifiser lagring', () => {
        // Skru på endring av rekkefølge
        cy.getByTestId('toggle-knapp').click();

        // Sjekkar at vi har testfilteret som tredje element i lista over filter
        cy.getByTestId('mine-filter_radio-container')
            .children()
            .children()
            .first()
            .next()
            .next()
            .contains(testFilterNavn);

        // Finn testfilteret på plass 2 i lista (0-indeksert). Flyttar den to hakk ned.
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 2)
            .click()
            .type('{shift}{downarrow}{downarrow}');

        // Testfilteret er no på plass 4 (sist)
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 4);

        // Lagre rekkefølga, sjekk at vi er ute av plassendringsvisninga
        cy.getByTestId('mine-filter_sortering_lagre-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('not.exist');

        // Testfilteret skal no vere list i lista over filter
        cy.getByTestId('mine-filter_radio-container')
            .get(navDsRadioButtonsSelector)
            .children()
            .last()
            .contains(testFilterNavn);
    });

    /* Avhengig av tidlegare testar: sikre plassering av element i lista */
    it('Drag and drop - Verifiser avbryt-knapp', () => {
        // Skru på redigering av rekkefølge
        cy.getByTestId('toggle-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('be.visible');

        // Finn testfilteret i botnen av lista, flyttar den opp eit hakk
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 4)
            .click()
            .type('{shift}{uparrow}');

        // Sjekkar at den har flytta seg
        cy.getByTestId(`drag-drop_rad_${kebabCase(testFilterNavn)}`)
            .contains(testFilterNavn)
            .should('have.value', 3);

        // Avbryt redigering av rekkefølgje
        cy.getByTestId('mine-filter_sortering_avbryt-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('not.exist');

        // Sjekkar at filteret er på botnen av lista igjen (at endringane ikkje vart lagra)
        cy.getByTestId('mine-filter_radio-container')
            .get(navDsRadioButtonsSelector)
            .children()
            .last()
            .contains(testFilterNavn);
    });

    /* Avhengig av tidlegare testar: sikre plassering av element i lista */
    it('Drag and drop - Verifiser nullstill-knapp', () => {
        // Skru på redigeringsmodus
        cy.getByTestId('toggle-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('be.visible');

        // Nullstill sortering
        cy.getByTestId('mine-filter_sortering_nullstill-knapp').click();

        // Lagre (og lukk redigering)
        cy.getByTestId('mine-filter_sortering_lagre-knapp').click();
        cy.getByTestId('drag-drop_infotekst').should('not.exist');

        // Sjekk at testfilteret er på plass 2 i lista
        cy.getByTestId('mine-filter_radio-container')
            .get(navDsRadioButtonsSelector)
            .children()
            .first()
            .next()
            .contains(testFilterNavn);

        // Fjern filter som var vald (dette har lite med denne testen å gjere eigentleg)

        cy.getByTestId('filtreringlabel_mote-med-nav-i-dag').should('be.visible').click();
    });

    it('Test oppførsel når et lagra filter bruker et tiltaksfilter som ikke finnes lenger', () => {
        cy.get('@mineFilter').then(filterraderForSletting => {
            // Sjekkar at vi finn testfilteret vi skal bruke
            cy.get('@mineFilter').should('contain.text', testFilterNavn);

            // Vel eit lagra filter som inneheld tiltakstypar som ikkje lenger kan brukast
            cy.getByTestId('mine-filter-rad_tiltaksfilter').click({force: true});

            // Får opp ein modal som fortel at tiltakstypen ikkje kan brukast nett no.
            cy.getByTestId('feil-tiltak_modal').should('be.visible');

            // Vel å la filteret vere i lista (lukkar modal)
            cy.getByTestId('la-sta-knapp').click();
            cy.getByTestId('feil-tiltak_modal').should('not.exist');

            // Trykkar på tiltaksfilteret igjen og får opp same modalen
            cy.getByTestId('mine-filter-rad_tiltaksfilter').click({force: true});
            cy.getByTestId('feil-tiltak_modal').should('be.visible');

            // Denne gongen slettar vi filteret
            cy.getByTestId('slett-knapp').click();
            cy.getByTestId('bekreft-sletting_modal_slett-knapp').click();

            // Sjekkar at vi har færre filter enn i starten av testen
            cy.get('@mineFilter').should('have.length', filterraderForSletting.length - 1);
        });
    });
});
