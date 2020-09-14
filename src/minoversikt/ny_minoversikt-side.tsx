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
import {pagineringSetup} from '../ducks/paginering';
import {endreFiltervalg} from '../ducks/filtrering';
import Sidebar from '../components/sidebar/sidebar';
import classNames from 'classnames';
import {NyMinOversiktWrapper} from "./ny_min_oversikt_wrapper";
import {MineFilterModal} from "../components/modal/mine-filter/mine-filter-modal";
import {useMineFilterController} from "./use-mine-filter-controller";
import {NyMineFilterLagreFilterKnapp} from "./ny_mine-filter-lagre-filter-knapp";
import {skjulSidebar, visSidebar} from "../ducks/sidebar-tab";
import {useEffect, useState} from "react";
import {useWindowWidth} from "../hooks/use-window-width";
import NyToolbar from "../components/toolbar/ny_toolbar";
import NyFiltreringNavnellerfnr from "../filtrering/ny_filtrering-navnellerfnr";

function Ny_MinoversiktSide() {
    const innloggetVeilederIdent = useIdentSelector();
    const filtergruppe = ListevisningType.minOversikt;
    const {portefolje, filtervalg, listevisning, enhetId, sorteringsrekkefolge, sorteringsfelt, enhettiltak} = usePortefoljeSelector(filtergruppe);
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const statustall = useFetchStatusTall(gjeldendeVeileder);
    const settSorteringogHentPortefolje = useSetPortefoljeSortering(filtergruppe);
    const dispatch = useDispatch();

    useSetStateFromUrl();
    useSyncStateMedUrl();
    useSetLocalStorageOnUnmount();
    useFetchPortefolje(filtergruppe);
    useMineFilterController({filtergruppe: filtergruppe});

    const visesAnnenVeiledersPortefolje = gjeldendeVeileder !== innloggetVeilederIdent!.ident;
    const antallBrukere = portefolje.data.antallReturnert > portefolje.data.antallTotalt ? portefolje.data.antallTotalt : portefolje.data.antallReturnert;
    const tiltak = sortTiltak(enhettiltak.data.tiltak);
    const {isSidebarHidden} = useSidebarViewStore(filtergruppe);
    const windowWidth = useWindowWidth();

    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, filtergruppe));
    };

    const handleOnTabClicked = (tab, selectedTab) => {
        if (isSidebarHidden) {
            dispatch(visSidebar(filtergruppe))

        } else if (tab.type === selectedTab.selectedTab) {
            dispatch(skjulSidebar(filtergruppe))
        }
    };

    const lukkTab = () => {
        dispatch(skjulSidebar(filtergruppe))
    };

    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        function onScroll() {
            let currentPosition = window.pageYOffset;
            if (currentPosition > 220) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        }

        window.addEventListener("scroll", onScroll);
        return window.addEventListener("scroll", onScroll);
    });


    return (
        <DocumentTitle title="Min oversikt">
            <div className="side-storrelse__ny">
                <ToppMeny erPaloggetVeileder={!visesAnnenVeiledersPortefolje}/>
                <Innholdslaster avhengigheter={[statustall]}>
                    <NyMinOversiktWrapper
                        className={classNames('oversikt-sideinnhold__ny portefolje-side__ny',
                            isSidebarHidden && 'oversikt-sideinnhold__ny__hidden')}>
                        <Sidebar
                            filtervalg={filtervalg}
                            filtergruppe={filtergruppe}
                            enhettiltak={tiltak}
                            handleOnTabClicked={handleOnTabClicked}
                            isSidebarHidden={isSidebarHidden}
                            lukkTab={lukkTab}
                        />
                        <div className="sokefelt-knapp__container">
                            <NyFiltreringNavnellerfnr
                                filtervalg={filtervalg}
                                endreFiltervalg={doEndreFiltervalg}
                            />
                            <NyMineFilterLagreFilterKnapp filtergruppe={filtergruppe}/>
                        </div>
                        <FiltreringLabelContainer
                            filtervalg={filtervalg}
                            filtergruppe={filtergruppe}
                            enhettiltak={enhettiltak.data.tiltak}
                            listevisning={listevisning}
                            className={visesAnnenVeiledersPortefolje ? 'ny__filtrering-label-container__annen-veileder' : 'ny__filtrering-label-container'}
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
                                            : classNames('tabelloverskrift__ny',
                                                (((scrolling && isSidebarHidden) ||
                                                    (scrolling && windowWidth < 1200) ||
                                                    (!isSidebarHidden && windowWidth < 1200 && scrolling))
                                                    && "tabelloverskrift__ny__hidden"))}/>
                                    <NyToolbar
                                        onPaginering={() => dispatch(hentPortefoljeForVeileder(
                                            enhetId,
                                            gjeldendeVeileder,
                                            sorteringsrekkefolge,
                                            sorteringsfelt,
                                            filtervalg
                                        ))}
                                        filtergruppe={filtergruppe}
                                        sokVeilederSkalVises={false}
                                        antallTotalt={portefolje.data.antallTotalt}
                                        gjeldendeVeileder={gjeldendeVeileder}
                                        visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                        scrolling={scrolling}
                                        isSidebarHidden={isSidebarHidden}
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
                <MineFilterModal filtergruppe={filtergruppe}/>
            </div>
        </DocumentTitle>
    );
}

export default Ny_MinoversiktSide;
