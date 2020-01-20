import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForVeileder,  settSortering } from '../ducks/portefolje';
import TabellOverskrift from '../components/tabell-overskrift';
import Toolbar, { ToolbarPosisjon } from './../components/toolbar/toolbar';
import { leggEnhetIUrl } from '../utils/url-utils';
import { ASCENDING, DESCENDING } from '../konstanter';
import MinoversiktTabell from './minoversikt-portefolje-tabell';
import { STATUS } from '../ducks/utils';
import { ListevisningType } from '../ducks/ui/listevisning';
import {MinOversiktModalController} from "../components/modal/modal-min-oversikt-controller";
import {AppState} from "../reducer";
import {useOnMount} from "../hooks/use-on-mount";
import {useIdentSelector} from "../hooks/redux/use-inlogget-ident";
import {usePortefoljeSelector} from "../hooks/redux/use-portefolje-selector";

function VeilederPortefoljeVisning (props: {gjeldendeVeilederIdent: string, visesAnnenVeiledersPortefolje: boolean }) {
    const dispatch = useDispatch();
    const { filtervalg, sorteringsrekkefolge, enhetId, sorteringsfelt } = usePortefoljeSelector(ListevisningType.minOversikt);
    const portefolje = useSelector( (state: AppState) => state.portefolje);
    const innloggetVeileder = useIdentSelector();

    useOnMount(()=> {
        leggEnhetIUrl(enhetId!);
    });

    function settSorteringOgHentPortefolje(felt) {
        let valgtRekkefolge = '';
        if (felt !== sorteringsfelt) {
            valgtRekkefolge = ASCENDING;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === ASCENDING ? DESCENDING : ASCENDING;
        }
        dispatch(settSortering(valgtRekkefolge, felt));
        dispatch(hentPortefoljeForVeileder(enhetId, props.gjeldendeVeilederIdent, valgtRekkefolge, felt, filtervalg));
    }


    function lagToolbar(posisjon: ToolbarPosisjon) {
        return (
            <Toolbar
                filtergruppe={ListevisningType.minOversikt}
                onPaginering={(fra, antall) => dispatch(hentPortefoljeForVeileder(
                    enhetId,
                    props.gjeldendeVeilederIdent,
                    sorteringsrekkefolge,
                    sorteringsfelt,
                    filtervalg
                ))}
                gjeldendeVeileder={props.gjeldendeVeilederIdent}
                visesAnnenVeiledersPortefolje={props.visesAnnenVeiledersPortefolje}
                sokVeilederSkalVises={false}
                antallTotalt={portefolje.data.antallTotalt}
                posisjon={posisjon}
            />

        )
    }

    const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;

    return (
        <div className="portefolje__container">
            <Innholdslaster avhengigheter={[portefolje, {status: tilordningerStatus}]}>
                <TabellOverskrift/>
                {lagToolbar(ToolbarPosisjon.OVER)}
                <MinoversiktTabell
                    innloggetVeileder={innloggetVeileder}
                    settSorteringOgHentPortefolje={settSorteringOgHentPortefolje}
                />
                <MinOversiktModalController/>
            </Innholdslaster>
        </div>
    );
}



export default VeilederPortefoljeVisning;
