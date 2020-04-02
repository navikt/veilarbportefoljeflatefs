import * as React from 'react';
import { useSelector } from 'react-redux';
import { VIS_TILDEL_VEILEDER_MODAL } from '../../ducks/modal';
import './toolbar.less';
import { AppState } from '../../reducer';
import { ReactComponent as TildelVeilederIkon } from './tildel-veileder.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import TildelVeilederModal from '../modal/tildel-veileder-modal';

interface LeggTilArbeidslisteProps {

    onClickHandler: () => void;
    skalVises: boolean;
    filtergruppe?: string;
    gjeldendeVeileder?: string;
}

function TildelVeilederKnapp(props: LeggTilArbeidslisteProps) {
    const modalSkalVises = useSelector((state: AppState) => state.modal.modal) === VIS_TILDEL_VEILEDER_MODAL;
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);

    if (!props.skalVises) {
        return null;
    }

    const valgteBrukere = brukere.filter((bruker) => bruker.markert === true);
    const aktiv = valgteBrukere.length > 0;

    return (
        <div className="toolbar_btnwrapper dropdown--toolbar">
            <button
                type="button"
                className={'toolbar_btn toolbar_btn__tildel-veileder'}
                disabled={!aktiv}
                onClick={props.onClickHandler}
            >
                <TildelVeilederIkon className="toolbar__tildel-veileder-knapp__ikon"/>
                <Normaltekst className="toolbar__tildel-veileder-knapp__tekst">Tildel veileder</Normaltekst>
            </button>
            {/*{modalSkalVises && <TildelVeilederModal isOpen={modalSkalVises} valgteBrukere={valgteBrukere}/>}*/}
            {console.log("valgtebruere", valgteBrukere)}
            {modalSkalVises && <TildelVeilederModal isOpen={modalSkalVises}/>}
        </div>
    );
}

export default TildelVeilederKnapp;
