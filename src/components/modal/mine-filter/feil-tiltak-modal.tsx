import React, {useState} from 'react';
import {AppState} from '../../../reducer';
import {Hovedknapp, Knapp} from 'nav-frontend-knapper';
import BekreftSlettingModal from '../bekreftelse-modal/bekreft-sletting-modal';
import {slettFilter} from '../../../ducks/mine-filter';
import {useRequestHandler} from '../../../hooks/use-request-handler';
import {avmarkerSisteValgtMineFilter} from '../../../ducks/lagret-filter-ui-state';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../modal';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {Normaltekst} from 'nav-frontend-typografi';
import './mine-filter.less';

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
            <Modal
                className="feil-tiltak_modal"
                contentLabel="Feil tiltak modal"
                isOpen={erFeilTiltakModalApen}
                onRequestClose={lukkModal}
                tittel="Tiltaksfilter finnes ikke"
            >
                <Normaltekst>
                    En eller flere av tiltakstypene du har lagret finnes ikke lenger som filter. Det kan skyldes at det
                    ikke er brukere som deltar på tiltakene akkurat nå.
                    <br />
                    <br />
                    Vil du la filteret stå til det deltar brukere på tiltaket igjen, eller vil du slette det?
                </Normaltekst>
                <div className="knappegruppe">
                    <Hovedknapp mini data-testid="la-sta-knapp" onClick={lukkModal}>
                        La stå
                    </Hovedknapp>
                    <Knapp mini onClick={e => bekreftSletting(e)} data-testid="slett-knapp">
                        Slett
                    </Knapp>
                </div>
            </Modal>
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
