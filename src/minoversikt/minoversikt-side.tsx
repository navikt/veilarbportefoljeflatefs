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
import {
    getSeAlleFromUrl, getSideFromUrl, getSorteringsFeltFromUrl,
    getSorteringsRekkefolgeFromUrl
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
        <div className="minoversikt-side blokk-xl">
            <DocumentTitle title="Min oversikt">
                <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                    <MinOversiktWrapper>
                        <MinOversiktStatusFilter/>
                        <PortefoljeKolonner>
                            <ListevisningInfoPanel name={ListevisningType.minOversikt}/>
                            <MinOversiktFilterLabelContainer/>
                            <VeilederPortefoljeVisning
                                gjeldendeVeilederIdent={gjeldendeVeileder}
                                visesAnnenVeiledersPortefolje={ident ? ident !== innloggetVeilederIdent!.ident : false }
                            />
                        </PortefoljeKolonner>
                    </MinOversiktWrapper>
                </Innholdslaster>
            </DocumentTitle>
        </div>
    );
}

export default MinoversiktSide;
