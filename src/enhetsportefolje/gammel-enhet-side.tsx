import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Innholdslaster from '../innholdslaster/innholdslaster';
import TabellOverskrift from '../components/tabell-overskrift';
import { ModalEnhetSideController } from '../components/modal/modal-enhet-side-controller';
import EnhetTabell from './enhetsportefolje-tabell';
import EnhetTabellOverskrift from './enhetsportefolje-tabelloverskrift';
import './gammel-enhetsportefolje.less';
import './brukerliste.less';
import ToppMeny from '../topp-meny/topp-meny';
import { usePortefoljeSelector } from '../hooks/redux/use-portefolje-selector';
import { ListevisningType } from '../ducks/ui/listevisning';
import { useSetStateFromUrl } from '../hooks/portefolje/use-set-state-from-url';
import { useFetchPortefolje } from '../hooks/portefolje/use-fetch-portefolje';
import FiltreringContainer from '../filtrering/filtrering-container';
import { sortTiltak } from '../filtrering/filtrering-status/filter-utils';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { lagLablerTilVeiledereMedIdenter } from '../filtrering/utils';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from '../components/toolbar/toolbar';
import { slettEnkeltFilter } from '../ducks/filtrering';
import { hentPortefoljeForEnhet } from '../ducks/portefolje';
import { useSyncStateMedUrl } from '../hooks/portefolje/use-sync-state-med-url';
import { useSetLocalStorageOnUnmount } from '../hooks/portefolje/use-set-local-storage-on-unmount';
import VelgFilterMelding from './velg-filter-melding';
import '../style-gammel.less';
import { useCallback, useMemo } from 'react';
import { useFetchStatusTall } from '../hooks/portefolje/use-fetch-statustall';
import { AppState } from '../reducer';

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

function EnhetSideGammel() {
    const statustall = useFetchStatusTall();
    const {portefolje, filtervalg, listevisning, enhetId, sorteringsrekkefolge, sorteringsfelt, enhettiltak} = usePortefoljeSelector(ListevisningType.enhetensOversikt);
    const veilederliste = useSelector((state: AppState) => state.veiledere.data.veilederListe);

    const dispatch = useDispatch();

    useSetStateFromUrl();
    useSyncStateMedUrl();

    useFetchPortefolje(ListevisningType.enhetensOversikt);
    useSetLocalStorageOnUnmount();

    const slettVeilederFilter = useCallback(ident => dispatch(slettEnkeltFilter('veiledere', ident, 'enhet')), [dispatch]);

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
            <div className="side-storrelse__gammel blokk-xl">
                <ToppMeny/>
                <Innholdslaster avhengigheter={[statustall]}>
                    <section>
                        <div id="oversikt-sideinnhold" role="tabpanel" className="oversikt-sideinnhold__gammel">
                            <div className="status-filter-kolonne__gammel">
                                <FiltreringContainer
                                    filtervalg={filtervalg}
                                    enhettiltak={tiltak}
                                    filtergruppe="enhet"
                                />
                            </div>
                            <div className="liste-kolonne__gammel">
                                <FiltreringLabelContainer
                                    filtervalg={{
                                        ...filtervalg,
                                        veiledere: veilederLabel
                                    }}
                                    filtergruppe="enhet"
                                    enhettiltak={enhettiltak.data.tiltak}
                                    listevisning={listevisning}
                                    className="filtrering-label-container__gammel"
                                />
                                {harFilter
                                    ? <>
                                        <div className={flereEnnAntallBrukere(4)
                                            ? 'sticky-container__gammel'
                                            : 'sticky-container__fjernet__gammel'}>
                                            <TabellOverskrift className="tabelloverskrift blokk-xxs"/>
                                            <span className={flereEnnAntallBrukere(4)
                                                ? 'sticky-skygge__gammel'
                                                : 'ikke-sticky__skygge__gammel'}>
                                            <div className={flereEnnAntallBrukere(4)
                                                ? 'toolbar-container__gammel'
                                                : 'ikke-sticky__toolbar-container__gammel'}>
                                                <Toolbar
                                                    onPaginering={() => dispatch(hentPortefoljeForEnhet(
                                                        enhetId,
                                                        sorteringsrekkefolge,
                                                        sorteringsfelt,
                                                        filtervalg
                                                    ))}
                                                    filtergruppe={ListevisningType.enhetensOversikt}
                                                    sokVeilederSkalVises
                                                    antallTotalt={portefoljeData.antallTotalt}
                                                    side="enhetensoversikt"
                                                />
                                                <EnhetTabellOverskrift/>
                                            </div>
                                            </span>
                                        </div>
                                        <EnhetTabell
                                            classNameWrapper={flereEnnAntallBrukere(0)
                                                ? 'portefolje__container__gammel'
                                                : 'portefolje__container__tom-liste__gammel'}
                                        />
                                    </>
                                    : <VelgFilterMelding/>
                                }
                            </div>
                        </div>
                    </section>
                </Innholdslaster>
                <ModalEnhetSideController/>
            </div>
        </DocumentTitle>
    );
}

export default EnhetSideGammel;
