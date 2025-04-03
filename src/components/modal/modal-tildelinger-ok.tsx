import {BodyShort, Button} from '@navikt/ds-react';
import {VarselModal, VarselModalType} from './varselmodal/varselmodal';
import {Fnr, FnrList} from '../fnr-list';
import './feilmelding-brukere.css';

interface Props {
    fnr: Fnr[];
    isOpen: boolean;
    onRequestClose: () => void;
}

export function TildelingerOk({fnr, isOpen, onRequestClose}: Props) {
    return (
        <VarselModal
            overskrift="Det tar litt tid å overføre informasjonen til oversikten"
            isOpen={isOpen}
            onClose={onRequestClose}
            type={VarselModalType.SUKSESS}
            dataTestClass="modal-suksess_tildel-veileder" /* Denne utgåva av modal har ingen data-testid-prop, difor brukar vi klassenamn */
        >
            <BodyShort size="small">Følgende bruker(e) ble tildelt veileder:</BodyShort>
            <FnrList listeMedFnr={fnr} />
            <Button size="small" type="submit" onClick={onRequestClose}>
                Lukk
            </Button>
        </VarselModal>
    );
}
