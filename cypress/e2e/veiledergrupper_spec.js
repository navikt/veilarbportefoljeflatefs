import {kebabCase} from '../../src/utils/utils';

const gruppenavn = 'Voffvoff';
const gruppenavnRedigert = 'Mjaumjau';
const eksisterendeGruppenavn = 'Gruppen brukes til test la stå';
const andersen = 'Andersen';
const johansen = 'Johansen';
const aasen = 'Aasen';
const minstEnVeileder = 'Du må legge til veiledere.';
let antallVeiledergrupper = 0;

before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();

    // Går til veiledergruppefana
    cy.gaTilOversikt('enhetens-oversikt');
    cy.klikkTab('VEILEDERGRUPPER');
});

beforeEach('Lag alias for veiledergrupper: @veiledergrupper', () => {
    // Aliaset kan hentast med cy.get('@veiledergrupper').
    // Cypress dobbeltsjekkar at verdien er oppdatert ved kall av aliaset.
    cy.getByTestId('veiledergruppe_rad-wrapper').as('veiledergrupper');
});

describe('Veiledergrupper', () => {
    it('Verifiser antall grupper', () => {
        // Tel kor mange det er, og lagre dei i ein ekstern variabel
        cy.get('@veiledergrupper').then(ant => {
            antallVeiledergrupper += Cypress.$(ant).length;
        });
    });

    // Tel akkurat det same som i førre test og sjekk at det ikkje har endra seg?
    it('Det skal være riktig antall veiledergrupper ', () => {
        cy.get('@veiledergrupper').should('have.length', antallVeiledergrupper);
    });

    it('Lag ny veiledergruppe', () => {
        // Hentar veiledergrupper så vi kan samanlikne kor mange vi har før og etter testen
        cy.get('@veiledergrupper').then(veiledergrupperForOpprettNy => {

            // Opne modal for å lage ny gruppe
            cy.getByTestId('veiledergruppe_ny-gruppe_knapp').click();

            // Søk etter brukar "Andersen" og vel den
            cy.getByTestId('veiledergruppe_modal_sok-veileder-input').type(andersen);
            cy.getByTestId('sokfilter-veilederliste_veiledere').as('veilederliste').should('contain', andersen);
            cy.get('@veilederliste').should('not.contain', johansen);
            cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({force: true});

            // Søk på enno ein brukar og vel den
            cy.getByTestId('veiledergruppe_modal_sok-veileder-input').clear().type(johansen);
            cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({force: true});

            // Prøvar å lagre endringar utan gruppenamn, blir stoppa av validering
            cy.getByTestId('veiledergruppe_modal_gruppenavn-input').should('have.value', '');
            cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
            cy.getByTestId('veiledergruppe_modal_form').contains('Gruppen mangler navn, legg inn gruppenavn.');

            // Testar validering på gruppenamn som allereie er i bruk
            cy.getByTestId('veiledergruppe_modal_gruppenavn-input').type(eksisterendeGruppenavn);
            cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
            cy.getByTestId('veiledergruppe_modal_form').contains('Gruppenavn er allerede i bruk.');

            // Skriv inn gyldig gruppnamn, lagrar, får bekrefting
            cy.getByTestId('veiledergruppe_modal_gruppenavn-input').clear().type(gruppenavn);
            cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
            cy.getByTestId('timed-toast_gruppen-er-opprettet').contains('Gruppen er opprettet');

            // Sjekkar at den nye gruppa vart lagt til og at den er valgt
            cy.get('@veiledergrupper').should('have.length', veiledergrupperForOpprettNy.length + 1)
                .contains(gruppenavn);
            cy.getByTestId(`veiledergruppe-rad_${kebabCase(gruppenavn)}`).should('be.checked');

            // Sjekkar at brukarane vi la til i gruppa er synlege som filtertags
            cy.getByTestId('filtrering_label-container').children().as('filtreringstags').contains(andersen);
            cy.get('@filtreringstags').contains(johansen);

            // Gruppa skal også finnast når vi går til vVeilederoversikten
            cy.gaTilOversikt('veileder-oversikt');
            cy.get('@veiledergrupper').contains(gruppenavn);
        });

        // Returnerar til Enhetens oversikt for neste test
        cy.gaTilOversikt('enhetens-oversikt');
    });

    it('Rediger gruppenavn', () => {
        cy.get('@veiledergrupper').then(veiledergrupperForRedigering => {
            // Finn knapp, vent 5sek, trykk på den???
            cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavn)}`).click();

            // Ta bort gamalt gruppenamn og skriv inn det nye
            cy.getByTestId('veiledergruppe_modal_gruppenavn-input').clear().type(gruppenavnRedigert);

            // Lagre og få bekrefting på lagring
            cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
            cy.getByTestId('timed-toast_gruppen-er-lagret').contains('Gruppen er lagret');

            // Sjekk at nytt gruppenamn er i lista, og at det ikkje har blitt fleire grupper etter redigering
            cy.get('@veiledergrupper').contains(gruppenavnRedigert);
            cy.get('@veiledergrupper').should('have.length', veiledergrupperForRedigering.length);
        });

    });

    it('Rediger filtervalg', () => {
        cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavnRedigert)}`).click();

        cy.getByTestId('veiledergruppe_modal_valgt-veileder_fjern-knapp').first().click();

        cy.getByTestId('veiledergruppe_modal_valgt-veileder_fjern-knapp').first().click();

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

        cy.getByTestId('timed-toast_gruppen-er-lagret').should('be.visible').contains('Gruppen er lagret');

        cy.getByTestId('filtrering_label-container').children().should('have.length', 1).contains(aasen);
    });

    it('Slett veiledergruppe', () => {
        cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavnRedigert)}`).click();

        cy.getByTestId('veiledergruppe_modal_slette-knapp').click();

        cy.getByTestId('bekreft-sletting_modal_slett-knapp').click();

        cy.getByTestId('veiledergruppe_rad-wrapper').should('have.length', antallVeiledergrupper);

        cy.getByTestId('timed-toast_gruppen-er-slettet').should('be.visible').contains('Gruppen er slettet');
    });

    it('Veileder har byttet enhet', () => {
        cy.getByTestId(`veiledergruppe-rad_${kebabCase(eksisterendeGruppenavn)}`).click({force: true});

        cy.get('.veiledergruppe_modal_rediger-veiledergruppe').should('be.visible');

        cy.getByTestId('veiledergruppe_modal_alertstripe')
            .should('be.visible')
            .contains('En eller flere veiledere i gruppen har ikke tilgang lenger, og gruppen er nå lik');

        cy.getByTestId('veiledergruppe_modal_avbryt-knapp').click();

        cy.get('.veiledergruppe_modal_rediger-veiledergruppe').should('not.exist');

        cy.getByTestId('filtreringlabel_nullstill-filtervalg').should('be.visible').click();
    });
});
