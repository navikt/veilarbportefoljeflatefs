import * as React from 'react';
import { connect } from 'react-redux';
import { settBrukerSomMarkert } from '../ducks/portefolje';
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
import {arbeidslisteKnapp, arbeidslisteKolonne, lagTabellKolonneConfig} from "./minoversikt-tabell-config";
import {
    filtrerTommeKolonneGruppe,
    filtrerValgteKolonner,
    filtrerYtelseKolonner
} from "../enhetsportefolje/enhetsportefolje-tabell-utils";
import {Tabell} from "../components/tabell-ny/tabell";
import {checkBoksKolonne, etikettKolonne} from "../enhetsportefolje/enhetsportefolje-tabell-config";
import {EkspanderbarTabell} from "../components/tabell-ny/tabell-ekspanderbar-rad";

interface OwnProps {
    innloggetVeileder: string;
    visesAnnenVeiledersPortefolje?: boolean;
    settSorteringOgHentPortefolje: (sortering: string) => void;
}

interface StateProps {
    portefolje: {
        data: {
            brukere: BrukerModell[];
            antallTotalt: number;
            antallReturnert: number;
            fraIndex: number;
        };
        sorteringsfelt: Sorteringsfelt;
    };
    veiledere: VeilederModell[];
    valgtEnhet: ValgtEnhetModell;
    sorteringsrekkefolge: Sorteringsrekkefolge;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

interface DispatchProps {
    settMarkert: (fnr: string, markert: boolean) => void;
}

type MinOversiktTabellProps  = StateProps & DispatchProps & OwnProps;


const leggTilCheckBoksOgEtiketter  = (settMarkert) => (tabellKolonner) => ([checkBoksKolonne(settMarkert), arbeidslisteKolonne, ...tabellKolonner, etikettKolonne, arbeidslisteKnapp]);

class MinoversiktTabell extends React.Component<MinOversiktTabellProps> {
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

        const tabellKolonner = lagTabellKolonneConfig(enhetId, filtervalg.ytelse)
            .map((tabellKolonneObj) => filtrerValgteKolonner(tabellKolonneObj, valgteKolonner))
            .map((tabellKolonneObj) => filtrerYtelseKolonner(tabellKolonneObj, filtervalg.ytelse))
            .filter((tabellKolonneObj) => filtrerTommeKolonneGruppe(tabellKolonneObj));

        const tabellKonfig = leggTilCheckBoksOgEtiketter(settMarkert)(tabellKolonner);

        return (
            <EkspanderbarTabell
                forrigebruker={forrigeBruker}
                konfig={tabellKonfig}
                brukere={brukere}
                onSortChanged={settSorteringOgHentPortefolje}
                innloggetVeileder={innloggetVeileder}
            />
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

const mapDispatchToProps = (dispatch) => ({
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert)),
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(MinoversiktTabell);
