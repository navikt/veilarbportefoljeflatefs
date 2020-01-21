import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentStatusTall } from '../ducks/statustall';
import { hentEnhetTiltak } from '../ducks/enhettiltak';
import { AppState } from '../reducer';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { loggSideVisning } from '../utils/metrikker/side-visning-metrikker';
import {EnhetFilter} from "./enhet-filter";
import {useOnMount} from "../hooks/use-on-mount";
import {useEffect} from "react";
import {useEnhetSelector} from "../hooks/redux/use-enhet-selector";
import {useIdentSelector} from "../hooks/redux/use-inlogget-ident";
import {EnhetStatusFilter} from "./enhet-status-filter";
import {hentLagretFilterForEnhet} from "../ducks/lagret-filter";
import {
    getSeAlleFromUrl,
    getSideFromUrl,
    getSorteringsFeltFromUrl,
    getSorteringsRekkefolgeFromUrl,
    leggEnhetIUrl
} from "../utils/url-utils";
import {pagineringSetup} from "../ducks/paginering";
import TabellOverskrift from '../components/tabell-overskrift';
import { ModalEnhetSideController } from '../components/modal/modal-enhet-side-controller';
import EnhetTabell from './enhetsportefolje-tabell';
import EnhetTabellOverskrift from './enhetsportefolje-tabelloverskrift';
import './enhetsportefolje.less';
import './brukerliste.less';
import { EnhetsPortefoljeToolbar } from "./enhetsportefolje-toolbar";
import {settSortering} from "../ducks/portefolje";

function EnhetSide () {

    const dispatch = useDispatch();
    const enhet = useEnhetSelector();
    const innloggetVeilederIdent = useIdentSelector();
    const statustall = useSelector((state: AppState) => state.statustall);
    const enhettiltak = useSelector((state: AppState) => state.enhettiltak);
    const portefoljeData = useSelector((state: AppState) => state.portefolje.data);


    useOnMount(()=> {
        loggSkjermMetrikker(Side.ENHETENS_OVERSIKT);
        loggSideVisning(innloggetVeilederIdent, Side.ENHETENS_OVERSIKT);
        leggEnhetIUrl(enhet);
        settInitalStateFraUrl();
    });

    function settInitalStateFraUrl() {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        const sorteringsfelt = getSorteringsFeltFromUrl();
        const sorteringsrekkefolge = getSorteringsRekkefolgeFromUrl();
        dispatch(pagineringSetup({side, seAlle}))
        dispatch(settSortering(sorteringsrekkefolge , sorteringsfelt));
    }

    useEffect(()=> {
        if(enhet) {
            dispatch(hentStatusTall(enhet));
            dispatch(hentEnhetTiltak(enhet));
            dispatch(hentLagretFilterForEnhet(enhet));
        }
    },[enhet, dispatch]);
        const antallBrukere = portefoljeData.antallReturnert > portefoljeData.antallTotalt ? portefoljeData.antallTotalt : portefoljeData.antallReturnert;
        const stickyWrapper = antallBrukere >= 5 ? 'col-lg-9 col-md-12 col-sm-12' : 'sticky-div col-lg-9 col-md-12 col-sm-12';
        const stickyContainer = antallBrukere >= 5 ? 'sticky-container' : 'sticky-container__fjernet';
    return (
        <DocumentTitle title="Enhetens oversikt">
            <div className="enhet-side blokk-xl">
                <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                    <div id="oversikt-sideinnhold" role="tabpanel">
                        <div className="row">
                            <EnhetStatusFilter/>
                            <div className={stickyWrapper}>
                                <div className={stickyContainer}>
                                    <EnhetFilter/>
                                    <TabellOverskrift className="tabelloverskrift blokk-xxs"/>
                                    <div className="sticky-container__skygge">
                                        <EnhetsPortefoljeToolbar/>
                                        <EnhetTabellOverskrift/>
                                    </div>
                                </div>
                                <EnhetTabell/>
                            </div>
                        </div>
                    </div>
                </Innholdslaster>
                <ModalEnhetSideController/>
            </div>
        </DocumentTitle>
    );
}

export default EnhetSide;
