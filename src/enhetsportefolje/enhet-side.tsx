import * as React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import DocumentTitle from 'react-document-title';
import Lenker from '../lenker/lenker';
import Innholdslaster from '../innholdslaster/innholdslaster';
import EnhetsportefoljeVisning from './enhetsportefolje-visning';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { lagLablerTilVeiledereMedIdenter } from '../filtrering/utils';
import {getSeAlleFromUrl, getSideFromUrl, leggEnhetIUrl} from '../utils/url-utils';
import { hentStatusTall, StatustallState } from '../ducks/statustall';
import {EnhettiltakState, hentEnhetTiltak} from '../ducks/enhettiltak';
import TomPortefoljeModal from '../components/modal/tom-portefolje-modal';
import ListevisningInfoPanel from '../components/toolbar/listevisning/listevisning-infopanel';
import { AppState } from '../reducer';
import { FiltervalgModell, VeilederModell } from '../model-interfaces';
import { ListevisningState, ListevisningType } from '../ducks/ui/listevisning';
import { pagineringSetup } from '../ducks/paginering';
import FiltreringContainer, { defaultVeileder } from '../filtrering/filtrering-container';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { loggSideVisning } from '../utils/metrikker/side-visning-metrikker';
import './enhet-side.less';
import { sortTiltak } from '../filtrering/filtrering-status/filter-utils';
import { OrNothing } from "../utils/types/types";
import {EnhetFilter} from "./enhet-filter";
import {useOnMount} from "../hooks/use-on-mount";
import {useEffect} from "react";
import {useEnhetSelector} from "../hooks/redux/use-enhet-selector";
import {useIdentSelector} from "../hooks/redux/use-inlogget-ident";
import {EnhetStatusFilter} from "./enhet-status-filter";

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
        }
    },[enhet]);

    return (
        <DocumentTitle title="Enhetens oversikt">
            <div className="enhet-side blokk-xl">
                <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                    <div id="oversikt-sideinnhold" role="tabpanel">
                        <EnhetStatusFilter/>
                        <div className="col-lg-9 col-md-12 col-sm-12">
                            <EnhetFilter/>
                            <ListevisningInfoPanel name={ListevisningType.enhetensOversikt}/>
                            <EnhetsportefoljeVisning/>
                            <TomPortefoljeModal/>
                        </div>
                    </div>
                </Innholdslaster>
            </div>
        </DocumentTitle>
    );
}

export default EnhetSide;
