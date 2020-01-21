import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DocumentTitle from 'react-document-title';
import Innholdslaster from './../innholdslaster/innholdslaster';
import { hentStatusTall } from '../ducks/statustall';
import {  hentEnhetTiltak } from '../ducks/enhettiltak';
import { hentPortefoljeForVeileder, settSortering } from '../ducks/portefolje';
import {  ListevisningType } from '../ducks/ui/listevisning';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
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
import {useIdentSelector} from "../hooks/redux/use-inlogget-ident";
import {pagineringSetup} from "../ducks/paginering";
import './minoversikt-side.less';
import {MinOversiktModalController} from "../components/modal/modal-min-oversikt-controller";
import MinoversiktTabell from "./minoversikt-portefolje-tabell";
import MinoversiktTabellOverskrift from "./minoversikt-portefolje-tabelloverskrift";
import {MinOversiktWrapper} from "./min-oversikt-wrapper";
import {MinOversiktFilterLabelContainer} from "./min-oversikt-filterlabel";
import TabellOverskrift from "../components/tabell-overskrift";
import {useSelectGjeldendeVeileder} from "../hooks/use-select-gjeldende-veileder";
import Toolbar from "../components/toolbar/toolbar";

function MinoversiktSide () {
    const innloggetVeilederIdent = useIdentSelector();
    const dispatch = useDispatch();
    const enhet = useEnhetSelector();

    const enhettiltak = useSelector((state: AppState)=> state.enhettiltak);
    const statustall = useSelector((state: AppState)=> state.statustall);
    const filtervalg = useSelector((state: AppState)=> state.filtreringMinoversikt);
    const antallTotalt = useSelector((state: AppState)=> state.portefolje.data.antallTotalt);

    const gjeldendeVeileder = useSelectGjeldendeVeileder();

    const visesAnnenVeiledersPortefolje = gjeldendeVeileder === innloggetVeilederIdent!.ident;

    const sorteringsrekkefolge = getSorteringsRekkefolgeFromUrl();
    const sorteringsfelt = getSorteringsFeltFromUrl();

    function settInitalStateFraUrl() {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        dispatch(pagineringSetup({side, seAlle}))
    }

    function settSorteringogHentPortefolje () {
        dispatch(hentPortefoljeForVeileder(
            enhet,
            gjeldendeVeileder,
            sorteringsrekkefolge,
            sorteringsfelt,
            filtervalg
        ));
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
    const antallBrukere = antallReturnert > antallTotalt ? antallTotalt : antallReturnert;
    const stickyWrapper = antallBrukere > 4 ? 'col-lg-9 col-md-12 col-sm-12' : 'sticky-div col-lg-9 col-md-12 col-sm-12';
    const stickyContainer = antallBrukere > 4 ? 'sticky-container' : 'sticky-container__fjernet';
    return (
        <DocumentTitle title="Min oversikt">
            <div className="minoversikt-side blokk-xl">
                <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                    <MinOversiktWrapper>
                        <MinOversiktStatusFilter/>
                        <div className={stickyWrapper}>
                            <div className={stickyContainer}>
                                <MinOversiktFilterLabelContainer visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}/>
                                <TabellOverskrift className={visesAnnenVeiledersPortefolje ? 'tabelloverskrift__annen-veileder blokk-xxs' : 'tabelloverskrift blokk-xxs'}/>
                                <div className="sticky-container__skygge">
                                    <Toolbar
                                        filtergruppe={ListevisningType.minOversikt}
                                        onPaginering={settSorteringogHentPortefolje}
                                        gjeldendeVeileder={gjeldendeVeileder}
                                        visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                        sokVeilederSkalVises={false}
                                        antallTotalt={antallTotalt}
                                    />
                                    <MinoversiktTabellOverskrift
                                        visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                        innloggetVeileder={innloggetVeilederIdent!.ident}
                                        settSorteringOgHentPortefolje={settSorteringogHentPortefolje}
                                    />
                                </div>
                            </div>
                            <MinoversiktTabell
                                innloggetVeileder={innloggetVeilederIdent}
                                settSorteringOgHentPortefolje={settSorteringogHentPortefolje}
                            />
                            <MinOversiktModalController/>
                        </div>
                    </MinOversiktWrapper>
                </Innholdslaster>
            </div>
        </DocumentTitle>
    );
}

export default MinoversiktSide;
