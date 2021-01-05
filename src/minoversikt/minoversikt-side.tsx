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
import {useDispatch, useSelector} from 'react-redux';
import {useSyncStateMedUrl} from '../hooks/portefolje/use-sync-state-med-url';
import {useSetLocalStorageOnUnmount} from '../hooks/portefolje/use-set-local-storage-on-unmount';
import '../style.less';
import './minoversikt.less';
import './../components/tabell-overskrift.less';
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
import {useVeilederListeSelector} from '../hooks/redux/use-veilederliste-selector';
import {useParams} from 'react-router';
import AlertStripe from 'nav-frontend-alertstriper';
import {AppState} from '../reducer';
import {selectValgteAlternativer} from '../ducks/ui/listevisning-selectors';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING} from '../konstanter';
import Lenke from 'nav-frontend-lenker';

const filtergruppe = ListevisningType.minOversikt;
const id = 'min-oversikt';

export default function MinoversiktSide() {
    const {
        portefolje,
        filtervalg,
        listevisning,
        enhetId,
        sorteringsrekkefolge,
        sorteringsfelt,
        enhettiltak
    } = usePortefoljeSelector(filtergruppe);
    const innloggetVeilederIdent = useIdentSelector();
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const statustall = useFetchStatusTall(gjeldendeVeileder);
    const settSorteringogHentPortefolje = useSetPortefoljeSortering(filtergruppe);
    const dispatch = useDispatch();
    const valgteKolonner = useSelector((state: AppState) => selectValgteAlternativer(state, filtergruppe));

    useSetStateFromUrl();
    useSyncStateMedUrl();
    useSetLocalStorageOnUnmount();
    useFetchPortefolje(filtergruppe, valgteKolonner);
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
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

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

    return (
        <DocumentTitle title="Min oversikt">
            <div className="side-storrelse" id={`side-storrelse_${id}`}>
                <ToppMeny erPaloggetVeileder={!visesAnnenVeiledersPortefolje} />
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
                            filtergruppe={filtergruppe}
                            enhettiltak={tiltak}
                            isSidebarHidden={isSidebarHidden}
                        />
                        <div className="sokefelt-knapp__container">
                            <FiltreringNavnellerfnr filtervalg={filtervalg} endreFiltervalg={doEndreFiltervalg} />
                            <MineFilterLagreFilterKnapp filtergruppe={filtergruppe} />
                        </div>
                        <FiltreringLabelContainer
                            filtervalg={filtervalg}
                            filtergruppe={filtergruppe}
                            enhettiltak={enhettiltak.data.tiltak}
                            listevisning={listevisning}
                            className={classNames(
                                'filtrering-label-container',
                                visesAnnenVeiledersPortefolje && 'filtrering-label-container__annen-veileder'
                            )}
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
                                        className={classNames(
                                            'toolbar-container',
                                            antallBrukere < 4 && 'ikke-sticky__toolbar-container'
                                        )}
                                    >
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
                                                className={
                                                    visesAnnenVeiledersPortefolje
                                                        ? 'tabelloverskrift__annen-veileder'
                                                        : ''
                                                }
                                            />
                                            {visesAnnenVeiledersPortefolje && (
                                                <AlertStripe
                                                    type={'info'}
                                                    className="alertstripe__annen-veileder-varsel"
                                                    data-testid="annen-veileder_infotekst"
                                                >
                                                    {`Du er inne på ${veilederFraUrl.fornavn} ${veilederFraUrl.etternavn} sin oversikt`}
                                                </AlertStripe>
                                            )}
                                        </div>
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
