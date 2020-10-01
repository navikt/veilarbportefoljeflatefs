import React from 'react';
import {ReactComponent as PilAscending} from '../../../components/tabell/arrow-up.svg';
import {ReactComponent as PilDescending} from '../../../components/tabell/arrow-down.svg';

export interface FlyttKnappWraperProps {
    showUpBtn: boolean;
    showDownBtn: boolean;
    onClickUp?: () => void;
    onClickDown?: () => void;
}

function FlyttKnappWraper({showUpBtn, showDownBtn, onClickUp, onClickDown}: FlyttKnappWraperProps) {
    return (
        <div className="flytt-knapper" aria-hidden="true">
            {showUpBtn && <div className="flytt-knapp" role="button" aria-disabled="true" onClick={onClickUp}>
                <PilAscending/>
            </div>}
            {showDownBtn && <div className="flytt-knapp" role="button" aria-disabled="true" onClick={onClickDown}>
                <PilDescending/>
            </div>}
        </div>
    );
}

export default FlyttKnappWraper;
