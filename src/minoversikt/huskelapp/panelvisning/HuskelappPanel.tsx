import React from 'react';
import {BrukerModell, HuskelappModell} from '../../../model-interfaces';
import {HuskelappPanelvisning} from './HuskelappPanelvisning';
import '../huskelapp.css';
import './panelvisning.css';

export const HuskelappPanel = ({bruker}: {bruker: BrukerModell}) => {
    return (
        <div className="huskelapp-panel">
            <HuskelappPanelvisning huskelapp={bruker.huskelapp as HuskelappModell} bruker={bruker} />
        </div>
    );
};
