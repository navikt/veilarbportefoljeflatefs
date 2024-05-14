import React, {useState} from 'react';
import {BrukerModell, HuskelappModell} from '../../../model-interfaces';
import {LagEllerEndreHuskelappModal} from '../redigering/LagEllerEndreHuskelappModal';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../../reducer';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {usePortefoljeSelector} from '../../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {HuskelappForPanel} from './HuskelappForPanel';
import {handleSlettHuskelapp} from '../redigering/slettHuskelapp';

interface Props {
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
}

export const HuskelappPanelvisning = ({bruker, huskelapp}: Props) => {
    const [skalLagEllerEndreHuskelappModalVises, setSkalLagEllerEndreHuskelappModalVises] = useState<boolean>(false);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);

    const visRedigeringsmodal = () => setSkalLagEllerEndreHuskelappModalVises(true);
    const slettHuskelapp = () => handleSlettHuskelapp(dispatch, huskelapp, bruker.fnr, enhetId!!);

    return (
        <>
            <HuskelappForPanel
                huskelapp={huskelapp}
                onSlettHuskelapp={slettHuskelapp}
                onEndreHuskelapp={visRedigeringsmodal}
            />
            {skalLagEllerEndreHuskelappModalVises && (
                <LagEllerEndreHuskelappModal
                    onModalClose={() => {
                        setSkalLagEllerEndreHuskelappModalVises(false);
                    }}
                    isModalOpen={skalLagEllerEndreHuskelappModalVises}
                    huskelapp={huskelapp}
                    bruker={bruker}
                />
            )}
        </>
    );
};
