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
import ToppMeny from '../topp-meny/topp-meny';
import {useOnMount} from '../hooks/use-on-mount';
import {getSeAlleFromUrl, getSideFromUrl} from '../utils/url-utils';
import {loggSkjermMetrikker, Side} from '../utils/metrikker/skjerm-metrikker';
import {AppState} from '../reducer';
import {pagineringSetup} from '../ducks/paginering';
import {useSetEnhetIUrl} from '../hooks/portefolje/use-set-enhet-i-url';
import {useSetLocalStorageOnUnmount} from '../hooks/portefolje/use-set-local-storage-on-unmount';
import FilteringVeiledergrupper from '../filtrering/filtrering-veileder-grupper/filtrering-veiledergrupper';
import {useFetchStatusTall} from '../hooks/portefolje/use-fetch-statustall';
import MetrikkEkspanderbartpanel from '../components/ekspandertbart-panel/metrikk-ekspanderbartpanel';
import {ListevisningType} from '../ducks/ui/listevisning';
import LagredeFilterUIController from '../filtrering/lagrede-filter-controller';

export default function VeiledereSide() {
    const statustall = useFetchStatusTall();
    const filtervalg = useSelector((state: AppState) => state.filtreringVeilederoversikt);
    const filtergruppe = ListevisningType.veilederOversikt;
    const dispatch = useDispatch();
    const slettVeilederFilter = ident => dispatch(slettEnkeltFilter('veiledere', ident, filtergruppe));
    const veiledere = useSelector((state: AppState) => state.veiledere);
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);
    const id = 'veileder-oversikt';
    document.body.style.backgroundColor = 'rgb(244, 244, 244)';

    useSetEnhetIUrl();

    useOnMount(() => {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        dispatch(pagineringSetup({side, seAlle}));
        loggSkjermMetrikker(Side.VEILEDER_OVERSIKT);
    });

    useSetLocalStorageOnUnmount();
    LagredeFilterUIController({filtergruppe: filtergruppe});

    return (
        <DocumentTitle title="Veilederoversikt">
            <div className="side-storrelse veilederoversikt" role="tab" aria-controls={id} id={id}>
                <ToppMeny />
                <Innholdslaster avhengigheter={[statustall]}>
                    <div className="oversikt-sideinnhold-veilederside" role="tabpanel" aria-labelledby={id} id={id}>
                        <div className="status-filter-kolonne">
                            <PanelBase className="blokk-xxxs sok-veileder">
                                <Undertittel>Søk veileder</Undertittel>
                                <FiltreringVeiledere />
                            </PanelBase>
                            <MetrikkEkspanderbartpanel apen lamellNavn="veiledergrupper" tittel="Veiledergrupper">
                                <FilteringVeiledergrupper filtergruppe={ListevisningType.veilederOversikt} />
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
                                filtergruppe={ListevisningType.veilederOversikt}
                                className="filtrering-label-container"
                            />
                            <VeiledersideVisning
                                veiledere={veiledere.data.veilederListe}
                                portefoljestorrelser={portefoljestorrelser}
                                veilederFilter={filtervalg.veiledere}
                                antallVeiledere={veiledere.data.veilederListe.length}
                            />
                        </div>
                    </div>
                </Innholdslaster>
            </div>
        </DocumentTitle>
    );
}
