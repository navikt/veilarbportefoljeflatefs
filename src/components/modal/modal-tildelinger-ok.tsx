import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import React from 'react';
import {Fnr, FnrList} from '../fnr-list';
import './feilmelding-brukere.css';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

interface Props {
    fnr: Fnr[];
    isOpen: boolean;
    onRequestClose: () => void;
}

export function TildelingerOk({fnr, isOpen, onRequestClose}: Props) {
    return (
        <VarselModal
            isOpen={isOpen}
            onClose={onRequestClose}
            portalClassName="tildeling-veileder-modal"
            className="tildeling-veileder-modal__content"
            type={VarselModalType.SUKSESS}
            dataTestClass="modal-suksess_tildel-veileder" /* Denne utgåva av modal har ingen data-testid-prop, difor brukar vi klassenamn */
        >
            <div className="tildeling-veileder-modal__tekstgruppe">
                <Heading size="large" level="1">
                    Det tar litt tid å overføre informasjonen til oversikten
                </Heading>
                <BodyShort size="small">Følgende bruker(e) ble tildelt veileder:</BodyShort>
                <FnrList listeMedFnr={fnr} />
            </div>
            <Button size="small" type="submit" onClick={onRequestClose}>
                Lukk
            </Button>
        </VarselModal>
    );
}
