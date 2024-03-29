import React from 'react';
import {ArrowDownIcon, ArrowUpIcon} from '@navikt/aksel-icons';

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
                    <ArrowUpIcon title="Flytt filter oppover" />
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
                    <ArrowDownIcon title="Flytt filter nedover" />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default FlyttKnappWrapper;
