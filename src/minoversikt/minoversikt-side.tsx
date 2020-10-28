import * as React from 'react';
import {useEffect, useState} from 'react';
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
import '../style.less';
import './minoversikt-side.less';
import './minoversikt.less';
import {useFetchStatusTall} from '../hooks/portefolje/use-fetch-statustall';
import {useSidebarViewStore} from '../store/sidebar/sidebar-view-store';
import {pagineringSetup} from '../ducks/paginering';
import {endreFiltervalg} from '../ducks/filtrering';
import Sidebar from '../components/sidebar/sidebar';
import classNames from 'classnames';
import {MinOversiktWrapper} from './minoversikt_wrapper';
import {MineFilterModal} from '../components/modal/mine-filter/mine-filter-modal';
import {MineFilterLagreFilterKnapp} from './mine-filter-lagre-filter-knapp';
import {useWindowWidth} from '../hooks/use-window-width';
import Toolbar from '../components/toolbar/toolbar';
import FiltreringNavnellerfnr from '../filtrering/filtrering-navnellerfnr';
import LagredeFilterUIController from '../filtrering/lagrede-filter-controller';
import {Normaltekst} from 'nav-frontend-typografi';
import {useParams} from 'react-router';
import {useVeilederListeSelector} from '../hooks/redux/use-veilederliste-selector';

const filtergruppe = ListevisningType.minOversikt;
const id = 'min-oversikt';

function MinoversiktSide() {
    const innloggetVeilederIdent = useIdentSelector();
    const {
        portefolje,
        filtervalg,
        listevisning,
        enhetId,
        sorteringsrekkefolge,
        sorteringsfelt,
        enhettiltak
    } = usePortefoljeSelector(filtergruppe);
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const statustall = useFetchStatusTall(gjeldendeVeileder);
    const settSorteringogHentPortefolje = useSetPortefoljeSortering(filtergruppe);
    const dispatch = useDispatch();

    useSetStateFromUrl();
    useSyncStateMedUrl();
    useSetLocalStorageOnUnmount();
    useFetchPortefolje(filtergruppe);
    LagredeFilterUIController({filtergruppe: filtergruppe});

    const visesAnnenVeiledersPortefolje = gjeldendeVeileder !== innloggetVeilederIdent!.ident;
    const antallBrukere =
        portefolje.data.antallReturnert > portefolje.data.antallTotalt
            ? portefolje.data.antallTotalt
            : portefolje.data.antallReturnert;
    const tiltak = sortTiltak(enhettiltak.data.tiltak);
    const {isSidebarHidden} = useSidebarViewStore(filtergruppe);
    const windowWidth = useWindowWidth();

    const {ident} = useParams();
    const veiledere = useVeilederListeSelector();
    const veilederFraUrl = veiledere.find(veileder => veileder.ident === ident) || {fornavn: '', etternavn: ''};

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

    console.log('annen', visesAnnenVeiledersPortefolje);
    console.log('farge', document.body.style.backgroundColor);
    useEffect(() => {
        if (visesAnnenVeiledersPortefolje) {
            document.body.style.backgroundColor = 'rgb(133, 213, 240)';
        }
    }, [visesAnnenVeiledersPortefolje]);

    return (
        <DocumentTitle title="Min oversikt">
            <div className="side-storrelse" role="tab" aria-controls={id} id={id}>
                <ToppMeny erPaloggetVeileder={!visesAnnenVeiledersPortefolje} />
                <Innholdslaster avhengigheter={[statustall]}>
                    <MinOversiktWrapper
                        className={classNames(
                            'oversikt-sideinnhold portefolje-side',
                            isSidebarHidden && 'oversikt-sideinnhold__hidden'
                        )}
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
                            {visesAnnenVeiledersPortefolje && (
                                <Normaltekst
                                    tag="h1"
                                    className="blokk-s annen-veileder-varsel"
                                    data-testid="annen-veileder_infotekst"
                                >
                                    {`Du er inne på ${veilederFraUrl.fornavn} ${veilederFraUrl.etternavn} sin oversikt`}
                                </Normaltekst>
                            )}
                            <MineFilterLagreFilterKnapp filtergruppe={filtergruppe} />
                        </div>
                        <FiltreringLabelContainer
                            filtervalg={filtervalg}
                            filtergruppe={filtergruppe}
                            enhettiltak={enhettiltak.data.tiltak}
                            listevisning={listevisning}
                            className={
                                visesAnnenVeiledersPortefolje
                                    ? 'filtrering-label-container__annen-veileder'
                                    : 'filtrering-label-container'
                            }
                        />
                        <div
                            className={classNames(
                                'oversikt__container',
                                isSidebarHidden && 'oversikt__container__hidden'
                            )}
                        >
                            <div className={antallBrukere > 4 ? 'sticky-container' : 'ikke-sticky__container'}>
                                <span className={antallBrukere > 4 ? 'sticky-skygge' : 'ikke-sticky__skygge'}>
                                    <div
                                        className={
                                            antallBrukere > 4 ? 'toolbar-container' : 'ikke-sticky__toolbar-container'
                                        }
                                    >
                                        <TabellOverskrift
                                            className={
                                                visesAnnenVeiledersPortefolje
                                                    ? 'tabelloverskrift__annen-veileder'
                                                    : classNames(
                                                          'tabelloverskrift',
                                                          ((scrolling && isSidebarHidden) ||
                                                              (scrolling && windowWidth < 1200) ||
                                                              (!isSidebarHidden && windowWidth < 1200 && scrolling)) &&
                                                              'tabelloverskrift__hidden'
                                                      )
                                            }
                                        />
                                        <Toolbar
                                            onPaginering={() =>
                                                dispatch(
                                                    hentPortefoljeForVeileder(
                                                        enhetId,
                                                        gjeldendeVeileder,
                                                        sorteringsrekkefolge,
                                                        sorteringsfelt,
                                                        filtervalg
                                                    )
                                                )
                                            }
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
                                    classNameWrapper={
                                        antallBrukere > 0 ? 'portefolje__container' : 'portefolje__container__tom-liste'
                                    }
                                />
                            </div>
                            <MinOversiktModalController />
                        </div>
                    </MinOversiktWrapper>
                </Innholdslaster>
                <MineFilterModal filtergruppe={filtergruppe} />
            </div>
        </DocumentTitle>
    );
}

export default MinoversiktSide;
