import {BodyShort, Button} from '@navikt/ds-react';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';

export enum ErrorModalType {
    OPPDATERE,
    LAGRE,
    SLETTE,
    SERVICE_UTILGJENGELIG
}

const errorModaltypeTilTittel: {[key in ErrorModalType]: string} = {
    [ErrorModalType.LAGRE]: 'Filteret kunne ikke opprettes',
    [ErrorModalType.OPPDATERE]: 'Filteret kunne ikke lagres',
    [ErrorModalType.SLETTE]: 'Filteret kunne ikke slettes',
    [ErrorModalType.SERVICE_UTILGJENGELIG]: 'Tjenesten er utilgjengelig'
};

interface Props {
    filterNavn: string;
    modalType: ErrorModalType;
    erApen: boolean;
    setErrorModalErApen: (erApen: boolean) => void;
}

export function MineFilterVarselModal({filterNavn, modalType, erApen, setErrorModalErApen}: Props) {
    return (
        <VarselModal
            overskrift={errorModaltypeTilTittel[modalType]}
            onClose={() => setErrorModalErApen(false)}
            isOpen={erApen}
            type={VarselModalType.FEIL}
        >
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
            {modalType === ErrorModalType.SERVICE_UTILGJENGELIG && (
                <BodyShort size="small">
                    Vi holder på med teknisk vedlikehold av lagrede filtere. Det er derfor ikke mulig å lagre nye eller
                    endre filter akkurat nå. Prøv igjen senere.
                </BodyShort>
            )}
            <Button size="small" onClick={() => setErrorModalErApen(false)}>
                Lukk
            </Button>
        </VarselModal>
    );
}
