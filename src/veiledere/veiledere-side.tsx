import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DocumentTitle from 'react-document-title';
import VeiledersideVisning from './veilederside-visning';
import Innholdslaster from '../innholdslaster/innholdslaster';
import FiltreringVeiledere from '../filtrering/filtrering-veiledere';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import {lagLablerTilVeiledereMedIdenter} from '../filtrering/utils';
import {endreFiltervalg, slettEnkeltFilter} from '../ducks/filtrering';
import './veiledere.less';
import ToppMeny from '../topp-meny/topp-meny';
import {useOnMount} from '../hooks/use-on-mount';
import {getSidestorrelseFromUrl, getSideFromUrl} from '../utils/url-utils';
import {loggSkjermMetrikker, Side} from '../utils/metrikker/skjerm-metrikker';
import {AppState} from '../reducer';
import {pagineringSetup} from '../ducks/paginering';
import {useSetEnhetIUrl} from '../hooks/portefolje/use-set-enhet-i-url';
import {useSetLocalStorageOnUnmount} from '../hooks/portefolje/use-set-local-storage-on-unmount';
import FilteringVeiledergrupper from '../filtrering/filtrering-veileder-grupper/filtrering-veiledergrupper';
import {useFetchStatusTall} from '../hooks/portefolje/use-fetch-statustall';
import MetrikkEkspanderbartpanel from '../components/ekspandertbart-panel/metrikk-ekspanderbartpanel';
import {OversiktType} from '../ducks/ui/listevisning';
import LagredeFilterUIController from '../filtrering/lagrede-filter-controller';
import {Systemmeldinger} from '../components/systemmeldinger';
import {Panel} from '@navikt/ds-react';

function VeiledereSide() {
    const statustall = useFetchStatusTall();
    const filtervalg = useSelector((state: AppState) => state.filtreringVeilederoversikt);
    const oversiktType = OversiktType.veilederOversikt;
    const dispatch = useDispatch();
    const slettVeilederFilter = ident => dispatch(slettEnkeltFilter('veiledere', ident, oversiktType));
    const veiledere = useSelector((state: AppState) => state.veiledere);
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);
    const id = 'veileder-oversikt';
    const antallSynligeVeiledere = veiledere.data.veilederListe.length;

    useSetEnhetIUrl();

    useOnMount(() => {
        const side = getSideFromUrl();
        const sidestorrelse = getSidestorrelseFromUrl();
        dispatch(pagineringSetup({side, sidestorrelse}));
        loggSkjermMetrikker(Side.VEILEDER_OVERSIKT);
    });

    useSetLocalStorageOnUnmount();
    LagredeFilterUIController({oversiktType: oversiktType});

    const doEndreFiltervalg = (filterId: string, filterVerdi: React.ReactNode) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, oversiktType));
    };

    return (
        <DocumentTitle title="Veilederoversikt">
            <div
                className="side-storrelse veilederoversikt"
                id={`side-storrelse_${id}`}
                data-testid={`side-storrelse_${id}`}
            >
                <ToppMeny oversiktType={oversiktType} />
                <Systemmeldinger />
                <Innholdslaster avhengigheter={[statustall]}>
                    <div
                        className="oversikt-sideinnhold-veilederside"
                        role="tabpanel"
                        id={`oversikt-sideinnhold_${id}`}
                    >
                        <div className="status-filter-kolonne">
                            <Panel className="sok-veileder" role="search">
                                <FiltreringVeiledere endreFiltervalg={doEndreFiltervalg} filtervalg={filtervalg} />
                            </Panel>
                            <MetrikkEkspanderbartpanel apen lamellNavn="veiledergrupper" tittel="Veiledergrupper">
                                <FilteringVeiledergrupper oversiktType={OversiktType.veilederOversikt} />
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
                                oversiktType={OversiktType.veilederOversikt}
                                className="filtrering-label-container"
                                role="listitem"
                            />
                            <VeiledersideVisning
                                veiledere={veiledere.data.veilederListe}
                                portefoljestorrelser={portefoljestorrelser}
                                veilederFilter={filtervalg.veiledere}
                                antallVeiledere={antallSynligeVeiledere}
                            />
                        </div>
                    </div>
                </Innholdslaster>
            </div>
        </DocumentTitle>
    );
}

export default VeiledereSide;
