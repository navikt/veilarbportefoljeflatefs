import {kebabCase} from '../../src/utils/utils';

const gruppenavn = 'Voffvoff';
const gruppenavnRedigert = 'Mjaumjau';
const eksisterendeGruppenavn = 'Gruppen brukes til test la stå';
const testnavn1 = 'Aalerud';
const testnavn2 = 'Johansen';
const testnavn3 = 'Aasen';
const minstEnVeileder = 'Du må legge til veiledere.';

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
    // Cypress dobbeltsjekkar at verdien er oppdatert ved bruk av aliaset.
    cy.getByTestId('veiledergruppe_rad-wrapper').as('veiledergrupper');
});

describe('Veiledergrupper', () => {
    it('Lag ny veiledergruppe', () => {
        // Hentar veiledergrupper så vi kan samanlikne kor mange vi har før og etter opprettinga
        cy.get('@veiledergrupper').then(veiledergrupperForOpprettNy => {
            // Opne modal for å lage ny gruppe
            cy.getByTestId('veiledergruppe_ny-gruppe_knapp').click();

            // Søk etter brukar "Andersen" og vel den
            cy.getByTestId('veiledergruppe_modal_sok-veileder-input').type(testnavn1);
            cy.getByTestId('sokfilter-veilederliste_veiledere').as('veilederliste').should('contain', testnavn1);
            cy.get('@veilederliste').should('not.contain', testnavn2);
            cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({force: true});

            // Søk på enno ein brukar og vel den
            cy.getByTestId('veiledergruppe_modal_sok-veileder-input').clear().type(testnavn2);
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

            // Sjekkar at den nye gruppa vart lagt til og at den er vald
            cy.get('@veiledergrupper').should('have.length', veiledergrupperForOpprettNy.length + 1)
                .contains(gruppenavn);
            cy.getByTestId(`veiledergruppe-rad_${kebabCase(gruppenavn)}`).should('be.checked');

            // Sjekkar at brukarane vi la til i gruppa er synlege som filtertags
            cy.getByTestId('filtrering_label-container').children().as('filtreringstags').contains(testnavn1);
            cy.get('@filtreringstags').contains(testnavn2);

            // Gruppa skal også finnast når vi går til vVeilederoversikten
            cy.gaTilOversikt('veileder-oversikt');
            cy.get('@veiledergrupper').contains(gruppenavn);
        });

        // Returnerar til Enhetens oversikt for neste test
        cy.gaTilOversikt('enhetens-oversikt');
    });

    it('Rediger gruppenavn', () => {
        // Henter veiledergrupper så vi kan sjekke at det er like mange før og etter redigering
        cy.get('@veiledergrupper').then(veiledergrupperForRedigering => {
            // Finn knapp, vent 5sek, trykk på den???
            cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavn)}`).click();

            // Ta bort gamalt gruppenamn og skriv inn det nye
            cy.getByTestId('veiledergruppe_modal_gruppenavn-input').clear().type(gruppenavnRedigert);

            // Lagre og få bekrefting på lagring
            cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
            cy.getByTestId('timed-toast_gruppen-er-lagret').contains('Gruppen er lagret');

            // Sjekk at nytt gruppenamn er i lista og at lista har like mange grupper som før
            cy.get('@veiledergrupper').contains(gruppenavnRedigert);
            cy.get('@veiledergrupper').should('have.length', veiledergrupperForRedigering.length);
        });

    });

    it('Rediger filtervalg', () => {
        // Henter veiledergrupper så vi kan sjekke at det er like mange før og etter redigering
        cy.get('@veiledergrupper').then(veiledergrupperForRedigering => {
            // Opne redigering
            cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavnRedigert)}`).click();

            // Ta bort begge dei valde veilederane
            cy.getByTestId('veiledergruppe_modal_valgt-veileder_fjern-knapp').first().click();
            cy.getByTestId('veiledergruppe_modal_valgt-veileder_fjern-knapp').first().click();
            cy.getByTestId('veiledergruppe_modal_antall-valgte-veiledere_0').should('exist');
            cy.getByTestId('veiledergruppe_modal_valgte-veiledere_wrapper').contains('Ingen veiledere lagt til i gruppen');

            // Prøv å lagre utan veiledarar, bli stoppa av validering
            cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
            cy.getByTestId('veiledergruppe_modal_form').contains(minstEnVeileder);

            // Legg til ny veiledar ("Aasen")
            cy.getByTestId('veiledergruppe_modal_sok-veileder-input').type(testnavn3);
            cy.getByTestId('veiledergruppe_modal_veileder-checkbox_0').check({force: true});

            // Lagre
            cy.getByTestId('veiledergruppe_modal_lagre-knapp').click();
            cy.getByTestId('timed-toast_gruppen-er-lagret').should('be.visible').contains('Gruppen er lagret');

            // Sjekk at redigeringa fungerte
            cy.get('@veiledergrupper').should('have.length', veiledergrupperForRedigering.length);
            cy.getByTestId('filtrering_label-container').children().should('have.length', 2).contains(testnavn3);
        });
    });

    it('Slett veiledergruppe', () => {
        cy.get('@veiledergrupper').then(veiledergrupperForSletting => {
            // Opne redigering
            cy.getByTestId(`rediger-veiledergruppe_knapp_${kebabCase(gruppenavnRedigert)}`).click();

            // Slett og bekreft sletting
            cy.getByTestId('veiledergruppe_modal_slette-knapp').click();
            cy.getByTestId('bekreft-sletting_modal_slett-knapp').click();

            // Sjekk at vi får slettebekrefting og no har færre veiledergrupper i lista
            cy.getByTestId('timed-toast_gruppen-er-slettet').should('be.visible').contains('Gruppen er slettet');
            cy.get('@veiledergrupper').should('have.length', veiledergrupperForSletting.length - 1);
        });
    });

    it('Veileder har byttet enhet', () => {
        // Vel ei veiledergruppe, få opp modal med ein gong fordi det er noko i lista brukaren må ta stilling til
        cy.getByTestId(`veiledergruppe-rad_${kebabCase(eksisterendeGruppenavn)}`).click({force: true});
        cy.get('.veiledergruppe_modal_rediger-veiledergruppe').should('be.visible');

        // Vi kan sjå feilmelding
        cy.getByTestId('veiledergruppe_modal_alertstripe')
            .should('be.visible')
            .contains('En eller flere veiledere i gruppen har ikke tilgang lenger, og gruppen er nå lik');

        // Vi avbryt redigering, modalen lukkar seg
        cy.getByTestId('veiledergruppe_modal_avbryt-knapp').click();
        cy.get('.veiledergruppe_modal_rediger-veiledergruppe').should('not.exist');
    });
});
