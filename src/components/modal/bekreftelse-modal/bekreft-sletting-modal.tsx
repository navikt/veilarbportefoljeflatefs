import React from 'react';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import './bekreft-sletting-modal.less';
import hiddenIf from '../../hidden-if/hidden-if';
import {Button} from '@navikt/ds-react';
import {Delete} from '@navikt/ds-icons';

interface BekreftSlettingModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: () => void;
    tittel: string;
    infoTekst?: string;
    navn: string;
}

const HiddenIfInfotekst = hiddenIf(Normaltekst);

function BekreftSlettingModal(props: BekreftSlettingModalProps) {
    const slettKnapp = () => {
        props.onSubmit();
        props.onRequestClose();
    };

    return (
        <VarselModal
            contentLabel={props.tittel}
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="bekreft-sletting-modal"
            type={VarselModalType.ADVARSEL}
        >
            <div className="blokk-s bekreft-sletting-modal__tekstgruppe">
                <Innholdstittel className="blokk-s">{props.tittel}</Innholdstittel>
                <HiddenIfInfotekst hidden={!props.infoTekst}>{props.infoTekst}</HiddenIfInfotekst>
                <Normaltekst>
                    Er du sikker på at du vil slette <b>{props.navn}</b>?
                </Normaltekst>
            </div>
            <div className="bekreft-sletting-modal__knappegruppe">
                <Button
                    variant="danger"
                    type="submit"
                    onClick={slettKnapp}
                    data-testid="bekreft-sletting_modal_slett-knapp"
                >
                    Slett
                    <Delete />
                </Button>
                <Button variant="tertiary" type="button" onClick={props.onRequestClose}>
                    Avbryt
                </Button>
            </div>
        </VarselModal>
    );
}

export default BekreftSlettingModal;
