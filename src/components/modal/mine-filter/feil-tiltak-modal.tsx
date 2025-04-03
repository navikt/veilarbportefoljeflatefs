import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BodyShort, Button} from '@navikt/ds-react';
import {TrashIcon} from '@navikt/aksel-icons';
import {AppState} from '../../../reducer';
import {BekreftSlettingModal} from '../varselmodal/bekreft-sletting-modal';
import {slettFilter} from '../../../ducks/mine-filter';
import {useRequestHandler} from '../../../hooks/use-request-handler';
import {avmarkerSisteValgtMineFilter} from '../../../ducks/lagret-filter-ui-state';
import {EgenModal} from '../egenModal';
import {OversiktType} from '../../../ducks/ui/listevisning';
import './mine-filter.css';

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
            {erFeilTiltakModalApen && (
                <EgenModal
                    className="feil-tiltak_modal testid-feil-tiltak_modal"
                    open={erFeilTiltakModalApen}
                    onClose={lukkModal}
                    tittel="Tiltaksfilter finnes ikke"
                    modalWidth="small"
                    testid="feil-tiltak_modal"
                >
                    <BodyShort size="small">
                        En eller flere av tiltakstypene du har lagret finnes ikke lenger som filter. Det kan skyldes at
                        det ikke er brukere som deltar på tiltakene akkurat nå.
                        <br />
                        <br />
                        Vil du la filteret stå til det deltar brukere på tiltaket igjen, eller vil du slette det?
                    </BodyShort>
                    <div className="knappegruppe">
                        <Button size="small" data-testid="la-sta-knapp" onClick={lukkModal}>
                            La stå
                        </Button>
                        <Button
                            size="small"
                            variant="danger"
                            onClick={e => bekreftSletting(e)}
                            icon={<TrashIcon aria-hidden={true} />}
                            data-testid="slett-knapp"
                        >
                            Slett
                        </Button>
                    </div>
                </EgenModal>
            )}
            {visBekreftSlettModal && (
                <BekreftSlettingModal
                    isOpen={visBekreftSlettModal}
                    onRequestClose={() => setVisBekreftSlettModal(false)}
                    onSubmit={doSlettFilter}
                    tittel="Slette lagret filter"
                    navn={gammeltFilterNavn}
                />
            )}
        </>
    );
}
