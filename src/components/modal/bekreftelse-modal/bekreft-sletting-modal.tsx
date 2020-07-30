import React from 'react';
import {Flatknapp, Hovedknapp} from 'nav-frontend-knapper';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './bekreft-sletting-modal.less';

interface BekreftSlettingModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: () => void;
    tittel: string
    infoTekst?: string
    navn: string
}

function BekreftSlettingModal(props: BekreftSlettingModalProps) {
    const slettKnapp = () => {
        props.onSubmit()
        props.onRequestClose()
    }

    return (
        <VarselModal
            contentLabel={props.tittel}
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="bekreft-sletting-modal"
            type={VarselModalType.ADVARSEL}
        >
            <div className="blokk-s bekreft-sletting-modal__tekstgruppe">
                <Innholdstittel className="blokk-s">
                    {props.tittel}
                </Innholdstittel>
                {props.infoTekst &&
                <Normaltekst>
                    {props.infoTekst}
                </Normaltekst>
                }
                <Normaltekst>
                    Er du sikker på at du vil slette <b>{props.navn}</b> ?
                </Normaltekst>
            </div>
            <div className="bekreft-sletting-modal__knappegruppe">
                <Hovedknapp
                    htmlType="submit"
                    onClick={slettKnapp}
                >
                    Slett
                </Hovedknapp>
                <Flatknapp
                    htmlType="button"
                    onClick={props.onRequestClose}
                >
                    Avbryt
                </Flatknapp>
            </div>
        </VarselModal>
    );
}

export default BekreftSlettingModal;
