import {useState} from 'react';
import {BrukerModell, HuskelappModell} from '../../../typer/bruker-modell';
import {HuskelappModal} from '../redigering/HuskelappModal';
import {HuskelappForPanel} from './HuskelappForPanel';
import './panelvisning.css';

interface Props {
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
}

export const HuskelappPanelvisning = ({bruker, huskelapp}: Props) => {
    const [skalViseHuskelappModal, setSkalViseHuskelappModal] = useState<boolean>(false);

    return (
        <div className="huskelapp-panel">
            <HuskelappForPanel
                huskelapp={huskelapp}
                bruker={bruker}
                onEndreHuskelapp={() => setSkalViseHuskelappModal(true)}
            />
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
