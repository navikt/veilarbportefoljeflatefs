import React from "react";

const mineFilterNavn = "Voff";
const mineFilterNavnRedigert = "Mjau";
const forLangtFilterNavn = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum Lorem Ipsum.";
const eksisterendeFilterNavn = "Denne brukes til test, la stå";

describe('Lag nytt filter', () => {
    it('Start server', () => {
        cy.configure();
    })
    it('Det skal være 5 filtre i Mine filter', () => {
        cy.getByTestId('sidebar-tab_MINE_FILTER').click();
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 5);
    })
    it('Klikk på status-tab', () => {
        cy.klikkTab("STATUS");
    })
    it('Filtrer på ufordelte brukere', () => {
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({force: true});
    })
    it('Etiketten for ufordelte brukere vises', () => {
        cy.getByTestId('filtreringlabel').contains("Ufordelte brukere");
    })
    it('Gå til Filter i sidebaren', () => {
        cy.getByTestId('sidebar-tab_FILTER').click();
    })
    it('Filtrer på alder: under 19', () => {
        cy.getByTestId('dropdown-knapp_Alder').click();
        cy.getByTestId('filter_19-og-under').check({force: true});
    })
    it('Trykk på velg', () => {
        cy.getByTestId('checkbox-filterform_velg-knapp').click();
    })
    it('Etiketten for ≤ 19 år vises', () => {
        cy.getByTestId('filtreringlabel').contains("≤ 19 år");
    })
    it('Klikk Lagre filter-knapp', () => {
        cy.getByTestId('lagre-filter_knapp').click();
    })
    it('Klikk lagre som nytt filter', () => {
        cy.getByTestId('lagre-nytt-filter_modal_knapp').click();
    })
    it('Validering: Tomt filternavn', () => {
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains('Filteret mangler navn.');
    })
    it('Validering: For langt filternavn', () => {
        cy.getByTestId('lagre-nytt-filter_modal_navn-input').type(forLangtFilterNavn);
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains('Filternavn er for langt, kan ikke ha mer enn 255 bokstaver.');
    })
    it('Validering: Eksisterende filternavn', () => {
        cy.getByTestId('lagre-nytt-filter_modal_navn-input').clear().type(eksisterendeFilterNavn);
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
        cy.getByTestId('lagre-nytt-filter_modal_form').contains('Filternavn er allerede i bruk.');
    })
    it('Skriv inn filternavn', () => {
        cy.getByTestId('lagre-nytt-filter_modal_navn-input').clear().type(mineFilterNavn);
    })
    it('Klikk lagre', () => {
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click();
    })
    it('Mine filter-tab er åpen', () => {
        cy.getByTestId('sidebar-tab_MINE_FILTER')
            .should("have.class", "sidebar__tab-valgt");
    })
    it('Nytt filter er valgt', () => {
        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavn);
        cy.getByTestId(`mine-filter-rad_${mineFilterNavn}`).should('be.checked');
    })
    it('Etikettene viser to filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 2);
    })
    it('Det skal være 6 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 6);
    })
})

describe('Rediger filternavn', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-filter_knapp_${mineFilterNavn}`).click();
    })
    it('Skriv inn nytt navn', () => {
        cy.getByTestId('redigere-filter-navn-input').clear().type(mineFilterNavnRedigert);
    })
    it('Klikk lagre', () => {
        cy.getByTestId('rediger-filter_modal_lagre-knapp').click();
    })
    it('Filternavn skal være oppdatert', () => {
        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavnRedigert);
    })
    it('Etikettene viser to filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 2);
    })
    it('Det skal være 6 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 6);
    })
})

describe('Rediger filtervalg', () => {
    it('Fjern etikett med ufordelte brukere', () => {
        cy.getByTestId('filtreringlabel').contains("Ufordelte brukere").click();
    })
    it('Klikk på status-tab', () => {
        cy.klikkTab('STATUS');
    })
    it('Legg til filter', () => {
        cy.getByTestId('filter_checkboks-container_avtaltMoteMedNav').check({force: true});
    })
    it('Fjern etikett med ufordelte brukere', () => {
        cy.getByTestId('filtreringlabel').contains("≤ 19 år").click();
    })
    it('Klikk Lagre filter-knapp', () => {
        cy.getByTestId('lagre-filter_knapp').click();
    })
    it('Teksten i modalen skal inneholde riktig filternavn', () => {
        cy.getByTestId('mine-filter_modal_oppdater-filter-tekst').contains(mineFilterNavnRedigert);
    })
    it('Klikk oppdater eksisterende filter-knapp', () => {
        cy.getByTestId('oppdater-eksisterende-filter_modal_knapp').click();
    })
    it('Klikk lagre', () => {
        cy.getByTestId('rediger-filter_modal_lagre-knapp').click();
    })
    it('Etikettene viser Møte med NAV i dag', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 1).contains("Møte med NAV idag");
    })
    it('Det skal være 6 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 6);
    })
})

describe('Slett lagret filter', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-filter_knapp_${mineFilterNavnRedigert}`).click();
    })
    it('Slett filter', () => {
        cy.getByTestId('rediger-filter_modal_slett-knapp').click();
    })
    it('Bekreft sletting', () => {
        cy.wait(2000);
        cy.getByTestId('bekreft-sletting_modal_slett-knapp').click();
    })
    it('Det skal være 5 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 5);
    })
})

//TODO drag and drop
xdescribe('Sjekk at drag and drop funker', () => {
    it('Klikk på mine filter-tab', () => {
        cy.klikkTab("MINE_FILTER");
    })
    it('Klikk på hengelåsen', () => {
        cy.getByTestId('toggle-knapp').click();
    })
    it('Dra øverste filter til nederste rad', () => {
        cy.getByTestId('drag-drop_rad').contains("UfordelteBrukere")
            .trigger('mousedown', {which: 1})
            .trigger('mousemove', {clientX: 340, clientY: 130})
            .trigger('mouseup', {force: true})

        cy.getByTestId('drag-drop_rad').contains("UfordelteBrukere").should("have.value", 4);
    })
    it('Ufordelte brukere skal ha fokus', () => {
        cy.getByTestId('drag-drop_rad').contains('UfordelteBrukere').should("have.focus");
    })
    it('Klikk øverste filter til nederste rad', () => {
        cy.getByTestId('drag-drop_rad').contains('UfordelteBrukere').should("have.value", 0);
        cy.getByTestId('flytt-knapp_ned_0').should("be.visible");
        cy.getByTestId('flytt-knapp_ned_0').click();
        cy.getByTestId('drag-drop_rad').contains('UfordelteBrukere').should("have.value", 1);

    })
})

//TODO sjekk at filter som ikke skal være i min oversikt ikke er der
//TODO sjekk at filter som ikke skal være i enhetens oversikt ikke er der
