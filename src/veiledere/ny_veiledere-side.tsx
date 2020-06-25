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
import './ny_veiledere.less';
import ToppMeny from '../topp-meny/topp-meny';
import { useOnMount } from '../hooks/use-on-mount';
import { getSeAlleFromUrl, getSideFromUrl } from '../utils/url-utils';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { AppState } from '../reducer';
import { pagineringSetup } from '../ducks/paginering';
import { useSetEnhetIUrl } from '../hooks/portefolje/use-set-enhet-i-url';
import { useSetLocalStorageOnUnmount } from '../hooks/portefolje/use-set-local-storage-on-unmount';
import FilteringVeilederGrupper from '../filtrering/filtrering-veileder-grupper/filtrering-veileder-grupper';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import '../ny_style.less';
import { useFetchStatusTall } from '../hooks/portefolje/use-fetch-statustall';

function Ny_veiledereSide() {
    const statustall = useFetchStatusTall();
    const filtervalg = useSelector((state: AppState) => state.filtreringVeilederoversikt);

    const dispatch = useDispatch();
    const slettVeilederFilter = ident => dispatch(slettEnkeltFilter('veiledere', ident, 'enhet'));
    const veiledere = useSelector((state: AppState) => state.veiledere);
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);

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
            <div className="side-storrelse__ny veilederoversikt">
                <ToppMeny/>
                <Innholdslaster avhengigheter={[statustall]}>
                    <div id="oversikt-sideinnhold" role="tabpanel" className="oversikt-sideinnhold">
                        <div className="liste-kolonne__ny">
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
                            <VeiledersideVisning
                                veiledere={veiledere.data.veilederListe}
                                portefoljestorrelser={portefoljestorrelser}
                                veilederFilter={filtervalg.veiledere}
                                antallVeiledere={veiledere.data.veilederListe.length}
                            />
                        </div>
                        <div className="status-filter-kolonne__ny">
                            <PanelBase className="blokk-xxxs sok-veileder__ny">
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

                    </div>
                </Innholdslaster>
            </div>
        </DocumentTitle>
    );
}

export default Ny_veiledereSide;
