import {useState} from 'react';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import classNames from 'classnames';
import {BodyShort, Button, CopyButton, Heading, Modal} from '@navikt/ds-react';
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
import {SlettHuskelappKnapp} from './SlettHuskelappKnapp';
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
}

export const HuskelappModal = ({isModalOpen, onModalClose, huskelapp, bruker, arbeidsliste}: Props) => {
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    const [huskelappEndret, setHuskelappEndret] = useState<boolean>(false);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();

    const arbeidslisteErTom = !arbeidsliste?.overskrift && !arbeidsliste?.kommentar && !arbeidsliste?.frist;
    const harArbeidsliste = !!arbeidsliste?.arbeidslisteAktiv && !arbeidslisteErTom;
    const harHuskelapp = !!huskelapp?.huskelappId;
    const modalNavn = !harArbeidsliste ? 'Huskelapp' : 'Bytt fra gammel arbeidsliste til ny huskelapp';

    const handleHuskelappEndret = () => {
        if (huskelappEndret) {
            return window.confirm(
                'Alle endringer blir borte hvis du ikke lagrer. Trykk avbryt for å fortsette redigering eller OK for å lukke huskelappen.'
            );
        }
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
                await endreHuskelapp(dispatch, values, bruker, enhetId!, onModalClose, huskelapp.huskelappId);
            } else {
                await lagreHuskelapp(dispatch, values, bruker, enhetId!, onModalClose, arbeidslisteSomSkalSlettes);
            }
        } catch (error) {
            dispatch(visServerfeilModal());
        }
    }

    return (
        <Modal
            className={classNames('rediger-huskelapp-modal', {'med-eksisterende-arbeidsliste': harArbeidsliste})}
            open={isModalOpen}
            onClose={onModalClose}
            onBeforeClose={handleHuskelappEndret}
            closeOnBackdropClick={false} // TODO sett til true når arbeidslistene er migrert, antar det er mindre sjanse for å kopiere (uten å ha endret innholdet, som vil trigge bekreftelsesmelding)
        >
            <Modal.Header>
                <div className="rediger-huskelapp-modal-header">
                    <span className="rediger-huskelapp-modal-header-ikon">
                        <HuskelappIkon aria-hidden />
                    </span>
                    <Heading
                        size="small"
                        className="rediger-huskelapp-modal-header rediger-huskelapp-modal-header-tekst"
                    >
                        {modalNavn}
                    </Heading>
                </div>
                <div className="rediger-huskelapp-modal-header">
                    <BodyShort weight="semibold">{`${bruker.fornavn} ${bruker.etternavn}`}</BodyShort>
                    <CopyButton
                        className="rediger-huskelapp-modal-header-copybutton"
                        iconPosition="right"
                        copyText={bruker.fnr}
                        text={`F.nr.: ${bruker.fnr}`}
                    />
                </div>
            </Modal.Header>
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
                    setHuskelappEndret={setHuskelappEndret}
                />
            </Modal.Body>
            <Modal.Footer className="rediger-huskelapp-modal__footer">
                <Button variant="primary" size="small" type="submit" form="rediger-huskelapp-skjema">
                    {arbeidsliste ? 'Lagre huskelapp og slett arbeidsliste' : 'Lagre'}
                </Button>
                <Button size="small" variant="secondary" type="button" onClick={handleOnAvbryt}>
                    Avbryt
                </Button>
                {harArbeidsliste && (
                    <KnappMedBekreftHandling
                        handlingsknapptekst="Slett gammel arbeidsliste uten å lage ny huskelapp"
                        bekreftelsesmelding={{
                            overskrift: 'Er du sikker på at du vil slette gammel arbeidsliste?',
                            beskrivelse: 'Dette vil slette tittel, kommentar og frist for denne personen.'
                        }}
                        bekreftknapp={{
                            tekst: 'Ja, slett arbeidslista',
                            onClick: () => slettArbeidslisteMenIkkeFargekategoriOgOppdaterRedux(bruker, dispatch),
                            onClickThen: () => onModalClose()
                        }}
                        feilmelding="Noe gikk galt ved sletting av arbeidslista."
                        icon={<TrashIcon aria-hidden />}
                    />
                )}
                {!harArbeidsliste && harHuskelapp && (
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
