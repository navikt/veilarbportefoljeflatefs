import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Normaltekst } from 'nav-frontend-typografi';
import Innholdslaster from './../innholdslaster/innholdslaster';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import VeilederPortefoljeVisning from './minoversikt-portefolje-visning';
import { hentStatusTall, StatustallState } from '../ducks/statustall';
import { EnhettiltakState, hentEnhetTiltak } from '../ducks/enhettiltak';
import { hentPortefoljeForVeileder, settSortering, settValgtVeileder } from '../ducks/portefolje';
import { VeiledereState } from '../ducks/veiledere';
import { FiltervalgModell } from '../model-interfaces';
import { ListevisningState, ListevisningType } from '../ducks/ui/listevisning';
import ListevisningInfoPanel from '../components/toolbar/listevisning/listevisning-infopanel';
import {
    getSeAlleFromUrl, getSideFromUrl, getSorteringsFeltFromUrl,
    getSorteringsRekkefolgeFromUrl
} from '../utils/url-utils';
import { pagineringSetup } from '../ducks/paginering';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { loggSideVisning } from '../utils/metrikker/side-visning-metrikker';
import './minoversikt-side.less';
import {sortTiltak} from "../filtrering/filtrering-status/filter-utils";
import {AppState} from "../reducer";
import {OrNothing} from "../utils/types/types";
import Lenker from '../lenker/lenker';

interface StateProps {
    valgtEnhetId: OrNothing<string>;
    veiledere: VeiledereState;
    filtervalg: FiltervalgModell;
    statustall: StatustallState;
    enhettiltak: EnhettiltakState;
    listevisning: ListevisningState;
    sorteringsfelt: string;
    sorteringsrekkefolge: string;
    innloggetVeilederIdent: string | undefined;
}

interface IdentProps {
    ident?: string;
}

interface DispatchProps {
    hentStatusTall: (enhet: string, ident: string | undefined) => void;
    hentEnhetTiltak: (enhet: string) => void;
    doSettValgtVeileder: (ident: IdentProps) => void;
    doSettSortering: (rekkefolge: string, felt: string) => void;
    hentPortefolje: (...args) => void;
    initalPaginering: (side: number, seAlle: boolean) => void;
}

interface OwnProps {
    match:
        {
            params:
                { ident: string; }
        };
}

type MinoversiktSideProps = StateProps & DispatchProps & OwnProps;

class MinoversiktSide extends React.Component<MinoversiktSideProps> {
    componentDidMount() {
        const {veiledere , valgtEnhetId, filtervalg, hentPortefolje,innloggetVeilederIdent, ...props} = this.props;
        const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.match.params.ident));
        const innloggetVeileder = {ident: innloggetVeilederIdent};
        const gjeldendeVeileder = veilederFraUrl || innloggetVeileder;

        this.settInitalStateFraUrl();
        loggSkjermMetrikker(Side.MIN_OVERSIKT);
        //loggSideVisning(innloggetVeilederIdent, Side.MIN_OVERSIKT);

        //this.props.hentStatusTall(valgtEnhetId || '', gjeldendeVeileder.ident);
        //this.props.hentEnhetTiltak(valgtEnhetId || '');

        this.props.doSettValgtVeileder(gjeldendeVeileder);

        const sorteringsfelt = getSorteringsFeltFromUrl();
        const sorteringsrekkefolge = getSorteringsRekkefolgeFromUrl();
        this.props.doSettSortering(sorteringsrekkefolge, sorteringsfelt);

        //hentPortefolje(valgtEnhetId, gjeldendeVeileder.ident, sorteringsrekkefolge, sorteringsfelt, filtervalg);

    }

    settInitalStateFraUrl() {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        this.props.initalPaginering(side, seAlle);
    }

    render() {
        const { veiledere, filtervalg, statustall, enhettiltak, listevisning, innloggetVeilederIdent, ...props} = this.props;
        const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.match.params.ident));
        const innloggetVeileder = {ident: innloggetVeilederIdent || '', fornavn: '', etternavn: '', navn: ''};
        const gjeldendeVeileder = veilederFraUrl || innloggetVeileder;

        const visesAnnenVeiledersPortefolje = gjeldendeVeileder.ident !== innloggetVeileder.ident;

        const annenVeilederVarsel = (
            <Normaltekst tag="h1" className="blokk-s annen-veileder-varsel">
                {`Du er inne på ${gjeldendeVeileder.fornavn} ${gjeldendeVeileder.etternavn} sin oversikt`}
            </Normaltekst>
        );

        const tiltak = sortTiltak(enhettiltak.data.tiltak);

        return (
            <div className="minoversikt-side blokk-xl">
                <DocumentTitle title="Min oversikt">
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <Lenker/>
                        <section className={visesAnnenVeiledersPortefolje ? 'annen-veileder' : ''}>
                            {visesAnnenVeiledersPortefolje ? annenVeilederVarsel : null}
                            <div className="portefolje-side">
                                <div id="oversikt-sideinnhold" role="tabpanel">
                                    <div className="row">
                                        <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                            <FiltreringContainer
                                                filtervalg={filtervalg}
                                                filtergruppe="veileder"
                                                veileder={gjeldendeVeileder}
                                                enhettiltak={tiltak}
                                            />
                                        </div>
                                        <div className="col-lg-9 col-md-12 col-sm-12">
                                            <FiltreringLabelContainer
                                                filtervalg={filtervalg}
                                                filtergruppe="veileder"
                                                veileder={gjeldendeVeileder}
                                                enhettiltak={enhettiltak.data.tiltak}
                                                listevisning={listevisning}
                                            />
                                            <ListevisningInfoPanel name={ListevisningType.minOversikt}/>
                                            <VeilederPortefoljeVisning
                                                gjeldendeVeileder={gjeldendeVeileder}
                                                visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Innholdslaster>
                </DocumentTitle>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    valgtEnhetId: state.valgtEnhet.data.enhetId,
    veiledere: state.veiledere,
    filtervalg: state.filtreringMinoversikt,
    statustall: state.statustall,
    enhettiltak: state.enhettiltak,
    listevisning: state.ui.listevisningMinOversikt,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    innloggetVeilederIdent: state.inloggetVeileder.data!.ident,
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    hentPortefolje: (enhet, veileder, rekkefolge, felt, filtervalg, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForVeileder(enhet, veileder, rekkefolge, felt, filtervalg)),
    hentStatusTall: (enhet: string, veileder: string | undefined) => dispatch(hentStatusTall(enhet, veileder)),
    hentEnhetTiltak: (enhet: string) => dispatch(hentEnhetTiltak(enhet)),
    doSettSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
    doSettValgtVeileder: (identProps: IdentProps) => dispatch(settValgtVeileder(identProps)),
    initalPaginering: (side, seAlle) => dispatch(pagineringSetup({side, seAlle}))
});

export default connect(mapStateToProps, mapDispatchToProps)(MinoversiktSide);
