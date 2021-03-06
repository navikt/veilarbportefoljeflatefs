import React from 'react';
import {ReactComponent as PilStigende} from '../../../components/tabell/arrow-up.svg';
import {ReactComponent as PilSynkende} from '../../../components/tabell/arrow-down.svg';

export interface FlyttKnappWraperProps {
    showUpBtn: boolean;
    showDownBtn: boolean;
    onClickUp?: () => void;
    onClickDown?: () => void;
    idx: number;
}

function FlyttKnappWrapper({showUpBtn, showDownBtn, onClickUp, onClickDown, idx}: FlyttKnappWraperProps) {
    return (
        <div className="flytt-knapper" aria-hidden="true">
            {showUpBtn ? (
                <div
                    className="flytt-knapp flytt-knapp_opp"
                    role="button"
                    aria-disabled="true"
                    onClick={onClickUp}
                    data-testid={`flytt-knapp_opp_${idx}`}
                >
                    <PilStigende />
                </div>
            ) : (
                <></>
            )}

            {showDownBtn ? (
                <div
                    className="flytt-knapp flytt-knapp_ned"
                    role="button"
                    aria-disabled="true"
                    onClick={onClickDown}
                    data-testid={`flytt-knapp_ned_${idx}`}
                >
                    <PilSynkende />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default FlyttKnappWrapper;
