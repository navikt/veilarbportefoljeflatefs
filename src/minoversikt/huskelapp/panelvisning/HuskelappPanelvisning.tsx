import React, {useState} from 'react';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {BrukerModell, HuskelappModell} from '../../../model-interfaces';
import {RedigerHuskelappModal} from '../redigering/RedigerHuskelappModal';
import {AppState} from '../../../reducer';
import {usePortefoljeSelector} from '../../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {HuskelappForPanel} from './HuskelappForPanel';
import {handleSlettHuskelapp} from '../redigering/slettHuskelapp';
import '../huskelapp.css';
import './panelvisning.css';

interface Props {
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
}

export const HuskelappPanelvisning = ({bruker, huskelapp}: Props) => {
    const [skalViseRedigerHuskelappModal, setSkalViseRedigerHuskelappModal] = useState<boolean>(false);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);

    const visRedigeringsmodal = () => setSkalViseRedigerHuskelappModal(true);
    const slettHuskelapp = () => handleSlettHuskelapp(dispatch, huskelapp, bruker.fnr, enhetId!!);

    return (
        <div className="huskelapp-panel">
            <HuskelappForPanel
                huskelapp={huskelapp}
                onSlettHuskelapp={slettHuskelapp}
                onEndreHuskelapp={visRedigeringsmodal}
            />
            {skalViseRedigerHuskelappModal && (
                <RedigerHuskelappModal
                    onModalClose={() => {
                        setSkalViseRedigerHuskelappModal(false);
                    }}
                    isModalOpen={skalViseRedigerHuskelappModal}
                    huskelapp={huskelapp}
                    bruker={bruker}
                />
            )}
        </div>
    );
};
