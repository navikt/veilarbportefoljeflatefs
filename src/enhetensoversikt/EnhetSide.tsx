import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import {Alert} from '@navikt/ds-react';
import {Innholdslaster} from '../innholdslaster/innholdslaster';
import {TabellOverskrift} from '../components/tabell/tabell-overskrift';
import {ModalEnhetSideController} from '../components/modal/modal-enhet-side-controller';
import {EnhetTableBody} from './EnhetTableBody';
import {EnhetTableHeader} from './EnhetTableHeader';
import {ToppMeny} from '../topp-meny/topp-meny';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {oppdaterKolonneAlternativer, OversiktType} from '../ducks/ui/listevisning';
import {useSetStateFromUrl} from '../hooks/portefolje/use-set-state-from-url';
import {useFetchPortefolje} from '../hooks/portefolje/use-fetch-portefolje';
import FiltreringLabelContainer from '../filtrering/filtrering-label/filtrering-label-container';
import {lagLablerTilVeiledereMedIdenter} from '../filtrering/filtrering-label/lagLablerTilVeiledereMedIdenter';
import {endreFiltervalg, fjern, slettEnkeltFilter} from '../ducks/filtrering';
import {hentPortefoljeForEnhet} from '../ducks/portefolje';
import {useSyncStateMedUrl} from '../hooks/portefolje/use-sync-state-med-url';
import {useSetLocalStorageOnUnmount} from '../hooks/portefolje/use-set-local-storage-on-unmount';
import {useFetchStatustallForEnhet} from '../hooks/portefolje/use-fetch-statustall';
import {AppState} from '../reducer';
import {useSidebarViewStore} from '../store/sidebar/sidebar-view-store';
import {sortTiltak} from '../filtrering/filtrering-status/filter-utils';
import {pagineringSetup} from '../ducks/paginering';
import {Sidebar} from '../components/sidebar/sidebar';
import {MineFilterLagreFilterKnapp} from '../minoversikt/MineFilterLagreFilterKnapp';
import {MineFilterModal} from '../components/modal/mine-filter/mine-filter-modal';
import {useWindowWidth} from '../hooks/use-window-width';
import {Toolbar} from '../components/toolbar/toolbar';
import {FiltreringNavnellerfnr} from '../filtrering/filtrering-navnellerfnr';
import {LagredeFilterUIController} from '../filtrering/lagrede-filter-controller';
import {FeilTiltakModal} from '../components/modal/mine-filter/feil-tiltak-modal';
import {lukkFeilTiltakModal} from '../ducks/lagret-filter-ui-state';
import {Informasjonsmeldinger} from '../components/informasjonsmeldinger/informasjonsmeldinger';
import {useStatustallEnhetSelector} from '../hooks/redux/use-statustall';
import {StatustallEnhetState} from '../ducks/statustall/statustall-enhet';
import {StatustallEnhet} from '../ducks/statustall/statustall-typer';
import {AktiviteterValg} from '../filtrering/filter-konstanter';
import '../style.css';
import './enhetensoversikt.css';
import './brukerliste.css';
import {Filtervalg} from '../typer/filtervalg-modell';

export function antallFilter(filtervalg) {
    function mapAktivitetFilter(value) {
        return Object.entries(value)
            .map(([_, verdi]) => {
                if (verdi === AktiviteterValg.NA) return 0;
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
            } else if (filter === Filtervalg.aktiviteter) {
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

export function EnhetSide() {
    const {portefolje, filtervalg, enhetId, sorteringsrekkefolge, sorteringsfelt, enhettiltak, listevisning} =
        usePortefoljeSelector(oversiktType);
    const statustallFetchStatus: StatustallEnhetState = useFetchStatustallForEnhet(enhetId);
    const statustall: StatustallEnhet = useStatustallEnhetSelector();
    const dispatch = useDispatch();
    const portefoljeData = portefolje.data;
    const antallBrukere =
        portefoljeData.antallReturnert > portefoljeData.antallTotalt
            ? portefoljeData.antallTotalt
            : portefoljeData.antallReturnert;
    const harFilter = antallFilter(filtervalg) !== 0;
    const veilederliste = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const slettVeilederFilter = useCallback(
        ident => {
            dispatch(slettEnkeltFilter(Filtervalg.veiledere, ident, OversiktType.enhetensOversikt));
            const oppdatertFiltervalg = {
                ...filtervalg,
                veiledere: fjern(Filtervalg.veiledere, filtervalg.veiledere, ident)
            };
            oppdaterKolonneAlternativer(dispatch, oppdatertFiltervalg, oversiktType);
        },
        [dispatch, filtervalg]
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

    const doEndreFiltervalg = (filterId: string, filterVerdi: ReactNode) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, oversiktType));
        oppdaterKolonneAlternativer(dispatch, {...filtervalg, [filterId]: filterVerdi}, oversiktType);
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
            <Informasjonsmeldinger />
            <Innholdslaster avhengigheter={[statustallFetchStatus]}>
                <div
                    className={classNames('oversikt-sideinnhold', isSidebarHidden && 'oversikt-sideinnhold__hidden')}
                    id={`oversikt-sideinnhold_${id}`}
                >
                    <Sidebar
                        filtervalg={filtervalg}
                        oversiktType={oversiktType}
                        enhettiltak={tiltak}
                        statustall={statustall}
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
                        <div className="oversikt__container">
                            <div className={classNames('toolbar-container')}>
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
                                <EnhetTableHeader />
                            </div>
                            <EnhetTableBody classNameWrapper={antallBrukere > 0 ? 'portefolje__container' : ''} />
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
