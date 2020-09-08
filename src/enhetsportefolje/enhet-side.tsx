import * as React from 'react';
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
import FiltreringContainer from '../filtrering/filtrering-container';
import {sortTiltak} from '../filtrering/filtrering-status/filter-utils';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import {lagLablerTilVeiledereMedIdenter} from '../filtrering/utils';
import {useDispatch, useSelector} from 'react-redux';
import Toolbar from '../components/toolbar/toolbar';
import {slettEnkeltFilter} from '../ducks/filtrering';
import {hentPortefoljeForEnhet} from '../ducks/portefolje';
import {useSyncStateMedUrl} from '../hooks/portefolje/use-sync-state-med-url';
import {useSetLocalStorageOnUnmount} from '../hooks/portefolje/use-set-local-storage-on-unmount';
import VelgFilterMelding from './velg-filter-melding';
import '../style.less';
import {useCallback, useMemo} from 'react';
import {useFetchStatusTall} from '../hooks/portefolje/use-fetch-statustall';
import {AppState} from '../reducer';
import {useMineFilterController} from "../minoversikt/use-mine-filter-controller";
import {MineFilterLagreFilterKnapp} from "../minoversikt/mine-filter-lagre-filter-knapp";
import {MineFilterModal} from "../components/modal/mine-filter/mine-filter-modal";
import AlertStripe from "nav-frontend-alertstriper";
import Lukknapp from "nav-frontend-lukknapp";

function antallFilter(filtervalg) {
    function mapAktivitetFilter(value) {
        return Object.entries(value).map(([_, verdi]) => {
            if (verdi === 'NA') return 0;
            return 1;
        }).reduce((a: number, b: number) => a + b, 0);
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
        }).reduce((a, b) => a + b, 0);

}


function EnhetSide() {
    const statustall = useFetchStatusTall();
    const filtergruppe = ListevisningType.enhetensOversikt;
    const {portefolje, filtervalg, listevisning, enhetId, sorteringsrekkefolge, sorteringsfelt, enhettiltak} = usePortefoljeSelector(filtergruppe);
    const veilederliste = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const dispatch = useDispatch();

    useSetStateFromUrl();
    useSyncStateMedUrl();

    useFetchPortefolje(filtergruppe);
    useSetLocalStorageOnUnmount();
    useMineFilterController({filtergruppe: filtergruppe});

    const slettVeilederFilter = useCallback(ident =>
            dispatch(slettEnkeltFilter('veiledere', ident, filtergruppe)),
        [dispatch, filtergruppe]);

    const portefoljeData = portefolje.data;
    const antallBrukere = portefoljeData.antallReturnert > portefoljeData.antallTotalt ? portefoljeData.antallTotalt : portefoljeData.antallReturnert;
    const flereEnnAntallBrukere = (antall: number) => {
        return antallBrukere > antall;
    };
    const tiltak = sortTiltak(enhettiltak.data.tiltak);
    const harFilter = antallFilter(filtervalg) !== 0;

    const veilederLabel = useMemo(() => lagLablerTilVeiledereMedIdenter(filtervalg.veiledere, veilederliste, slettVeilederFilter), [filtervalg.veiledere, veilederliste, slettVeilederFilter]);
    return (
        <DocumentTitle title="Enhetens oversikt">
            <div className="side-storrelse blokk-xl">
                <ToppMeny/>
                <Innholdslaster avhengigheter={[statustall]}>
                    <div id="oversikt-sideinnhold" role="tabpanel" className="oversikt-sideinnhold">
                        <div className="status-filter-kolonne">
                            <FiltreringContainer
                                filtervalg={filtervalg}
                                enhettiltak={tiltak}
                                filtergruppe={filtergruppe}
                            />
                        </div>
                        <div className="liste-kolonne">
                            <div className="etikett-wrapper">
                                <AlertStripe type="info" className="veiledergruppe-alertstripe">
                                    <p className="veiledergruppe-alertstripe__tekst">
                                        Følgende veiledere(e) er fjernet fra denne gruppen fordi de ikke lenger har
                                        tilgang til enheten:
                                    </p>
                                    <Lukknapp className="veiledergruppe-alertstripe__knapp"/>
                                </AlertStripe>
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
                                <MineFilterLagreFilterKnapp filtergruppe={filtergruppe}/>
                            </div>
                            {harFilter
                                ? <>
                                    <div className={flereEnnAntallBrukere(4)
                                        ? 'sticky-container'
                                        : 'sticky-container__fjernet'}>
                                        <TabellOverskrift className="tabelloverskrift blokk-xxs"/>
                                        <span className={flereEnnAntallBrukere(4)
                                            ? 'sticky-skygge'
                                            : 'ikke-sticky__skygge'}>
                                            <div className={flereEnnAntallBrukere(4)
                                                ? 'toolbar-container'
                                                : 'ikke-sticky__toolbar-container'}>
                                                <Toolbar
                                                    onPaginering={() => dispatch(hentPortefoljeForEnhet(
                                                        enhetId,
                                                        sorteringsrekkefolge,
                                                        sorteringsfelt,
                                                        filtervalg
                                                    ))}
                                                    filtergruppe={filtergruppe}
                                                    sokVeilederSkalVises
                                                    antallTotalt={portefoljeData.antallTotalt}
                                                />
                                                <EnhetTabellOverskrift/>
                                            </div>
                                            </span>
                                    </div>
                                    <EnhetTabell
                                        classNameWrapper={flereEnnAntallBrukere(0)
                                            ? 'portefolje__container'
                                            : 'portefolje__container__tom-liste'}
                                    />
                                </>
                                : <VelgFilterMelding/>
                            }
                        </div>
                    </div>
                </Innholdslaster>
                <MineFilterModal filtergruppe={filtergruppe}/>
                <ModalEnhetSideController/>
            </div>
        </DocumentTitle>
    );
}

export default EnhetSide;
