import React, {useState} from 'react';
import {BrukerModell, HuskelappModell} from '../../../model-interfaces';
import {HuskelappModal} from '../redigering/HuskelappModal';
import {HuskelappForPanel} from './HuskelappForPanel';
import './panelvisning.css';

interface Props {
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
}

export const HuskelappPanelvisning = ({bruker, huskelapp}: Props) => {
    const [skalViseHuskelappModal, setSkalViseHuskelappModal] = useState<boolean>(false);
    const visRedigeringsmodal = () => setSkalViseHuskelappModal(true);

    return (
        <div className="huskelapp-panel">
            <HuskelappForPanel huskelapp={huskelapp} bruker={bruker} onEndreHuskelapp={visRedigeringsmodal} />
            {skalViseHuskelappModal && (
                <HuskelappModal
                    onModalClose={() => {
                        setSkalViseHuskelappModal(false);
                    }}
                    isModalOpen={skalViseHuskelappModal}
                    huskelapp={huskelapp}
                    bruker={bruker}
                />
            )}
        </div>
    );
};
