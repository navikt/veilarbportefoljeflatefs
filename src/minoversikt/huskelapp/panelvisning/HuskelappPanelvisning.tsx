import React, {useState} from 'react';
import {BrukerModell, HuskelappModell} from '../../../model-interfaces';
import {RedigerHuskelappModal} from '../redigering/RedigerHuskelappModal';
import {HuskelappForPanel} from './HuskelappForPanel';
import './panelvisning.css';

interface Props {
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
}

export const HuskelappPanelvisning = ({bruker, huskelapp}: Props) => {
    const [skalViseRedigerHuskelappModal, setSkalViseRedigerHuskelappModal] = useState<boolean>(false);
    const visRedigeringsmodal = () => setSkalViseRedigerHuskelappModal(true);

    return (
        <div className="huskelapp-panel">
            <HuskelappForPanel huskelapp={huskelapp} bruker={bruker} onEndreHuskelapp={visRedigeringsmodal} />
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
