import * as React from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import DocumentTitle from 'react-document-title';
import Innholdslaster from '../innholdslaster/innholdslaster';
import TabellOverskrift from '../components/tabell-overskrift';
import {ModalEnhetSideController} from '../components/modal/modal-enhet-side-controller';
import EnhetTabell from './enhetsportefolje-tabell';
import EnhetTabellOverskrift from './enhetsportefolje-tabelloverskrift';
import './enhetsportefolje.less';
import './brukerliste.less';
import ToppMeny from '../topp-meny/topp-meny';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {ListevisningType} from '../ducks/ui/listevisning';
import {useSetStateFromUrl} from '../hooks/portefolje/use-set-state-from-url';
import {useFetchPortefolje} from '../hooks/portefolje/use-fetch-portefolje';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import {lagLablerTilVeiledereMedIdenter} from '../filtrering/utils';
import {useDispatch, useSelector} from 'react-redux';
import {endreFiltervalg, slettEnkeltFilter} from '../ducks/filtrering';
import {hentPortefoljeForEnhet} from '../ducks/portefolje';
import {useSyncStateMedUrl} from '../hooks/portefolje/use-sync-state-med-url';
import {useSetLocalStorageOnUnmount} from '../hooks/portefolje/use-set-local-storage-on-unmount';
import '../style.less';
import {useFetchStatusTall} from '../hooks/portefolje/use-fetch-statustall';
import {AppState} from '../reducer';
import {useSidebarViewStore} from '../store/sidebar/sidebar-view-store';
import classNames from 'classnames';
import {sortTiltak} from '../filtrering/filtrering-status/filter-utils';
import {pagineringSetup} from '../ducks/paginering';
import Sidebar from '../components/sidebar/sidebar';
import {MineFilterLagreFilterKnapp} from '../minoversikt/mine-filter-lagre-filter-knapp';
import {MineFilterModal} from '../components/modal/mine-filter/mine-filter-modal';
import {useWindowWidth} from '../hooks/use-window-width';
import Toolbar from '../components/toolbar/toolbar';
import FiltreringNavnellerfnr from '../filtrering/filtrering-navnellerfnr';
import Alertstripe from 'nav-frontend-alertstriper';
import LagredeFilterUIController from '../filtrering/lagrede-filter-controller';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ANNEN_VEILEDER} from '../konstanter';

function antallFilter(filtervalg) {
    function mapAktivitetFilter(value) {
        return Object.entries(value)
            .map(([_, verdi]) => {
                if (verdi === 'NA') return 0;
                return 1;
            })
            .reduce((a: number, b: number) => a + b, 0);
    }

    return Object.entries(filtervalg)
        .map(([filter, value]) => {
            if (value === true) {
                return 1;
            } else if (Array.isArray(value)) {
                return value.length;
            } else if (filter === 'aktiviteter') {
                return mapAktivitetFilter(value);
            } else if (typeof value === 'object') {
                return value ? Object.entries(value).length : 0;
            } else if (value) return 1;
            return 0;
        })
        .reduce((a, b) => a + b, 0);
}

const filtergruppe = ListevisningType.enhetensOversikt;
const id = 'enhetens-oversikt';

