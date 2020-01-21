import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Innholdslaster from '../innholdslaster/innholdslaster';
import EnhetsportefoljeVisning from './enhetsportefolje-visning';
import { hentStatusTall } from '../ducks/statustall';
import { hentEnhetTiltak } from '../ducks/enhettiltak';
import ListevisningInfoPanel from '../components/toolbar/listevisning/listevisning-infopanel';
import { AppState } from '../reducer';
import {  ListevisningType } from '../ducks/ui/listevisning';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { loggSideVisning } from '../utils/metrikker/side-visning-metrikker';
import './enhet-side.less';
import {EnhetFilter} from "./enhet-filter";
import {useOnMount} from "../hooks/use-on-mount";
import {useEffect} from "react";
import {useEnhetSelector} from "../hooks/redux/use-enhet-selector";
import {useIdentSelector} from "../hooks/redux/use-inlogget-ident";
import {EnhetStatusFilter} from "./enhet-status-filter";
import {hentLagretFilterForEnhet} from "../ducks/lagret-filter";
import {getSeAlleFromUrl, getSideFromUrl, leggEnhetIUrl} from "../utils/url-utils";
import {pagineringSetup} from "../ducks/paginering";
import Toasts from '../components/toast/toast';
import { slettEnkeltFilter } from '../ducks/filtrering';
import { sortTiltak } from '../filtrering/filtrering-status/filter-utils';
import TabellOverskrift from '../components/tabell-overskrift';
import Toolbar from '../components/toolbar/toolbar';
import { ASCENDING, DESCENDING } from '../konstanter';
import { hentPortefoljeForEnhet, settSortering } from '../ducks/portefolje';
import { selectSideStorrelse } from '../components/toolbar/paginering/paginering-selector';
import { ModalEnhetSideController } from '../components/modal/modal-enhet-side-controller';
import EnhetTabell from './enhetsportefolje-tabell';
import { STATUS } from '../ducks/utils';
import EnhetTabellOverskrift from './enhetsportefolje-tabelloverskrift';
import './enhetsportefolje.less';
import './brukerliste.less';

function EnhetSide () {

    const dispatch = useDispatch();
    const enhet = useEnhetSelector();
    const innloggetVeilederIdent = useIdentSelector();
    const statustall = useSelector((state: AppState) => state.statustall);
    const enhettiltak = useSelector((state: AppState) => state.enhettiltak);


    useOnMount(()=> {
        loggSkjermMetrikker(Side.ENHETENS_OVERSIKT);
        loggSideVisning(innloggetVeilederIdent, Side.ENHETENS_OVERSIKT);
        leggEnhetIUrl(enhet);
        settInitalStateFraUrl();
    });

    function settInitalStateFraUrl() {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        dispatch(pagineringSetup({side, seAlle}))
    }

    useEffect(()=> {
        if(enhet) {
            dispatch(hentStatusTall(enhet));
            dispatch(hentEnhetTiltak(enhet));
            dispatch(hentLagretFilterForEnhet(enhet));
        }
    },[enhet, dispatch]);

        return (
            <DocumentTitle title="Enhetens oversikt">
                <div className="enhet-side blokk-xl">
                    <Lenker/>
                    <Toasts/>
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <section>
                            <div id="oversikt-sideinnhold" role="tabpanel">
                                <div className="row">
                                    <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                        <FiltreringContainer
                                            filtervalg={filtervalg}
                                            enhettiltak={tiltak}
                                            filtergruppe="enhet"
                                        />
                                    </div>
                                    <div className="col-lg-9 col-md-12 col-sm-12">
                                        <div className="sticky-container">
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
                                            <TabellOverskrift
                                                fraIndex={fraIndex}
                                                antallIVisning={antallReturnert}
                                                antallValgt={antallValgt}
                                                antallTotalt={antallTotalt}
                                                className="tabelloverskrift blokk-xxs"
                                            />
                                            <div className="sticky-container__skygge">
                                                <Toolbar
                                                    filtergruppe={ListevisningType.enhetensOversikt}
                                                    onPaginering={() => hentPortefolje(
                                                        valgtEnhet.enhet!.enhetId,
                                                        sorteringsrekkefolge,
                                                        sorteringsfelt,
                                                        filtervalg
                                                    )}
                                                    sokVeilederSkalVises
                                                    antallTotalt={antallTotalt}
                                                />
                                                <EnhetTabellOverskrift
                                                    settSorteringOgHentPortefolje={this.settSorteringOgHentPortefolje}
                                                />
                                            </div>
                                        </div>
                                        <Innholdslaster
                                            avhengigheter={[portefolje, veiledere, {status: tilordningerStatus}]}>
                                            <div className="portefolje__container">
                                                <EnhetTabell
                                                    veiledere={veiledere.data.veilederListe}
                                                />
                                            </div>
                                        </Innholdslaster>
                                        <ModalEnhetSideController/>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Innholdslaster>
                </div>
            </DocumentTitle>
        );
    }
}

export default EnhetSide;
