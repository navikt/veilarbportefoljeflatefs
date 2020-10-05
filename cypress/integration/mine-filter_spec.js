import React from "react";

const mineFilterNavn = "Voff";
const mineFilterNavnRedigert = "Mjau";

describe('Lag nytt filter', () => {
    it('Start server', () => {
        cy.configure();
    })
    it('Sjekk at det er 5 filtre i Mine filter', () => {
        cy.getByTestId('sidebar-tab_MINE_FILTER').click()
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 5)
    })
    it('Klikk på status-tab', () => {
        cy.klikkTab("STATUS")
    })
    it('Filtrer på ufordelte brukere', () => {
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({force: true})
    })
    it('Sjekk at etiketten for ufordelte brukere er der', () => {
        cy.getByTestId('filtreringlabel').contains("Ufordelte brukere")
    })
    it('Gå til Filter i sidebaren', () => {
        cy.getByTestId('sidebar-tab_FILTER').click()
    })
    it('Filtrer på alder: under 19', () => {
        cy.getByTestId('dropdown-knapp_Alder').click()
        cy.getByTestId('filter_19-og-under').check({force: true})
    })
    it('Trykk på velg', () => {
        cy.getByTestId('checkbox-filterform_velg-knapp').click()
    })
    it('Sjekk at etiketten for ≤ 19 år er der', () => {
        cy.getByTestId('filtreringlabel').contains("≤ 19 år")
    })
    it('Klikk Lagre filter-knapp', () => {
        cy.getByTestId('lagre-filter_knapp').click()
    })
    it('Klikk lagre som nytt filter', () => {
        cy.getByTestId('lagre-nytt-filter_modal_knapp').click()
    })
    it('Skriv inn filternavn', () => {
        cy.getByTestId('lagre-nytt-filter_modal_navn-input').type(mineFilterNavn)
    })
    it('Klikk lagre', () => {
        cy.getByTestId('lagre-nytt-filter_modal_lagre-knapp').click()
    })
    //TODO forvente route 500/200
    it('Sjekk at Mine filter er åpen', () => {
        cy.getByTestId('sidebar-tab_MINE_FILTER')
            .should("have.class", "sidebar__tab-valgt")
    })
    it('Sjekk at Mine filter er åpen', () => {
        cy.getByTestId('sidebar-tab_MINE_FILTER')
            .should("have.class", "sidebar__tab-valgt")
    })
    it('Sjekk at nytt filter er valgt', () => {
        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavn)
        cy.getByTestId(`mine-filter-rad_${mineFilterNavn}`).should('be.checked')
    })
    it('Sjekk at det er to filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 2)
    })
    it('Sjekk at det er 6 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 6)
    })
})

describe('Rediger filternavn', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-filter_knapp_${mineFilterNavn}`).click()
    })
    it('Skriv inn nytt navn', () => {
        cy.getByTestId('redigere-filter-navn-input').clear().type(mineFilterNavnRedigert)
    })
    it('Klikk lagre', () => {
        cy.getByTestId('rediger-filter_modal_lagre-knapp').click()
    })
    it('Sjekk at filternavn er oppdatert', () => {
        cy.getByTestId('mine-filter_rad-wrapper').contains(mineFilterNavnRedigert)
    })
    it('Sjekk at det er to filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 2)
    })
    it('Sjekk at det er 6 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 6)
    })
})

describe('Rediger filtervalg', () => {
    it('Fjern etikett med ufordelte brukere', () => {
        cy.getByTestId('filtreringlabel').contains("Ufordelte brukere").click()
    })
    it('Klikk på status-tab', () => {
        cy.klikkTab('STATUS')
    })
    it('Legg til filter', () => {
        cy.getByTestId('filter_checkboks-container_avtaltMoteMedNav').check({force: true})
    })
    it('Fjern etikett med ufordelte brukere', () => {
        cy.getByTestId('filtreringlabel').contains("≤ 19 år").click()
    })
    it('Klikk Lagre filter-knapp', () => {
        cy.getByTestId('lagre-filter_knapp').click()
    })
    it('Sjekk at teksten i modalen inneholder riktig filternavn', () => {
        cy.getByTestId('mine-filter_modal_oppdater-filter-tekst').contains(mineFilterNavnRedigert)
    })
    it('Klikk oppdater eksisterende filter-knapp', () => {
        cy.getByTestId('oppdater-eksisterende-filter_modal_knapp').click()
    })
    it('Klikk lagre', () => {
        cy.getByTestId('rediger-filter_modal_lagre-knapp').click()
    })
    it('Sjekk at det er ett filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 1).contains("Møte med NAV idag")
    })
    it('Sjekk at det er 6 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 6)
    })
})

describe('Slett lagret filter', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-filter_knapp_${mineFilterNavnRedigert}`).click()
    })
    it('Slett filter', () => {
        cy.getByTestId('rediger-filter_modal_slett-knapp').click()
    })
    it('Bekreft sletting', () => {
        cy.wait(2000)
        cy.getByTestId('bekreft-sletting_modal_slett-knapp').click()
    })
    it('Sjekk at det er 5 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter_rad-wrapper').should('have.length', 5)
    })
})

//TODO drag and drop
xdescribe('Sjekk at drag and drop funker', () => {
    it('Klikk på mine filter-tab', () => {
        cy.klikkTab("MINE_FILTER")
    })
    it('Klikk på hengelåsen', () => {
        cy.getByTestId('toggle-knapp').click()
    })
    it('Dra øverste filter til nederste rad', () => {
        cy.getByTestId('drag-drop_rad').contains("UfordelteBrukere")
            .trigger('mousedown', {which: 1})
            .trigger('mousemove', {clientX: 340, clientY: 130})
            .trigger('mouseup', {force: true})

        cy.getByTestId('drag-drop_rad').contains("UfordelteBrukere").should("have.value", 4)

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
