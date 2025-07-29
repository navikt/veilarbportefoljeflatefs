import {useState} from 'react';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {BodyShort, Button, CopyButton, Heading, Modal} from '@navikt/ds-react';
import {BrukerModell, HuskelappModell} from '../../../typer/bruker-modell';
import {usePortefoljeSelector} from '../../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {AppState} from '../../../reducer';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import {lagreHuskelapp} from './lagreHuskelapp';
import {endreHuskelapp} from './endreHuskelapp';
import {ReactComponent as HuskelappIkon} from '../../../components/ikoner/huskelapp/Huskelappikon_bakgrunnsfarge.svg';
import {NyHuskelapp} from './NyHuskelapp';
import {SlettHuskelappKnapp} from './SlettHuskelappKnapp';
import './rediger-huskelapp.css';

interface Props {
    isModalOpen: boolean;
    onModalClose: () => void;
    huskelapp?: HuskelappModell;
    bruker: BrukerModell;
}

export const HuskelappModal = ({isModalOpen, onModalClose, huskelapp, bruker}: Props) => {
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    const [huskelappEndret, setHuskelappEndret] = useState<boolean>(false);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();

    const harHuskelapp = !!huskelapp?.huskelappId;

    // Returnerer true dersom modalen skal lukkast, false om den skal fortsette å vere open.
    const handleHuskelappEndret = (): boolean => {
        if (huskelappEndret) {
            return window.confirm(
                'Alle endringer blir borte hvis du ikke lagrer. Trykk avbryt for å fortsette redigering eller OK for å lukke huskelappen.'
            );
        }
        return true;
    };

    const handleOnAvbryt = () => {
        if (handleHuskelappEndret() || !huskelappEndret) {
            onModalClose();
        }
    };

    async function validerOgLagreHuskelapp(values, formikHelpers) {
        if (!values.frist && !values.kommentar) {
            return formikHelpers.setErrors({
                frist: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen',
                kommentar: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen'
            });
        }
        try {
            if (huskelapp?.huskelappId) {
                await endreHuskelapp(dispatch, values, bruker, enhetId!, onModalClose, huskelapp.huskelappId);
            } else {
                await lagreHuskelapp(dispatch, values, bruker, enhetId!, onModalClose);
            }
        } catch (error) {
            dispatch(visServerfeilModal());
        }
    }

    return (
        <Modal
            className="rediger-huskelapp-modal fiks-for-gammel-datovelger"
            open={isModalOpen}
            onClose={onModalClose}
            onBeforeClose={handleHuskelappEndret}
            closeOnBackdropClick={true}
            aria-labelledby="huskelappmodal-overskrift"
        >
            <Modal.Header>
                <div className="rediger-huskelapp-modal-header">
                    <span className="rediger-huskelapp-modal-header-ikon">
                        <HuskelappIkon aria-hidden />
                    </span>
                    <Heading
                        id="huskelappmodal-overskrift"
                        size="small"
                        className="rediger-huskelapp-modal-header-tekst"
                    >
                        Huskelapp
                    </Heading>
                </div>
                <div className="rediger-huskelapp-modal-personinfo">
                    <BodyShort weight="semibold">{`${bruker.fornavn} ${bruker.etternavn}`}</BodyShort>
                    <CopyButton
                        copyText={bruker.fnr}
                        text={`F.nr.: ${bruker.fnr}`}
                        iconPosition="right"
                        size="xsmall"
                        className="rediger-huskelapp-modal-header-copybutton"
                    />
                </div>
            </Modal.Header>
            <Modal.Body className="rediger-huskelapp-modal__body">
                <NyHuskelapp
                    huskelapp={huskelapp}
                    onSubmit={validerOgLagreHuskelapp}
                    setHuskelappEndret={setHuskelappEndret}
                />
            </Modal.Body>
            <Modal.Footer className="rediger-huskelapp-modal__footer">
                <Button variant="primary" size="small" type="submit" form="rediger-huskelapp-skjema">
                    Lagre
                </Button>
                <Button size="small" variant="secondary" type="button" onClick={handleOnAvbryt}>
                    Avbryt
                </Button>
                {harHuskelapp && (
                    <SlettHuskelappKnapp
                        bruker={bruker}
                        lukkModal={onModalClose}
                        variant="tertiary"
                        bekreftelsesmelding={{width: '15rem', overskriftsnivaa: '2'}}
                    />
                )}
            </Modal.Footer>
        </Modal>
    );
};
