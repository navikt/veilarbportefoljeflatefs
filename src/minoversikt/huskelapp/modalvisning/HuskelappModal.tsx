import React, {Dispatch, SetStateAction} from 'react';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {Button, Heading, Modal} from '@navikt/ds-react';
import {TrashIcon} from '@navikt/aksel-icons';
import {BrukerModell} from '../../../model-interfaces';
import {AppState} from '../../../reducer';
import {usePortefoljeSelector} from '../../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {handleSlettHuskelapp} from '../redigering/slettHuskelapp';
import {Huskelapp} from '../Huskelapp';
import {ReactComponent as HuskelappIkon} from '../../../components/ikoner/huskelapp/huskelapp.svg';
import './huskelappmodal.css';

interface HuskelappModalParams {
    open: boolean;
    onClose: () => void;
    bruker: BrukerModell;
    redigerHuskelapp: () => void;
    setModalVisHuskelappSkalVises: Dispatch<SetStateAction<boolean>>;
}

export const HuskelappModal = ({
    open,
    onClose,
    bruker,
    redigerHuskelapp,
    setModalVisHuskelappSkalVises
}: HuskelappModalParams) => {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);

    function slettHuskelapp() {
        //todo varsel modal på at det kommer til å slettes
        handleSlettHuskelapp(dispatch, bruker.huskelapp!!, bruker.fnr, enhetId!!).then(() =>
            setModalVisHuskelappSkalVises(false)
        );
    }

    return (
        <Modal open={open} onClose={onClose} closeOnBackdropClick={true}>
            <Modal.Header>
                <Heading size="medium" level="1" spacing className="huskelapp-modal__header">
                    <HuskelappIkon />
                    Huskelapp
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Huskelapp huskelapp={bruker.huskelapp!!} className="huskelapp-i-modal" />
                <div className="huskelapp-handlingsknapper">
                    <Button
                        type="button"
                        size="xsmall"
                        variant="secondary"
                        onClick={slettHuskelapp}
                        icon={<TrashIcon />}
                    >
                        Slett
                    </Button>
                    <Button type="button" size="xsmall" variant="primary" onClick={redigerHuskelapp}>
                        Endre
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
