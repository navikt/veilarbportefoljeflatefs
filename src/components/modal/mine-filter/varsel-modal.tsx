import React from 'react';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import {BodyShort, Button, Heading} from '@navikt/ds-react';

export enum ErrorModalType {
    OPPDATERE,
    LAGRE,
    SLETTE
}

const errorModalTypeToTittel = new Map<ErrorModalType, string>([
    [ErrorModalType.LAGRE, 'Filteret kunne ikke opprettes'],
    [ErrorModalType.OPPDATERE, 'Filteret kunne ikke lagres'],
    [ErrorModalType.SLETTE, 'Filteret kunne ikke slettes']
]);

interface Props {
    filterNavn: string;
    modalType: ErrorModalType;
    erApen: boolean;
    setErrorModalErApen;
}

export function MineFilterVarselModal({filterNavn, modalType, erApen, setErrorModalErApen}: Props) {
    return (
        <VarselModal onClose={() => setErrorModalErApen(false)} isOpen={erApen} type={VarselModalType.FEIL}>
            <Heading size="large" level="1">
                {errorModalTypeToTittel.get(modalType)}
            </Heading>
            <br />
            {modalType === ErrorModalType.LAGRE && (
                <BodyShort size="small">
                    Det oppsto en feil, og filteret <b>{filterNavn}</b> kunne ikke opprettes. Prøv igjen senere.
                </BodyShort>
            )}
            {modalType === ErrorModalType.OPPDATERE && (
                <BodyShort size="small">
                    Det oppsto en feil, og filteret <b>{filterNavn}</b> kunne ikke lagres. Prøv igjen senere.
                </BodyShort>
            )}
            {modalType === ErrorModalType.SLETTE && (
                <BodyShort size="small">
                    Det oppsto en feil, og filteret <b>{filterNavn}</b> kunne ikke slettes. Prøv igjen senere.
                </BodyShort>
            )}
            <Button size="small" className="error-knapp" onClick={() => setErrorModalErApen(false)}>
                Lukk
            </Button>
        </VarselModal>
    );
}
