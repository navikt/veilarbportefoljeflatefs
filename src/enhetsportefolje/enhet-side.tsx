import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Innholdslaster from '../innholdslaster/innholdslaster';
import TabellOverskrift from '../components/tabell-overskrift';
import {ModalEnhetSideController} from '../components/modal/modal-enhet-side-controller';
import EnhetTabell from './enhetsportefolje-tabell';
import EnhetTabellOverskrift from './enhetsportefolje-tabelloverskrift';
import './enhetsportefolje.less';
import './brukerliste.less';
import ToppMeny from "../topp-meny/topp-meny";
import {usePortefoljeSelector} from "../hooks/redux/use-portefolje-selector";
import {ListevisningType} from "../ducks/ui/listevisning";
import {useFetchPortefolje} from "../hooks/portefolje/use-fetch-portefolje";
import FiltreringContainer from "../filtrering/filtrering-container";
import {sortTiltak} from "../filtrering/filtrering-status/filter-utils";
import FiltreringLabelContainer from "../filtrering/filtrering-label-container";
import {lagLablerTilVeiledereMedIdenter} from "../filtrering/utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import Toolbar from "../components/toolbar/toolbar";
import {slettEnkeltFilter} from "../ducks/filtrering";
import {hentPortefoljeForEnhet} from "../ducks/portefolje";
import {useFetchPortefoljeData} from "../hooks/portefolje/use-fetch-portefolje-data";
import {useOnUnmount} from "../hooks/use-on-unmount";
import {updateLastPath} from "../utils/url-utils";


function EnhetSide () {
    const {statustall, enhettiltak} = useFetchPortefoljeData();
    const {portefolje, filtervalg, listevisning, enhetId, sorteringsrekkefolge, sorteringsfelt} = usePortefoljeSelector(ListevisningType.enhetensOversikt);
    const veilederliste = useSelector( (state: AppState) => state.veiledere.data.veilederListe);
    const dispatch = useDispatch();

    //useSetStateFromUrl();
    useFetchPortefolje(ListevisningType.enhetensOversikt);
    /*
    useOnUnmount(()=> {
        updateLastPath();
    });
     */

    const slettVeilederFilter = ident => dispatch(slettEnkeltFilter('veiledere', ident, 'enhet'));

    const portefoljeData = portefolje.data;
    const antallBrukere = portefoljeData.antallReturnert > portefoljeData.antallTotalt ? portefoljeData.antallTotalt : portefoljeData.antallReturnert;
    const stickyWrapper = antallBrukere >= 5 ? 'col-lg-9 col-md-12 col-sm-12' : 'sticky-div col-lg-9 col-md-12 col-sm-12';
    const stickyContainer = antallBrukere >= 5 ? 'sticky-container' : 'sticky-container__fjernet';
    const tiltak = sortTiltak(enhettiltak.data.tiltak);

    return (
        <DocumentTitle title="Enhetens oversikt">
            <div className="enhet-side blokk-xl">
                <ToppMeny>
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <div id="oversikt-sideinnhold" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                    <FiltreringContainer
                                        filtervalg={filtervalg}
                                        enhettiltak={tiltak}
                                        filtergruppe="enhet"
                                    />
                                </div>
                                <div className={stickyWrapper}>
                                        <FiltreringLabelContainer
                                            filtervalg={{
                                                ...filtervalg,
                                                veiledere: lagLablerTilVeiledereMedIdenter(filtervalg.veiledere, veilederliste, slettVeilederFilter)
                                            }}
                                            filtergruppe="enhet"
                                            enhettiltak={enhettiltak}
                                            listevisning={listevisning}
                                            className="filtrering-label-container"
                                        />
                                        <div className={stickyContainer}>
                                            <TabellOverskrift className="tabelloverskrift blokk-xxs"/>
                                            <div className="sticky-container__skygge">
                                                <Toolbar
                                                    onPaginering={()=> dispatch(hentPortefoljeForEnhet(
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
                                </div>
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
