before('Start server', () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.configure();
});

describe('Diverse', () => {
    it('Paginering', () => {
        cy.gaTilOversikt('min-oversikt');

        // Sjekkar at oversikten har forventa tal på brukarar og sider
        cy.get('.brukerliste').children().should('have.length', 50);
        cy.getByTestId('paginering').children().children().should('have.length', 5);

        // Går til siste side i pagineringa, der skal det vere færre brukarar
        cy.getByTestId('paginering').children().children().last().click().click();
        cy.get('.brukerliste').children().should('have.length', 23);

        // Trykkar på "Vis 200 per side" og får forventa tal på brukarar i lista
        cy.getByTestId('vis-200-per-side_knapp').should('be.visible').click();
        cy.get('.brukerliste').children().should('have.length', 123);

        // Sjekkar at ein kan bytte tilbake til 50
        cy.getByTestId('vis-50-per-side_knapp').should('be.visible').click();
        cy.get('.brukerliste').children().should('have.length', 50);

        // Går tilbake til startsida (nullstiller til neste test)
        cy.gaTilOversikt('enhetens-oversikt');
    });

    const aasen = 'Aasen';
    it('Kan søke på navn', () => {
        // Søker på "andersen", ser at vi får opp filter-tag for søk på navn
        cy.getByTestId('sok-navn-fnr_input').click().type('andersen');
        cy.getByTestId('filtreringlabel_sok-pa-navn').should('be.visible').click();
    });

    it('Kan søke på fnr', () => {
        // Søker på fnr, ser at vi får opp filter-tag for søk på navn
        cy.getByTestId('sok-navn-fnr_input').click().clear().type('10108000398');
        cy.getByTestId('filtreringlabel_sok-pa-fodselsnummer').should('be.visible').click();
    });

    it('Søk etter veileder', () => {
        // Filtrerar på Ufordelte brukarar i Enhetens oversikt
        cy.getByTestId('sidebar_content-container').should('be.visible');
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').check({force: true});
        cy.getByTestId('filter_checkboks-container_ufordeltebruker').should('be.checked');
        cy.getByTestId('filtreringlabel_ufordelte-brukere').should('be.visible');

        // Trykkar "Søk veileder" og skriv inn namnet deira
        cy.getByTestId('sok-veileder_knapp').click();
        cy.getByTestId('sok-filter_input').click().type(aasen);

        // Vel fyrste element i lista
        cy.checkbox('sok-veileder_rad_0');

        // Bekreftar val
        cy.getByTestId('sok-veileder_velg-knapp').click();

        // Sjekkar at vi har filter-tag for veiledaren, og nullstiller filtera
        cy.getByTestId('filtrering_label-container').contains(aasen).click();
        cy.getByTestId('filtreringlabel_ufordelte-brukere').should('be.visible').click();
    });

    it('Velg andre kolonner', () => {
        // Ser åtvaring om at ingen filter er vald
        cy.getByTestId('alertstripe_filtrering').should('be.visible');

        // Vel eit filter
        cy.getByTestId('filter_checkboks-container_iavtaltAktivitet').check({force: true});

        // Sjekkar at vi ser forventa kolonner
        cy.getByTestId('sorteringheader_veileder').should('be.visible');
        cy.getByTestId('sorteringheader_oppfolging-startet').should('not.exist');

        // Opnar val av kolonner
        cy.getByTestId('dropdown-knapp_velg-kolonner').contains('Velg kolonner').click({force: true});

        // Vel bort veileder-kolonne og legg til oppfølging startet
        cy.getByTestId('velg-kolonne-rad_veileder').uncheck({force: true});
        cy.getByTestId('velg-kolonne-rad_oppfolgingstartet').should('be.enabled').check({force: true});

        // Sjekkar at vi ser forventa kolonner
        cy.getByTestId('sorteringheader_veileder').should('not.exist');
        cy.getByTestId('sorteringheader_oppfolging-startet').should('be.visible');

        // Nullstiller filter (men ikkje kolonnevalg)
        cy.getByTestId('filtreringlabel_i-avtalt-aktivitet').should('be.visible').click();
    });

    it('Tildel veileder', () => {
        cy.gaTilOversikt('min-oversikt');

        // Finn og vel den fyrste brukaren i lista
        cy.scrollTo('top');
        cy.wait(100);
        cy.checkboxFirst('min-oversikt_brukerliste-checkbox');

        // Opne val av veileder
        cy.getByTestId('tildel-veileder_knapp').should('be.enabled').click({force: true});
        cy.getByTestId('tildel-veileder_dropdown').should('be.visible');

        // Vel den øvste veiledaren i lista
        cy.checkbox('tildel-veileder_valg_0');
        cy.getByTestId('modal-suksess_tildel-veileder').should('not.exist');

        // Bekreft med knappetrykk
        cy.getByTestId(`tildel-veileder_velg-knapp`).should('be.visible').click();

        // Få opp bekreftelsesmodal med suksess-beskjed og lukk den
        cy.wait(500);
        cy.get('.modal-suksess_tildel-veileder')
            .should('be.visible')
            .within(() => {
                cy.get('button').last().click();
            });
        cy.getByTestId('modal-suksess_tildel-veileder').should('not.exist');

        // Går tilbake til startsida (nullstiller til neste test)
        cy.gaTilOversikt('enhetens-oversikt');
    });

    it('Sjekk at feilmelding for tildeling uten valgt bruker forsvinner ved klikk', () => {
        /* Feilmeldinga forsvinn når ein trykkar på ting. Den delen er grei.
         * Testen her skal også vise at om ein trykkar på ein knapp vil både meldinga bli borte,
         * og handlinga på knappen verte utført. I testen fungerar det bra, i praksis litt mindre.
         *
         * Svakheiten i testen er at her fortel vi knappar at dei er trykka på, vi trykkar ikkje berre på same området
         * i vindauget og håpar på det beste. Brukarar gjer det. Døme på at testen ikkje er perfekt ligg nedst, der med
         * klikk på brukar-checkbox som i dev (per 2024-03-21) lukkar feilmeldinga, men ikkje vel brukaren. I testen gjer
         * den begge deler.
         * */

        // Gå til Min oversikt
        cy.gaTilOversikt('min-oversikt');

        // Sjekkar at vi får brukarfeilmelding om vi prøver å tildele veiledar utan at brukar er vald
        cy.getByTestId('tildel-veileder_knapp').should('be.enabled').click({force: true});
        cy.getByTestId('tildel-veileder_dropdown').should('not.exist');
        cy.getByTestId('brukerfeilmelding').should('be.visible');

        // Blir kvitt feilmeldinga ved å trykke ein annan stad (filterfana)
        cy.klikkTab('FILTER');
        cy.getByTestId('brukerfeilmelding').should('not.exist');

        // Trykkar på Tildel ein gong til, fjernar den ved å trykek på kjønn-filteret
        cy.getByTestId('tildel-veileder_knapp').should('be.enabled').click({force: true});
        cy.getByTestId('brukerfeilmelding').should('be.visible');
        cy.getByTestId('filtrering-filter_container').scrollTo('top');
        cy.apneLukkeFilterDropdown('kjonn');
        cy.getByTestId('brukerfeilmelding').should('not.exist');

        // Hukar av for "Kvinne", feilmeldinga skal framleis vere borte.
        cy.checkbox('radio-valg_kvinne'); // Her har vi 1 valgt filter
        cy.getByTestId('brukerfeilmelding').should('not.exist');

        // Trykkar på Tildel enno ein gong, denne gongen fjernar vi den ved å gå til Status-fana
        cy.getByTestId('tildel-veileder_knapp').should('be.enabled').click({force: true});
        cy.getByTestId('brukerfeilmelding').should('be.visible');
        cy.klikkTab('STATUS');
        cy.getByTestId('brukerfeilmelding').should('not.exist');

        // Går til filter-fana, legg til fleire filter slik at Nullstill filtervalg-knappen blir synleg
        // Filter "Kvinne" er allereie vald
        cy.klikkTab('FILTER');
        cy.apneLukkeFilterDropdown('alder');
        cy.getByTestId('filter_0-19').check({force: true}); // Her har vi 2 valgte filter
        cy.apneLukkeFilterDropdown('er-utdanningen-godkjent');
        cy.getByTestId('filter_JA').check({force: true}); // Her har vi 3 valgte filter

        // Trykkar på tildel veileder, får feilmelding, blir kvitt den med "Nullstill filter"
        cy.getByTestId('tildel-veileder_knapp').should('be.enabled').click({force: true});
        cy.getByTestId('brukerfeilmelding').should('be.visible');
        cy.getByTestId('filtreringlabel_nullstill-filtervalg').should('be.visible').click();
        cy.getByTestId('brukerfeilmelding').should('not.exist');

        // Fjernar feilmelding ved å trykke på Mine filter
        cy.getByTestId('tildel-veileder_knapp').should('be.enabled').click({force: true});
        cy.getByTestId('brukerfeilmelding').should('be.visible');
        cy.klikkTab('MINE_FILTER');
        cy.getByTestId('brukerfeilmelding').should('not.exist');

        // Testar at klikk på brukar-checkbox både vel brukaren og lukkar feilmeldinga. (Dette fungerer i testen, men ikkje i røynda.)
        cy.getByTestId('tildel-veileder_knapp').should('be.enabled').click({force: true});
        cy.getByTestId('brukerfeilmelding').should('be.visible');
        cy.scrollTo('top');
        cy.wait(100);
        cy.getByTestId('min-oversikt_brukerliste-checkbox').not(':disabled').first().should('not.be.checked').click();
        cy.getByTestId('brukerfeilmelding').should('not.exist');
        cy.getByTestId('min-oversikt_brukerliste-checkbox').not(':disabled').first().should('be.checked');

        // Går tilbake til startsida (nullstiller til neste test)
        cy.gaTilOversikt('enhetens-oversikt');
    });

    it('Sjekk at filter og kolonnevalg blir beholdt mellom oversiktene', () => {
        cy.gaTilOversikt('enhetens-oversikt');

        // Vel filter for overgangsstønad hos enlige forsørgere
        cy.klikkTab('FILTER');
        cy.getByTestId('filtrering-filter_container').scrollTo('bottom');
        cy.apneLukkeFilterDropdown('ensligeForsorgere');
        cy.getByTestId('filter_OVERGANGSSTONAD').check({force: true});
        cy.getByTestId('sorteringheader_utlop_overgangsstonad').should('be.visible');

        // Skjular veileder-kolonne, visar "Om barnet", lukkar valmeny.
        cy.getByTestId('dropdown-knapp_velg-kolonner').contains('Velg kolonner').click({force: true});
        cy.getByTestId('velg-kolonne-rad_veileder').uncheck({force: true});
        cy.getByTestId('velg-kolonne-rad_om_barnet').check({force: true});
        cy.getByTestId('lukk-velg-kolonner-knapp').click({force: true});

        // Sjekkar at rette kolonner er synlege (Om barnet, Utløp overgangsstønad, ikkje Veileder)
        cy.getByTestId('sorteringheader_veileder').should('not.exist');
        cy.getByTestId('sorteringheader_utlop_overgangsstonad').should('be.visible');
        cy.getByTestId('sorteringheader_enslige-forsorgere-om-barnet').should('be.visible');

        // Går til Min oversikt
        cy.gaTilOversikt('min-oversikt');
        cy.klikkTab('STATUS');

        // Vel filter "i avtalt aktivitet" og kan sjå tilhøyrande kolonne i tabellen
        // Kolonna har teksten "Neste utløpsdato aktivitet"
        cy.getByTestId('filter_checkboks-container_iavtaltAktivitet').check({force: true});
        cy.getByTestId('sorteringheader_i-avtalt-aktivitet').should('be.visible');

        // Går attende til Enhetens oversikt.
        // Sjekkar at vi framleis ser Om barnet og Utløp overgangsnstønad
        cy.gaTilOversikt('enhetens-oversikt');
        cy.getByTestId('sorteringheader_veileder').should('not.exist');
        cy.getByTestId('sorteringheader_enslige-forsorgere-om-barnet').should('be.visible');

        // Går til Min oversikt igjen, der skal vi framleis sjå kolonne for "Neste utløpsdato aktivitet"
        cy.gaTilOversikt('min-oversikt');
        cy.getByTestId('sorteringheader_i-avtalt-aktivitet').should('be.visible');
    });
});
