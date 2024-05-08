import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {BrukerModell, HuskelappModell} from '../../../model-interfaces';
import {TrashIcon} from '@navikt/aksel-icons';
import {LagEllerEndreHuskelappModal} from '../redigering/LagEllerEndreHuskelappModal';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../../reducer';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {usePortefoljeSelector} from '../../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {Huskelapp} from '../Huskelapp';
import {handleSlettHuskelapp} from '../redigering/slettHuskelapp';

interface Props {
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
}

export const HuskelappPanelvisning = ({bruker, huskelapp}: Props) => {
    const [modalLagEllerEndreHuskelappSkalVises, setModalLagEllerEndreHuskelappSkalVises] = useState<boolean>(false);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    return (
        <>
            <Huskelapp huskelapp={huskelapp}>
                <div className="huskelapp-handlingsknapper">
                    <Button
                        type="button"
                        size="xsmall"
                        variant="secondary"
                        onClick={() => handleSlettHuskelapp(dispatch, huskelapp, bruker.fnr, enhetId!!)}
                        icon={<TrashIcon aria-hidden={true} />}
                    >
                        Slett
                    </Button>
                    <Button
                        type="button"
                        size="xsmall"
                        variant="primary"
                        onClick={() => setModalLagEllerEndreHuskelappSkalVises(true)}
                    >
                        Endre
                    </Button>
                </div>
            </Huskelapp>
            {modalLagEllerEndreHuskelappSkalVises && (
                <LagEllerEndreHuskelappModal
                    onModalClose={() => {
                        setModalLagEllerEndreHuskelappSkalVises(false);
                    }}
                    isModalOpen={modalLagEllerEndreHuskelappSkalVises}
                    huskelapp={huskelapp}
                    bruker={bruker}
                />
            )}
        </>
    );
};
