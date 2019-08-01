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
    filtrerValgteKolonner,
    lagTabellKolonneConfig
} from './enhetsportefolje-tabell-utils';

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

    const tabellKolonner = lagTabellKolonneConfig(enhetId, settMarkert)
        .map( (tabellKolonneObj) => filtrerValgteKolonner(tabellKolonneObj, valgteKolonner))
        .filter((tabellKolonneObj) => filtrerTommeKolonneGruppe(tabellKolonneObj));

    return (
        <Tabell konfig={tabellKolonner} brukere={brukere} onSortChanged={}/>
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
