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

export function MineFilterVarselModal(props: {
    filterNavn: string;
    modalType: ErrorModalType;
    erApen: boolean;
    setErrorModalErApen;
}) {
    return (
        <VarselModal
            contentLabel={errorModalTypeToTittel.get(props.modalType)!}
            onRequestClose={() => props.setErrorModalErApen(false)}
            isOpen={props.erApen}
            type={VarselModalType.FEIL}
            closeButton={false}
        >
            <Heading size="xlarge" level="1">
                {errorModalTypeToTittel.get(props.modalType)}
            </Heading>
            <br />
            {props.modalType === ErrorModalType.LAGRE && (
                <BodyShort>
                    Det oppsto en feil, og filteret <b>{props.filterNavn}</b> kunne ikke opprettes. Prøv igjen senere.
                </BodyShort>
            )}
            {props.modalType === ErrorModalType.OPPDATERE && (
                <BodyShort>
                    Det oppsto en feil, og filteret <b>{props.filterNavn}</b> kunne ikke lagres. Prøv igjen senere.
                </BodyShort>
            )}
            {props.modalType === ErrorModalType.SLETTE && (
                <BodyShort>
                    Det oppsto en feil, og filteret <b>{props.filterNavn}</b> kunne ikke slettes. Prøv igjen senere.
                </BodyShort>
            )}
            <Button className="error-knapp" onClick={() => props.setErrorModalErApen(false)}>
                Lukk
            </Button>
        </VarselModal>
    );
}
