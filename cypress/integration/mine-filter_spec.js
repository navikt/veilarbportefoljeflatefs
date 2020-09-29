import React from "react";

const mineFilterNavn = "Voff";
const mineFilterNavnRedigert = "Mjau";


describe('Lag nytt filter', () => {
    it('Start system', () => {
        cy.start();
    })
    it('Sjekk at det er 5 filtre i Mine filter', () => {
        cy.getByTestId('sidebar-tab_MINE_FILTER').click()
        cy.getByTestId('mine-filter-rad-wrapper').should('have.length', 5)
    })
    it('Klikk på status-tab', () => {
        cy.klikkTab("STATUS")
    })
    it('Filtrer på ufordelte brukere', () => {
        cy.getByTestId('filter-checkboks-container_ufordeltebruker').check({force: true})
    })
    it('Sjekk at etiketten for ufordelte brukere er der', () => {
        cy.getByTestId('filtreringlabel').contains("Ufordelte brukere")
    })
    it('Gå til Filter i sidebaren', () => {
        cy.getByTestId('sidebar-tab_FILTER').click()
    })
    it('Filtrer på alder: under 19', () => {
        cy.getByTestId('Alder-dropdown-knapp').click()
        cy.getByTestId('filter_19-og-under').check({force: true})
    })
    it('Trykk på velg', () => {
        cy.getByTestId('checkbox-filterform__velg-knapp').click()
    })
    it('Sjekk at etiketten for ≤ 19 år er der', () => {
        cy.getByTestId('filtreringlabel').contains("≤ 19 år")
    })
    it('Klikk Lagre filter-knapp', () => {
        cy.getByTestId('lagre-filter-knapp').click()
    })
    it('Klikk lagre som nytt filter', () => {
        cy.getByTestId('lagre-nytt-filter-modal-knapp').click()
    })
    it('Skriv inn filternavn', () => {
        cy.getByTestId('lagre-nytt-filter-navn-input').type(mineFilterNavn)
    })
    it('Klikk lagre', () => {
        cy.getByTestId('lagre-nytt-filter-modal-lagre-knapp').click()
    })
    it('Sjekk at Mine filter er åpen', () => {
        cy.getByTestId('sidebar-tab_MINE_FILTER')
            .should("have.class", "sidebar__tab-valgt")
    })
    it('Sjekk at nytt filter er valgt', () => {
        cy.getByTestId('mine-filter-rad-wrapper').contains(mineFilterNavn)
        cy.getByTestId(`mine-filter-rad_${mineFilterNavn}`).should('be.checked')
    })
    it('Sjekk at det er to filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 2)
    })
    it('Sjekk at det er 6 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter-rad-wrapper').should('have.length', 6)
    })
})

describe('Rediger filternavn', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-filter-knapp_${mineFilterNavn}`).click()
    })
    it('Skriv inn nytt navn', () => {
        cy.getByTestId('redigere-filter-navn-input').clear().type(mineFilterNavnRedigert)
    })
    it('Klikk lagre', () => {
        cy.getByTestId('rediger-filter-modal-lagre-knapp').click()
    })
    it('Sjekk at filternavn er oppdatert', () => {
        cy.getByTestId('mine-filter-rad-wrapper').contains(mineFilterNavnRedigert)
    })
    it('Sjekk at det er to filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 2)
    })
    it('Sjekk at det er 6 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter-rad-wrapper').should('have.length', 6)
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
        cy.getByTestId('filter-checkboks-container_avtaltMoteMedNav').check({force: true})
    })
    it('Fjern etikett med ufordelte brukere', () => {
        cy.getByTestId('filtreringlabel').contains("≤ 19 år").click()
    })
    it('Klikk Lagre filter-knapp', () => {
        cy.getByTestId('lagre-filter-knapp').click()
    })
    it('Sjekk at teksten i modalen inneholder riktig filternavn', () => {
        cy.getByTestId('mine-filter-modal-oppdater-filter-tekst').contains(mineFilterNavnRedigert)
    })
    it('Klikk oppdater eksisterende filter-knapp', () => {
        cy.getByTestId('oppdater-eksisterende-filter-modal-knapp').click()
    })
    it('Klikk lagre', () => {
        cy.getByTestId('rediger-filter-modal-lagre-knapp').click()
    })
    it('Sjekk at det er ett filtervalg', () => {
        cy.getByTestId('filtreringlabel').should('have.length', 1).contains("Møte med NAV idag")
    })
    it('Sjekk at det er 6 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter-rad-wrapper').should('have.length', 6)
    })
})

describe('Slett lagret filter', () => {
    it('Klikk på blyantsymbolet', () => {
        cy.getByTestId(`rediger-filter-knapp_${mineFilterNavnRedigert}`).click()
    })
    it('Slett filter', () => {
        cy.getByTestId('rediger-filter-modal-slette-knapp').click()
    })
    it('Bekreft sletting', () => {
        cy.wait(2000)
        cy.getByTestId('bekreft-sletting-modal-slett-knapp').click()
    })
    it('Sjekk at det er 5 filtre i Mine filter', () => {
        cy.getByTestId('mine-filter-rad-wrapper').should('have.length', 5)
    })
})