export default function EnhetSide() {
    const statustall = useFetchStatusTall();
    const {
        portefolje,
        filtervalg,
        enhetId,
        sorteringsrekkefolge,
        sorteringsfelt,
        enhettiltak,
        listevisning
    } = usePortefoljeSelector(filtergruppe);
    const dispatch = useDispatch();
    const portefoljeData = portefolje.data;
    const antallBrukere =
        portefoljeData.antallReturnert > portefoljeData.antallTotalt
            ? portefoljeData.antallTotalt
            : portefoljeData.antallReturnert;
    const harFilter = antallFilter(filtervalg) !== 0;
    const veilederliste = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const slettVeilederFilter = useCallback(
        ident => dispatch(slettEnkeltFilter('veiledere', ident, ListevisningType.enhetensOversikt)),
        [dispatch]
    );
    const veilederLabel = useMemo(
        () => lagLablerTilVeiledereMedIdenter(filtervalg.veiledere, veilederliste, slettVeilederFilter),
        [filtervalg.veiledere, veilederliste, slettVeilederFilter]
    );
    const tiltak = sortTiltak(enhettiltak.data.tiltak);
    const isSidebarHidden = useSidebarViewStore(filtergruppe).isSidebarHidden;
    const windowWidth = useWindowWidth();
    const erAnnenVeilederFeaturePa = useFeatureSelector()(ANNEN_VEILEDER);

    !erAnnenVeilederFeaturePa && (document.body.style.backgroundColor = 'rgb(244, 244, 244)');

    useSetStateFromUrl();
    useSyncStateMedUrl();

    useFetchPortefolje(filtergruppe);
    useSetLocalStorageOnUnmount();
    LagredeFilterUIController({filtergruppe: filtergruppe});

    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, filtergruppe));
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

        window.addEventListener('scroll', onScroll);
        return window.addEventListener('scroll', onScroll);
    });

    return (
        <DocumentTitle title="Enhetens oversikt">
            <div className="side-storrelse" role="tab" aria-controls={id} id={id}>
                <ToppMeny />
                <Innholdslaster avhengigheter={[statustall]}>
                    <div
                        className={classNames(
                            'oversikt-sideinnhold',
                            isSidebarHidden && 'oversikt-sideinnhold__hidden'
                        )}
                        role="tabpanel"
                        aria-labelledby={id}
                        id={id}
                    >
                        <Sidebar
                            filtervalg={filtervalg}
                            filtergruppe={filtergruppe}
                            enhettiltak={tiltak}
                            isSidebarHidden={isSidebarHidden}
                        />
                        <div className="sokefelt-knapp__container">
                            <FiltreringNavnellerfnr filtervalg={filtervalg} endreFiltervalg={doEndreFiltervalg} />
                            <MineFilterLagreFilterKnapp filtergruppe={filtergruppe} />
                        </div>
                        <FiltreringLabelContainer
                            filtervalg={{
                                ...filtervalg,
                                veiledere: veilederLabel
                            }}
                            filtergruppe={filtergruppe}
                            enhettiltak={enhettiltak.data.tiltak}
                            listevisning={listevisning}
                            className="filtrering-label-container"
                        />
                        {harFilter ? (
                            <div
                                className={classNames(
                                    'oversikt__container',
                                    isSidebarHidden && 'oversikt__container__hidden'
                                )}
                            >
                                <div className={antallBrukere > 4 ? 'sticky-container' : 'ikke-sticky__container'}>
                                    <span className={antallBrukere > 4 ? 'sticky-skygge' : 'ikke-sticky__skygge'}>
                                        <div
                                            className={classNames(
                                                'toolbar-container',
                                                antallBrukere < 4 && 'ikke-sticky__toolbar-container'
                                            )}
                                        >
                                            {erAnnenVeilederFeaturePa ? (
                                                <div
                                                    className={classNames(
                                                        'tabellinfo',
                                                        ((scrolling && isSidebarHidden) ||
                                                            (scrolling && windowWidth < 1200) ||
                                                            (!isSidebarHidden && windowWidth < 1200)) &&
                                                            'tabellinfo__hidden'
                                                    )}
                                                >
                                                    <TabellOverskrift className={'tabelloverskrift'} />
                                                </div>
                                            ) : (
                                                <TabellOverskrift
                                                    className={classNames(
                                                        'tabelloverskrift',
                                                        ((scrolling && isSidebarHidden) ||
                                                            (scrolling && windowWidth < 1200) ||
                                                            (!isSidebarHidden && windowWidth < 1200 && scrolling)) &&
                                                            'tabelloverskrift__hidden'
                                                    )}
                                                />
                                            )}
                                            <Toolbar
                                                onPaginering={() =>
                                                    dispatch(
                                                        hentPortefoljeForEnhet(
                                                            enhetId,
                                                            sorteringsrekkefolge,
                                                            sorteringsfelt,
                                                            filtervalg
                                                        )
                                                    )
                                                }
                                                filtergruppe={filtergruppe}
                                                sokVeilederSkalVises
                                                antallTotalt={portefoljeData.antallTotalt}
                                                scrolling={scrolling}
                                                isSidebarHidden={isSidebarHidden}
                                            />
                                            <EnhetTabellOverskrift />
                                        </div>
                                    </span>
                                    <EnhetTabell
                                        classNameWrapper={
                                            antallBrukere > 0
                                                ? 'portefolje__container'
                                                : 'portefolje__container__tom-liste'
                                        }
                                    />
                                </div>
                            </div>
                        ) : (
                            <Alertstripe
                                type="info"
                                className="blokk-m alertstripe__filtrering"
                                aria-live="assertive"
                                role="alert"
                                aria-atomic="true"
                                data-testid="alertstripe_filtrering"
                            >
                                Du må gjøre en filtrering for å se brukere i listen.
                            </Alertstripe>
                        )}
                    </div>
                </Innholdslaster>
                <MineFilterModal filtergruppe={filtergruppe} />
                <ModalEnhetSideController />
            </div>
        </DocumentTitle>
    );
}
