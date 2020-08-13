import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Innholdslaster from './../innholdslaster/innholdslaster';
import {ListevisningType} from '../ducks/ui/listevisning';
import {useIdentSelector} from '../hooks/redux/use-inlogget-ident';
import {MinOversiktModalController} from '../components/modal/modal-min-oversikt-controller';
import MinoversiktTabell from './minoversikt-portefolje-tabell';
import MinoversiktTabellOverskrift from './minoversikt-portefolje-tabelloverskrift';
import TabellOverskrift from '../components/tabell-overskrift';
import {useSelectGjeldendeVeileder} from '../hooks/portefolje/use-select-gjeldende-veileder';
import Toolbar from '../components/toolbar/toolbar';
import ToppMeny from '../topp-meny/topp-meny';
import {useSetStateFromUrl} from '../hooks/portefolje/use-set-state-from-url';
import {useFetchPortefolje} from '../hooks/portefolje/use-fetch-portefolje';
import {useSetPortefoljeSortering} from '../hooks/portefolje/use-sett-sortering';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {sortTiltak} from '../filtrering/filtrering-status/filter-utils';
import {hentPortefoljeForVeileder} from '../ducks/portefolje';
import {useDispatch} from 'react-redux';
import {useSyncStateMedUrl} from '../hooks/portefolje/use-sync-state-med-url';
import {useSetLocalStorageOnUnmount} from '../hooks/portefolje/use-set-local-storage-on-unmount';
import '../ny_style.less';
import './ny__minoversikt-side.less';
import './ny__minoversikt.less'
import {useFetchStatusTall} from '../hooks/portefolje/use-fetch-statustall';
import {useSidebarViewStore} from '../store/sidebar/sidebar-view-store';
import FiltreringNavnellerfnr from '../filtrering/filtrering-navnellerfnr';
import {pagineringSetup} from '../ducks/paginering';
import {endreFiltervalg} from '../ducks/filtrering';
import Sidebar from '../components/sidebar/sidebar';
import classNames from 'classnames';
import {NyMinOversiktWrapper} from "./ny_min_oversikt_wrapper";
import {LagreFilterModal} from "../components/modal/lagrede-filter/lagre-filter-modal";
import {UseLagreFilterController} from "./use-lagre-filter-controller";
import {NyMinOversiktLagreFilterKnapp} from "./ny_min-oversikt-lagre-filter-knapp";

function Ny_MinoversiktSide() {
    const innloggetVeilederIdent = useIdentSelector();
    const {portefolje, filtervalg, listevisning, enhetId, sorteringsrekkefolge, sorteringsfelt, enhettiltak} = usePortefoljeSelector(ListevisningType.minOversikt);
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const statustall = useFetchStatusTall(gjeldendeVeileder);
    const settSorteringogHentPortefolje = useSetPortefoljeSortering(ListevisningType.minOversikt);
    const dispatch = useDispatch();

    useSetStateFromUrl();
    useSyncStateMedUrl();
    useSetLocalStorageOnUnmount();
    useFetchPortefolje(ListevisningType.minOversikt);
    UseLagreFilterController();

    const visesAnnenVeiledersPortefolje = gjeldendeVeileder !== innloggetVeilederIdent!.ident;
    const antallBrukere = portefolje.data.antallReturnert > portefolje.data.antallTotalt ? portefolje.data.antallTotalt : portefolje.data.antallReturnert;
    const tiltak = sortTiltak(enhettiltak.data.tiltak);
    const {isSidebarHidden, setIsSidebarHidden} = useSidebarViewStore();

    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi));
    };

    const handleOnTabClicked = (tab, selectedTab) => {
        if (isSidebarHidden) {
            setIsSidebarHidden(false);
        } else if (tab.type === selectedTab) {
            setIsSidebarHidden(true);
        }
    };

    const lukkTab = () => {
        setIsSidebarHidden(true);
    };

    return (
        <DocumentTitle title="Min oversikt">
            <div className="side-storrelse__ny">
                <ToppMeny erPaloggetVeileder={!visesAnnenVeiledersPortefolje}/>
                <Innholdslaster avhengigheter={[statustall]}>
                    <NyMinOversiktWrapper
                        className={classNames('oversikt-sideinnhold__ny portefolje-side__ny',
                            isSidebarHidden && 'oversikt-sideinnhold__ny__hidden')}>
                        <div className="filtrering-knapp__wrapper">
                            <FiltreringNavnellerfnr
                                filtervalg={filtervalg}
                                endreFiltervalg={doEndreFiltervalg}
                            />
                            <NyMinOversiktLagreFilterKnapp/>
                        </div>
                        <FiltreringLabelContainer
                            filtervalg={filtervalg}
                            filtergruppe="veileder"
                            enhettiltak={enhettiltak.data.tiltak}
                            listevisning={listevisning}
                            className={visesAnnenVeiledersPortefolje ? 'filtrering-label-container__ny__annen-veileder' : 'ny__filtrering-label-container'}
                        />
                        <Sidebar
                            filtervalg={filtervalg}
                            filtergruppe="veileder"
                            enhettiltak={tiltak}
                            handleOnTabClicked={handleOnTabClicked}
                            isSidebarHidden={isSidebarHidden}
                            lukkTab={lukkTab}
                        />
                        <div className={classNames('oversikt__container',
                            isSidebarHidden && 'oversikt__container__hidden')}>
                            <div className={antallBrukere > 4
                                ? 'sticky-container__ny'
                                : 'ikke-sticky__ny__container'}>
                                <span className={antallBrukere > 4
                                    ? 'sticky-skygge__ny'
                                    : 'ikke-sticky__ny__skygge'}>
                                <div className={antallBrukere > 4
                                    ? 'toolbar-container__ny'
                                    : 'ikke-sticky__ny__toolbar-container'}>
                                    <TabellOverskrift
                                        className={visesAnnenVeiledersPortefolje
                                            ? 'tabelloverskrift__ny__annen-veileder'
                                            : 'tabelloverskrift__ny'}/>
                                        <Toolbar
                                            onPaginering={() => dispatch(hentPortefoljeForVeileder(
                                                enhetId,
                                                gjeldendeVeileder,
                                                sorteringsrekkefolge,
                                                sorteringsfelt,
                                                filtervalg
                                            ))}
                                            filtergruppe={ListevisningType.minOversikt}
                                            sokVeilederSkalVises={false}
                                            antallTotalt={portefolje.data.antallTotalt}
                                            side="minoversikt"
                                            gjeldendeVeileder={gjeldendeVeileder}
                                            visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                        />
                                        <MinoversiktTabellOverskrift
                                            visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                            innloggetVeileder={innloggetVeilederIdent!.ident}
                                            settSorteringOgHentPortefolje={settSorteringogHentPortefolje}
                                        />
                                </div>
                                </span>
                                <MinoversiktTabell
                                    innloggetVeileder={innloggetVeilederIdent}
                                    settSorteringOgHentPortefolje={settSorteringogHentPortefolje}
                                    classNameWrapper={antallBrukere > 0
                                        ? 'portefolje__container__ny'
                                        : 'portefolje__container__ny__tom-liste'}
                                />
                            </div>
                            <MinOversiktModalController/>
                        </div>
                    </NyMinOversiktWrapper>
                </Innholdslaster>
                <LagreFilterModal/>
            </div>
        </DocumentTitle>
    );
}

export default Ny_MinoversiktSide;
