import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Undertittel} from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
import VeiledersideVisning from './veilederside-visning';
import Innholdslaster from '../innholdslaster/innholdslaster';
import FiltreringVeiledere from '../filtrering/filtrering-veiledere';
import PanelBase from 'nav-frontend-paneler';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import {lagLablerTilVeiledereMedIdenter} from '../filtrering/utils';
import {slettEnkeltFilter} from '../ducks/filtrering';
import './veiledere.less';
import ToppMeny from "../topp-meny/topp-meny";
import {useFetchStatustallTilltakData} from "../hooks/portefolje/use-fetch-statustall-tilltak-data";
import {useOnMount} from "../hooks/use-on-mount";
import {leggEnhetIUrl} from "../utils/url-utils";
import {loggSkjermMetrikker, Side} from "../utils/metrikker/skjerm-metrikker";
import {useEnhetSelector} from "../hooks/redux/use-enhet-selector";
import {AppState} from "../reducer";


function VeiledereSide (){
    const {statustall, portefoljestorrelser, veiledere} = useFetchStatustallTilltakData();
    const enhetId = useEnhetSelector();
    const filtervalg = useSelector((state: AppState)=> state.filtreringVeilederoversikt);

    const dispatch = useDispatch();
    const slettVeilederFilter = ident => dispatch(slettEnkeltFilter('veiledere', ident, 'enhet'));


    useOnMount(() => {
        leggEnhetIUrl(enhetId);
        loggSkjermMetrikker(Side.VEILEDER_OVERSIKT);
    });

    return (
        <DocumentTitle title="Veilederoversikt">
            <div className="veiledere-side">
                <ToppMeny>
                    <Innholdslaster avhengigheter={[statustall, veiledere, portefoljestorrelser]}>
                        <section>
                            <div id="oversikt-sideinnhold" role="tabpanel">
                                <div className="row">
                                    <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                        <PanelBase className="blokk-xxxs sok-veileder">
                                            <Undertittel>
                                                Søk veileder
                                            </Undertittel>
                                            <FiltreringVeiledere/>
                                        </PanelBase>
                                    </div>

                                    <div className="col-lg-9 col-md-12 col-sm-12">
                                        <FiltreringLabelContainer
                                            filtervalg={{
                                                veiledere: lagLablerTilVeiledereMedIdenter(
                                                    filtervalg.veiledere,
                                                    veiledere.data.veilederListe,
                                                    slettVeilederFilter
                                                )
                                            }}
                                            filtergruppe="veiledere"
                                            className="filtrering-label-container"
                                        />
                                        <div className="sticky-container">
                                            <Undertittel tag="h1" className="veiledere-undertittel blokk-xxs">
                                                {`Totalt ${veiledere.data.veilederListe.length} veiledere`}
                                            </Undertittel>
                                        </div>
                                        <VeiledersideVisning
                                            veiledere={veiledere.data.veilederListe}
                                            portefoljestorrelser={portefoljestorrelser}
                                            veilederFilter={filtervalg.veiledere}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Innholdslaster>
                </ToppMeny>
            </div>
        </DocumentTitle>
    );
}


export default VeiledereSide;
