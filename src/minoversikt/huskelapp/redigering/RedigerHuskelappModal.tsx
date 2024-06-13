import React from 'react';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import classNames from 'classnames';
import {Button, Modal} from '@navikt/ds-react';
import {ArrowRightIcon, TrashIcon} from '@navikt/aksel-icons';
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
import {SlettHuskelappKnapp} from '../modalvisning/SlettHuskelappKnapp';
import {KnappMedBekreftHandling} from '../../../components/knapp-med-slettebekreftelse/KnappMedBekreftHandling';
import {slettArbeidslisteMenIkkeFargekategoriOgOppdaterRedux} from './slettEksisterendeArbeidsliste';
import './rediger-huskelapp.css';

interface Props {
    onModalClose: () => void;
    isModalOpen: boolean;
    huskelapp?: HuskelappModell;
    bruker: BrukerModell;
    arbeidsliste?: ArbeidslisteModell | null;
    /** For å kunne lukke visningsmodal etter at huskelappen er sletta */
    lukkVisHuskelappModal?: () => void;
    //   formikDirty?: boolean;
}

export const RedigerHuskelappModal = ({
    isModalOpen,
    onModalClose,
    huskelapp,
    bruker,
    arbeidsliste,
    lukkVisHuskelappModal
    //    formikDirty
}: Props) => {
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const harArbeidsliste = !!arbeidsliste?.arbeidslisteAktiv;
    const harHuskelapp = !!huskelapp?.huskelappId;
    //   const [formIsDirty, setFormIsDirty] = useState<boolean>(false);
    const visAlertVedAvbryt = () => {
        // eslint-disable-next-line no-console
        const huskelappEndret = (): Boolean => {
            return !!(huskelapp?.kommentar || huskelapp?.frist);
        };
        // eslint-disable-next-line no-console
        console.log('før visAlertVedAvbryt, huskelappEndret: ', huskelappEndret());
        /*    if (!huskelappEndret()) {
                onModalClose();
                return;
            }
            
         */
        const dialogTekst =
            'Melding fra visAlertvedAvbryt: Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        //    if (!window.confirm(dialogTekst) && huskelappEndret())  {
        if (!window.confirm(dialogTekst)) {
            // eslint-disable-next-line no-console
            console.log('i visAlertVedAvbryt, huskelapp: ', huskelapp?.kommentar, huskelapp?.frist);
            //         window.confirm(dialogTekst) && onModalClose();
            onModalClose();
        }
        onModalClose();
    };

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
                await endreHuskelapp(dispatch, values, bruker, enhetId!, onModalClose, huskelapp.huskelappId).then(
                    lukkVisHuskelappModal
                );
            } else {
                await lagreHuskelapp(dispatch, values, bruker, enhetId!, onModalClose, arbeidslisteSomSkalSlettes).then(
                    lukkVisHuskelappModal
                );
            }
        } catch (error) {
            dispatch(visServerfeilModal());
        }
    }

    const lukkRedigeringOgVisningsmodaler = () => {
        onModalClose();
        /* Unngår å vise visningsmodal for huskelapp etter sletting */
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
            onClose={visAlertVedAvbryt}
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
                    //                   setFormIsDirty={() => setFormIsDirty(formIsDirty)}
                />
            </Modal.Body>
            <Modal.Footer className="rediger-huskelapp-modal__footer">
                <Button variant="primary" size="small" type="submit" form="rediger-huskelapp-skjema">
                    {arbeidsliste ? 'Lagre huskelapp og slett arbeidsliste' : 'Lagre'}
                </Button>

                <Button size="small" variant="secondary" type="button" onClick={visAlertVedAvbryt}>
                    Avbryt
                </Button>
                {harArbeidsliste && (
                    <KnappMedBekreftHandling
                        handlingsknapptekst="Slett gammel arbeidsliste uten å lage ny huskelapp"
                        bekreftelsesmelding={{
                            overskrift: 'Er du sikker på at du vil slette eksisterende innhold?',
                            beskrivelse: 'Dette vil slette tittel, kommentar og frist for denne brukeren.'
                        }}
                        bekreftknapp={{
                            tekst: 'Ja, slett arbeidslista',
                            onClick: () => slettArbeidslisteMenIkkeFargekategoriOgOppdaterRedux(bruker, dispatch),
                            onClickThen: () => lukkRedigeringOgVisningsmodaler()
                        }}
                        feilmelding="Noe gikk galt ved sletting av arbeidslista."
                        icon={<TrashIcon aria-hidden />}
                    />
                )}
                {!harArbeidsliste && harHuskelapp && (
                    <SlettHuskelappKnapp
                        bruker={bruker}
                        lukkModal={lukkRedigeringOgVisningsmodaler}
                        variant="tertiary"
                        bekreftelsesmelding={{width: '15rem', overskriftsnivaa: '2'}}
                    />
                )}
            </Modal.Footer>
        </Modal>
    );
};
