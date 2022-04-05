import React, {useState} from 'react';
import {AppState} from '../../../reducer';
import BekreftSlettingModal from '../varselmodal/bekreft-sletting-modal';
import {slettFilter} from '../../../ducks/mine-filter';
import {useRequestHandler} from '../../../hooks/use-request-handler';
import {avmarkerSisteValgtMineFilter} from '../../../ducks/lagret-filter-ui-state';
import {useDispatch, useSelector} from 'react-redux';
import EgenModal from '../egenModal';
import {OversiktType} from '../../../ducks/ui/listevisning';
import './mine-filter.less';
import {BodyShort, Button} from '@navikt/ds-react';
import {Delete} from '@navikt/ds-icons';

export interface FeilTiltakModalProps {
    gammeltFilterNavn: string;
    filterId: number;
    lukkModal: () => void;
    oversiktType: OversiktType;
}

export function FeilTiltakModal({gammeltFilterNavn, filterId, lukkModal, oversiktType}: FeilTiltakModalProps) {
    const [visBekreftSlettModal, setVisBekreftSlettModal] = useState(false);
    const requestHandlerSlette = useRequestHandler((state: AppState) => state.mineFilter.status, lukkModal);
    const dispatch = useDispatch();

    const {erFeilTiltakModalApen} = useSelector((state: AppState) =>
        oversiktType === OversiktType.minOversikt ? state.mineFilterMinOversikt : state.mineFilterEnhetensOversikt
    );

    const bekreftSletting = event => {
        event.preventDefault();
        setVisBekreftSlettModal(true);
    };

    const doSlettFilter = () => {
        dispatch(slettFilter(filterId));
        dispatch(avmarkerSisteValgtMineFilter(oversiktType));
        requestHandlerSlette.setSaveRequestSent(true);
    };

    return (
        <>
            <EgenModal
                className="feil-tiltak_modal"
                open={erFeilTiltakModalApen}
                onClose={lukkModal}
                tittel="Tiltaksfilter finnes ikke"
            >
                <BodyShort size="small">
                    En eller flere av tiltakstypene du har lagret finnes ikke lenger som filter. Det kan skyldes at det
                    ikke er brukere som deltar på tiltakene akkurat nå.
                    <br />
                    <br />
                    Vil du la filteret stå til det deltar brukere på tiltaket igjen, eller vil du slette det?
                </BodyShort>
                <div className="knappegruppe">
                    <Button data-testid="la-sta-knapp" onClick={lukkModal}>
                        La stå
                    </Button>
                    <Button variant="danger" onClick={e => bekreftSletting(e)} data-testid="slett-knapp">
                        <Delete />
                        Slett
                    </Button>
                </div>
            </EgenModal>
            <BekreftSlettingModal
                isOpen={visBekreftSlettModal}
                onRequestClose={() => setVisBekreftSlettModal(false)}
                onSubmit={doSlettFilter}
                tittel="Slette lagret filter"
                navn={gammeltFilterNavn}
            />
        </>
    );
}
