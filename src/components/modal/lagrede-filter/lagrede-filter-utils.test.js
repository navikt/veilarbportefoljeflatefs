import {erObjektValuesTomt} from "./lagrede-filter-utils";

describe('Lagrede filter utils', () => {
    describe('Er objekt values tomt', () => {
        it('sjekk minoversikt', () => {
            const filtervalgModell = {
                aktiviteter: {
                    BEHANDLING: 'NA',
                    EGEN: 'NA',
                    GRUPPEAKTIVITET: 'NA',
                    IJOBB: 'NA',
                    MOTE: 'NA',
                    SOKEAVTALE: 'NA',
                    STILLING: 'NA',
                    TILTAK: 'NA',
                    UTDANNINGAKTIVITET: 'NA'
                },
                alder: [],
                ferdigfilterListe: [],
                fodselsdagIMnd: [],
                formidlingsgruppe: [],
                hovedmal: [],
                innsatsgruppe: [],
                kjonn: null,
                manuellBrukerStatus: [],
                navnEllerFnrQuery: '',
                rettighetsgruppe: [],
                servicegruppe: [],
                tiltakstyper: [],
                veilederNavnQuery: '',
                veiledere: [],
                ytelse: null,
                registreringstype: [],
                cvJobbprofil: null,
                arbeidslisteKategori: []

            };

            expect(erObjektValuesTomt(filtervalgModell) === true);
        });
    });
});