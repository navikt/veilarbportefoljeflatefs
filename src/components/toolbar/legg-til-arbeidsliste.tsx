import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ArbeidslisteModal from '../modal/arbeidsliste/arbeidsliste-modal';
import {  visModal } from '../../ducks/modal';
import { useParams } from "react-router";
import {BrukerModell} from "../../model-interfaces";
import {AppState} from "../../reducer";
import {useIdentSelector} from "../../hooks/redux/use-inlogget-ident";
import {ToolbarPosisjon} from "./toolbar";

interface LeggTilArbeidslisteProps {
    visesAnnenVeiledersPortefolje: boolean;
    toolbarPosisjon?: ToolbarPosisjon;
}


function LeggTilArbeidsliste (props: LeggTilArbeidslisteProps ) {
    const portefolje = useSelector( (state: AppState) => state.portefolje.data);
    const modalSkalVises = useSelector((state:AppState) => state.modal.visModal);
    const inloggetVeielder = useIdentSelector();
    const dispatch = useDispatch();

    const {ident} = useParams();

    const valgteBrukere = portefolje.brukere.filter((bruker) => bruker.markert === true);

    const skalSkjules = ident && inloggetVeielder
        ? ident !== inloggetVeielder.ident
        : true;

    if (skalSkjules) {
        return null;
    }

    return (
        <div className="toolbar_btnwrapper">
            <ArbeidsListeKnapp
                valgteBrukere={valgteBrukere}
                onClickHandler={() => dispatch(visModal(props.toolbarPosisjon))}
                visesAnnenVeiledersPortefolje={props.visesAnnenVeiledersPortefolje}
            />
            {modalSkalVises && <ArbeidslisteModal isOpen={modalSkalVises} valgteBrukere={valgteBrukere} />}
        </div>
    );
}

function ArbeidsListeKnapp (props: {valgteBrukere : BrukerModell[], onClickHandler: ()=> void, visesAnnenVeiledersPortefolje: boolean}) {
    const inneholderBrukerMedArbeidsliste = props.valgteBrukere.some((bruker) => bruker.arbeidsliste.arbeidslisteAktiv);

    const arbeidslisteButton = (tekst) => (
        <button
            type="button"
            className="toolbar_btn"
            disabled={props.valgteBrukere.length < 1 || props.visesAnnenVeiledersPortefolje}
            onClick={props.onClickHandler}
        >
            {tekst}
        </button>
    );

    if (inneholderBrukerMedArbeidsliste) {
        return arbeidslisteButton('Fjern fra arbeidsliste');
    }

    return arbeidslisteButton('Legg i arbeidsliste');
}

export default LeggTilArbeidsliste;
