import React from 'react';
import classNames from 'classnames';
import {Button, Heading, Modal} from '@navikt/ds-react';
import {ArbeidslisteDataModell, ArbeidslisteModell, BrukerModell, HuskelappModell} from '../../../model-interfaces';
import '../huskelapp.css';
import {usePortefoljeSelector} from '../../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../../reducer';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import {lagreHuskelapp} from './lagreHuskelapp';
import {endreHuskelapp} from './endreHuskelapp';
import {GammelArbeidsliste} from './GammelArbeidsliste';
import {ReactComponent as HuskelappIkon} from '../../../components/ikoner/huskelapp/huskelapp.svg';
import './rediger-huskelapp.css';
import {ArrowRightIcon} from '@navikt/aksel-icons';
import {NyHuskelapp} from './NyHuskelapp';

interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    huskelapp?: HuskelappModell;
    bruker: BrukerModell;
    arbeidsliste?: ArbeidslisteModell | null;
}

export const RedigerHuskelappModal = ({isModalOpen, onModalClose, huskelapp, bruker, arbeidsliste}: Props) => {
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const harArbeidsliste = !!arbeidsliste?.arbeidslisteAktiv;

    async function validerOgLagreHuskelapp(values, formikHelpers) {
        if (!values.frist && !values.kommentar) {
            return formikHelpers.setErrors({
                frist: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen',
                kommentar:
                    'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen'
            });
        }
        const arbeidslisteSomSkalSlettes: ArbeidslisteDataModell | null = arbeidsliste
            ? {
                fnr: bruker.fnr,
                kommentar: bruker.arbeidsliste.kommentar ?? null,
                frist: bruker.arbeidsliste.frist,
                kategori: bruker.arbeidsliste.kategori
            }
            : null;
        try {
            if (huskelapp?.huskelappId) {
                await endreHuskelapp(
                    dispatch,
                    values,
                    bruker,
                    enhetId!!,
                    onModalClose,
                    huskelapp.huskelappId
                );
            } else {
                await lagreHuskelapp(
                    dispatch,
                    values,
                    bruker,
                    enhetId!!,
                    onModalClose,
                    arbeidslisteSomSkalSlettes
                );
            }
        } catch (error) {
            dispatch(visServerfeilModal());
        }
    }

    return (
        <Modal
            className={classNames('rediger-huskelapp-modal', {'med-eksisterende-arbeidsliste': !!arbeidsliste})}
            open={isModalOpen}
            onClose={onModalClose}
            closeOnBackdropClick={true}
        >
            <Modal.Header>
                <Heading size="medium" level="1" spacing className="huskelapp-modal__heading">
                    <HuskelappIkon aria-hidden={true} />
                    Huskelapp
                </Heading>
            </Modal.Header>
            <Modal.Body className="rediger-huskelapp-modal__body">
                {harArbeidsliste && (
                    <>
                        <GammelArbeidsliste arbeidsliste={arbeidsliste} />
                        <ArrowRightIcon title="Pil mot høyre" className="rediger-huskelapp-modal-pil" fontSize="3rem" />
                    </>
                )}
                <NyHuskelapp huskelapp={huskelapp} onSubmit={validerOgLagreHuskelapp} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" size="small" type="submit" form="lagEllerEndreHuskelappForm">
                    {arbeidsliste ? 'Lagre og slett eksisterende' : 'Lagre'}
                </Button>
                <Button size="small" variant="secondary" type="button" onClick={onModalClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
