import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DocumentTitle from 'react-document-title';
import Innholdslaster from './../innholdslaster/innholdslaster';
import VeilederPortefoljeVisning from './minoversikt-portefolje-visning';
import { hentStatusTall } from '../ducks/statustall';
import {  hentEnhetTiltak } from '../ducks/enhettiltak';
import { hentPortefoljeForVeileder, settSortering } from '../ducks/portefolje';
import {  ListevisningType } from '../ducks/ui/listevisning';
import ListevisningInfoPanel from '../components/toolbar/listevisning/listevisning-infopanel';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { hentStatusTall, StatustallState } from '../ducks/statustall';
import { EnhettiltakState, hentEnhetTiltak } from '../ducks/enhettiltak';
import { hentPortefoljeForVeileder, settSortering, settValgtVeileder } from '../ducks/portefolje';
import { EnheterState } from '../ducks/enheter';
import { VeiledereState } from '../ducks/veiledere';
import { FiltervalgModell, ValgtEnhetModell, VeilederModell } from '../model-interfaces';
import { ListevisningState, ListevisningType } from '../ducks/ui/listevisning';
import {
    getSeAlleFromUrl, getSideFromUrl, getSorteringsFeltFromUrl,
    getSorteringsRekkefolgeFromUrl, leggEnhetIUrl
} from '../utils/url-utils';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { loggSideVisning } from '../utils/metrikker/side-visning-metrikker';
import './minoversikt-side.less';
import {AppState} from "../reducer";
import {MinOversiktStatusFilter} from "./minoversikt-status-filter";
import {useOnMount} from "../hooks/use-on-mount";
import { useEffect } from "react";
import {useEnhetSelector} from "../hooks/redux/use-enhet-selector";
import {useParams} from "react-router";
import {useIdentSelector} from "../hooks/redux/use-inlogget-ident";
import {MinOversiktWrapper} from "./min-oversikt-wrapper";
import { MinOversiktFilterLabelContainer} from "./min-oversikt-filterlabel";
import {pagineringSetup} from "../ducks/paginering";
import {PortefoljeKolonner} from "../components/colonner/portefolje-kolonner";
import './minoversikt-side.less';

function MinoversiktSide () {
    const {ident} = useParams();
    const innloggetVeilederIdent = useIdentSelector();

    const dispatch = useDispatch();
    const enhet = useEnhetSelector();

    const enhettiltak = useSelector((state: AppState)=> state.enhettiltak);
    const statustall = useSelector((state: AppState)=> state.statustall);
    const filtervalg = useSelector((state: AppState)=> state.filtreringMinoversikt);

    const gjeldendeVeileder = ident || innloggetVeilederIdent!.ident;
    const sorteringsrekkefolge = getSorteringsRekkefolgeFromUrl();
    const sorteringsfelt = getSorteringsFeltFromUrl();

    function settInitalStateFraUrl() {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        dispatch(pagineringSetup({side, seAlle}))
    }

    useOnMount(()=> {
        loggSkjermMetrikker(Side.MIN_OVERSIKT);
        loggSideVisning(innloggetVeilederIdent, Side.MIN_OVERSIKT);
        settInitalStateFraUrl();
        dispatch(settSortering(sorteringsrekkefolge, sorteringsfelt));
        dispatch(hentPortefoljeForVeileder(enhet, gjeldendeVeileder, sorteringsrekkefolge, sorteringsfelt, filtervalg))
    });

    useEffect(()=> {
        if(enhet){
            dispatch(hentStatusTall(enhet, gjeldendeVeileder));
            dispatch(hentEnhetTiltak(enhet));
        }
    },[enhet, dispatch, gjeldendeVeileder]);

        return (
            <DocumentTitle title="Min oversikt">
                <div className="minoversikt-side blokk-xl">
                    <Lenker/>
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <section className={visesAnnenVeiledersPortefolje ? 'annen-veileder' : ''}>
                            {visesAnnenVeiledersPortefolje ? annenVeilederVarsel : null}
                            <div className="portefolje-side">
                                <div id="oversikt-sideinnhold" role="tabpanel">
                                    <div className="row">
                                        <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                            <FiltreringContainer
                                                filtervalg={filtervalg}
                                                filtergruppe="veileder"
                                                veileder={gjeldendeVeileder}
                                                enhettiltak={tiltak}
                                            />
                                        </div>
                                        <div className="col-lg-9 col-md-12 col-sm-12">
                                            <div className="sticky-container">
                                                <FiltreringLabelContainer
                                                    filtervalg={filtervalg}
                                                    filtergruppe="veileder"
                                                    veileder={gjeldendeVeileder}
                                                    enhettiltak={enhettiltak.data.tiltak}
                                                    listevisning={listevisning}
                                                    className={visesAnnenVeiledersPortefolje ? 'filtrering-label-container__annen-veileder' : 'filtrering-label-container'}
                                                />
                                                <TabellOverskrift
                                                    fraIndex={fraIndex}
                                                    antallIVisning={antallReturnert}
                                                    antallTotalt={antallTotalt}
                                                    antallValgt={antallValgt}
                                                    className={visesAnnenVeiledersPortefolje ? 'tabelloverskrift__annen-veileder blokk-xxs' : 'tabelloverskrift blokk-xxs'} //tabelloverskrift blokk-xxs
                                                />
                                                <div className="sticky-container__skygge">
                                                    <Toolbar
                                                        filtergruppe={ListevisningType.minOversikt}
                                                        onPaginering={() => hentPortefolje(
                                                            valgtEnhet.enhet!.enhetId,
                                                            gjeldendeVeileder.ident,
                                                            sorteringsrekkefolge,
                                                            sorteringsfelt,
                                                            filtervalg
                                                        )}
                                                        gjeldendeVeileder={gjeldendeVeileder}
                                                        visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                                        sokVeilederSkalVises={false}
                                                        antallTotalt={antallTotalt}
                                                    />
                                                    <MinoversiktTabellOverskrift
                                                        innloggetVeileder={innloggetVeilederIdent}
                                                        settSorteringOgHentPortefolje={this.settSorteringOgHentPortefolje}
                                                    />
                                                </div>
                                            </div>
                                            <Innholdslaster
                                                avhengigheter={[portefolje, {status: tilordningerStatus}]}>
                                                <div className="portefolje__container">
                                                    <MinoversiktTabell
                                                        innloggetVeileder={innloggetVeilederIdent}
                                                        settSorteringOgHentPortefolje={this.settSorteringOgHentPortefolje}
                                                    />
                                                </div>
                                            </Innholdslaster>
                                            <MinOversiktModalController/>
                                        </div>
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

export default MinoversiktSide;
