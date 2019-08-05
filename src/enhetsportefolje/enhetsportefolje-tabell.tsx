import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { settBrukerSomMarkert } from '../ducks/portefolje';
import {
    BrukerModell,
    FiltervalgModell,
    Sorteringsrekkefolge,
    ValgtEnhetModell,
    VeilederModell
} from '../model-interfaces';
import { Kolonne, ListevisningType } from '../ducks/ui/listevisning';
import { selectValgteAlternativer } from '../ducks/ui/listevisning-selectors';
import { getFraBrukerFraUrl } from '../utils/url-utils';
import { Tabell } from '../components/tabell-ny/tabell';
import {
    filtrerTommeKolonneGruppe,
    filtrerValgteKolonner, filtrerYtelseKolonner
} from './enhetsportefolje-tabell-utils';
import { checkBoksKolonne, etikettKolonne, lagTabellKolonneConfig } from './enhetsportefolje-tabell-config';

interface EnhetTabellProps {
    brukere: BrukerModell[];
    valgtEnhet: ValgtEnhetModell;
    sorteringsrekkefolge: Sorteringsrekkefolge;
    settMarkert: (bruker: string, markert: boolean) => void;
    filtervalg: FiltervalgModell;
    settSorteringOgHentPortefolje: (sortering: string) => void;
    veiledere: VeilederModell;
    valgteKolonner: Kolonne[];
}

const finnBrukersVeileder = (veiledere) => (bruker) => (veiledere.find((veileder) => veileder.ident === bruker.veilederId));

function EnhetTabell(props: EnhetTabellProps) {
    let forrigeBruker: string | undefined;

    const {
        settMarkert, brukere, settSorteringOgHentPortefolje,
        filtervalg, sorteringsrekkefolge, valgtEnhet, veiledere, valgteKolonner
    } = props;

    const { enhetId } = valgtEnhet.enhet!;
    const forrigebruker = forrigeBruker;

    useEffect(()=> {
        forrigeBruker = getFraBrukerFraUrl(); // TODO FIX THIS;
    });

    forrigeBruker = undefined;

    const tabellKolonner = lagTabellKolonneConfig(enhetId, filtervalg.ytelse, finnBrukersVeileder(veiledere))
        .map( (tabellKolonneObj) => filtrerValgteKolonner(tabellKolonneObj, valgteKolonner))
        .map( (tabellKolonneObj) => filtrerYtelseKolonner(tabellKolonneObj, filtervalg.ytelse))
        .filter((tabellKolonneObj) => filtrerTommeKolonneGruppe(tabellKolonneObj));

    const blabla = [checkBoksKolonne(settMarkert), ...tabellKolonner, etikettKolonne];

    return (
        <Tabell
            konfig={blabla}
            brukere={brukere}
            onSortChanged={settSorteringOgHentPortefolje}
        />
    );
    /*
    return (

        <div className="typo-undertekst blokk-xs">
            <EnhetListehode
                sorteringsrekkefolge={sorteringsrekkefolge}
                sorteringOnClick={settSorteringOgHentPortefolje}
                filtervalg={filtervalg}
                sorteringsfelt={portefolje.sorteringsfelt}
                valgteKolonner={valgteKolonner}
            />
            <ul className="brukerliste">
                {brukere.map((bruker) =>
                    <EnhetBrukerpanel
                        key={bruker.fnr || bruker.guid}
                        bruker={bruker}
                        enhetId={enhetId}
                        settMarkert={settMarkert}
                        varForrigeBruker={forrigebruker === bruker.fnr}
                        filtervalg={filtervalg}
                        valgteKolonner={valgteKolonner}
                        brukersVeileder={finnBrukersVeileder(veiledere, bruker)}
                    />
                )}
            </ul>
        </div>
    );
    */
}

const mapStateToProps = (state) => ({
    brukere: state.portefolje.data.brukere,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    filtervalg: state.filtrering,
    valgteKolonner: selectValgteAlternativer(state, ListevisningType.enhetensOversikt),
});

const mapDispatchToProps = (dispatch) => ({
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetTabell);
