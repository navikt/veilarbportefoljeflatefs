import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING} from '../konstanter';

function VeiledereSide() {
    const statustall = useFetchStatusTall();
    const filtervalg = useSelector((state: AppState) => state.filtreringVeilederoversikt);
    const filtergruppe = ListevisningType.veilederOversikt;
    const dispatch = useDispatch();
    const slettVeilederFilter = ident => dispatch(slettEnkeltFilter('veiledere', ident, filtergruppe));
    const veiledere = useSelector((state: AppState) => state.veiledere);
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);
    const id = 'veileder-oversikt';
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

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
            <div className="side-storrelse veilederoversikt" id={`side-storrelse_${id}`}>
                <ToppMeny />
                {erAlertstripeFeilmeldingFeatureTogglePa && (
                    <AlertStripe type="feil" className="stor-feil-modal">
                        Vi har dessverre tekniske problemer som kan medføre ustabilitet og/eller feil med
                        filtreringer. Feilretting pågår.{' '}
                        <Lenke href="https://navno.sharepoint.com/sites/intranett-driftsmeldinger/" target="_blank">
                            <b>Følg med på driftsmeldinger på Navet.</b>
                        </Lenke>
                    </AlertStripe>
                )}
                <Innholdslaster avhengigheter={[statustall]}>
                    <div
                        className="oversikt-sideinnhold-veilederside"
                        role="tabpanel"
                        id={`oversikt-sideinnhold_${id}`}
                    >
                        <div className="status-filter-kolonne">
                            <PanelBase className="blokk-xxxs sok-veileder" role="search">
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
                                role="listitem"
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

export default VeiledereSide;
