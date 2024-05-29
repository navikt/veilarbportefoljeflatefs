import React from 'react';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import classNames from 'classnames';
import {Button, Modal} from '@navikt/ds-react';
import {ArrowRightIcon} from '@navikt/aksel-icons';
import {ArbeidslisteDataModell, ArbeidslisteModell, BrukerModell, HuskelappModell} from '../../../model-interfaces';
import {usePortefoljeSelector} from '../../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {AppState} from '../../../reducer';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import {lagreHuskelapp} from './lagreHuskelapp';
import {endreHuskelapp} from './endreHuskelapp';
import {GammelArbeidsliste} from './GammelArbeidsliste';
import {ReactComponent as HuskelappIkon} from '../../../components/ikoner/huskelapp/Huskelappikon_bakgrunnsfarge.svg';
import {NyHuskelapp} from './NyHuskelapp';
import {SlettArbeidsliste} from './SlettArbeidsliste';
import {SlettHuskelappKnapp} from '../modalvisning/SlettHuskelappKnapp';
import './rediger-huskelapp.css';

interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    huskelapp?: HuskelappModell;
    bruker: BrukerModell;
    arbeidsliste?: ArbeidslisteModell | null;
    /** For å kunne lukke visningsmodal om huskelappen blir sletta */
    lukkVisHuskelappModal?: () => void;
}

export const RedigerHuskelappModal = ({
    isModalOpen,
    onModalClose,
    huskelapp,
    bruker,
    arbeidsliste,
    lukkVisHuskelappModal
}: Props) => {
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const harArbeidsliste = !!arbeidsliste?.arbeidslisteAktiv;
    const harHuskelapp = !!huskelapp?.huskelappId;

    async function validerOgLagreHuskelapp(values, formikHelpers) {
        if (!values.frist && !values.kommentar) {
            return formikHelpers.setErrors({
                frist: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen',
                kommentar: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen'
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
                await endreHuskelapp(dispatch, values, bruker, enhetId!!, onModalClose, huskelapp.huskelappId);
            } else {
                await lagreHuskelapp(dispatch, values, bruker, enhetId!!, onModalClose, arbeidslisteSomSkalSlettes);
            }
        } catch (error) {
            dispatch(visServerfeilModal());
        }
    }

    const lukkBeggeModalerEtterSletting = () => {
        onModalClose();
        /* Unngår å vise visningsmodal for huskelapp når den er sletta */
        lukkVisHuskelappModal && lukkVisHuskelappModal();
    };

    return (
        <Modal
            header={{
                icon: <HuskelappIkon aria-hidden />,
                heading: harArbeidsliste ? 'Bytt fra gammel arbeidsliste til ny huskelapp' : 'Huskelapp',
                size: 'small'
            }}
            className={classNames('rediger-huskelapp-modal', {'med-eksisterende-arbeidsliste': harArbeidsliste})}
            open={isModalOpen}
            onClose={onModalClose}
            closeOnBackdropClick={true}
        >
            <Modal.Body className="rediger-huskelapp-modal__body">
                {harArbeidsliste && (
                    <>
                        <GammelArbeidsliste arbeidsliste={arbeidsliste} />
                        <ArrowRightIcon title="Pil mot høyre" className="rediger-huskelapp-modal-pil" fontSize="3rem" />
                    </>
                )}
                <NyHuskelapp
                    huskelapp={huskelapp}
                    onSubmit={validerOgLagreHuskelapp}
                    harArbeidsliste={harArbeidsliste}
                />
            </Modal.Body>
            <Modal.Footer className="rediger-huskelapp-modal__footer">
                <Button variant="primary" size="small" type="submit" form="rediger-huskelapp-skjema">
                    {arbeidsliste ? 'Lagre huskelapp og slett arbeidsliste' : 'Lagre'}
                </Button>
                <Button size="small" variant="secondary" type="button" onClick={onModalClose}>
                    Avbryt
                </Button>
                {harArbeidsliste && <SlettArbeidsliste bruker={bruker} />}
                {!harArbeidsliste && harHuskelapp && (
                    <SlettHuskelappKnapp bruker={bruker} lukkModal={lukkBeggeModalerEtterSletting} variant="tertiary" />
                )}
            </Modal.Footer>
        </Modal>
    );
};
