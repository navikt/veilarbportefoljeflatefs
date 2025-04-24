before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();
});

beforeEach('Gå til veilederoversikten', () => {
    cy.gaTilOversikt('veileder-oversikt');
});

describe('Annen veileder', () => {
    it('Kan sortere tabellen på Antall brukere', () => {
        // Sjekk at veilederoversikten er ferdig med å laste
        cy.getByTestId('veilederoversikt-tabell').should('be.visible');

        // Sjekk at det ikkje er sortert på Antall brukere frå før
        cy.getByTestId('veiledertabell__antall-brukere-overskrift')
            .findByTestId('sorteringspil_synkende')
            .should('not.exist');
        cy.getByTestId('veiledertabell__antall-brukere-overskrift')
            .findByTestId('sorteringspil_stigende')
            .should('not.exist');

        // Trykk på Antall brukere, sjekk at det er blitt sortert stigende
        cy.getByTestId('veiledertabell__antall-brukere-overskrift')
            .find('button')
            .click();
        cy.getByTestId('veiledertabell__antall-brukere-overskrift')
            .findByTestId('sorteringspil_stigende')
            .should('be.visible');

        // Trykk på Antall brukere igjen, no skal det vere sortert synkande
        cy.getByTestId('veiledertabell__antall-brukere-overskrift')
            .find('button')
            .click();
        cy.getByTestId('veiledertabell__antall-brukere-overskrift')
            .findByTestId('sorteringspil_stigende')
            .should('not.exist');
        cy.getByTestId('veiledertabell__antall-brukere-overskrift')
            .findByTestId('sorteringspil_synkende')
            .should('be.visible');
    });

    it('Gå inn til annen veileders oversikt via tabellen', () => {
        // Sjekk at veilederoversikten er ferdig med å laste
        cy.getByTestId('veilederoversikt-tabell').should('be.visible');

        // Det er for få brukarar til å vise 200 per side, så knappen er deaktivert
        cy.getByTestId('vis-200-per-side_knapp').should('be.disabled');

        // Trykk på ein veileder, då skal ein sjå oversikten til den veiledaren
        cy.getByTestId('veilederoversikt_navn_lenke')
            .contains('Testesen, Testias')
            .click();
        cy.getByTestId('annen-veileder_infotekst')
            .should('be.visible')
            .should('contain', 'Du er inne på Testias Testesen sin oversikt');
    });

    it('Søk veileder i veilederoversikt', () => {
        const veilederSomfinnes = 'Olstad';
        const veilederSomIkkeFinnes = 'Olstadzzz';

        cy.getByTestId('veilederoversikt_sok-veileder-input').click();
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste')
            .get('.navds-checkboxes')
            .children()
            .should('have.length', 41);
        cy.getByTestId('veilederoversikt_sok-veileder-input').type(veilederSomIkkeFinnes);
        cy.getByTestId('veilederoversikt_alertstripe_info')
            .should('contain', 'Ingen veiledere funnet')
            .should('be.visible');
        cy.getByTestId('veilederoversikt_sok-veileder-input')
            .click()
            .clear()
            .type(veilederSomfinnes);
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste')
            .get('.navds-checkboxes')
            .children()
            .should('have.length', 1);
        cy.getByTestId('veileder-checkbox-filterform_nullstill-knapp').should('be.disabled');
        cy.getByTestId('veilederoversikt_veilederliste_tbody')
            .children()
            .should('have.length', 41);

        cy.checkbox('veilederoversikt_sok-veileder_veilederliste_element_0');
        cy.getByTestId('veilederoversikt_sok-veileder_veilederliste_element_0').should('be.checked');
        cy.getByTestId('veilederoversikt_veilederliste_tbody')
            .children()
            .should('have.length', 1);

        cy.getByTestId('veileder-checkbox-filterform_nullstill-knapp')
            .should('be.enabled')
            .click();

        cy.getByTestId('veilederoversikt_veilederliste_tbody')
            .children()
            .should('have.length', 41);
    });
});
