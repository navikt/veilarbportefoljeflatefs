import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
import VeiledersideVisning from './veilederside-visning';
import Innholdslaster from '../innholdslaster/innholdslaster';
import FiltreringVeiledere from '../filtrering/filtrering-veiledere';
import PanelBase from 'nav-frontend-paneler';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { lagLablerTilVeiledereMedIdenter } from '../filtrering/utils';
import { slettEnkeltFilter } from '../ducks/filtrering';
import './veiledere.less';
import ToppMeny from '../topp-meny/topp-meny';
import { useFetchPortefoljeData } from '../hooks/portefolje/use-fetch-portefolje-data';
import { useOnMount } from '../hooks/use-on-mount';
import { getSeAlleFromUrl, getSideFromUrl } from '../utils/url-utils';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { AppState } from '../reducer';
import { pagineringSetup } from '../ducks/paginering';
import { useSetEnhetIUrl } from '../hooks/portefolje/use-set-enhet-i-url';
import { useSetLocalStorageOnUnmount } from '../hooks/portefolje/use-set-local-storage-on-unmount';
import FilteringVeilederGrupper from '../filtrering/filtrering-veileder-grupper/filrering-veileder-grupper';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import '../style.less';

function VeiledereSide() {
    const {statustall, portefoljestorrelser, veiledere} = useFetchPortefoljeData();
    const filtervalg = useSelector((state: AppState) => state.filtreringVeilederoversikt);

    const dispatch = useDispatch();
    const slettVeilederFilter = ident => dispatch(slettEnkeltFilter('veiledere', ident, 'enhet'));

    useSetEnhetIUrl();

    useOnMount(() => {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        dispatch(pagineringSetup({side, seAlle}));
        loggSkjermMetrikker(Side.VEILEDER_OVERSIKT);
    });

    useSetLocalStorageOnUnmount();

    return (
        <DocumentTitle title="Veilederoversikt">
            <div className="side-storrelse blokk-xl">
                <ToppMeny>
                    <Innholdslaster avhengigheter={[statustall, veiledere, portefoljestorrelser]}>
                        <section>
                            <div id="oversikt-sideinnhold" role="tabpanel" className="oversikt-sideinnhold">
                                <div className="status-filter-kolonne">
                                    <PanelBase className="blokk-xxxs sok-veileder">
                                        <Undertittel>
                                            Søk veileder
                                        </Undertittel>
                                        <FiltreringVeiledere/>
                                    </PanelBase>
                                    <MetrikkEkspanderbartpanel
                                        apen={true}
                                        tittelProps="undertittel"
                                        lamellNavn="veiledergrupper"
                                        tittel="Veiledergrupper"
                                    >
                                        <FilteringVeilederGrupper filtergruppe="veiledere"/>
                                    </MetrikkEkspanderbartpanel>
                                </div>
                                <div className="liste-kolonne">
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
                        </section>
                    </Innholdslaster>
                </ToppMeny>
            </div>
        </
            DocumentTitle>
    )
        ;
}

export default VeiledereSide;
