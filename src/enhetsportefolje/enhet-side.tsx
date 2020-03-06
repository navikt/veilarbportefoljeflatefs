import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Innholdslaster from '../innholdslaster/innholdslaster';
import TabellOverskrift from '../components/tabell-overskrift';
import { ModalEnhetSideController } from '../components/modal/modal-enhet-side-controller';
import EnhetTabell from './enhetsportefolje-tabell';
import EnhetTabellOverskrift from './enhetsportefolje-tabelloverskrift';
import './enhetsportefolje.less';
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
import { AppState } from '../reducer';
import Toolbar from '../components/toolbar/toolbar';
import { slettEnkeltFilter } from '../ducks/filtrering';
import { hentPortefoljeForEnhet } from '../ducks/portefolje';
import { useFetchPortefoljeData } from '../hooks/portefolje/use-fetch-portefolje-data';
import { useSyncStateMedUrl } from '../hooks/portefolje/use-sync-state-med-url';
import { useSetLocalStorageOnUnmount } from '../hooks/portefolje/use-set-local-storage-on-unmount';
import VelgFilterMelding from './velg-filter-melding';
import '../style.less';

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
    const {statustall, enhettiltak} = useFetchPortefoljeData();
    const {portefolje, filtervalg, listevisning, enhetId, sorteringsrekkefolge, sorteringsfelt} = usePortefoljeSelector(ListevisningType.enhetensOversikt);
    const veilederliste = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const dispatch = useDispatch();

    useSetStateFromUrl();
    useSyncStateMedUrl();

    useFetchPortefolje(ListevisningType.enhetensOversikt);
    useSetLocalStorageOnUnmount();

    const slettVeilederFilter = ident => dispatch(slettEnkeltFilter('veiledere', ident, 'enhet'));

    const portefoljeData = portefolje.data;
    const antallBrukere = portefoljeData.antallReturnert > portefoljeData.antallTotalt ? portefoljeData.antallTotalt : portefoljeData.antallReturnert;
    const stickyContainer = antallBrukere >= 5 ? 'sticky-container' : 'sticky-container__fjernet';
    const tiltak = sortTiltak(enhettiltak.data.tiltak);
    const harFilter = antallFilter(filtervalg) !== 0;

    return (
        <DocumentTitle title="Enhetens oversikt">
            <div className="side-storrelse blokk-xl">
                <ToppMeny>
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <div id="oversikt-sideinnhold" role="tabpanel" className="oversikt-sideinnhold">
                            <div className="status-filter-kolonne">
                                <FiltreringContainer
                                    filtervalg={filtervalg}
                                    enhettiltak={tiltak}
                                    filtergruppe="enhet"
                                />
                            </div>
                            <div>
                                <FiltreringLabelContainer
                                    filtervalg={{
                                        ...filtervalg,
                                        veiledere: lagLablerTilVeiledereMedIdenter(filtervalg.veiledere, veilederliste, slettVeilederFilter)
                                    }}
                                    filtergruppe="enhet"
                                    enhettiltak={enhettiltak.data.tiltak}
                                    listevisning={listevisning}
                                    className="filtrering-label-container"
                                />
                                {harFilter
                                    ? <>
                                        <div className={stickyContainer}>
                                            <TabellOverskrift className="tabelloverskrift blokk-xxs"/>
                                            <div className="sticky-container__skygge">
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
                                                />
                                                <EnhetTabellOverskrift/>
                                            </div>
                                        </div>
                                        <EnhetTabell/>
                                    </>
                                    : <VelgFilterMelding/>}
                            </div>
                        </div>
                    </Innholdslaster>
                </ToppMeny>
                <ModalEnhetSideController/>
            </div>
        </DocumentTitle>
    );
}

export default EnhetSide;
