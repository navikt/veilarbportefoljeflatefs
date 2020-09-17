import React from 'react';

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
            if (e.keyCode === 38 || e.keyCode === 40) {
                e.preventDefault();
                if (e.keyCode === 38) {
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
            } else if (e.keyCode === 32) e.preventDefault();
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
            if (e.altKey && (e.keyCode === 38 || e.keyCode === 40)) {
                // Piltast opp og ned
                if (e.keyCode === 38) {
                    requestNewOrder(e.target.value, e.target.value - 1);
                } else {
                    requestNewOrder(e.target.value, e.target.value + 1);
                }
            } else if (e.keyCode === 32) {
                // Space
                setAriaTekst(
                    'Bruk piltast opp eller ned for å velge et annet filter. Hold nede alt og press opp eller ned for å endre rekkefølgen til filter. Enter for å lagre. Escape for å avbryte.'
                );
            } else if (e.keyCode === 27) {
                // Esc.
                avbryt();
            } else if (e.keyCode === 13) {
                // Enter
                lagreRekkefølge();
            }
            setDestIndex(-1);
            setSrcIndex(-1);
        }
    };
}
