import React from 'react';
import {keyCodes} from '../../../utils/utils';

export interface HandleKeyDownProps {
    eventIsInsideContainer: (e: React.MouseEvent) => boolean;
    setDropIndex: React.Dispatch<React.SetStateAction<number>>;
    prepFlyttOpp: (index: number) => void;
    prepFlyttNed: (index: number) => void;
    requestFocus: (index: number) => void;
}
export interface HandleKeyUpProps {
    eventIsInsideContainer: (e: React.MouseEvent) => boolean;
    requestNewOrder: (from: number, to: number) => void;
    lagreRekkefølge: () => void;
    avbryt: () => void;
    setAriaTekst: React.Dispatch<React.SetStateAction<string>>;
    setDestIndex: React.Dispatch<React.SetStateAction<number>>;
    setSrcIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function handleKeyDown({
    eventIsInsideContainer,
    setDropIndex,
    prepFlyttOpp,
    prepFlyttNed,
    requestFocus
}: HandleKeyDownProps) {
    return (e) => {
        if (eventIsInsideContainer(e)) {
            if (e.keyCode === keyCodes.down || e.keyCode === keyCodes.up) {
                e.preventDefault();
                if (e.keyCode === keyCodes.up) {
                    if (e.altKey) {
                        prepFlyttOpp(e.target.value);
                    } else {
                        requestFocus(e.target.value - 1);
                    }
                } else {
                    if (e.altKey) {
                        prepFlyttNed(e.target.value);
                    } else {
                        requestFocus(e.target.value + 1);
                    }
                }
                setDropIndex(-1);
            } else if (e.keyCode === keyCodes.space) e.preventDefault();
        }
    };
}

export function handleKeyUp({
    eventIsInsideContainer,
    requestNewOrder,
    setAriaTekst,
    setDestIndex,
    setSrcIndex,
    avbryt,
    lagreRekkefølge
}: HandleKeyUpProps) {
    return (e) => {
        if (eventIsInsideContainer(e)) {
            if (e.altKey && (e.keyCode === keyCodes.up || e.keyCode === keyCodes.down)) {
                if (e.keyCode === keyCodes.up) {
                    requestNewOrder(e.target.value, e.target.value - 1);
                } else {
                    requestNewOrder(e.target.value, e.target.value + 1);
                }
            } else if (e.keyCode === keyCodes.space) {
                setAriaTekst(
                    'Bruk piltast opp eller ned for å velge et annet filter. Hold nede alt og press opp eller ned for å endre rekkefølgen til filter. Enter for å lagre. Escape for å avbryte.'
                );
            } else if (e.keyCode === keyCodes.esc) {
                avbryt();
            } else if (e.keyCode === keyCodes.enter) {
                lagreRekkefølge();
            }
            setDestIndex(-1);
            setSrcIndex(-1);
        }
    };
}
