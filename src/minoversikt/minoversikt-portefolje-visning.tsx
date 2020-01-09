import * as React from 'react';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForVeileder, PortefoljeState, settSortering } from '../ducks/portefolje';
import TabellOverskrift from '../components/tabell-overskrift';
import Toolbar, { ToolbarPosisjon } from './../components/toolbar/toolbar';
import { leggEnhetIUrl, updateLastPath } from '../utils/url-utils';
import { ASCENDING, DESCENDING } from '../konstanter';
import Diagram from './diagram/diagram';
import { diagramSkalVises } from './diagram/util';
import MinoversiktTabell from './minoversikt-portefolje-tabell';
import { STATUS } from '../ducks/utils';
import {  FiltervalgModell, VeilederModell } from '../model-interfaces';
import { ListevisningType } from '../ducks/ui/listevisning';
import { selectSideStorrelse } from '../components/toolbar/paginering/paginering-selector';
import {MinOversiktModalController} from "../components/modal/modal-min-oversikt-controller";
import {AppState} from "../reducer";
import {OrNothing} from "../utils/types/types";

interface DispatchProps {
    hentPortefolje: (...args) => void;
    doSettSortering: (rekkefolge: string, felt: string) => void;
}

interface StateProps {
    portefolje: PortefoljeState;
    sorteringsrekkefolge: string;
    valgtEnhet: OrNothing<string>;
    sorteringsfelt: string;
    visningsmodus: string;
    filtervalg: FiltervalgModell;
    innloggetVeileder: OrNothing<VeilederModell>;
    sideStorrelse: number;
}

interface OwnProps {
    gjeldendeVeileder: VeilederModell;
    visesAnnenVeiledersPortefolje: boolean;
}

type VeilederPortefoljeVisningProps = OwnProps & StateProps & DispatchProps;

class VeilederPortefoljeVisning extends React.Component<VeilederPortefoljeVisningProps> {
    componentWillMount() {
        const {
            valgtEnhet,
        } = this.props;

        leggEnhetIUrl(valgtEnhet!);
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje(felt) {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            doSettSortering,
            hentPortefolje,
            gjeldendeVeileder,
            valgtEnhet,
            filtervalg
        } = this.props;
        let valgtRekkefolge = '';
        if (felt !== sorteringsfelt) {
            valgtRekkefolge = ASCENDING;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === ASCENDING ? DESCENDING : ASCENDING;
        }
        doSettSortering(valgtRekkefolge, felt);
        hentPortefolje(
            valgtEnhet, gjeldendeVeileder.ident, valgtRekkefolge, felt, filtervalg
        );
    }

    lagToolbar = (posisjon: ToolbarPosisjon) => {

        const {
            portefolje,
            hentPortefolje,
            gjeldendeVeileder,
            sorteringsrekkefolge,
            sorteringsfelt,
            valgtEnhet,
            filtervalg,
            visningsmodus,
            visesAnnenVeiledersPortefolje,
        } = this.props;

        const { antallTotalt } = portefolje.data;

        return (
            <Toolbar
                filtergruppe={ListevisningType.minOversikt}
                onPaginering={(fra, antall) => hentPortefolje(
                    valgtEnhet,
                    gjeldendeVeileder.ident,
                    sorteringsrekkefolge,
                    sorteringsfelt,
                    filtervalg
                )}
                gjeldendeVeileder={gjeldendeVeileder}
                visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                sokVeilederSkalVises={false}
                visningsmodus={visningsmodus}
                antallTotalt={antallTotalt}
                posisjon={posisjon}
            />
        );
    };

    render() {
        const {
            portefolje,
            gjeldendeVeileder,
            innloggetVeileder,
            valgtEnhet,
            filtervalg,
            visningsmodus,
            sideStorrelse,
        } = this.props;
        updateLastPath();
        const {antallTotalt, antallReturnert, fraIndex, brukere} = portefolje.data;
        const antallValgt = brukere.filter((bruker) => bruker.markert).length;
        const visDiagram = diagramSkalVises(visningsmodus, filtervalg.ytelse);
        const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;
        const visNedreToolbar = antallTotalt >= sideStorrelse && !visDiagram;

        return (
            <div className="portefolje__container">
                <Innholdslaster avhengigheter={[portefolje, {status: tilordningerStatus}]}>
                    <TabellOverskrift
                        fraIndex={fraIndex}
                        antallIVisning={antallReturnert}
                        antallTotalt={antallTotalt}
                        antallValgt={antallValgt}
                        visDiagram={visDiagram}
                    />
                    {this.lagToolbar(ToolbarPosisjon.OVER)}
                    {
                        visDiagram ?
                            <Diagram
                                filtreringsvalg={filtervalg}
                                enhet={valgtEnhet}
                                veileder={gjeldendeVeileder.ident}
                            />
                            :
                            <MinoversiktTabell
                                innloggetVeileder={innloggetVeileder}
                                settSorteringOgHentPortefolje={this.settSorteringOgHentPortefolje}
                            />
                    }
                    {visNedreToolbar && this.lagToolbar(ToolbarPosisjon.UNDER)}
                    <MinOversiktModalController/>
                </Innholdslaster>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.valgtEnhet.data.enhetId,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    visningsmodus: state.paginering.visningsmodus,
    filtervalg: state.filtreringMinoversikt,
    innloggetVeileder: state.inloggetVeileder.data,
    sideStorrelse: selectSideStorrelse(state),
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefolje: (enhet, veileder, rekkefolge, felt, filtervalg) =>
        dispatch(hentPortefoljeForVeileder(enhet, veileder, rekkefolge, felt, filtervalg)),
    doSettSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederPortefoljeVisning);
