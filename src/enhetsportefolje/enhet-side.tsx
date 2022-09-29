import * as React from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import TabellOverskrift from '../components/tabell-overskrift';
import {ModalEnhetSideController} from '../components/modal/modal-enhet-side-controller';
import EnhetTabell from './enhetsportefolje-tabell';
import EnhetTabellOverskrift from './enhetsportefolje-tabelloverskrift';
import './enhetsportefolje.css';
import './brukerliste.css';
import ToppMeny from '../topp-meny/topp-meny';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../ducks/ui/listevisning';
import {useSetStateFromUrl} from '../hooks/portefolje/use-set-state-from-url';
import {useFetchPortefolje} from '../hooks/portefolje/use-fetch-portefolje';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import {lagLablerTilVeiledereMedIdenter} from '../filtrering/utils';
import {useDispatch, useSelector} from 'react-redux';
import {endreFiltervalg, slettEnkeltFilter} from '../ducks/filtrering';
import {hentPortefoljeForEnhet} from '../ducks/portefolje';
import {useSyncStateMedUrl} from '../hooks/portefolje/use-sync-state-med-url';
import {useSetLocalStorageOnUnmount} from '../hooks/portefolje/use-set-local-storage-on-unmount';
import '../style.css';
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
import LagredeFilterUIController from '../filtrering/lagrede-filter-controller';
import {FeilTiltakModal} from '../components/modal/mine-filter/feil-tiltak-modal';
import {lukkFeilTiltakModal} from '../ducks/lagret-filter-ui-state';
import {Alert} from '@navikt/ds-react';
import {Systemmeldinger} from '../components/systemmeldinger';

export function antallFilter(filtervalg) {
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

const oversiktType = OversiktType.enhetensOversikt;
const id = 'enhetens-oversikt';

export default function EnhetSide() {
    const statustall = useFetchStatusTall();
    const {portefolje, filtervalg, enhetId, sorteringsrekkefolge, sorteringsfelt, enhettiltak, listevisning} =
        usePortefoljeSelector(oversiktType);
    const dispatch = useDispatch();
    const portefoljeData = portefolje.data;
    const antallBrukere =
        portefoljeData.antallReturnert > portefoljeData.antallTotalt
            ? portefoljeData.antallTotalt
            : portefoljeData.antallReturnert;
    const harFilter = antallFilter(filtervalg) !== 0;
    const veilederliste = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const slettVeilederFilter = useCallback(
        ident => dispatch(slettEnkeltFilter('veiledere', ident, OversiktType.enhetensOversikt)),
        [dispatch]
    );
    const veilederLabel = useMemo(
        () => lagLablerTilVeiledereMedIdenter(filtervalg.veiledere, veilederliste, slettVeilederFilter),
        [filtervalg.veiledere, veilederliste, slettVeilederFilter]
    );
    const tiltak = sortTiltak(enhettiltak.data.tiltak);
    const isSidebarHidden = useSidebarViewStore(oversiktType).isSidebarHidden;
    const windowWidth = useWindowWidth();

    useEffect(() => {
        document.title = 'Enhetens oversikt';
    }, []);

    useSetStateFromUrl();
    useSyncStateMedUrl();

    useFetchPortefolje(oversiktType);
    useSetLocalStorageOnUnmount();
    LagredeFilterUIController({oversiktType: oversiktType});

    const doEndreFiltervalg = (filterId: string, filterVerdi: React.ReactNode) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, oversiktType));
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

    const {sisteValgtMineFilter} = useSelector((state: AppState) => state.mineFilterEnhetensOversikt);

    const data = useSelector((state: AppState) => state.mineFilter.data);
    const lagretFilterNavn = filterId =>
        data
            .filter(elem => elem.filterId === filterId)
            .map(elem => elem.filterNavn)
            .toString();

    return (
        <div className="side-storrelse" id={`side-storrelse_${id}`} data-testid={`side-storrelse_${id}`}>
            <ToppMeny oversiktType={oversiktType} />
            <Systemmeldinger />
            <Innholdslaster avhengigheter={[statustall]}>
                <div
                    className={classNames('oversikt-sideinnhold', isSidebarHidden && 'oversikt-sideinnhold__hidden')}
                    id={`oversikt-sideinnhold_${id}`}
                >
                    <Sidebar
                        filtervalg={filtervalg}
                        oversiktType={oversiktType}
                        enhettiltak={tiltak}
                        isSidebarHidden={isSidebarHidden}
                    />
                    <div className="sokefelt-knapp__container">
                        <FiltreringNavnellerfnr filtervalg={filtervalg} endreFiltervalg={doEndreFiltervalg} />
                        <MineFilterLagreFilterKnapp oversiktType={oversiktType} />
                    </div>
                    <FiltreringLabelContainer
                        filtervalg={{
                            ...filtervalg,
                            veiledere: veilederLabel
                        }}
                        oversiktType={oversiktType}
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
                                        <div
                                            className={classNames(
                                                'tabellinfo',
                                                ((scrolling && isSidebarHidden) ||
                                                    (scrolling && windowWidth < 1200) ||
                                                    (!isSidebarHidden && windowWidth < 1200)) &&
                                                    'tabellinfo__hidden'
                                            )}
                                        >
                                            <TabellOverskrift />
                                        </div>
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
                                            oversiktType={oversiktType}
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
                                        antallBrukere > 0 ? 'portefolje__container' : 'portefolje__container__tom-liste'
                                    }
                                />
                            </div>
                        </div>
                    ) : (
                        <Alert
                            variant="info"
                            className=" alertstripe__filtrering"
                            aria-live="assertive"
                            role="alert"
                            aria-atomic="true"
                            data-testid="alertstripe_filtrering"
                            size="medium"
                        >
                            Du må gjøre en filtrering for å se brukere i listen.
                        </Alert>
                    )}
                </div>
            </Innholdslaster>
            <MineFilterModal oversiktType={oversiktType} />
            <FeilTiltakModal
                lukkModal={() => dispatch(lukkFeilTiltakModal(oversiktType))}
                filterId={sisteValgtMineFilter!}
                oversiktType={oversiktType}
                gammeltFilterNavn={lagretFilterNavn(sisteValgtMineFilter!)}
            />
            <ModalEnhetSideController />
        </div>
    );
}
