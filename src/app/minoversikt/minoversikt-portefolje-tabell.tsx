import * as React from 'react';
import { connect } from 'react-redux';
import MinoversiktBrukerPanel from './minoversikt-bruker-panel';
import { settBrukerSomMarkert } from '../ducks/portefolje';
import MinOversiktListehode from './minoversikt-listehode';
import {
    BrukerModell,
    FiltervalgModell,
    Sorteringsfelt,
    Sorteringsrekkefolge,
    ValgtEnhetModell,
    VeilederModell
} from '../model-interfaces';
import { selectValgteAlternativer } from '../ducks/ui/listevisning-selectors';
import { Kolonne, ListevisningType } from '../ducks/ui/listevisning';
import { getFraBrukerFraUrl } from '../utils/url-utils';

interface MinOversiktTabellProps {
    portefolje: {
        data: {
            brukere: BrukerModell[];
            antallTotalt: number;
            antallReturnert: number;
            fraIndex: number;
        };
        sorteringsfelt: Sorteringsfelt;
    };
    valgtEnhet: ValgtEnhetModell;
    sorteringsrekkefolge: Sorteringsrekkefolge;
    settMarkert: () => void;
    filtervalg: FiltervalgModell;
    settSorteringOgHentPortefolje: (sortering: string) => void;
    veiledere: VeilederModell[];
    innloggetVeileder: string;
    valgteKolonner: Kolonne[];
    visesAnnenVeiledersPortefolje: boolean;
}

class MinoversiktTabell extends React.Component<MinOversiktTabellProps, {}> {
    private forrigeBruker?: string;

    componentWillMount() {
        this.forrigeBruker = getFraBrukerFraUrl();
    }

    render() {
        const {
            settMarkert, portefolje, settSorteringOgHentPortefolje,
            filtervalg, sorteringsrekkefolge, valgtEnhet, innloggetVeileder, valgteKolonner
        } = this.props;
        const brukere = portefolje.data.brukere;
        const {enhetId} = valgtEnhet.enhet!;
        const forrigeBruker = this.forrigeBruker;
        this.forrigeBruker = undefined;

        return (
            <div className="minoversikt-liste__wrapper typo-undertekst blokk-xs">
                <MinOversiktListehode
                    sorteringsrekkefolge={sorteringsrekkefolge}
                    sorteringOnClick={settSorteringOgHentPortefolje}
                    filtervalg={filtervalg}
                    sorteringsfelt={portefolje.sorteringsfelt}
                    valgteKolonner={valgteKolonner}
                    brukere={brukere}
                />
                <ul className="brukerliste">
                    {brukere.map((bruker) =>
                        <MinoversiktBrukerPanel
                            key={bruker.fnr || bruker.guid}
                            bruker={bruker}
                            enhetId={enhetId}
                            settMarkert={settMarkert}
                            varForrigeBruker={forrigeBruker === bruker.fnr}
                            filtervalg={filtervalg}
                            valgteKolonner={valgteKolonner}
                            innloggetVeileder={innloggetVeileder}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    veiledere: state.veiledere.data.veilederListe,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    filtervalg: state.filtreringMinoversikt,
    valgteKolonner: selectValgteAlternativer(state, ListevisningType.minOversikt),
});

const
    mapDispatchToProps = (dispatch) => ({
        settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert)),
    });

export default connect(mapStateToProps, mapDispatchToProps)(MinoversiktTabell);
