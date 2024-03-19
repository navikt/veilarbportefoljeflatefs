import React, {useState} from 'react';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {LagEllerEndreHuskelappModal} from './LagEllerEndreHuskelappModal';
import {HuskelappModalHeader} from './HuskelappModalHeader';
import {Huskelapp} from './Huskelapp';
import {TrashIcon} from '@navikt/aksel-icons';
import {handleSlettHuskelapp} from './slettHuskelapp';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {usePortefoljeSelector} from '../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../ducks/ui/listevisning';
import {ReactComponent as HuskelappIkon} from '../../components/ikoner/huskelapp/huskelapp.svg';
import {ReactComponent as HuskelappIkonTomt} from '../../components/ikoner/huskelapp/huskelapp_stiplet.svg';
import {Button, Modal} from '@navikt/ds-react';

export const HuskelappIkonInngang = ({bruker}: {bruker: BrukerModell}) => {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    const [modalLagEllerEndreHuskelappSkalVises, setModalLagEllerEndreHuskelappSkalVises] = useState<boolean>(false);
    const [modalVisHuskelappSkalVises, setModalVisHuskelappSkalVises] = useState<boolean>(false);
    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                onClick={() => {
                    bruker.huskelapp
                        ? setModalVisHuskelappSkalVises(true)
                        : setModalLagEllerEndreHuskelappSkalVises(true);
                }}
                icon={
                    bruker.huskelapp ? (
                        <HuskelappIkon className="huskelappikon" />
                    ) : (
                        <HuskelappIkonTomt className="huskelappikon" />
                    )
                }
            />
            {modalLagEllerEndreHuskelappSkalVises && (
                <LagEllerEndreHuskelappModal
                    onModalClose={() => {
                        setModalLagEllerEndreHuskelappSkalVises(false);
                        if (bruker.huskelapp) {
                            setModalVisHuskelappSkalVises(true);
                        }
                    }}
                    isModalOpen={modalLagEllerEndreHuskelappSkalVises}
                    huskelapp={bruker.huskelapp as HuskelappModell}
                    arbeidsliste={bruker.arbeidsliste.arbeidslisteAktiv ? bruker.arbeidsliste : null}
                    bruker={bruker}
                />
            )}
            {modalVisHuskelappSkalVises && (
                <Modal open={modalVisHuskelappSkalVises} onClose={() => setModalVisHuskelappSkalVises(false)}>
                    <Modal.Body>
                        <HuskelappModalHeader />
                        <Huskelapp huskelapp={bruker.huskelapp!!} className="huskelapp-i-modal" />
                        <div className="huskelapp-handlingsknapper">
                            <Button
                                type="button"
                                size="xsmall"
                                variant="secondary"
                                onClick={() => {
                                    //todo varsel modal på at det kommer til å slettes
                                    handleSlettHuskelapp(dispatch, bruker.huskelapp!!, bruker.fnr, enhetId!!).then(() =>
                                        setModalVisHuskelappSkalVises(false)
                                    );
                                }}
                                icon={<TrashIcon />}
                            >
                                Slett
                            </Button>
                            <Button
                                type="button"
                                size="xsmall"
                                variant="primary"
                                onClick={() => {
                                    setModalVisHuskelappSkalVises(false);
                                    setModalLagEllerEndreHuskelappSkalVises(true);
                                }}
                            >
                                Endre
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};
