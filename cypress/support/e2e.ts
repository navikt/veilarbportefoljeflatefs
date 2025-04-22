// ***********************************************************
// This example support/index.js (aka e2e.ts) is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

declare global {
    namespace Cypress {
        type Sidemenyfaner = 'STATUS' | 'FILTER' | 'MINE_FILTER' | 'VEILEDERGRUPPER';

        interface Chainable {
            /**
             * Går til Enhetens oversikt (og sjekkar at den kom dit fint).
             * Mockar også ut feature-kallet.
             * @example cy.configure()
             */
            configure(): Chainable<JQuery<HTMLElement>>;

            /**
             * Henter DOM-elementet som har ein bestemt test-id
             * @example cy.getByTestId('testid-for-eit-element')
             */
            getByTestId(testid: string): Chainable<JQuery<HTMLElement>>;

            /**
             * Henter DOM-elementet som har ein bestemt test-id
             * og er inni det førre DOM-elementet i "kjeda".
             * Kan brukast til å finne element inni andre element, sjølv når dei ikkje er direkte etterkommarar
             * av det ytste elementet.
             * @example cy.get('selector-for-forelder').findByTestId('testid-for-eit-element')
             */
            findByTestId(testid: string): Chainable<JQuery<HTMLElement>>;

            /**
             * Navigerer til ei av oversiktssidene ved å trykke på "fana". Sjekker at den kom fram.
             * (Denne har per 2025-02-05 mykje spanande logikk eg trur ikkje er strengt naudsynt,
             * sjå kommentarar i "Cypress.Commands.add"-funksjonen for detaljer. - Ingrid)
             * @example cy.gaTilOversikt('min-oversikt')
             */
            gaTilOversikt(side: 'min-oversikt' | 'enhetens-oversikt' | 'veileder-oversikt'): Chainable<string>;

            /**
             * Sjekkar om ei bestemt sidemenyfane er open.
             * @example cy.faneErApen('STATUS')
             */
            faneErApen(tab: Sidemenyfaner): Chainable<JQuery<HTMLElement>>;

            /**
             * Sjekkar om ei bestemt sidemenyfane er lukka.
             * @example cy.faneErLukket('STATUS')
             */
            faneErLukket(tab: Sidemenyfaner): Chainable<JQuery<HTMLElement>>;


            /**
             * Trykker på ei bestemt sidemenyfane
             * @example cy.klikkPaSidebarTab('STATUS')
             */
            klikkPaSidebarTab(tab: Sidemenyfaner): Chainable<JQuery<HTMLElement>>;

            /**
             * Trykker på ei bestemt sidemenyfane, dersom den ikkje er open frå før. Sjekkar om det fungerte ved å sjå
             * at fana har innhald.
             * Om fana ikkje er lukka sjekkar ein at den er open ved å sjå på overskrifta.
             * Returnerer anten faneinnhald eller -overskrift.
             * (Treng vi to "klikk på fane"-funksjonar? Og treng denne returnere noko, når det er så ulikt kva den returnerer?)
             * @example cy.klikkTab('STATUS')
             */
            klikkTab(tab: Sidemenyfaner): Chainable<JQuery<HTMLElement>>;


            /**
             * Hukar av checkbox med innsedt test-id.
             * Sjekkar først at den ikkje er huka av. Set 'checked' til true. Sjekkar at den er huka av.
             * @example cy.checkbox('testid-pa-ein-checkbox')
             */
            checkbox(testid: string): Chainable<JQuery<HTMLElement>>;

            /**
             * Finn og hukar av fyrste checkbox med testid som ikkje er deaktivert (disabled)
             * @example cy.checkboxFirst('min-oversikt_brukerliste-checkbox')
             */
            checkboxFirst(testid: string): Chainable<JQuery<HTMLElement>>;

            /**
             * Finn og hukar av siste checkbox med testid som ikkje er deaktivert (disabled)
             * @example cy.checkboxLast('min-oversikt_brukerliste-checkbox')
             */
            checkboxLast(testid: string): Chainable<JQuery<HTMLElement>>;


            /**
             * Trykkar på dropdown-elementet for eit filter. Dette togglar open/lukka-tilstand på elementet.
             * @example cy.apneLukkeFilterDropdown('alder')
             */
            apneLukkeFilterDropdown(filternavn: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
