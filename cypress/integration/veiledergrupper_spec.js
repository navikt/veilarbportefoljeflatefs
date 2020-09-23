import React from "react";

const mineFilterNavn = "Voff";
const mineFilterNavnRedigert = "Mjau";

//TODO bør få dette over i commands.js-filen, men den kjører foreløpig ikke med Cypress run
describe('Start ting', () => {
    it('Åpne browser med oversikten', () => {
        cy.server();
        cy.visit('/')
        cy.url().should('include', '/veilarbportefoljeflatefs/enhet')
        Cypress.on('uncaught:exception', (err) => {
            console.log(err);
            return false;
        })
        cy.get('[data-testid=enhetens-oversikt]').contains('Enhetens oversikt')
            .should('exist')
    })
})

describe('Lag ny veiledergruppe', () => {
    it('Sjekk at det er 5 filtre i Mine filter', () => {
        cy.get('[data-testid=sidebar-tab_VEILEDERGRUPPER]').click()
        cy.get('[data-testid=mine-filter-rad-wrapper]').should('have.length', 5)
    })
    // it('Gå til Status i sidebaren', () => {
    //     cy.get('[data-testid=sidebar-tab_STATUS]').click()
    // })
    // it('Filtrer på ufordelte brukere', () => {
    //     cy.get('[data-testid=filter-checkboks-container_ufordeltebruker]').check({force: true})
    // })
    // it('Sjekk at etiketten for ufordelte brukere er der', () => {
    //     cy.get('[data-testid=filtreringlabel]').contains("Ufordelte brukere")
    // })
    // it('Gå til Filter i sidebaren', () => {
    //     cy.get('[data-testid=sidebar-tab_FILTER]').click()
    // })
    // it('Filtrer på alder: under 19', () => {
    //     cy.get('[data-testid=Alder-dropdown-knapp]').click()
    //     cy.get('[data-testid=filter_19-og-under]').check({force: true})
    // })
    // it('Trykk på velg', () => {
    //     cy.get('[data-testid=checkbox-filterform__velg-knapp]').click()
    // })
    // it('Sjekk at etiketten for <= 19 år er der', () => {
    //     cy.get('[data-testid=filtreringlabel]').contains("≤ 19 år")
    // })
    // it('Klikk Lagre filter-knapp', () => {
    //     cy.get('[data-testid=lagre-filter-knapp]').click()
    // })
    // it('Klikk lagre som nytt filter', () => {
    //     cy.get('[data-testid=lagre-nytt-filter-modal-knapp]').click()
    // })
    // it('Skriv inn filternavn', () => {
    //     cy.get('[data-testid=lagre-nytt-filter-navn-input]').type(mineFilterNavn)
    // })
    // it('Klikk lagre', () => {
    //     cy.get('[data-testid=lagre-nytt-filter-modal-lagre-knapp]').click()
    // })
    // it('Sjekk at Mine filter er åpen', () => {
    //     cy.get('[data-testid=sidebar-tab_MINE_FILTER]')
    //         .should("have.class", "sidebar__tab-valgt")
    // })
    // it('Sjekk at nytt filter er valgt', () => {
    //     cy.get('[data-testid=mine-filter-rad-wrapper]')
    //         .contains(mineFilterNavn)
    //     cy.get(`[data-testid=mine-filter-rad_${mineFilterNavn}]`)
    //         .should('be.checked')
    // })
    // it('Sjekk at det er to filtervalg', () => {
    //     cy.get('[data-testid=filtreringlabel]').should('have.length', 2)
    // })
    // it('Sjekk at det er 6 filtre i Mine filter', () => {
    //     cy.get('[data-testid=mine-filter-rad-wrapper]').should('have.length', 6)
    // })
})

// describe('Rediger filternavn', () => {
//     it('Klikk på blyantsymbolet', () => {
//         cy.get(`[data-testid=rediger-filter-knapp_${mineFilterNavn}]`).click()
//     })
//     it('Skriv inn nytt navn', () => {
//         cy.get('[data-testid=redigere-filter-navn-input]').clear().type(mineFilterNavnRedigert)
//     })
//     it('Klikk lagre', () => {
//         cy.get('[data-testid=rediger-filter-modal-lagre-knapp]').click()
//     })
//     it('Sjekk at filternavn er oppdatert', () => {
//         cy.get('[data-testid=mine-filter-rad-wrapper]')
//             .contains(mineFilterNavnRedigert)
//     })
//     it('Sjekk at det er to filtervalg', () => {
//         cy.get('[data-testid=filtreringlabel]').should('have.length', 2)
//     })
//     it('Sjekk at det er 6 filtre i Mine filter', () => {
//         cy.get('[data-testid=mine-filter-rad-wrapper]').should('have.length', 6)
//     })
// })
//
// describe('Rediger filtervalg', () => {
//     it('Fjern etikett med ufordelte brukere', () => {
//         cy.get('[data-testid=filtreringlabel]').contains("Ufordelte brukere").click()
//     })
//     it('Klikk Lagre filter-knapp', () => {
//         cy.get('[data-testid=lagre-filter-knapp]').click()
//     })
//     it('Sjekk at teksten i modalen inneholder riktig filternavn', () => {
//         cy.get('[data-testid=mine-filter-modal-oppdater-filter-tekst]').contains(mineFilterNavnRedigert)
//     })
//     it('Klikk oppdater eksisterende filter-knapp', () => {
//         cy.get('[data-testid=oppdater-eksisterende-filter-modal-knapp]').click()
//     })
//     it('Klikk lagre', () => {
//         cy.get('[data-testid=rediger-filter-modal-lagre-knapp]').click()
//     })
//     it('Sjekk at det er ett filtervalg', () => {
//         cy.get('[data-testid=filtreringlabel]').should('have.length', 1)
//     })
//     it('Sjekk at det er 6 filtre i Mine filter', () => {
//         cy.get('[data-testid=mine-filter-rad-wrapper]').should('have.length', 6)
//     })
// })
//
// describe('Slett lagret filter', () => {
//     it('Klikk på blyantsymbolet', () => {
//         cy.get(`[data-testid=rediger-filter-knapp_${mineFilterNavnRedigert}]`).click()
//     })
//     it('Slett filter', () => {
//         cy.get('[data-testid=rediger-filter-modal-slette-knapp]').click()
//     })
//     it('Bekreft sletting', () => {
//         cy.wait(2000)
//         cy.get('[data-testid=bekreft-sletting-modal-slett-knapp]').click()
//     })
//     it('Sjekk at det er 5 filtre i Mine filter', () => {
//         cy.get('[data-testid=mine-filter-rad-wrapper]').should('have.length', 5)
//     })
// })
