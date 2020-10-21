import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {skjulServerfeilModal} from '../../ducks/modal-serverfeil';
import {skjulFeilmeldingModal} from '../../ducks/modal-feilmelding-brukere';
import {skjulModal} from '../../ducks/modal';

export function useModalControllerSelector() {
    const serverfeilModalSkalVises = useSelector((state: AppState) => state.serverfeilModal.aarsak);
    const feilmeldingModal = useSelector((state: AppState) => state.feilmeldingModal);
    const modal = useSelector((state: AppState) => state.modal);

    const dispatch = useDispatch();

    const closeServerfeilModal = () => dispatch(skjulServerfeilModal());
    const closeFeilmeldingModal = () => dispatch(skjulFeilmeldingModal());
    const closeModal = () => dispatch(skjulModal());
    return {
        serverfeilModalSkalVises,
        feilmeldingModal,
        modal,
        closeServerfeilModal,
        closeFeilmeldingModal,
        closeModal
    };
}
