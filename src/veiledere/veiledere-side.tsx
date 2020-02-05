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
import {useFetchPortefoljeData} from "../hooks/portefolje/use-fetch-portefolje-data";
import {useOnMount} from "../hooks/use-on-mount";
import {getSeAlleFromUrl, getSideFromUrl, updateLastPath} from "../utils/url-utils";
import {loggSkjermMetrikker, Side} from "../utils/metrikker/skjerm-metrikker";
import {AppState} from "../reducer";
import {useOnUnmount} from "../hooks/use-on-unmount";
import {pagineringSetup} from "../ducks/paginering";
import {useSetEnhetIUrl} from "../hooks/portefolje/use-set-enhet-i-url";


function VeiledereSide (){
    const {statustall, portefoljestorrelser, veiledere} = useFetchPortefoljeData();
    const filtervalg = useSelector((state: AppState)=> state.filtreringVeilederoversikt);

    const dispatch = useDispatch();
    const slettVeilederFilter = ident => dispatch(slettEnkeltFilter('veiledere', ident, 'enhet'));

    useSetEnhetIUrl();

    useOnMount(() => {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        dispatch(pagineringSetup({side, seAlle}));
        loggSkjermMetrikker(Side.VEILEDER_OVERSIKT);
    });

    useOnUnmount(()=> {
        updateLastPath();
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
