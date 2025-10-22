import {ReactNode, useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import {Alert} from '@navikt/ds-react';
import {Innholdslaster} from '../innholdslaster/innholdslaster';
import {oppdaterKolonneAlternativer, OversiktType} from '../ducks/ui/listevisning';
import {useIdentSelector} from '../hooks/redux/use-innlogget-ident';
import {MinOversiktModalController} from '../components/modal/modal-min-oversikt-controller';
import {MinoversiktTabell} from './minoversikt-portefolje-tabell';
import {MinOversiktTableHeader} from './MinOversiktTableHeader';
import {TabellOverskrift} from '../components/tabell/tabell-overskrift';
import {useSelectGjeldendeVeileder} from '../hooks/portefolje/use-select-gjeldende-veileder';
import {ToppMeny} from '../topp-meny/topp-meny';
import {useSetStateFromUrl} from '../hooks/portefolje/use-set-state-from-url';
import {useFetchPortefolje} from '../hooks/portefolje/use-fetch-portefolje';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {sortTiltak} from '../filtrering/filtrering-status/filter-utils';
import {hentPortefoljeForVeileder} from '../ducks/portefolje';
import {useSyncStateMedUrl} from '../hooks/portefolje/use-sync-state-med-url';
import {useSetLocalStorageOnUnmount} from '../hooks/portefolje/use-set-local-storage-on-unmount';
import {useFetchStatustallForVeileder} from '../hooks/portefolje/use-fetch-statustall';
import {useSidebarViewStore} from '../store/sidebar/sidebar-view-store';
import {pagineringSetup} from '../ducks/paginering';
import {endreFiltervalg} from '../ducks/filtrering';
import {Sidebar} from '../components/sidebar/sidebar';
import {MinOversiktWrapper} from './minoversikt_wrapper';
import {MineFilterModal} from '../components/modal/mine-filter/mine-filter-modal';
import {MineFilterLagreFilterKnapp} from './mine-filter-lagre-filter-knapp';
import {useWindowWidth} from '../hooks/use-window-width';
import {Toolbar} from '../components/toolbar/toolbar';
import {FiltreringNavnellerfnr} from '../filtrering/filtrering-navnellerfnr';
import {LagredeFilterUIController} from '../filtrering/lagrede-filter-controller';
import {useVeilederListeSelector} from '../hooks/redux/use-veilederliste-selector';
import {lukkFeilTiltakModal} from '../ducks/lagret-filter-ui-state';
import {FeilTiltakModal} from '../components/modal/mine-filter/feil-tiltak-modal';
import {AppState} from '../reducer';
import {IdentParam} from '../model-interfaces';
import {Informasjonsmeldinger} from '../components/informasjonsmeldinger/informasjonsmeldinger';
import {useStatustallVeilederSelector} from '../hooks/redux/use-statustall';
import {StatustallVeilederState} from '../ducks/statustall/statustall-veileder';
import {StatustallVeileder} from '../ducks/statustall/statustall-typer';
import '../style.css';
import './minoversikt.css';
import '../components/tabell/tabell-overskrift.css';

const oversiktType = OversiktType.minOversikt;
const id = 'min-oversikt';

export function MinoversiktSide() {
    const {portefolje, filtervalg, listevisning, enhetId, sorteringsrekkefolge, sorteringsfelt, enhettiltak} =
        usePortefoljeSelector(oversiktType);
    const innloggetVeilederIdent = useIdentSelector();
    const gjeldendeVeilederId = useSelectGjeldendeVeileder();
    const statustallFetchStatus: StatustallVeilederState = useFetchStatustallForVeileder(gjeldendeVeilederId);
    const statustall: StatustallVeileder = useStatustallVeilederSelector();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Min oversikt';
    }, []);

    useSetStateFromUrl();
    useSyncStateMedUrl();
    useSetLocalStorageOnUnmount();
    useFetchPortefolje(oversiktType);
    LagredeFilterUIController({oversiktType: oversiktType});

    const visesAnnenVeiledersPortefolje = gjeldendeVeilederId !== innloggetVeilederIdent!.ident;
    const antallBrukere =
        portefolje.data.antallReturnert > portefolje.data.antallTotalt
            ? portefolje.data.antallTotalt
            : portefolje.data.antallReturnert;
    const tiltak = sortTiltak(enhettiltak.data.tiltak);
    const {isSidebarHidden} = useSidebarViewStore(oversiktType);
    const windowWidth = useWindowWidth();
    const {ident} = useParams<IdentParam>();
    const veiledere = useVeilederListeSelector();
    const veilederFraUrl = veiledere.find(veileder => veileder.ident === ident) || {fornavn: '', etternavn: ''};
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
    }, [scrolling]);

    const {sisteValgtMineFilter} = useSelector((state: AppState) => state.mineFilterMinOversikt);

    const data = useSelector((state: AppState) => state.mineFilter.data);
    const lagretFilterNavn = filterId =>
        data
            .filter(elem => elem.filterId === filterId)
            .map(elem => elem.filterNavn)
            .toString();

    return (
        <div className="side-storrelse" id={`side-storrelse_${id}`} data-testid={`side-storrelse_${id}`}>
            <ToppMeny erPaloggetVeileder={!visesAnnenVeiledersPortefolje} oversiktType={oversiktType} />
            <Informasjonsmeldinger />
            <Innholdslaster avhengigheter={[statustallFetchStatus]}>
                <MinOversiktWrapper
                    className={classNames(
                        'oversikt-sideinnhold portefolje-side',
                        isSidebarHidden && 'oversikt-sideinnhold__hidden',
                        visesAnnenVeiledersPortefolje && 'oversikt-sideinnhold__annen-veileder'
                    )}
                    id={`oversikt-sideinnhold_${id}`}
                >
                    <Sidebar
                        filtervalg={filtervalg}
                        oversiktType={oversiktType}
                        enhettiltak={tiltak}
                        statustall={{medBrukerinnsyn: statustall, utenBrukerinnsyn: null}}
                    />
                    <div className="sokefelt-knapp__container">
                        <FiltreringNavnellerfnr filtervalg={filtervalg} endreFiltervalg={doEndreFiltervalg} />
                        <MineFilterLagreFilterKnapp oversiktType={oversiktType} />
                    </div>
                    <FiltreringLabelContainer
                        filtervalg={filtervalg}
                        oversiktType={oversiktType}
                        enhettiltak={enhettiltak.data.tiltak}
                        listevisning={listevisning}
                        className={classNames(
                            'filtrering-label-container',
                            visesAnnenVeiledersPortefolje && 'filtrering-label-container__annen-veileder'
                        )}
                    />
                    <div className="oversikt__container">
                        <div className="toolbar-container">
                            <div
                                className={classNames(
                                    'tabellinfo',
                                    visesAnnenVeiledersPortefolje && 'tabellinfo__annen-veileder',
                                    ((scrolling && isSidebarHidden) ||
                                        (scrolling && windowWidth < 1200) ||
                                        (!isSidebarHidden && windowWidth < 1200)) &&
                                        'tabellinfo__hidden'
                                )}
                            >
                                <TabellOverskrift
                                    className={visesAnnenVeiledersPortefolje ? 'tabelloverskrift__annen-veileder' : ''}
                                />
                                {visesAnnenVeiledersPortefolje && (
                                    <Alert
                                        variant="info"
                                        className="alertstripe__annen-veileder-varsel"
                                        data-testid="annen-veileder_infotekst"
                                        size="small"
                                    >
                                        {`Du er inne på ${veilederFraUrl.fornavn} ${veilederFraUrl.etternavn} sin oversikt`}
                                    </Alert>
                                )}
                            </div>
                            <Toolbar
                                onPaginering={() =>
                                    dispatch(
                                        hentPortefoljeForVeileder(
                                            enhetId,
                                            gjeldendeVeilederId,
                                            sorteringsrekkefolge,
                                            sorteringsfelt,
                                            filtervalg
                                        )
                                    )
                                }
                                oversiktType={oversiktType}
                                sokVeilederSkalVises={false}
                                antallTotalt={portefolje.data.antallTotalt}
                                scrolling={scrolling}
                                isSidebarHidden={isSidebarHidden}
                            />
                            <MinOversiktTableHeader />
                        </div>

                        <MinoversiktTabell classNameWrapper={antallBrukere > 0 ? 'portefolje__container' : ''} />
                        <MinOversiktModalController />
                    </div>
                </MinOversiktWrapper>
            </Innholdslaster>
            <MineFilterModal oversiktType={oversiktType} />
            <FeilTiltakModal
                lukkModal={() => dispatch(lukkFeilTiltakModal(oversiktType))}
                filterId={sisteValgtMineFilter!}
                oversiktType={oversiktType}
                gammeltFilterNavn={lagretFilterNavn(sisteValgtMineFilter!)}
            />
        </div>
    );
}
