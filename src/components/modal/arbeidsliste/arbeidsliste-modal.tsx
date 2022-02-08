import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {skjulModal} from '../../../ducks/modal';
import {markerAlleBrukere} from '../../../ducks/portefolje';
import LeggTilArbeidslisteForm from './legg-til-arbeidslisteform';
import {BrukerModell} from '../../../model-interfaces';
import './arbeidsliste.less';
import {AppState} from '../../../reducer';
import {STATUS} from '../../../ducks/utils';
import ModalHeader from '../modal-header';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import FjernFraArbeidslisteForm from './fjern-fra-arbeidsliste-form';
import {BodyShort, Heading, Modal} from '@navikt/ds-react';
import LasterModal from '../lastermodal/laster-modal';

interface ArbeidslisteModalProps {
    isOpen: boolean;
    valgteBrukere: BrukerModell[];
}

const ArbeidslisteModal = ({isOpen, valgteBrukere}: ArbeidslisteModalProps) => {
    const arbeidslisteStatus = useSelector((state: AppState) => state.arbeidsliste.status);
    const innloggetVeileder = useSelector((state: AppState) => state.innloggetVeileder.data!.ident);

    const statusLaster = arbeidslisteStatus !== undefined && arbeidslisteStatus !== STATUS.OK;
    const fjerneBrukere = valgteBrukere.some(bruker => bruker.arbeidsliste.arbeidslisteAktiv);
    const brukereSomSkalFjernes = valgteBrukere.filter(bruker => bruker.arbeidsliste.arbeidslisteAktiv);

    const dispatch = useDispatch();
    const [formIsDirty, setFormIsDirty] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    const lukkModal = () => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formIsDirty || window.confirm(dialogTekst)) {
            setIsModalOpen(false);
            dispatch(skjulModal());
            dispatch(markerAlleBrukere(false));
        }
    };

    return (
        <>
            {statusLaster ? (
                <LasterModal isOpen={statusLaster} />
            ) : (
                <>
                    {fjerneBrukere ? (
                        <VarselModal
                            isOpen={isModalOpen}
                            onClose={lukkModal}
                            type={VarselModalType.ADVARSEL}
                            dataTestClass="modal_varsel_fjern-fra-arbeidsliste"
                        >
                            <div className="fjern-arbeidsliste">
                                <div className="arbeidsliste-headertekst">
                                    <Heading size="large" level="1">
                                        Fjern fra arbeidsliste
                                    </Heading>
                                    <BodyShort>
                                        {`Du har valgt å fjerne ${brukereSomSkalFjernes.length} ${
                                            brukereSomSkalFjernes.length === 1 ? 'bruker' : 'brukere'
                                        } fra arbeidslisten.`}
                                    </BodyShort>
                                </div>
                                <FjernFraArbeidslisteForm valgteBrukere={brukereSomSkalFjernes} lukkModal={lukkModal} />
                            </div>
                        </VarselModal>
                    ) : (
                        <Modal
                            className="arbeidsliste-modal legg-i-arbeidsliste"
                            open={isModalOpen}
                            onClose={lukkModal}
                        >
                            <ModalHeader tittel="Legg i arbeidsliste" />
                            <div className="modal-innhold">
                                <LeggTilArbeidslisteForm
                                    valgteBrukere={valgteBrukere}
                                    lukkModal={lukkModal}
                                    innloggetVeileder={innloggetVeileder}
                                    setFormIsDirty={() => setFormIsDirty(formIsDirty)}
                                />
                            </div>
                        </Modal>
                    )}
                </>
            )}
        </>
    );
};
export default ArbeidslisteModal;
